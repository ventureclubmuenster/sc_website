'use client'

import Image from 'next/image'
import FadeIn from './FadeIn'

interface HeroSectionProps {
  imageUrl?: string
  headline: string
  subtext?: string
  highlight?: string
  children?: React.ReactNode
}

export default function HeroSection({ imageUrl, headline, subtext, highlight, children }: HeroSectionProps) {
  // Split headline: last word in orange, rest in white
  const words = headline.split(' ')
  const mainText = words.slice(0, -1).join(' ')
  const orangeWord = words[words.length - 1]

  return (
    <section className="relative h-[70vh] w-full overflow-hidden flex items-center justify-center -mt-20 pt-20">
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt="Hero"
          fill
          className="object-cover brightness-[0.6]"
          priority
        />
      ) : (
        <div className="absolute inset-0 bg-black" />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

      <div className="relative z-10 text-center px-6">
        <FadeIn direction="up" duration={0.8} distance={30}>
          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold uppercase"
            style={{ textShadow: '0 4px 20px rgba(0, 0, 0, 0.6)' }}
          >
            <span className="text-white">{mainText} </span>
            <span className="gradient-text">{orangeWord}</span>
          </h1>
        </FadeIn>

        {subtext && (
          <FadeIn direction="up" delay={0.2} duration={0.7} distance={20}>
            <p className="text-white/80 text-base md:text-xl mt-6 max-w-2xl mx-auto">
              {subtext}
            </p>
          </FadeIn>
        )}

        {highlight && (
          <FadeIn direction="up" delay={0.35} duration={0.7} distance={20}>
            <p className="gradient-text text-base md:text-xl font-bold mt-1">
              {highlight}
            </p>
          </FadeIn>
        )}

        {children && (
          <FadeIn direction="up" delay={0.5} duration={0.7} distance={20}>
            <div className="mt-8">
              {children}
            </div>
          </FadeIn>
        )}
      </div>
    </section>
  )
}
