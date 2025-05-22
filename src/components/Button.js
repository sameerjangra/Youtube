import React from 'react';

const Button = ({ name }) => {
  return (
    <button className="px-4 py-2 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 transition whitespace-nowrap">
      {name}
    </button>
  );
};

export default Button;
