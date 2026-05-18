'use client'

import Image from 'next/image'
import FadeIn from '@/components/FadeIn'
import BewerbungButton from './BewerbungButton'

interface CoCreationHeroProps {
  imageUrl?: string
  eyebrow?: string
  headline: string
  subline?: string
  body?: string
  note?: string
  bewerbungsUrl?: string
}

export default function CoCreationHero({
  imageUrl,
  eyebrow,
  headline,
  subline,
  body,
  note,
  bewerbungsUrl,
}: CoCreationHeroProps) {
  return (
    <section className="relative min-h-[95svh] md:min-h-[82vh] lg:min-h-[88vh] w-full overflow-hidden -mt-24 flex flex-col">
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt="Co-Creation Hero"
          fill
          className="object-cover object-center"
          priority
        />
      ) : (
        <div className="absolute inset-0 bg-black" />
      )}

      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.75) 40%, rgba(0,0,0,0.6) 100%)',
        }}
      />

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 pt-28 md:pt-36 pb-10 md:pb-16">
        <div className="max-w-5xl w-full">
          {eyebrow && (
            <FadeIn direction="up" duration={0.7} distance={20}>
              <p className="gradient-text font-bold uppercase tracking-[0.15em] text-[10px] sm:text-xs md:text-sm lg:text-base mb-4 md:mb-6">
                {eyebrow}
              </p>
            </FadeIn>
          )}

          <FadeIn direction="up" duration={0.8} distance={30}>
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-extrabold uppercase leading-[0.95]">
              <span
                className="gradient-text"
                style={{ filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.6))' }}
              >
                {headline}
              </span>
            </h1>
          </FadeIn>

          {subline && (
            <FadeIn direction="up" delay={0.15} duration={0.7} distance={20}>
              <p className="text-white/90 text-base md:text-xl lg:text-2xl mt-5 md:mt-7 font-semibold">
                {subline}
              </p>
            </FadeIn>
          )}

          {body && (
            <FadeIn direction="up" delay={0.25} duration={0.7} distance={20}>
              <p className="text-white/70 text-sm sm:text-base md:text-lg mt-4 md:mt-5 max-w-3xl mx-auto leading-relaxed">
                {body}
              </p>
            </FadeIn>
          )}

          <FadeIn direction="up" delay={0.35} duration={0.7} distance={20}>
            <div className="mt-8 md:mt-10 flex justify-center">
              <BewerbungButton href={bewerbungsUrl} />
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={0.4} duration={0.7} distance={15}>
            <p className="text-white/70 text-sm sm:text-base md:text-lg mt-8 md:mt-10 max-w-3xl mx-auto leading-relaxed">
              Begrenzte Plätze · Bewerbung bis 07.06. um 18 Uhr möglich
            </p>
          </FadeIn>

          {note && (
            <FadeIn direction="up" delay={0.45} duration={0.7} distance={15}>
              <p className="text-white/55 text-sm sm:text-base md:text-lg mt-5 md:mt-6 max-w-2xl mx-auto leading-relaxed whitespace-pre-line">
                {note}
              </p>
            </FadeIn>
          )}
        </div>
      </div>
    </section>
  )
}
