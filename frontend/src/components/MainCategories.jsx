import { Link } from 'react-router-dom';
import Search from "./Search.jsx";

const MainCategories = () => {
  return (
    <div className='hidden md:flex bg-white rounded-3xl xl:rounded-full p-4 shadow-lg items-center justify-center gap-8'>
        {/* Links */}
        <div className='flex-1 flex items-center justify-between flex-wrap'>
            <Link to="/posts" className='bg-blue-800 text-white px-4 py-2 rounded-full'>All Posts</Link>
            <Link to="/posts?cat=web-design" className='hover:bg-blue-50 px-4 py-2 rounded-full'>Web Design</Link>
            <Link to="/posts?cat=development" className='hover:bg-blue-50 px-4 py-2 rounded-full'>Development</Link>
            <Link to="/posts?cat=database" className='hover:bg-blue-50 px-4 py-2 rounded-full'>Database</Link>
            <Link to="/posts?cat=seo" className='hover:bg-blue-50 px-4 py-2 rounded-full'>Search Engines</Link>
            <Link to="/posts?cat=marketing" className='hover:bg-blue-50 px-4 py-2 rounded-full'>Marketing</Link>
        </div>

        <span className='text-xl text-gray-800 font-medium'>|</span>

        {/* Search */}
        <Search />
    </div>
  );
}

export default MainCategories;




