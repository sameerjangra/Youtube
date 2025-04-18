import React, { useEffect, useState } from 'react';
import { YOUTUBE_API } from '../utils/Constant';
import VideoCard from './VideoCard';
import { Link } from 'react-router-dom';

const VideoContainer = () => {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);

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
  if (!videos || videos.length === 0) return <div className="text-white ml-44 mt-10">Loading...</div>;

  return (
    <div className="flex flex-wrap ml-44">
      {videos.map((video) => (
        <Link
          key={video.id.videoId || video.id}
          to={`/watch?v=${video.id.videoId || video.id}`}
          state={{ video }}
        >
          <VideoCard info={video} />
        </Link>
      ))}
    </div>
  );
};

export default VideoContainer;
