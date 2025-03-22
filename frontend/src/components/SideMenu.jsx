import { Link, useSearchParams } from "react-router-dom";
import Search from "./Search"


const SideMenu = () => {

    const [searchParams, setSearchParams] = useSearchParams();


  const handleFilter = (e) => {
    if (searchParams.get("sortQuery") !== e.target.value) {
      setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      sortQuery: e.target.value,
    });
    };    
  };

  const handleCategory = (category) => {
    if (searchParams.get("cat") !== category) {
      setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      cat: category,
    });
    };    
  };

  return (
    <div className="px-4 h-max sticky top-8">
      <h1 className="mb-4 text-sm font-semibold">Search</h1>
      <Search />
      <h1 className="mb-4 mt-8 text-sm font-semibold">Filter</h1>
      <div className="flex flex-col gap-2 text-sm">
        <label htmlFor="" className="flex items-center gap-2 cursor-pointer">
            <input 
                type="radio" 
                name="sort"
                onChange={handleFilter} 
                value="newest" 
                className="bg-white appearance-none w-4 h-4 border-[1.5px] cursor-pointer rounded-sm checked:bg-blue-800 border-blue-800" 
            />
            Newest
        </label>

        <label htmlFor="" className="flex items-center gap-2 cursor-pointer">
            <input 
                type="radio" 
                name="sort"
                onChange={handleFilter} 
                value="popular" 
                className="bg-white appearance-none w-4 h-4 border-[1.5px] cursor-pointer rounded-sm checked:bg-blue-800 border-blue-800" 
            />
            Most Popular
        </label>

        <label htmlFor="" className="flex items-center gap-2 cursor-pointer">
            <input 
                type="radio" 
                name="sort"
                onChange={handleFilter} 
                value="trending" 
                className="bg-white appearance-none w-4 h-4 border-[1.5px] cursor-pointer rounded-sm checked:bg-blue-800 border-blue-800" 
            />
            Trending
        </label>

        <label htmlFor="" className="flex items-center gap-2 cursor-pointer">
            <input 
                type="radio" 
                name="sort"
                onChange={handleFilter} 
                value="oldest" 
                className="bg-white appearance-none w-4 h-4 border-[1.5px] cursor-pointer rounded-sm checked:bg-blue-800 border-blue-800" 
            />
            Oldest
        </label>
      </div>


      <h1 className="mb-4 mt-8 text-sm font-semibold">Categories</h1>
      <div className="flex flex-col gap-2 text-sm">
        <span onClick={()=>handleCategory("general")} className='underline cursor-pointer'>All Posts</span>
            <span onClick={()=>handleCategory("web-design")} className=' underline cursor-pointer'>Web Design</span>
            <span onClick={()=>handleCategory("development")} className='underline cursor-pointer'>Development</span>
            <span onClick={()=>handleCategory("database")} className='underline cursor-pointer'>Database</span>
            <span onClick={()=>handleCategory("seo")} className='underline cursor-pointer'>Search Engines</span>
            <span onClick={()=>handleCategory("marketing")} className='underline cursor-pointer'>Marketing</span>
      </div>
    </div>
  );
}

export default SideMenu;
