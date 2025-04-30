import React, { useEffect, useRef, useState } from 'react'
import { GOOGLE_API_KEY } from '../utils/Constant'

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
        `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&videoDuration=short&maxResults=6&q=${QUERY}&key=${GOOGLE_API_KEY}`
      )
      const data = await searchRes.json()
      const videoIds = data.items.map((item) => item.id.videoId).join(',')

      const detailsRes = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,snippet&id=${videoIds}&key=${GOOGLE_API_KEY}`
      )
      const details = await detailsRes.json()

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

  // Observe scroll and control players
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
      className="w-full h-screen overflow-y-scroll snap-y snap-mandatory bg-black "
      onClick={() => setUserInteracted(true)}
      onScroll={() => setUserInteracted(true)}
    >
      {videos.map((video, index) => (
        <div
          key={index}
          data-index={index}
          ref={(el) => (containerRefs.current[index] = el)}
          className="h-screen w-full flex justify-center items-center snap-start bg-black "
        >
          <div className="w-96 h-[625px] bg-black rounded-2xl overflow-hidden shadow-lg relative -mt-24">
            <div
              id={`player-${index}`}
              className="w-full h-full absolute inset-0 z-0"
            ></div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Shorts
