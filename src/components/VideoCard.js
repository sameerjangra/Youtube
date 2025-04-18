import React, { useEffect, useRef, useState } from 'react';
import { formatTitle } from '../utils/formatTitle';
import { formatViews, formatTimeAgo } from '../utils/formatHelpers';
import { extractAverageColor } from '../utils/extractAverageColor';

const VideoCard = ({ info }) => {
  const { snippet, statistics } = info;
  const { title, thumbnails, channelTitle, publishedAt } = snippet;

  const [firstLine, secondLine] = formatTitle(title, 38, 30);
  const formattedViews = formatViews(parseInt(statistics.viewCount, 10));
  const publishedTimeAgo = formatTimeAgo(publishedAt);

  const imgRef = useRef(null);
  const [hoverBgColor, setHoverBgColor] = useState('#1f1f1f');

  useEffect(() => {
    const img = imgRef.current;

    const handleImageLoad = () => {
      const color = extractAverageColor(img);
      setHoverBgColor(color);
    };

    if (img && img.complete) {
      handleImageLoad();
    } else {
      img.addEventListener('load', handleImageLoad);
      return () => img.removeEventListener('load', handleImageLoad);
    }
  }, []);

  return (
    <div
      className="text-white w-96 p-2 mx-2 rounded-lg transition-all duration-300 transform hover:scale-[101%] hover:shadow-2xl"
      style={{ '--hover-bg': hoverBgColor }}
    >
      <div
        className="rounded-lg transition-colors duration-300"
        style={{ backgroundColor: 'transparent' }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = hoverBgColor)}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
      >
        <img
          ref={imgRef}
          crossOrigin="anonymous"
          className="rounded-md p-2 w-full h-52 object-cover"
          src={thumbnails.medium.url}
          alt={title}
        />
        <div className="p-2">
          <h4 className="font-bold pt-2">
            {firstLine}<br />
            {secondLine}
          </h4>
          <p className="text-gray-400">{channelTitle}</p>
          <p className="text-gray-400 text-sm">
            {formattedViews} • {publishedTimeAgo}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
