import { Link } from "react-router-dom";
import { Image } from "./Image.jsx";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { format } from "timeago.js";

const fetchPost = async () => {
  const res = await axios.get(
    `${
      import.meta.env.VITE_API_BASE_URL
    }/posts?featured=true&limit=4&sort=newest`
  );
  return res.data;
};

const FeaturedPost = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["featuredPosts"],
    queryFn: () => fetchPost(),
  });

  if (isPending) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  const posts = data.posts;
  if (!posts || posts.length === 0) {
    return;
  }

  return (
    <div className="mt-8 flex flex-col lg:flex-row gap-8">
      {/* First Post */}
      <div className="w-full lg:w-1/2 flex flex-col gap-4">
        {/* Image */}
        {posts[0].img && (
          <Image src={posts[0].img} className="rounded-3xl object-cover" />
        )}

        {/* Details */}
        <div className="flex items-center gap-4">
          <h1 className="font-semibold lg:text-lg">01.</h1>
          <Link to="" className="text-blue-800 lg:text-lg">
            {posts[0].category}
          </Link>
          <span className="text-gray-500">{format(posts[0].createdAt)}</span>
        </div>

        {/* Title */}
        <Link
          to={posts[0].slug}
          className="text-xl lg:text-3xl font-semibold lg:font-bold"
        >
          {posts[0].title}
        </Link>
      </div>

      {/* Other Posts */}
      <div className="w-full lg:w-1/2 flex flex-col gap-4">
        {/* Second */}
        {posts[1] && (
          <div className="flex lg:h-1/3 justify-between gap-4">
            {posts[1].img && (
              <div className="w-1/3 aspect-video">
                <Image
                  src={posts[1].img}
                  className="rounded-3xl object-cover w-full h-full"
                  w="280"
                />
              </div>
            )}

            {/* details and title */}
            <div className="w-2/3">
              <div className="flex items-center gap-4 text-sm lg:text-base">
                <h1 className="font-semibold">02.</h1>
                <Link className="text-blue-800">{posts[1].category}</Link>
                <span className="text-gray-500 text-sm">
                  {format(posts[1].createdAt)}
                </span>
              </div>
              <Link
                to={posts[1].slug}
                className="text-base sm:text-lg md:text-2xl lg:text-xl font-medium xl:text-2xl"
              >
                {posts[1].title}
              </Link>
            </div>
          </div>
        )}

        {/* Third */}
        {posts[2] && (
          <div className="flex lg:h-1/3 justify-between gap-4">
            {posts[2].img && (
              <div className="w-1/3 aspect-video">
                <Image
                  src={posts[2].img}
                  className="rounded-3xl object-cover w-full h-full"
                  w="280"
                />
              </div>
            )}

            {/* details and title */}
            <div className="w-2/3">
              <div className="flex items-center gap-4 text-sm lg:text-base">
                <h1 className="font-semibold">02.</h1>
                <Link className="text-blue-800">{posts[2].category}</Link>
                <span className="text-gray-500 text-sm">
                  {format(posts[2].createdAt)}
                </span>
              </div>
              <Link
                to={posts[2].slug}
                className="text-base sm:text-lg md:text-2xl lg:text-xl font-medium xl:text-2xl"
              >
                {posts[2].title}
              </Link>
            </div>
          </div>
        )}

        {/* Fourth */}
        {posts[3] && (
          <div className="flex lg:h-1/3 justify-between gap-4">
            {posts[3].img && (
              <div className="w-1/3 aspect-video">
                <Image
                  src={posts[3].img}
                  className="rounded-3xl object-cover w-full h-full"
                  w="280"
                />
              </div>
            )}

            {/* details and title */}
            <div className="w-2/3">
              <div className="flex items-center gap-4 text-sm lg:text-base">
                <h1 className="font-semibold">02.</h1>
                <Link className="text-blue-800">{posts[3].category}</Link>
                <span className="text-gray-500 text-sm">
                  {format(posts[3].createdAt)}
                </span>
              </div>
              <Link
                to={posts[3].slug}
                className="text-base sm:text-lg md:text-2xl lg:text-xl font-medium xl:text-2xl"
              >
                {posts[3].title}
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeaturedPost;
