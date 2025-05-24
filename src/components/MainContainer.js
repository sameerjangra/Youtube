import React from 'react'
import ButtonList from './ButtonList'
import VideoContainer from './VideoContainer'


const MainContainer = () => {
  return (
    <div className="overflow-hidden bg-customBlack flex flex-col z-50 overflow-x-auto no-scrollbar">
        <ButtonList/>
        <VideoContainer />
    </div>
  )
}

export default MainContainer;
