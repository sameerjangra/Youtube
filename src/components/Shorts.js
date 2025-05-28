import React, { useEffect, useRef, useState } from 'react'
import { GOOGLE_API_KEY } from '../utils/Constant'
import {
  AiFillLike,
  AiFillDislike,
} from 'react-icons/ai'
import { FaCommentDots, FaShare } from 'react-icons/fa6'
import { PiDotsThreeVerticalBold } from 'react-icons/pi'

const QUERY = 'shorts music'

const Shorts = () => {
  const [videos, setVideos] = useState([])
  const playerRefs = useRef([])
  const containerRefs = useRef([])
  const readyPlayers = useRef(new Set())
  const [apiReady, setApiReady] = useState(false)
  const [userInteracted, setUserInteracted] = useState(false)
  const lastActiveIndex = useRef(-1)

  // Load YouTube IFrame API
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script')
      tag.src = 'https://www.youtube.com/iframe_api'
      window.onYouTubeIframeAPIReady = () => setApiReady(true)
      document.body.appendChild(tag)
    } else {
      setApiReady(true)
    }
  }, [])

  // Fetch shorts
  useEffect(() => {
    const fetchShorts = async () => {
      const searchRes = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&videoDuration=short&repeat=1&maxResults=15&q=${QUERY}&key=${GOOGLE_API_KEY}`
      )
      const data = await searchRes.json()
      const videoIds = data.items.map((item) => item.id.videoId).join(',')

      const detailsRes = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,snippet&id=${videoIds}&key=${GOOGLE_API_KEY}`
      )
      const details = await detailsRes.json()
      console.log(details)

      const parseDuration = (iso) => {
        const match = iso.match(/PT(?:(\d+)M)?(?:(\d+)S)?/)
        const minutes = parseInt(match[1]) || 0
        const seconds = parseInt(match[2]) || 0
        return minutes * 60 + seconds
      }

      const filtered = details.items.filter(
        (video) => parseDuration(video.contentDetails.duration) <= 60
      )
      setVideos(filtered)
    }

    fetchShorts()
  }, [])

  // Create YouTube players
  useEffect(() => {
    if (!apiReady || videos.length === 0) return

    videos.forEach((video, index) => {
      playerRefs.current[index] = new window.YT.Player(`player-${index}`, {
        videoId: video.id,
        playerVars: {
          autoplay: 0,
          mute: 1,
          controls: 0,
          repeat: 1,
          modestbranding: 1,
          rel: 0,
          playsinline: 1,
        },
        events: {
          onReady: (event) => {
            playerRefs.current[index] = event.target
            readyPlayers.current.add(index)
          },
        },
      })
    })
  }, [apiReady, videos])

  // Handle scroll to control playback
  useEffect(() => {
    if (!videos.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.dataset.index)
          const player = playerRefs.current[index]

          if (!readyPlayers.current.has(index)) return

          if (entry.isIntersecting) {
            if (lastActiveIndex.current !== -1 && lastActiveIndex.current !== index) {
              const prevPlayer = playerRefs.current[lastActiveIndex.current]
              if (prevPlayer && typeof prevPlayer.pauseVideo === 'function') {
                prevPlayer.pauseVideo()
              }
            }

            if (player && typeof player.playVideo === 'function') {
              player.playVideo()
              if (userInteracted) player.unMute()
              lastActiveIndex.current = index
            }
          } else {
            if (player && typeof player.pauseVideo === 'function') {
              player.pauseVideo()
            }
          }
        })
      },
      { threshold: 0.75 }
    )

    containerRefs.current.forEach((el) => el && observer.observe(el))

    return () => {
      containerRefs.current.forEach((el) => el && observer.unobserve(el))
    }
  }, [videos, userInteracted])

  return (
    <div
    className="w-full h-screen overflow-y-scroll snap-y snap-mandatory bg-black no-scrollbar -mt-16  md:-mt-10"
    onClick={() => setUserInteracted(true)}
    onScroll={() => setUserInteracted(true)}
  >
    {videos.map((video, index) => (
      <div
        key={index}
        data-index={index}
        ref={(el) => (containerRefs.current[index] = el)}
        className="h-screen w-full flex justify-center items-center snap-start bg-black -mt-10"
      >
        <div className="w-[98%] sm:w-[75%] max-w-[530px] h-[70vh] sm:h-[625px] bg-black rounded-xl sm:rounded-2xl overflow-hidden shadow-lg relative">
          {/* YouTube Player */}
          <div id={`player-${index}`} className="w-full h-full absolute inset-0 z-0"></div>
  
          {/* Gradient Overlay */}
          <div className="absolute bottom-0 left-0 right-0 h-40 sm:h-52 bg-gradient-to-t from-black via-black/50 to-transparent z-10" />
  
          {/* Channel Info */}
          <div className="absolute bottom-10 sm:bottom-14 left-10 sm:left-28 z-20 text-white text-sm flex items-center gap-3">
            <img
              src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
              alt="channel"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-white"
            />
            <p className="font-semibold text-xs sm:text-sm">@{video.snippet.channelTitle}</p>
            <button className="ml-2 bg-white text-black font-semibold px-2 py-1 text-xs rounded-full hover:bg-gray-300 transition">
              Subscribe
            </button>
          </div>
  
          {/* Title */}
          <div className="absolute w-[90%] sm:w-96 bottom-0 sm:bottom-2 left-10 sm:left-28 z-20 text-white text-xs sm:text-sm pr-12 sm:pr-20">
            <p className="line-clamp-2">{video.snippet.title}</p>
          </div>
  
          {/* Action Buttons */}
          <div className="absolute bottom-20 sm:bottom-20 right-0 sm:right-5 gap-2 sm:gap-3 z-20 flex flex-col items-center space-y-2 text-white text-sm">
            <button className="hover:scale-110 transition bg-zinc-600 p-2 sm:px-4 sm:py-4 rounded-full"><AiFillLike size={20} /></button>
            <button className="hover:scale-110 transition bg-zinc-600 p-2 sm:px-4 sm:py-4 rounded-full"><AiFillDislike size={20} /></button>
            <button className="hover:scale-110 transition bg-zinc-600 p-2 sm:px-4 sm:py-4 rounded-full"><FaCommentDots size={18} /></button>
            <button className="hover:scale-110 transition bg-zinc-600 p-2 sm:px-4 sm:py-4 rounded-full"><FaShare size={18} /></button>
            <button className="hover:scale-110 transition bg-zinc-600 p-3 sm:px-4 sm:py-4 rounded-full"><PiDotsThreeVerticalBold size={18} /></button>
          </div>
        </div>  
      </div>
    ))}
  </div>
  
  )
}

export default Shorts
