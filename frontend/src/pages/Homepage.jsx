import { Link } from "react-router-dom"
import MainCategories from "../components/MainCategories"
import FeaturedPost from "../components/FeaturedPost"
import PostList from "../components/PostList"

export const Homepage = () => {
  return (
    <div className="mt-4 flex flex-col gap-4">

      {/* BREADCRUMB */}
      <div className="flex gap-4">
        <Link to="/">Home</Link>
        <span className="text-blue-800">Blogs and Articles</span>
      </div>

      {/* INTRODUCTION */}
      <div className="flex items-center justify-between">

        {/* Titles */}
        <div>
          <h1 className="text-gray-800 text-2xl md:text-5xl lg:text-6xl font-bold">Lorem ipsum dolor sit Similique</h1>
          <p className="mt-8 text-md md:text-xl">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut eos praesentium cumque porro odit cum.</p>
        </div>

        {/* Animated button */}
        <Link to="write" className="relative hidden md:block"> 
          <svg 
            viewBox= "0 0 200 200"
            width= "200"
            height= "200"
            //className="text-lg tracking-widest animate-spin animatedButton"
            className="text-lg tracking-widest"
          >
            <path 
              id="circlePath"
              fill="none"
              d="M 100, 100 m -75, 0 a 75, 75 0 1, 1 150, 0 a 75, 75 0 1, 1 -150, 0"
            />

            <text>
              <textPath href="#circlePath" startOffset="0%">Write Your Story!</textPath>
              <textPath href="#circlePath" startOffset="50%">Share your idea</textPath>
            </text>
          </svg>

          <button className="absolute top-0 left-0 right-0 bottom-0 m-auto w-20 h-20 bg-blue-800 rounded-full flex items-center justify-center">
            <svg 
              width="50" 
              height="50" 
              viewBox="0 0 24 24"
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M7 7H17V17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M7 17L17 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>

          </button>
        </Link>
      </div>

      {/* CATEGORIES */}
      <MainCategories />

      {/* FEATURED POSTS */}
      <FeaturedPost />

      {/* POST LIST */}
      <div>
        <h1 className="my-8 text-2xl text-gray-600">Recent Posts</h1>
        <PostList />
      </div>
    </div>
  )
}
