import React from 'react'
import Button from './Button'

const ButtonList = () => {
  const list = [
    "Music", "Sports", "Food", "Travel", "Tech", "Fashion", "Art", "Science", "History", 
    "Politics", "Movies", "Books", "TV", "Gaming", "Fitness", "Health"
  ]

  return (
<div className="flex overflow-x-auto scrollbar-hide whitespace-nowrap p-4 space-x-2 ml-44">
    <button className='px-5 py-2  bg-white rounded-xl'>All</button>
      {list.map((item, index) => (
        <Button key={index} name={item} />
      ))}
    </div>
  )
}

export default ButtonList
