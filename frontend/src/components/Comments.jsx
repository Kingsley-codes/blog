import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Comment from './Comment';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth, useUser } from '@clerk/clerk-react';


const fetchComments = async (postId) => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/comments/${postId}`);
    return res.data;
};

const Comments = ({postId}) => {

  const {user} = useUser();
  const { getToken } = useAuth();
  const {isPending, error, data} = useQuery({
    queryKey: ['comments', postId],
    queryFn: () => fetchComments(postId),
  }); 

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (newComment) => {
      try {
        const token = await getToken();

        if (!token) {
          throw new Error("No token received");
        }

        return axios.post(`${import.meta.env.VITE_API_URL}/comments/${postId}`, newComment, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
      } catch (error) {
        console.error("Error in mutation:", error);
        throw error;
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['comments', postId]})
    },

    onError: (error) => {
      if (error.response) {
        toast.error(error.response.data);
      } else {
        toast.error("An unknown error occurred");
      }

    },
  });
  

    const handleSubmit = e => {
      e.preventDefault();

      const formData = new FormData(e.target);

      const data = {
        desc: formData.get("desc"),
      };

      mutation.mutate(data);
    };

  return (
    <div className='flex flex-col gap-8 lg:w-3/5 mb-12'>
      <h1 className='text-xl text-gray-500 underline'>Comments</h1>
      <form onSubmit={handleSubmit} className='flex items-center justify-between gap-8 w-full'>
        <textarea name='desc' className='w-full p-4 rounded-xl' placeholder='Leave a comment...' id="" />
        <button className='bg-blue-800 px-4 text-white font-medium rounded-lg py-1'>Send</button>
      </form>

      {isPending ? 'Loading...' 
        : error ? "Error loading comments" 
        : 
      <>

        {
          mutation.isPending && (
            <Comment comment={{
              desc: `${mutation.variables.desc} (Sending...)`,
              createdAt: new Date(),
              user: {
                img: user.imageUrl,
                username: user.username,
              }
            }} />
          )
        }

        {data.map(comment => (
        <Comment key={comment._id} comment={comment} postId={postId} />
      ))}
      </>
      }
      
    </div>
  );
}

export default Comments;
