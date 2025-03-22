import { useState } from "react";
import PostList from "../components/PostList";
import SideMenu from "../components/SideMenu";


export const PostListPage = () => {
  const [menu, setMenu] = useState(false);
  return (
    <div>
      <h1 className='mb-8 text-2xl '>Development Blog</h1>

      <button className="md:hidden mb-4 bg-blue-800 px-4 py-2 rounded-2xl text-white text-sm" onClick={()=>setMenu(!menu)}>{menu ? "Close" : "Filter or Search"}</button>

      <div className='flex flex-col-reverse md:flex-row gap-8'>
        <div className=''>
          <PostList />
        </div>

        <div className={`${menu ? "block" : "hidden"} md:block`}>
          <SideMenu />
        </div>
      </div>
    </div>
  )
}


