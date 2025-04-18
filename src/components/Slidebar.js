import React from 'react'
import { IoMdHome } from "react-icons/io";
import {  MdSubscriptions, MdHistory, MdVideoLibrary, MdWatchLater, MdThumbUp } from "react-icons/md";
import { useSelector } from 'react-redux';
import { SiYoutubeshorts } from "react-icons/si";
import { Link } from 'react-router-dom';


const Slidebar = () => {
    const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
    if (!isMenuOpen) {
        return null;
    }

  return (
    <div className='w-48 p-5 bg-customBlack text-white fixed '>
      <div className='border-b-4 border-zinc-700 pb-5'>
        <ul className='space-y-3'>
        <Link to="/"><li className='flex items-center space-x-3'>
            <IoMdHome className='text-2xl' /> 
            <span>Home </span>
          </li></Link>
          <li className='flex items-center space-x-3'>
            <SiYoutubeshorts className='text-2xl' />
            <span>Shorts</span>
          </li>
          <li className='flex items-center space-x-3'>
            <MdSubscriptions className='text-2xl' />
            <span>Subscriptions</span>
          </li>
        </ul>
      </div>

      <div className='mt-5'>
        <p className='text-zinc-500 mb-3'>Library</p>
        <ul className='space-y-3'>
          <li className='flex items-center space-x-3'>
            <MdHistory className='text-2xl' />
            <span>History</span>
          </li>
          <li className='flex items-center space-x-3'>
            <MdVideoLibrary className='text-2xl' />
            <span>Your videos</span>
          </li>
          <li className='flex items-center space-x-3'>
            <MdWatchLater className='text-2xl' />
            <span>Watch Later</span>
          </li>
          <li className='flex items-center space-x-3'>
            <MdThumbUp className='text-2xl' />
            <span>Liked Videos</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Slidebar
