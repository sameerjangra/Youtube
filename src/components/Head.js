import React, { useEffect, useState } from 'react';
import { BiMenu } from "react-icons/bi";
import { CiSearch } from "react-icons/ci";
import { IoMdMic } from "react-icons/io";
import { FaBell, FaRegUserCircle } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toogleMenu } from "../utils/appSlice";
import { setSearchResults } from "../utils/searchSlice";
import ytLogo from "../assets/ytlogo.png";
import { YOUTUBE_SEARCH_SUGGESTION_API, YOUTUBE_SEARCH_API } from '../utils/Constant';

const Head = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchQuery) getSearchSuggestions();
        }, 300);
        return () => clearTimeout(timer);
    }, [searchQuery]);

    const getSearchSuggestions = async () => {
        try {
            const response = await fetch(`${YOUTUBE_SEARCH_SUGGESTION_API}&q=${searchQuery}`);
            const json = await response.json();
            setSuggestions(json[1] || []);
            setShowSuggestions(true);
        } catch (error) {
            console.error("Error fetching suggestions:", error);
        }
    }

    const searchQueryResult = async (query) => {
        const trimmedQuery = query.trim();
        if (!trimmedQuery) {
          navigate('/');
          return;
        }
      
        try {
          const response = await fetch(`${YOUTUBE_SEARCH_API}&q=${trimmedQuery}`);
          const json = await response.json();
          dispatch(setSearchResults(json.items));
          navigate('/search');
        } catch (error) {
          console.error("Error fetching search results:", error);
        }
      };
      
    const toogleMenuHandler = () => {
        dispatch(toogleMenu());
    };

    return (
        <div className="flex items-center justify-between px-4 py-2 bg-customBlack shadow-md sticky top-0 z-50">
            {/* Left */}
            <div className='flex items-center space-x-4'>
                <BiMenu 
                    className='text-3xl text-white cursor-pointer' 
                    onClick={toogleMenuHandler} 
                />
                <Link to={"/"}><img src={ytLogo} alt="YouTube Logo" className="w-36" /></Link>
            </div>

{/* Center */}
<div className="relative flex-grow flex justify-center">
  <form
    onSubmit={(e) => {
      e.preventDefault();
      searchQueryResult(searchQuery);
    }}
    className="flex w-full max-w-2xl"
  >
    <input
      type="text"
      className="w-full p-2 px-4 text-white bg-[#121212] border border-gray-600 rounded-l-full outline-none focus:ring-1 focus:ring-blue-500"
      placeholder="Search"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      onFocus={() => setShowSuggestions(true)}
      onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
    />
    <button
      type="submit"
      className="w-14 bg-[#303030] border border-l-0 border-gray-600 rounded-r-full flex items-center justify-center"
    >
      <CiSearch className="text-white text-xl" />
    </button>
  </form>

  <button className="ml-2 p-2 rounded-full bg-[#303030] text-white">
    <IoMdMic className="text-lg m-1" />
  </button>

  {showSuggestions && suggestions.length > 0 && (
    <ul className="absolute top-12 bg-[#1f1f1f] w-full max-w-2xl rounded-md shadow-lg text-white text-sm overflow-hidden -ml-10 z-50">
      {suggestions.map((s, index) => (
        <li
          key={index}
          className="px-2 py-2 hover:bg-[#3d3d3d] cursor-pointer flex items-center space-x-2"
          onMouseDown={() => {
            setSearchQuery(s);
            searchQueryResult(s);
          }}
        >
          <CiSearch className='mx-2 text-xl' /> {s}
        </li>
      ))}
    </ul>
  )}
</div>


            {/* Right */}
            <div className='flex items-center space-x-5'>
                <button className='hidden sm:inline px-4 py-3 bg-[#303030] text-white rounded-full text-sm'>
                    + Create
                </button>
                <FaBell className='text-xl text-white cursor-pointer' />
                <FaRegUserCircle className='text-2xl text-white cursor-pointer' />
            </div>
        </div>
    );
};

export default Head;
