import React from 'react';
import Slidebar from './Slidebar';
import MinSlideBar from './MinSlidebar';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

const Body = () => {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);

  return (
    <div className="flex overflow-y-hidden scrollbar-hide whitespace-nowrap">
      {/* Render sidebar only if isMenuOpen is not null/undefined */}
      {isMenuOpen === true && <Slidebar />}
      {isMenuOpen === false && <MinSlideBar />}
      
      <Outlet />
    </div>
  );
};

export default Body;
