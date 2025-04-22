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
    <div className="flex bg-customBlack relative">
      {/* Sidebar (absolute overlay style) */}
      {isMenuOpen && (
        <div className="fixed top-0 left-0 h-screen w-[140px] bg-customBlack z-30 transition-all duration-200 ease-in-out">
          <Slidebar />
        </div>
      )}
      {!isMenuOpen && !isWatchPage && (
        <div className="fixed top-0 left-0 h-screen w-[60px] bg-customBlack z-30 transition-all duration-200 ease-in-out">
          <MinSlideBar />
        </div>
      )}

      {/* Main Content Area */}
      <div
  className="flex-1 h-screen overflow-y-auto scrollbar-hide"
  style={{
    marginLeft: !isWatchPage && !isMenuOpen ? '60px' : !isWatchPage && isMenuOpen ? '180px' : '0px',
    transition: 'margin-left 0.5s ease-in-out',
  }}
>
  <Outlet />
</div>

    </div>
  );
};

export default Body;
