import React, { useEffect, useState } from 'react';
import { YOUTUBE_API } from '../utils/Constant';
import VideoCard from './VideoCard';
import { Link } from 'react-router-dom';
import Shimmer from './Shimmer';
import { useSelector } from 'react-redux';

const VideoContainer = () => {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);

  useEffect(() => {
    getVideos();
  }, []);

  const getVideos = async () => {
    try {
      const res = await fetch(YOUTUBE_API);
      const json = await res.json();

      if (json.items) {
        setVideos(json.items);
        setError(null);
      } else {
        setError("No videos found.");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to load videos.");
    }
  };

  if (error) return <div className="text-red-500 ml-44 mt-10">{error}</div>;
  if (!videos || videos.length === 0) return <Shimmer />;

  return (
    <div
      className={`
        px-4 py-2 
        grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 
        sm:ml-0 ml-0 mt-4
      `}
    >
      {videos.map((video) => (
        <Link
          key={video.id.videoId || video.id}
          to={`/watch?v=${video.id.videoId || video.id}`}
          state={{ video }}
        >
          <VideoCard info={video} isMenuOpen={isMenuOpen} />
        </Link>
      ))}
    </div>
  );
  
};

export default VideoContainer;
