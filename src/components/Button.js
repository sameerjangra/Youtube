import React from 'react'

const Button = ({name}) => {

  return (
    <div>
      <button className='px-5 py-2  bg-zinc-700 text-white rounded-xl'>{name}</button>
    </div>
  )
}

export default Button