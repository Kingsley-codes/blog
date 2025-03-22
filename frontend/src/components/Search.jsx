import { BiSearchAlt2 } from 'react-icons/bi';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

const Search = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      const query = e.target.value;
      if (location.pathname === "/posts") {
        setSearchParams({ ...Object.fromEntries(searchParams), Search: query});
      } else {
        navigate(`/posts?search=${query}`);
      }
    }
  }
  

  return (
    <div className='bg-gray-100 p-2 rounded-full flex gap-2'>
      <BiSearchAlt2 className="text-gray-600 text-lg mt-1 mx-1" />
      <input type="text" onKeyDown={handleKeyPress} placeholder='Search a post...' className='bg-transparent border focus:outline-none rounded-md focus:border-gray-300' />
    </div>
  );
}

export default Search;
