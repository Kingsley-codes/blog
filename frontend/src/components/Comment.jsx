import { useAuth, useUser } from "@clerk/clerk-react";
import { Image } from "./Image";
import { format } from "timeago.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "axios";

const Comment = ({ comment, postId }) => {
  const { user } = useUser();
  const { getToken } = useAuth();
  const role = user?.publicMetadata?.role;

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      try {
        const token = await getToken();

        if (!token) {
          throw new Error("No token received");
        }

        return axios.delete(
          `${import.meta.env.VITE_API_BASE_URL}/comments/${comment._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (error) {
        console.error("Error in mutation:", error);
        throw error;
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
      toast.success("Comment deleted successfully!");
    },

    onError: (error) => {
      if (error.response) {
        toast.error(error.response.data);
      } else {
        toast.error("An unknown error occurred");
      }
    },
  });

  return (
    <div className="p-4 bg-slate-50 rounded-xl mb-8">
      <div className="flex items-center gap-4">
        {comment.user.img && (
          <Image
            src={comment.user.img}
            className="w-10 h-10 rounded-full object-cover"
            w="40"
          />
        )}

        <span className="font-medium">{comment.user.username}</span>
        <span className="text-sm text-gray-500">
          {format(comment.createdAt)}
        </span>
        {user &&
          (comment.user.username === user.username || role === "admin") && (
            <span
              className="text-xs text-red-300 hover:text-red-500"
              onClick={() => mutation.mutate()}
            >
              Delete
              {mutation.isPending && <span>(in progress...)</span>}
            </span>
          )}
      </div>

      <div className="mt-4">
        <p>{comment.desc}</p>
      </div>
    </div>
  );
};

export default Comment;
