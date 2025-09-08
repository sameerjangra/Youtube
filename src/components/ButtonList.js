import React from 'react';
import Button from './Button';

const ButtonList = ({ selectedCategory, setSelectedCategory }) => {
  const list = [
    "Trending", "Bollywood Music", "Hollywood Hits", "Live News", "Latest Trailers",
    "World Travel",
     "AI Technology",  "Space Science",  "Indian Politics", "World Politics",
    "Hollywood Movies", "Book Summaries", "Netflix Series", "Yoga", 
  ];
  

  return (
    <div className="flex overflow-x-auto px-4 py-3 space-x-3 bg-customBlack shadow-md z-10 no-scrollbar">
      <button
        className={`px-4 md:px-5 py-2 rounded-lg transition text-sm md:text-base md:font-medium 
          ${selectedCategory === "All" ? 'bg-white text-black' : 'bg-zinc-800 text-white hover:bg-zinc-700'}`}
        onClick={() => setSelectedCategory("All")}
      >
        All
      </button>
      {list.map((item, index) => (
        <Button
          key={index}
          name={item}
          isSelected={selectedCategory === item}
          onClick={() => setSelectedCategory(item)}
        />
      ))}
    </div>
  );
};

export default ButtonList;
