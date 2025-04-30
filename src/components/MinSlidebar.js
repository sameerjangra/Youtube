import React from 'react'
import { IoMdHome } from "react-icons/io";
import { MdSubscriptions} from "react-icons/md";
import { SiYoutubeshorts } from "react-icons/si";
import { Link } from 'react-router-dom';


const MinSlidebar = () => {

  return (
    <div className='w-15 p-4 bg-customBlack text-white flex flex-col mt-20'>
      <div>
        <ul className='p-1'>
          <Link to="/"><li >
            <IoMdHome className='text-2xl' />
            <span className='text-[10px]'>Home</span>
           </li></Link>
          <li className='mt-6'>
          <Link to={"/shorts"}><SiYoutubeshorts  className='text-2xl' />
            <span className='text-[10px]'>Shorts</span></Link>
            </li>
          <li className='mt-6'> 
          <MdSubscriptions className='text-2xl' />   
          <span className='text-[10px] -mx-4 pr-2'>Subscriptions</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default MinSlidebar;
