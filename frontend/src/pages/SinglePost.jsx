import { Link, useParams } from "react-router-dom";
import { Image } from "../components/Image";
import PostMenuActions from "../components/PostMenuActions";
import Search from "../components/Search";
import Comments from "../components/Comments";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { format } from "timeago.js";

const fetchPost = async (slug) => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_BASE_URL}/posts/${slug}`
  );
  return res.data;
};

export const SinglePost = () => {
  const { slug } = useParams();

  const { isPending, error, data } = useQuery({
    queryKey: ["posts", slug],
    queryFn: () => fetchPost(slug),
  });

  if (isPending) return "Loading...";
  if (error) return "An error has occurred: " + error.message;
  if (!data) return "Post not found!";

  return (
    <div className="flex flex-col gap-8">
      {/* Detail */}
      <div className="flex gap-8">
        <div className="lg:w-3/5 flex flex-col gap-8">
          <h1 className="text-xl md:text-3xl xl:text-4xl 2xl:text-5xl font-semibold">
            {data.title}
          </h1>

          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <span>Written By:</span>
            <Link to="/test">{data.user.username}</Link>
            <span>On</span>
            <Link className="text-blue-800">{data.category}</Link>
            <span>{format(data.createdAt)}</span>
          </div>

          <p className="text-gray-500 font-medium">{data.description}</p>
        </div>

        {data.img && (
          <div className="hidden lg:block w-2/5">
            <Image className="rounded-2xl" src={data.img} w="600" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col md:flex-row gap-12">
        {/* Text Content */}
        <div className="lg:text-lg gap-6 flex flex-col text-justify">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
            facilis possimus ea! Ipsum sunt sed accusamus deserunt sequi
            obcaecati! Earum quos incidunt impedit qui quae quisquam minus
            voluptatem explicabo error. Lorem ipsum, dolor sit amet consectetur
            adipisicing elit. Earum, voluptatibus minima illo nemo consequuntur
            dicta facilis ipsa tempore quae assumenda alias eligendi culpa
            asperiores ut doloribus voluptates officia corporis odio! Lorem
            ipsum dolor, sit amet consectetur adipisicing elit. Qui eius sint
            distinctio obcaecati? Facere atque aut nemo similique voluptates!
            Accusamus facere omnis, veniam unde sint fugiat aliquam? Nesciunt,
            cum sequi.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
            facilis possimus ea! Ipsum sunt sed accusamus deserunt sequi
            obcaecati! Earum quos incidunt impedit qui quae quisquam minus
            voluptatem explicabo error. Lorem ipsum, dolor sit amet consectetur
            adipisicing elit. Earum, voluptatibus minima illo nemo consequuntur
            dicta facilis ipsa tempore quae assumenda alias eligendi culpa
            asperiores ut doloribus voluptates officia corporis odio! Lorem
            ipsum dolor, sit amet consectetur adipisicing elit. Qui eius sint
            distinctio obcaecati? Facere atque aut nemo similique voluptates!
            Accusamus facere omnis, veniam unde sint fugiat aliquam? Nesciunt,
            cum sequi.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
            facilis possimus ea! Ipsum sunt sed accusamus deserunt sequi
            obcaecati! Earum quos incidunt impedit qui quae quisquam minus
            voluptatem explicabo error. Lorem ipsum, dolor sit amet consectetur
            adipisicing elit. Earum, voluptatibus minima illo nemo consequuntur
            dicta facilis ipsa tempore quae assumenda alias eligendi culpa
            asperiores ut doloribus voluptates officia corporis odio! Lorem
            ipsum dolor, sit amet consectetur adipisicing elit. Qui eius sint
            distinctio obcaecati? Facere atque aut nemo similique voluptates!
            Accusamus facere omnis, veniam unde sint fugiat aliquam? Nesciunt,
            cum sequi.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
            facilis possimus ea! Ipsum sunt sed accusamus deserunt sequi
            obcaecati! Earum quos incidunt impedit qui quae quisquam minus
            voluptatem explicabo error. Lorem ipsum, dolor sit amet consectetur
            adipisicing elit. Earum, voluptatibus minima illo nemo consequuntur
            dicta facilis ipsa tempore quae assumenda alias eligendi culpa
            asperiores ut doloribus voluptates officia corporis odio! Lorem
            ipsum dolor, sit amet consectetur adipisicing elit. Qui eius sint
            distinctio obcaecati? Facere atque aut nemo similique voluptates!
            Accusamus facere omnis, veniam unde sint fugiat aliquam? Nesciunt,
            cum sequi.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
            facilis possimus ea! Ipsum sunt sed accusamus deserunt sequi
            obcaecati! Earum quos incidunt impedit qui quae quisquam minus
            voluptatem explicabo error. Lorem ipsum, dolor sit amet consectetur
            adipisicing elit. Earum, voluptatibus minima illo nemo consequuntur
            dicta facilis ipsa tempore quae assumenda alias eligendi culpa
            asperiores ut doloribus voluptates officia corporis odio! Lorem
            ipsum dolor, sit amet consectetur adipisicing elit. Qui eius sint
            distinctio obcaecati? Facere atque aut nemo similique voluptates!
            Accusamus facere omnis, veniam unde sint fugiat aliquam? Nesciunt,
            cum sequi.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
            facilis possimus ea! Ipsum sunt sed accusamus deserunt sequi
            obcaecati! Earum quos incidunt impedit qui quae quisquam minus
            voluptatem explicabo error. Lorem ipsum, dolor sit amet consectetur
            adipisicing elit. Earum, voluptatibus minima illo nemo consequuntur
            dicta facilis ipsa tempore quae assumenda alias eligendi culpa
            asperiores ut doloribus voluptates officia corporis odio! Lorem
            ipsum dolor, sit amet consectetur adipisicing elit. Qui eius sint
            distinctio obcaecati? Facere atque aut nemo similique voluptates!
            Accusamus facere omnis, veniam unde sint fugiat aliquam? Nesciunt,
            cum sequi.
          </p>
        </div>

        {/* Side Menu */}
        <div className="px-4 h-max sticky top-8">
          <h1 className="mb-4 text-sm font-semibold">Author</h1>

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-8">
              {data.user.img && (
                <Image
                  src={data.user.img}
                  className="w-12 rounded-full object-cover"
                  w="48"
                  h="48"
                />
              )}
              <Link className="text-blue-800">{data.user.username}</Link>
            </div>

            <p className="text-sm text-gray-500 ">
              This will be a brief description of the author
            </p>

            <div className="flex gap-2">
              <Link>
                <Image src="facebook.svg" />
              </Link>
              <Link>
                <Image src="instagram.svg" />
              </Link>
            </div>
          </div>

          <PostMenuActions post={data} />

          <h1 className="mt-8 mb-4 text-sm font-semibold">Categories</h1>

          <div className="flex flex-col gap-2 text-sm">
            <Link to="/" className="underline">
              All
            </Link>
            <Link to="/" className="underline">
              Web Design
            </Link>
            <Link to="/" className="underline">
              Development
            </Link>
            <Link to="/" className="underline">
              Datebase
            </Link>
            <Link to="/" className="underline">
              Search Engines
            </Link>
            <Link to="/" className="underline">
              Marketing
            </Link>
          </div>

          <h1 className="mt-8 mb-4 text-sm font-semibold">Search</h1>

          <Search />
        </div>
      </div>
      <Comments postId={data._id} />
    </div>
  );
};
