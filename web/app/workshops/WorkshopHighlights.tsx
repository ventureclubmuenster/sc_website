'use client'

import Image from 'next/image'
import FadeIn, { StaggerContainer, StaggerItem } from '@/components/FadeIn'
import { urlFor } from '@/lib/sanity/image'

interface Workshop {
  title: string
  speaker: string
  description: string
  logo?: unknown
}

interface WorkshopHighlightsProps {
  workshops: Workshop[]
}

export default function WorkshopHighlights({ workshops }: WorkshopHighlightsProps) {
  return (
    <section className="relative py-32 px-6 bg-black overflow-hidden">
      {/* Watermark */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <span
            key={i}
            className="block text-[6rem] md:text-[10rem] font-bold uppercase text-white/[0.04] tracking-tighter whitespace-nowrap leading-none"
            style={{ transform: `translateX(${i % 2 === 0 ? '-5%' : '-15%'})` }}
          >
            STARTUP CONTACTS &nbsp; STARTUP CONTACTS &nbsp; STARTUP CONTACTS
          </span>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <FadeIn direction="up" duration={0.7}>
          <h2 className="text-4xl md:text-6xl font-bold text-center uppercase tracking-tight">
            Highlights aus <span className="text-sc-orange">2025</span>
          </h2>
        </FadeIn>

        <StaggerContainer stagger={0.12} className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6">
          {workshops.map((ws) => (
            <StaggerItem key={ws.title} direction="up" distance={40}>
              <div className="group relative bg-[#18181b] border border-white/10 rounded-2xl overflow-hidden p-8 hover:border-sc-orange/30 transition-colors duration-500 h-full flex flex-col">
                {/* Subtle glow */}
                <div className="absolute -top-16 -right-16 w-40 h-40 bg-sc-orange/5 rounded-full blur-3xl group-hover:bg-sc-orange/15 transition-all duration-500" />

                {/* Logo */}
                {ws.logo && (
                  <div className="mb-6 flex items-center">
                    <div className="bg-white/10 rounded-xl px-4 py-2 inline-flex items-center">
                      <Image
                        src={urlFor(ws.logo).height(80).fit('max').url()}
                        alt={`${ws.title} Logo`}
                        width={120}
                        height={40}
                        className="h-10 w-auto object-contain"
                      />
                    </div>
                  </div>
                )}

                {/* Title */}
                <h3 className="text-lg font-bold uppercase tracking-wide group-hover:text-sc-orange transition-colors duration-300 relative z-10">
                  {ws.title}
                </h3>

                {/* Speaker */}
                <p className="mt-2 text-sm font-semibold text-sc-orange/80">
                  {ws.speaker}
                </p>

                {/* Description */}
                <p className="mt-3 text-sm text-white/50 leading-relaxed relative z-10">
                  {ws.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
