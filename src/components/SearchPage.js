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
      <div className='w-full px-4 sm:px-6 py-4 max-w-7xl mx-auto'>
        {results.map((item, index) => {
          const { thumbnails, title, description, channelTitle, publishedAt } = item.snippet;
          const videoId = item.id?.videoId || item.id;

          return (
            <div
              key={index}
              className='flex flex-col sm:flex-row gap-4 sm:gap-6 mb-6 cursor-pointer'
              onClick={() => handleVideoClick(videoId)}
            >
              <div className='w-full sm:min-w-[360px] sm:max-w-[360px] h-[200px] sm:h-[202px] overflow-hidden rounded-xl'>
                <img
                  src={thumbnails?.high?.url}
                  alt={title}
                  className='w-full h-full object-cover rounded-xl'
                />
              </div>

              <div className='text-white flex flex-col justify-between'>
                <h1 className='text-base sm:text-xl font-semibold mb-1 sm:mb-2 line-clamp-2'>
                  {title}
                </h1>
                <div className='text-xs sm:text-sm text-gray-400 mb-1'>
                  {new Intl.DateTimeFormat("en-US", {
                    dateStyle: "medium"
                  }).format(new Date(publishedAt))}
                </div>
                <div className='text-sm text-gray-300 mb-1'>{channelTitle}</div>
                <p className='text-sm text-gray-300 line-clamp-2'>{description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SearchPage;
