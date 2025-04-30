import React, { useEffect, useRef, useState } from 'react';
import { formatTitle } from '../utils/formatTitle';
import { formatViews, formatTimeAgo } from '../utils/formatHelpers';
import { extractAverageColor } from '../utils/extractAverageColor';
import { motion } from 'framer-motion';

const VideoCard = ({ info, isMenuOpen }) => {
  const { snippet, statistics } = info;
  const { title, thumbnails, channelTitle, publishedAt } = snippet;

  const titleLength = isMenuOpen ? [38, 30] : [44, 30];
  const thumbnailQuality = isMenuOpen ? 'medium' : 'high';
  const cardWidth = isMenuOpen ? 'sm:w-96' : 'sm:w-[430px]';
  const imgHeight = isMenuOpen ? 'sm:h-52' : 'sm:h-60';

  const [firstLine, secondLine] = formatTitle(title, ...titleLength);
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
  }, [info]);

  return (
    <motion.div
      layout
      transition={{ duration: 0.4, ease: 'easeInOut' }}
      className={`text-white ${cardWidth}  w-96 -ml-[90px] sm:ml-0 p-2 mx-2 rounded-lg transform hover:scale-[101%] hover:shadow-2xl `}
      style={{ '--hover-bg': hoverBgColor }}
    >
      <div
        className="rounded-lg transition-colors duration-300"
        style={{ backgroundColor: 'transparent' }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = hoverBgColor)}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
      >
        <motion.img
          layout
          ref={imgRef}
          crossOrigin="anonymous"
          className={`rounded-md p-2 w-full object-cover ${imgHeight} transition-all duration-500 ease-in-out`}
          src={thumbnails[thumbnailQuality].url}
          alt={title}
        />
        <div className="p-2">
          <h4 className="font-bold pt-2">
            {firstLine}<br />{secondLine}
          </h4>
          <p className="text-gray-400">{channelTitle}</p>
          <p className="text-gray-400 text-sm">
            {formattedViews} • {publishedTimeAgo}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default VideoCard;
