import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ButtonList from './ButtonList';

const SearchPage = () => {
  const results = useSelector((state) => state.search.results);
  const navigate = useNavigate();

  const handleVideoClick = (videoId) => {
    navigate(`/watch?v=${videoId}`);
  };

  return (
    <div className='bg-customBlack min-h-screen'>
      <ButtonList />
      <div className='w-[87%] ml-[13%] px-6 py-4'>
        {results.map((item, index) => {
          const { thumbnails, title, description, channelTitle, publishedAt } = item.snippet;
          const videoId = item.id?.videoId || item.id; // handle both formats

          return (
            <div
              key={index}
              className='flex mb-6 cursor-pointer'
              onClick={() => handleVideoClick(videoId)}
            >
              <div className='min-w-[360px] max-w-[360px] h-[202px] overflow-hidden rounded-xl'>
                <img
                  src={thumbnails?.high?.url}
                  alt={title}
                  className='w-full h-full object-cover rounded-xl'
                />
              </div>

              <div className='ml-5 text-white'>
                <h1 className='text-xl font-semibold mb-2 line-clamp-2'>
                  {title}
                </h1>
                <div className='text-sm text-gray-400 mb-1'>
                  {new Intl.DateTimeFormat("en-US", {
                    dateStyle: "medium"
                  }).format(new Date(publishedAt))}
                </div>
                <div className='text-sm text-gray-300 mb-2'>
                  {channelTitle}
                </div>
                <p className='text-sm text-gray-300 max-w-3xl line-clamp-2'>
                  {description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SearchPage;
