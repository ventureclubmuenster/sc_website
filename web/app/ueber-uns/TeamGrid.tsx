'use client'

import Image from 'next/image'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { urlFor } from '@/lib/sanity/image'
import FadeIn from '@/components/FadeIn'

interface TeamMember {
  _id: string
  name: string
  role?: string
  image?: unknown
  linkedin?: string
  year?: string
}

interface TeamGridProps {
  members: TeamMember[]
}

const YEARS = ['2026', '2025', '2024', '2023']

export default function TeamGrid({ members }: TeamGridProps) {
  const [activeYear, setActiveYear] = useState('2026')

  const filtered = members.filter((m) => m.year === activeYear)

  return (
    <section className="relative py-20 px-6 bg-black overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <FadeIn direction="up" duration={0.7}>
          <h2 className="text-4xl md:text-6xl font-bold text-center uppercase tracking-tight">
            Das <span className="gradient-text">Team</span>
          </h2>
        </FadeIn>

        {/* Year tabs */}
        <div className="flex justify-center gap-6 md:gap-10 mt-10">
          {YEARS.map((year) => (
            <button
              key={year}
              onClick={() => setActiveYear(year)}
              className={`text-lg md:text-xl font-semibold transition-all duration-300 pb-1 border-b-2 ${
                activeYear === year
                  ? 'text-sc-orange border-sc-orange'
                  : 'text-white/40 border-transparent hover:text-white/70'
              }`}
            >
              {year}
            </button>
          ))}
        </div>

        {/* 2x3 Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeYear}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-6"
          >
            {filtered.length > 0 ? (
              filtered.map((member) => (
                <a
                  key={member._id}
                  href={member.linkedin || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                >
                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-[#18181b] transition-transform duration-500 group-hover:scale-[1.03]">
                    {member.image ? (
                      <Image
                        src={urlFor(member.image).width(500).height(660).auto('format').url()}
                        alt={member.name}
                        fill
                        sizes="(max-width: 768px) 50vw, 33vw"
                        className="object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-[#18181b] border border-white/10 rounded-2xl" />
                    )}
                  </div>
                  <div className="mt-3">
                    <p className="text-white font-semibold text-sm md:text-base">{member.name}</p>
                    {member.role && (
                      <p className="text-white/50 text-xs md:text-sm">{member.role}</p>
                    )}
                  </div>
                </a>
              ))
            ) : (
              <p className="col-span-full text-center text-white/40 py-12">
                Noch keine Teammitglieder für {activeYear} hinterlegt.
              </p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
