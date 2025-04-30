import React from 'react';
import { IoMdHome } from "react-icons/io";
import { MdSubscriptions } from "react-icons/md";
import { SiYoutubeshorts } from "react-icons/si";
import { FaPlusCircle } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Slidebar = () => {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);

  return (
    <>
      {/* Desktop Sidebar (Always shown on desktop) */}
      {isMenuOpen && (
        <div className='w-48 h-full p-5 bg-customBlack text-white flex-col mt-20 hidden sm:flex'>
          <div className='border-b-4 border-zinc-700 pb-5'>
            <ul className='space-y-3'>
              <Link to="/"><li className='flex items-center space-x-3'><IoMdHome className='text-2xl' /><span>Home</span></li></Link>
              <li className='flex items-center space-x-3'><SiYoutubeshorts className='text-2xl' /><Link to={"/shorts"}><span>Shorts</span></Link></li>
              <li className='flex items-center space-x-3'><Link to={"/demo"}><span>Demo Page</span></Link></li>
              <li className='flex items-center space-x-3'><MdSubscriptions className='text-2xl' /><span>Subscriptions</span></li>
            </ul>
          </div>

          <div className='mt-5'>
            <p className='text-zinc-500 mb-3'>Library</p>
            <ul className='space-y-3'>
              <li className='flex items-center space-x-3'><span>History</span></li>
              <li className='flex items-center space-x-3'><span>Your videos</span></li>
              <li className='flex items-center space-x-3'><span>Watch Later</span></li>
              <li className='flex items-center space-x-3'><span>Liked Videos</span></li>
            </ul>
          </div>
        </div>
      )}

      {/* Bottom Header Navigation (Only on Mobile) */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-customBlack text-white border-t border-zinc-700 flex justify-around items-center h-14">
        <Link to="/">
          <div className="flex flex-col items-center">
            <IoMdHome className="text-xl" />
            <span className="text-xs">Home</span>
          </div>
        </Link>

        <Link to="/shorts">
          <div className="flex flex-col items-center">
            <SiYoutubeshorts className="text-xl" />
            <span className="text-xs">Shorts</span>
          </div>
        </Link>

        <div className="flex flex-col items-center">
          <FaPlusCircle className="text-2xl" />
        </div>

        <div className="flex flex-col items-center">
          <MdSubscriptions className="text-xl" />
          <span className="text-xs">Subs</span>
        </div>

        <div className="flex flex-col items-center">
          <FaRegUserCircle className="text-xl" />
          <span className="text-xs">You</span>
        </div>
      </div>
    </>
  );
};

export default Slidebar;
