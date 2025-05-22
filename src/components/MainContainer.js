import React from 'react'
import ButtonList from './ButtonList'
import VideoContainer from './VideoContainer'


const MainContainer = () => {
  return (
    <div className="overflow-hidden bg-customBlack flex flex-col ">
        <ButtonList/>
        <VideoContainer />
    </div>
  )
}

export default MainContainer;
