'use client'

import Image from 'next/image'
import { urlFor } from '@/lib/sanity/image'
import type { AdSpeaker } from './sanity'

/**
 * Speaker-Grid der Ad Landing Page — eigenständige, add-only Variante der Hall of Fame,
 * aber OHNE den "Alle Speaker"-Link (kein Escape von der Landing Page) und mit
 * Inline-Speakern (Name/Rolle/Foto/LinkedIn) statt Sanity-Referenzen.
 */
export default function SpeakerGrid({ speakers }: { speakers: AdSpeaker[] }) {
  if (!speakers || speakers.length === 0) return null

  return (
    <div className="mt-12 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {speakers.map((speaker, i) => (
        <div
          key={speaker._key || i}
          className="group relative w-3/4 sm:w-full max-w-[440px] mx-auto aspect-square sm:aspect-[3/4] rounded-3xl overflow-hidden border border-white/10 hover:border-sc-orange/40 transition-colors duration-500"
        >
          {speaker.image ? (
            <Image
              src={urlFor(speaker.image).width(500).height(667).url()}
              alt={speaker.name || 'Speaker'}
              fill
              className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 bg-[#1c1c1c] flex items-center justify-center">
              <span className="text-white/15 text-7xl font-bold">
                {(speaker.name || '?').charAt(0)}
              </span>
            </div>
          )}

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-sc-orange/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Info */}
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 z-10">
            <h3 className="text-sm sm:text-xl font-bold uppercase tracking-wide group-hover:text-sc-orange transition-colors duration-300">
              {speaker.name}
            </h3>
            {speaker.role && <p className="mt-0.5 sm:mt-1 text-xs sm:text-sm text-white/50">{speaker.role}</p>}
            {speaker.linkedins && speaker.linkedins.length > 0 && (
              <div className="mt-2 sm:mt-3 flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-2">
                {speaker.linkedins
                  .filter((li) => li?.url)
                  .map((li, j) => (
                    <a
                      key={li._key || j}
                      href={li.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-white/45 hover:text-sc-orange transition-colors duration-300"
                      aria-label={li.name ? `${li.name} auf LinkedIn` : `${speaker.name} auf LinkedIn`}
                    >
                      {li.name && <span className="text-xs sm:text-sm font-medium">{li.name}</span>}
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                  ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
