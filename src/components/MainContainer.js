import React, { useState } from 'react';
import ButtonList from './ButtonList';
import VideoContainer from './VideoContainer';

const MainContainer = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <div className="overflow-hidden bg-customBlack flex flex-col z-50 overflow-x-auto no-scrollbar">
      <ButtonList selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
      <VideoContainer selectedCategory={selectedCategory} />
    </div>
  );
};

export default MainContainer;
