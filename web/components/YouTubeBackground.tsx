'use client'

import { useEffect, useRef, useCallback } from 'react'

interface YouTubeBackgroundProps {
  videoId: string
  /** Desktop mode: cover sizing + gradient overlays */
  cover?: boolean
}

export default function YouTubeBackground({ videoId, cover }: YouTubeBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<any>(null)

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
        },
        onStateChange(e: any) {
          // Loop reliably and keep it muted/playing if the browser pauses it.
          if (e.data === 0) {
            e.target.playVideo()
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

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Video iframe — pointer-events always disabled so no YouTube controls
          can ever be triggered; the video is purely decorative background. */}
      {cover ? (
        <div
          className="absolute pointer-events-none"
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 'max(100%, 177.78vh)',
            height: 'max(100%, 56.25vw)',
          }}
        >
          <div ref={containerRef} className="relative w-full h-full pointer-events-none" />
        </div>
      ) : (
        <div ref={containerRef} className="relative w-full h-full pointer-events-none" />
      )}

      {/* Gradient overlays (desktop cover mode only) */}
      {cover && (
        <>
          <div className="absolute inset-0 bg-black/35 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />
        </>
      )}
    </div>
  )
}
