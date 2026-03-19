'use client'

import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/lib/sanity/image'
import GlowButton from './GlowButton'
import FadeIn, { StaggerContainer, StaggerItem } from './FadeIn'

interface Speaker {
  _id: string
  name: string
  title?: string
  image?: unknown
  slug?: { current: string }
  socialLinks?: { linkedin?: string; twitter?: string }
}

interface HallOfFameProps {
  speakers: Speaker[]
}

export default function HallOfFame({ speakers }: HallOfFameProps) {
  if (!speakers || speakers.length === 0) return null

  return (
    <section className="relative py-40 px-6 bg-black overflow-hidden">
      {/* Repeating "Startup Contacts" watermark — continues from previous section */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <span
            key={i}
            className="block text-[6rem] md:text-[10rem] font-bold uppercase text-white/[0.04] tracking-tighter whitespace-nowrap leading-none"
            style={{ transform: `translateX(${i % 2 === 0 ? '-5%' : '-15%'})` }}
          >
            STARTUP CONTACTS &nbsp; STARTUP CONTACTS &nbsp; STARTUP CONTACTS
          </span>
        ))}
      </div>

      <div className="relative z-10">
        <FadeIn direction="up" duration={0.7}>
          <h2 className="text-4xl md:text-6xl font-bold text-center uppercase tracking-tight">
            Unsere <span className="gradient-text">Hall of Fame</span>
          </h2>
        </FadeIn>

        <StaggerContainer stagger={0.12} className="mt-14 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {speakers.map((speaker) => (
            <StaggerItem
              key={speaker._id}
              direction="up"
              distance={50}
              className="group relative aspect-square sm:aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 hover:border-sc-orange/30 transition-colors duration-500"
            >
              {/* Image fills entire card */}
              {speaker.image ? (
                <Image
                  src={urlFor(speaker.image).width(500).height(667).url()}
                  alt={speaker.name}
                  fill
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="absolute inset-0 bg-card-grey flex items-center justify-center">
                  <span className="text-white/20 text-6xl font-bold">
                    {speaker.name.charAt(0)}
                  </span>
                </div>
              )}
              {/* Gradient overlay — covers full card */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              {/* Hover glow */}
              <div className="absolute inset-0 bg-gradient-to-t from-sc-orange/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Info — overlaid at bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                <h3 className="text-xl font-bold uppercase tracking-wide group-hover:text-sc-orange transition-colors duration-300">
                  {speaker.name}
                </h3>
                {speaker.title && (
                  <p className="mt-1 text-sm text-white/50">{speaker.title}</p>
                )}
                {speaker.socialLinks?.linkedin && (
                  <a
                    href={speaker.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-3 text-white/40 hover:text-sc-orange transition-colors duration-300"
                    aria-label={`${speaker.name} auf LinkedIn`}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                )}
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* CTA Button */}
        <FadeIn direction="up" delay={0.3}>
          <div className="mt-14 flex justify-center">
            <GlowButton href="/speaker">Alle Speaker</GlowButton>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
