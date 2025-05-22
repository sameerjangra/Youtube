import React from 'react';
import Button from './Button';

const ButtonList = () => {
  const list = [
    "Music", "Sports", "Food", "Travel", "Tech", "Fashion", "Art", "Science", "History",
    "Politics", "Movies", "Books", "TV", "Gaming", "Fitness", "Health"
  ];

  return (
    <div className="flex overflow-x-auto scrollbar-hide whitespace-nowrap px-4 py-3 space-x-3 bg-customBlack shadow-md z-10">
      <button className="px-4  md:px-5 py-2 bg-white text-black text-sm md:text-base md:font-medium rounded-lg hover:bg-gray-200 transition">
        All
      </button>
      {list.map((item, index) => (
        <Button key={index} name={item} />
      ))}
    </div>
  );
};

export default ButtonList;
