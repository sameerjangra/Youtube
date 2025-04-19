import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { closeMenu } from '../utils/appSlice';
import { useSearchParams, useLocation, useNavigate } from 'react-router-dom';
import { GOOGLE_API_KEY, YOUTUBE_API ,COMMENT_API} from '../utils/Constant';
import { formatViews, formatTimeAgo } from '../utils/formatHelpers';
import { BiLike, BiDislike, BiSolidLike } from "react-icons/bi";
import { PiShareFatThin, PiScissorsLight } from "react-icons/pi";
import { GoBookmark } from "react-icons/go";
import Comment from './Comment';

const WatchPage = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get('v');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [comments, setComments] = useState([]);
  const [liked, setLiked] = useState(false);
  const [videoData, setVideoData] = useState(location.state?.video || null);
  const [channelData, setChannelData] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [loading, setLoading] = useState(!videoData);
  const [error, setError] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    dispatch(closeMenu());
    if (!videoData) fetchVideoData();
    else fetchChannelData(videoData.snippet.channelId);
    fetchRelatedVideos();
    commentData();

  }, [dispatch, videoId]);

  const handleLikeToggle = () => {
    setLiked(prev => !prev);
  };

  const commentData = async () => {
    if (!videoId) return;
  
    const commentURL = `${COMMENT_API}&videoId=${videoId}`;
    try {
      const response = await fetch(commentURL);
      const data = await response.json();
      setComments(data.items || []);
    } catch (error) {
      console.error("Failed to fetch comments", error);
    }
  };
  
  const fetchVideoData = async () => {
    if (!videoId) {
      setError("Video ID not found");
      setLoading(false);
      return;
    }

    const videoURL = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${GOOGLE_API_KEY}`;
    try {
      const response = await fetch(videoURL);
      const data = await response.json();
      if (data.items && data.items.length > 0) {
        setVideoData(data.items[0]);
        fetchChannelData(data.items[0]?.snippet?.channelId);
        setError(null);
      } else {
        setError("Video not found");
      }
    } catch (err) {
      setError("Failed to fetch video data");
    }
    setLoading(false);
  };

  const fetchChannelData = async (channelId) => {
    if (!channelId) return;
    const channelURL = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelId}&key=${GOOGLE_API_KEY}`;
    try {
      const response = await fetch(channelURL);
      const data = await response.json();
      if (data.items && data.items.length > 0) {
        setChannelData(data.items[0]);
      }
    } catch (err) {
      console.error("Failed to fetch channel data", err);
    }
  };

  const fetchRelatedVideos = async () => {
    try {
      const res = await fetch(YOUTUBE_API);
      const json = await res.json();
      if (json.items) {
        const filtered = json.items.filter(
          (item) => (item.id.videoId || item.id) !== videoId
        );
        setRelatedVideos(filtered);
      }
    } catch (err) {
      console.error("Failed to fetch related videos", err);
    }
  };
  


  if (loading) return <div className="text-white text-center mt-5">Loading...</div>;
  if (error) return <div className="text-red-500 text-center mt-5">{error}</div>;
  return (
    <div className="bg-black w-full min-h-screen text-white px-6 py-4 grid grid-cols-10 gap-6 ">
      {/* Left Side - Video Player and Info */}
      <div className="col-span-7">
        <iframe
          className="w-full aspect-video rounded-xl"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>

        {/* Title */}
        <h2 className="mt-4 text-2xl font-semibold">{videoData?.snippet?.title}</h2>

        {/* Channel Info + Buttons */}
        <div className="mt-4 flex justify-between flex-wrap gap-4 items-start">
          {/* Channel */}
          <div className="flex items-center gap-4">
            <img
              className="w-12 h-12 rounded-full"
              src={channelData?.snippet?.thumbnails?.default?.url}
              alt="Channel Logo"
            />
            <div>
              <p className="font-semibold">{videoData?.snippet?.channelTitle}</p>
              <p className="text-gray-400 text-sm">
                {formatViews(channelData?.statistics?.subscriberCount || 0)} subscribers
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 text-sm text-gray-200 font-medium flex-wrap">
            {/* Like / Dislike */}
            <div
              onClick={handleLikeToggle}
              className="flex items-center bg-[#272727] rounded-full px-4 py-2 hover:bg-[#3f3f3f] transition cursor-pointer"
            >
              {liked ? (
                <BiSolidLike className="text-xl mr-2 text-blue-400" />
              ) : (
                <BiLike className="text-xl mr-2" />
              )}
              {formatViews(videoData?.statistics?.likeCount || 0)}
              <span className="px-3 text-gray-500">|</span>
              <BiDislike className="text-xl" />
            </div>

            {/* Share */}
            <div className="flex items-center bg-[#272727] rounded-full px-4 py-2 hover:bg-[#3f3f3f] transition cursor-pointer">
              <PiShareFatThin className="text-xl mr-2" />
              Share
            </div>

            {/* Clip */}
            <div className="flex items-center bg-[#272727] rounded-full px-4 py-2 hover:bg-[#3f3f3f] transition cursor-pointer">
              <PiScissorsLight className="text-xl mr-2" />
              Clip
            </div>

            {/* Save */}
            <div className="flex items-center bg-[#272727] rounded-full px-4 py-2 hover:bg-[#3f3f3f] transition cursor-pointer">
              <GoBookmark className="text-xl mr-2" />
              Save
            </div>

            {/* More */}
            <div className="flex items-center bg-[#272727] rounded-full px-4 py-2 hover:bg-[#3f3f3f] transition cursor-pointer">
              <span className="text-lg">...</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <div
          className="mt-5 bg-[#272727] rounded-lg px-4 py-3 cursor-pointer"
          onClick={() => setShowFullDescription(!showFullDescription)}
        >
          <div className="flex text-sm mb-1 text-gray-300 gap-2">
            <span>{formatViews(videoData?.statistics?.viewCount || 0)} views</span>
            <span>{formatTimeAgo(videoData?.snippet?.publishedAt)}</span>
          </div>
          <p className="text-sm text-gray-200 whitespace-pre-wrap leading-relaxed">
            {showFullDescription
              ? videoData?.snippet?.description
              : `${videoData?.snippet?.description?.slice(0, 140)}...`}
          </p>
          <p className="text-blue-400 text-xs mt-1">
            {showFullDescription ? 'Show Less' : 'Show More'}
          </p>
        </div>
         {/* Comment Section */}
<div className='p-2 mt-6 '>
  <h2 className="text-lg font-semibold mb-4">Comments</h2>
  {comments.length === 0 ? (
    <p className="text-gray-400">No comments available.</p>
  ) : (
    comments.map((comment) => <Comment key={comment.id} comment={comment} />)
  )}
</div>

      </div>
    

      {/* Right Side - Recommended Videos */}
      <div className="col-span-3 overflow-hidden">
        <h3 className="text-lg font-semibold mb-3">Recommended</h3>
        <div className="flex flex-col gap-3">
          {relatedVideos.map((video) => {
            const id = video.id.videoId || video.id;
            const { thumbnails, title, channelTitle, publishedAt } = video.snippet;
            return (
              <div
                key={id}
                className="flex gap-3 hover:bg-[#222] rounded-lg p-2 cursor-pointer transition"
                onClick={() => navigate(`/watch?v=${id}`, { state: { video } })}
              >
                <img
                  src={thumbnails.medium.url}
                  alt={title}
                  className="w-40 h-24 object-cover rounded-lg"
                />
               <div className="flex flex-col text-sm">
  <p className="text-white font-medium text-sm">
    {title.split(' ').slice(0, 7).join(' ')}
    {title.split(' ').length > 7 && '...'}
  </p>
  <p className="text-gray-400 text-xs">{channelTitle}</p>
  <p className="text-gray-500 text-xs">{formatTimeAgo(publishedAt)}</p>
</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WatchPage;