'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

interface YouTubeBackgroundProps {
  videoId: string
  /** Desktop mode: cover sizing + gradient overlays */
  cover?: boolean
}

export default function YouTubeBackground({ videoId, cover }: YouTubeBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<any>(null)
  const [showPlay, setShowPlay] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  const createPlayer = useCallback(() => {
    if (!containerRef.current || playerRef.current) return

    const target = document.createElement('div')
    containerRef.current.appendChild(target)

    playerRef.current = new (window as any).YT.Player(target, {
      videoId,
      playerVars: {
        autoplay: 1,
        mute: 1,
        loop: 1,
        controls: 0,
        showinfo: 0,
        rel: 0,
        iv_load_policy: 3,
        modestbranding: 1,
        playlist: videoId,
        playsinline: 1,
      },
      events: {
        onReady(e: any) {
          const iframe = e.target.getIframe()
          iframe.style.position = 'absolute'
          iframe.style.inset = '0'
          iframe.style.width = '100%'
          iframe.style.height = '100%'
          iframe.style.border = 'none'

          e.target.mute()
          e.target.playVideo()

          // Check after 2s whether autoplay actually worked
          setTimeout(() => {
            try {
              if (e.target.getPlayerState() !== 1) setShowPlay(true)
            } catch {
              setShowPlay(true)
            }
          }, 2000)
        },
        onStateChange(e: any) {
          if (e.data === 1) {
            setIsPlaying(true)
            setShowPlay(false)
          }
        },
      },
    })
  }, [videoId])

  useEffect(() => {
    const w = window as any
    if (w.YT?.Player) {
      createPlayer()
    } else {
      const prev = w.onYouTubeIframeAPIReady
      w.onYouTubeIframeAPIReady = () => {
        prev?.()
        createPlayer()
      }
      if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
        const s = document.createElement('script')
        s.src = 'https://www.youtube.com/iframe_api'
        document.head.appendChild(s)
      }
    }
    return () => {
      playerRef.current?.destroy?.()
      playerRef.current = null
    }
  }, [createPlayer])

  const handlePlay = () => {
    playerRef.current?.mute()
    playerRef.current?.playVideo()
  }

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Video iframe — pointer-events disabled once playing */}
      {cover ? (
        <div
          className="absolute"
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 'max(100%, 177.78vh)',
            height: 'max(100%, 56.25vw)',
          }}
        >
          <div
            ref={containerRef}
            className={`relative w-full h-full ${isPlaying ? 'pointer-events-none' : ''}`}
          />
        </div>
      ) : (
        <div
          ref={containerRef}
          className={`relative w-full h-full ${isPlaying ? 'pointer-events-none' : ''}`}
        />
      )}

      {/* Gradient overlays (desktop cover mode only) */}
      {cover && (
        <>
          <div className="absolute inset-0 bg-black/35 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />
        </>
      )}

      {/* Play button — centered on video, visible only when autoplay failed */}
      {showPlay && (
        <button
          onClick={handlePlay}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/30 active:bg-sc-orange/50 transition-colors duration-200"
          aria-label="Video abspielen"
        >
          <svg
            className="w-8 h-8 md:w-10 md:h-10 text-white ml-1"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>
      )}
    </div>
  )
}
