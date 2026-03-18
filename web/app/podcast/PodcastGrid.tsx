'use client'

import { useState } from 'react'

interface Episode {
  guestName: string
  title: string
  description: string
  youtubeId: string
}

function extractYouTubeId(input: string): string {
  if (!input) return ''
  // If it's already just an ID (no slashes or dots), return as-is
  if (/^[\w-]{11}$/.test(input)) return input
  // Try to extract from various YouTube URL formats
  const match = input.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|v\/)|youtu\.be\/)([\w-]{11})/
  )
  return match?.[1] || input
}

function YouTubeEmbed({ youtubeId: rawId, title }: { youtubeId: string; title: string }) {
  const youtubeId = extractYouTubeId(rawId)
  const [playing, setPlaying] = useState(false)

  if (playing) {
    return (
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 w-full h-full"
      />
    )
  }

  return (
    <button
      onClick={() => setPlaying(true)}
      className="absolute inset-0 w-full h-full group"
    >
      <img
        src={`https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`}
        alt={title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 bg-sc-orange/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9.5 4.5v15l10-7.5z" />
          </svg>
        </div>
      </div>
    </button>
  )
}

export default function PodcastGrid({ episodes }: { episodes: Episode[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {episodes.map((ep, i) => (
        <div
          key={i}
          className="bg-zinc-900 rounded-2xl overflow-hidden shadow-lg shadow-black/30 transition-transform duration-300 hover:-translate-y-1"
        >
          {/* YouTube Thumbnail / Embed */}
          <div className="relative w-full aspect-video">
            <YouTubeEmbed youtubeId={ep.youtubeId} title={ep.title} />
          </div>

          {/* Info */}
          <div className="p-5">
            <p className="text-sc-orange font-bold text-sm uppercase tracking-wider">
              {ep.guestName}
            </p>
            <h3 className="text-white font-extrabold text-lg mt-1">
              {ep.title}
            </h3>
            <p className="text-white/50 text-sm mt-2 leading-relaxed line-clamp-2">
              {ep.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
