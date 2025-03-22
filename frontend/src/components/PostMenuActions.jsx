import { useAuth, useUser } from "@clerk/clerk-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { BiSolidTrash } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";



const PostMenuActions = ({post}) => {
  const {user} = useUser();
  const {getToken} = useAuth();
  const navigate = useNavigate();


  const {isPending, error, data:savedPosts} = useQuery({
      queryKey: ['savedPosts'],
      queryFn: async () => {
        const token = await getToken();
        return axios.get(`${import.meta.env.VITE_API_URL}/users/saved`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
      },
    }); 

    const isAdmin = user?.publicMetadata?.role === "admin" || false;
    const isSaved = savedPosts?.data?.some((p) => p === post._id) || false;
    const queryClient = useQueryClient();

    const saveMutation = useMutation({
      mutationFn: async () => {
        const token = await getToken();
        return axios.patch(`${import.meta.env.VITE_API_URL}/users/save`, { postId: post._id }, {
          headers: { Authorization: `Bearer ${token}` },
        });
      },

      onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ["savedPosts"]}); // Refresh saved posts list
      },
    });

    const featureMutation = useMutation({
      mutationFn: async () => {
        const token = await getToken(); 
        return axios.patch(`${import.meta.env.VITE_API_URL}/posts/feature`, { postId: post._id }, {
          headers: { Authorization: `Bearer ${token}` },
        });
      },

      onSuccess: async () => {
        await queryClient.invalidateQueries({queryKey: ["post", post.slug]}); 
        post.isFeatured = !post.isFeatured;
      },
    });



    const deleteSaved = useMutation({
      mutationFn: async () => {
        const token = await getToken();

        return axios.delete(`${import.meta.env.VITE_API_URL}/posts/${post._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
    },

     onSuccess: () => {
      toast.success("Post deleted successfully!")
      navigate("/");
    },

     onError: (error) => {
      toast.error(error.response.data)
    },

    });

    const handleSave = () => {
      if (!user) {
        return navigate("/login");
      }
      saveMutation.mutate();
    };

    const handleDelete = () => {
      deleteSaved.mutate();
    };

    const handleFeature = () => {
      featureMutation.mutate();
    };

  return (
    <div>
      <h1 className='mt-8 mb-4 text-sm font-semibold'>Actions</h1>

      {isPending ? 'Loading...' 
        : error ? "Error fetching saved posts" 
        :  <div onClick={handleSave} className="flex items-center gap-2 py-2 text-sm cursor-pointer">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                   
                  >
                  
                  <path 
                  d="M6 3h12a2 2 0 0 1 2 2v16l-8-4-8 4V5a2 2 0 0 1 2-2z"
                  fill={saveMutation.isPending ? isSaved ? "none" : "blue" :isSaved ? "blue" : "none"} 

                  stroke="blue" 
                  strokeWidth="2"
                  /> 
              </svg> 

        <span>Save This Post</span>
        {saveMutation.isPending && <span className="text-xs">(in progress)</span>}
      </div>}

      {
        isAdmin && <div className="flex items-center gap-2 py-2 text-sm cursor-pointer" onClick={handleFeature}>
          <svg 
            width="20px" 
            height="20px" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 2L14.92 8.62L22 9.24L16.5 13.97L18.18 21L12 17.27L5.82 21L7.5 13.97L2 9.24L9.08 8.62L12 2Z" 
              stroke="blue" 
              strokeWidth="2"
              fill={post.isFeatured ? "blue" : "none"}
            />
          </svg>
          <span>Feature post</span>
          {featureMutation.isPending && <span className="text-xs">(in progress)</span>}
        </div>
      }

      {user && (post.user.username === user.username || isAdmin) && <div onClick={handleDelete} className="flex items-center gap-2 py-2 text-sm cursor-pointer">
        <BiSolidTrash className="text-xl text-red-500" /> 
        <span>Delete This Post</span>
        {deleteSaved.isPending && <span className="text-xs">(in progress)</span>}
      </div>}
    </div>
  );
}

export default PostMenuActions;
