'use client'

import { useEffect, useRef } from 'react'
import YouTubeBackground from './YouTubeBackground'

interface HeroVideoProps {
  /** Self-hosted MP4 URL (from Sanity heroVideo). Preferred when available. */
  videoUrl?: string | null
  /** YouTube fallback used when no self-hosted video is uploaded. */
  youtubeId: string
  /** Desktop mode: cover sizing + gradient overlays for text legibility */
  cover?: boolean
}

// Seamless background video for the hero.
// A self-hosted muted <video> autoplays reliably on ALL devices (desktop + iOS/
// Android) with zero controls and zero branding. Falls back to YouTube only while
// no MP4 is uploaded to the Sanity "Hero Video" field.
export default function HeroVideo({ videoUrl, youtubeId, cover }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  // Defensive: guarantee muted (required for autoplay) and kick off playback.
  useEffect(() => {
    const el = videoRef.current
    if (!el) return
    el.muted = true
    const tryPlay = () => el.play().catch(() => {})
    tryPlay()
    el.addEventListener('canplay', tryPlay, { once: true })
    return () => el.removeEventListener('canplay', tryPlay)
  }, [videoUrl])

  if (!videoUrl) {
    return <YouTubeBackground videoId={youtubeId} cover={cover} />
  }

  return (
    <div className="absolute inset-0 overflow-hidden">
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        src={videoUrl}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        disablePictureInPicture
        controls={false}
        tabIndex={-1}
        aria-hidden="true"
      />

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
