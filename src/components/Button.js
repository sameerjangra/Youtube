import React from 'react';

const Button = ({ name, onClick, isSelected }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg transition whitespace-nowrap 
        ${isSelected ? 'bg-white text-black' : 'bg-zinc-800 text-white hover:bg-zinc-700'}`}
    >
      {name}
    </button>
  );
};

export default Button;
