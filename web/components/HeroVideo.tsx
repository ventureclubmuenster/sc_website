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
  // iOS Safari only autoplays when the `muted` ATTRIBUTE is present in the DOM —
  // React sets the muted *property* but omits the attribute, which makes iOS show
  // a play button instead of autoplaying. We set it imperatively and retry play
  // across several readiness events to be bulletproof on mobile.
  useEffect(() => {
    const el = videoRef.current
    if (!el) return
    el.muted = true
    el.defaultMuted = true
    el.setAttribute('muted', '')
    el.playsInline = true
    el.setAttribute('playsinline', '')
    el.setAttribute('webkit-playsinline', '')

    // Endlosschleife erzwingen — `loop` allein ist auf iOS nicht immer zuverlaessig,
    // deshalb starten wir das Video bei `ended` zusaetzlich manuell neu.
    el.loop = true
    el.setAttribute('loop', '')
    const restart = () => {
      el.currentTime = 0
      el.play().catch(() => {})
    }
    el.addEventListener('ended', restart)

    const tryPlay = () => el.play().catch(() => {})
    tryPlay()
    const events = ['loadeddata', 'canplay', 'canplaythrough'] as const
    events.forEach((ev) => el.addEventListener(ev, tryPlay))
    return () => {
      el.removeEventListener('ended', restart)
      events.forEach((ev) => el.removeEventListener(ev, tryPlay))
    }
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
