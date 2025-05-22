import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { closeMenu } from '../utils/appSlice';
import { useSearchParams, useLocation, useNavigate } from 'react-router-dom';
import { GOOGLE_API_KEY, YOUTUBE_API, COMMENT_API } from '../utils/Constant';
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
    try {
      const response = await fetch(`${COMMENT_API}&videoId=${videoId}`);
      const data = await response.json();
      setComments(data.items || []);
    } catch (error) {
      console.error("Failed to fetch comments", error);
    }
  };

  const fetchVideoData = async () => {
    if (!videoId) return;
    try {
      const res = await fetch(
        `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${GOOGLE_API_KEY}`
      );
      const data = await res.json();
      if (data.items?.length > 0) {
        setVideoData(data.items[0]);
        fetchChannelData(data.items[0].snippet.channelId);
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
    try {
      const res = await fetch(
        `https://youtube.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelId}&key=${GOOGLE_API_KEY}`
      );
      const data = await res.json();
      if (data.items?.length > 0) setChannelData(data.items[0]);
    } catch (err) {
      console.error("Failed to fetch channel data", err);
    }
  };

  const fetchRelatedVideos = async () => {
    try {
      const res = await fetch(YOUTUBE_API);
      const data = await res.json();
      if (data.items) {
        const filtered = data.items.filter((item) => (item.id.videoId || item.id) !== videoId);
        setRelatedVideos(filtered);
      }
    } catch (err) {
      console.error("Failed to fetch related videos", err);
    }
  };

  if (loading) return <div className="text-white text-center mt-5">Loading...</div>;
  if (error) return <div className="text-red-500 text-center mt-5">{error}</div>;

  return (
    <div className="bg-customBlack text-white min-h-screen pb-20 px-3 sm:-px-0 max-w-[1380px] mx-auto">
      {/* Video Player */}
      <iframe
        className="w-full aspect-video rounded-lg mt-3"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        allowFullScreen
      ></iframe>

      {/* Responsive Layout */}
      <div className="lg:flex lg:gap-5 mt-5">
        {/* Left Content */}
        <div className="lg:w-[70%]">
          {/* Video Title */}
          <h2 className="mt-3 text-lg font-semibold">{videoData?.snippet?.title}</h2>

          {/* Channel & Actions */}
          <div className="flex justify-between items-center mt-4 flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <img
                src={channelData?.snippet?.thumbnails?.default?.url}
                className="w-10 h-10 rounded-full"
                alt="Channel"
              />
              <div>
                <p className="font-medium">{videoData?.snippet?.channelTitle}</p>
                <p className="text-gray-400 text-sm">
                  {formatViews(channelData?.statistics?.subscriberCount || 0)} subscribers
                </p>
              </div>
            </div>

            <div className="flex gap-2 overflow-x-auto scrollbar-hide text-sm text-white">
              <button onClick={handleLikeToggle} className="flex items-center px-3 py-1.5 bg-[#272727] rounded-full">
                {liked ? <BiSolidLike className="mr-1 text-blue-400" /> : <BiLike className="mr-1" />}
                {formatViews(videoData?.statistics?.likeCount || 0)}
                <span className="mx-2 text-gray-500">|</span>
                <BiDislike />
              </button>
              <button className="flex items-center px-3 py-1.5 bg-[#272727] rounded-full"><PiShareFatThin className="mr-1" />Share</button>
              <button className="flex items-center px-3 py-1.5 bg-[#272727] rounded-full"><PiScissorsLight className="mr-1" />Clip</button>
              <button className="flex items-center px-3 py-1.5 bg-[#272727] rounded-full"><GoBookmark className="mr-1" />Save</button>
            </div>
          </div>

          {/* Description */}
          <div
            onClick={() => setShowFullDescription(!showFullDescription)}
            className="mt-4 text-sm bg-[#1f1f1f] rounded-lg p-3 cursor-pointer"
          >
            <div className="flex text-gray-400 text-xs mb-2">
              <span>{formatViews(videoData?.statistics?.viewCount || 0)} views</span>
              <span className="ml-4">{formatTimeAgo(videoData?.snippet?.publishedAt)}</span>
            </div>
            <p className="text-gray-200 whitespace-pre-line leading-relaxed">
              {showFullDescription
                ? videoData?.snippet?.description
                : `${videoData?.snippet?.description?.slice(0, 150)}...`}
            </p>
            <p className="text-blue-400 mt-1">{showFullDescription ? "Show Less" : "Show More"}</p>
          </div>

           {/* Related Videos - Mobile View */}
           <div className="block lg:hidden mt-6">
            <h3 className="text-md font-semibold mb-3">Recommended</h3>
            <div className="flex flex-col gap-3">
              {relatedVideos.map((video) => {
                const id = video.id.videoId || video.id;
                const { thumbnails, title, channelTitle, publishedAt } = video.snippet;
                return (
                  <div
                    key={id}
                    className="flex gap-3 hover:bg-[#222] rounded-lg p-2 cursor-pointer"
                    onClick={() => navigate(`/watch?v=${id}`, { state: { video } })}
                  >
                    <img
                      src={thumbnails.medium.url}
                      alt={title}
                      className="w-36 h-20 rounded-md object-cover"
                    />
                    <div className="flex flex-col text-sm">
                      <p className="font-medium text-white leading-tight line-clamp-2">{title}</p>
                      <p className="text-gray-400 text-xs">{channelTitle}</p>
                      <p className="text-gray-500 text-xs">{formatTimeAgo(publishedAt)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Comments */}
          <div className="mt-6">
            <h3 className="text-md font-semibold mb-2">Comments</h3>
            {comments.length === 0 ? (
              <p className="text-gray-400 text-sm">No comments available.</p>
            ) : (
              comments.map((comment) => <Comment key={comment.id} comment={comment} />)
            )}
          </div>

         
        </div>

        {/* Related Videos - Desktop View */}
        <div className="hidden lg:block lg:w-[30%]">
          <h3 className="text-md font-semibold mb-3">Recommended</h3>
          <div className="flex flex-col gap-3">
            {relatedVideos.map((video) => {
              const id = video.id.videoId || video.id;
              const { thumbnails, title, channelTitle, publishedAt } = video.snippet;
              return (
                <div
                  key={id}
                  className="flex gap-3 hover:bg-[#222] rounded-lg p-2 cursor-pointer"
                  onClick={() => navigate(`/watch?v=${id}`, { state: { video } })}
                >
                  <img
                    src={thumbnails.medium.url}
                    alt={title}
                    className="w-36 h-20 rounded-md object-cover"
                  />
                  <div className="flex flex-col text-sm">
                    <p className="font-medium text-white leading-tight line-clamp-2">{title}</p>
                    <p className="text-gray-400 text-xs">{channelTitle}</p>
                    <p className="text-gray-500 text-xs">{formatTimeAgo(publishedAt)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchPage;
      