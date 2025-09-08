// components/Shimmer.js

import React from 'react';

const Shimmer = () => {
  const shimmerCards = new Array(10).fill(0);

  return (
    <div className="flex flex-wrap ml-5">
      {shimmerCards.map((_, index) => (
        <div
          key={index}
          className="w-96 p-2 mx-2 my-4 animate-pulse"
        >
          <div className="rounded-md bg-[#2a2a2a] h-52 w-full mb-3"></div>
          <div className="bg-[#2a2a2a] h-4 w-3/4 rounded mb-2"></div>
          <div className="bg-[#2a2a2a] h-4 w-1/2 rounded mb-2"></div>
          <div className="bg-[#2a2a2a] h-4 w-1/4 rounded"></div>
        </div>
      ))}
    </div>
  );
};

export default Shimmer;
