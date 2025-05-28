import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import VideoCard from './VideoCard';
import Shimmer from './Shimmer';
import { GOOGLE_API_KEY } from '../utils/Constant';

const VideoContainer = ({ selectedCategory }) => {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);

  const parseISODuration = (duration) => {
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    const hours = parseInt(match?.[1]) || 0;
    const minutes = parseInt(match?.[2]) || 0;
    const seconds = parseInt(match?.[3]) || 0;
    return hours * 3600 + minutes * 60 + seconds;
  };

  useEffect(() => {
    const getVideos = async () => {
      try {
        const query = selectedCategory === "All" ? "trending" : selectedCategory;
        const searchRes = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&maxResults=25&key=${GOOGLE_API_KEY}`
        );
        const searchData = await searchRes.json();

        const videoIds = searchData.items
          .map(item => item.id.videoId)
          .filter(Boolean)
          .join(',');

        if (!videoIds) {
          setError("No videos found.");
          return;
        }

        const videosRes = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&id=${videoIds}&key=${GOOGLE_API_KEY}`
        );
        const videosData = await videosRes.json();

        const filteredVideos = videosData.items.filter((video) => {
          const durationInSeconds = parseISODuration(video.contentDetails.duration);
          return durationInSeconds >= 70; // Exclude Shorts
        });

        setVideos(filteredVideos);
        setError(null);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to load videos.");
      }
    };

    getVideos();
  }, [selectedCategory]);

  if (error) return <div className="text-red-500 ml-44 mt-10">{error}</div>;
  if (!videos || videos.length === 0) return <Shimmer />;

  return (
    <div className="px-4 py-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4 overflow-x-auto no-scrollbar">
      {videos.map((video) => (
        <Link
          key={video.id}
          to={`/watch?v=${video.id}`}
          state={{ video }}
        >
          <VideoCard info={video} isMenuOpen={isMenuOpen} />
        </Link>
      ))}
    </div>
  );
};

export default VideoContainer;
