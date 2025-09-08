import React from 'react';
import Slidebar from './Slidebar';
import MinSlideBar from './MinSlidebar';
import { useSelector } from 'react-redux';
import { Outlet, useLocation } from 'react-router-dom';

const Body = () => {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
  const location = useLocation();

  const isWatchPage = location.pathname === '/watch';

  return (
    <div className="flex flex-col bg-customBlack relative min-h-screen">
      <div className="flex flex-1">
        {/* Sidebar for Desktop only */}
        {!isWatchPage && isMenuOpen && (
          <div className="hidden sm:block fixed top-0 left-0 h-screen w-[140px] bg-customBlack z-30 transition-all duration-200 ease-in-out">
            <Slidebar />
          </div>
        )}

        {/* Min Sidebar for Desktop only */}
        {!isWatchPage && !isMenuOpen && (
          <div className="hidden sm:block fixed top-0 left-0 h-screen w-[60px] bg-customBlack z-30 transition-all duration-200 ease-in-out">
            <MinSlideBar />
          </div>
        )}

        {/* Main Content */}
        <div
          className="flex-1 h-screen overflow-y-auto scrollbar-hide pb-16 sm:pb-0 overflow-x-auto no-scrollbar"
          style={{
            marginLeft:
              !isWatchPage && window.innerWidth >= 640 && !isMenuOpen
                ? '60px'
                : !isWatchPage && window.innerWidth >= 640 && isMenuOpen
                ? '180px'
                : '0px',
            transition: 'margin-left 0.5s ease-in-out',
          }}
        >
          <Outlet />
        </div>
      </div>

      {/* Bottom Nav for Mobile */}
      {!isWatchPage && (
        <div className="sm:hidden">
          <Slidebar />
        </div>
      )}
    </div>
  );
};

export default Body;
