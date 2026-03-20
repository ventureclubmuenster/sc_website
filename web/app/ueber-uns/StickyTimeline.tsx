'use client'

import Image from 'next/image'
import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { urlFor } from '@/lib/sanity/image'

interface TimelineEntry {
  year: string
  image?: unknown
  imagePosition?: 'left' | 'right'
  textBlocks?: string[]
}

interface StickyTimelineProps {
  entries: TimelineEntry[]
}

const fallbackEntries: TimelineEntry[] = [
  {
    year: '2023',
    imagePosition: 'left',
    textBlocks: [
      '21. Juni 2023: das Gründungsdatum der Startup Contacts. Von Beginn an war klar: Die Startup Contacts ist weitaus mehr als nur eine Messe. Sie ist ein Ort, an dem Gleichgesinnte zusammenkommen, vereint durch die Leidenschaft für Startups und Innovation.',
      'Die Startup Contacts ist der richtige Ort für alle, die eine Vision haben. Für diejenigen, die mutig genug sind, den Status quo herauszufordern und neu zu denken.',
      'Was als studentische Initiative begann, entwickelte sich rasant zur größten von Studierenden organisierten Startup- und Innovationsmesse in NRW.',
    ],
  },
  {
    year: '2024',
    imagePosition: 'right',
    textBlocks: [
      'Nach dem erfolgreichen Debüt im vorigen Jahr ging die Startup Contacts 2024 in die zweite Runde und übertraf alle unsere Erwartungen.',
      'Am 16. Juni 2024 verwandelte sich das Gelände vor dem Schloss in Münster erneut zum Treffpunkt der Gründerszene.',
      'Über 600 Besucher und 50 Startups durften wir 2024 auf unserer Messe begrüßen. Egal ob Studierende, Gründer:in oder einfach nur interessiert an der Startup-Welt, für jeden war etwas dabei.',
      'Neben den zahlreichen Startup-Ständen boten unsere Speaker inspirierende Talks, Workshops und Panel-Diskussionen an, um unseren Besucher:innen spannende Einblicke in die aktuellen Trends der Startup-Szene zu geben.',
      'Nach einem erfolgreichen und inspirierenden Tag ist die Startup Contacts schließlich die größte von Studierenden organisierte Startup- und Innovationsmesse in NRW geworden.',
    ],
  },
  {
    year: '2025',
    imagePosition: 'left',
    textBlocks: [
      'In diesem Jahr findet die Startup Contacts am 23.06.2025 in der Halle Münsterland statt. Auch diesmal öffnen wir wieder die Türen für alle, die sich für die Innovation, Startups und Entrepreneurship begeistern.',
      'Als studentische Initiative setzen wir dieses Jahr erneut besonders Studierende in den Mittelpunkt der Messe. Wir sind davon überzeugt, dass Innovation genau dort entsteht, wo die Kreativität junger Köpfe auf die Erfahrung von Leuten aus der Praxis trifft.',
      'Dabei ist es ganz egal, ob man schon erste Erfahrungen gesammelt hat oder einfach neugierig ist. Wir wollen die Startup-Welt für alle zugänglich machen.',
    ],
  },
]

/** Animated scroll-progress spine that runs down the center */
function TimelineSpine() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start center', 'end center'],
  })

  return (
    <div ref={ref} className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-8 hidden md:block pointer-events-none">
      {/* Background track */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-white/10" />

      {/* Animated fill */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 top-0 w-[2px] origin-top bg-sc-orange"
        style={{
          scaleY: scrollYProgress,
          height: '100%',
        }}
      />

      {/* Glow overlay on the fill */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 top-0 w-[6px] origin-top bg-sc-orange/40 blur-[4px]"
        style={{
          scaleY: scrollYProgress,
          height: '100%',
        }}
      />
    </div>
  )
}

/** Mobile spine with scroll progress */
function MobileSpine() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start center', 'end center'],
  })

  return (
    <div ref={ref} className="md:hidden absolute left-1/2 top-0 bottom-0 -translate-x-1/2 pointer-events-none">
      <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-white/10" />
      <motion.div
        className="absolute left-0 top-0 w-[2px] origin-top bg-sc-orange"
        style={{ scaleY: scrollYProgress, height: '100%' }}
      />
      <motion.div
        className="absolute left-[-2px] top-0 w-[6px] origin-top bg-sc-orange/40 blur-[4px]"
        style={{ scaleY: scrollYProgress, height: '100%' }}
      />
    </div>
  )
}

/** Year dot that lights up when scrolled into view */
function YearDot({ active }: { active: boolean }) {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
      <div
        className={`w-4 h-4 rounded-full transition-all duration-500 ${
          active
            ? 'bg-sc-orange shadow-[0_0_16px_rgba(255,94,0,0.7)]'
            : 'bg-white/20'
        }`}
      />
    </div>
  )
}

function TimelineBlock({ entry }: { entry: TimelineEntry }) {
  const isImageLeft = entry.imagePosition === 'left'
  const dotRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const el = dotRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setActive(true)
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const imageElement = (
    <div className="md:sticky md:top-32 w-full">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.7 }}
        className={`relative aspect-[3/4] rounded-2xl overflow-hidden transition-shadow duration-700 ${
          active
            ? 'shadow-[0_0_30px_rgba(255,94,0,0.5),0_0_60px_rgba(255,94,0,0.25)]'
            : ''
        }`}
      >
        {entry.image ? (
          <Image
            src={urlFor(entry.image).width(700).height(930).auto('format').url()}
            alt={`Startup Contacts ${entry.year}`}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-[#18181b] border border-white/10 rounded-2xl" />
        )}
      </motion.div>
    </div>
  )

  const textElement = (
    <div className="w-full space-y-6 md:space-y-16">
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
        className="text-6xl md:text-8xl font-bold text-white"
      >
        {entry.year}
      </motion.h3>

      {entry.textBlocks?.map((text, i) => (
        <motion.p
          key={i}
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-white/70 text-base md:text-lg leading-relaxed"
        >
          {text}
        </motion.p>
      ))}
    </div>
  )

  return (
    <div className="relative">
      {/* Mobile: stacked */}
      <div className="md:hidden space-y-8 py-12 px-2">
        {imageElement}
        {textElement}
      </div>

      {/* Desktop: 3-column with center spine area */}
      <div className="hidden md:grid md:grid-cols-[1fr_2rem_1fr] gap-0 py-16">
        {/* Left column */}
        <div className="pr-12">
          {isImageLeft ? imageElement : textElement}
        </div>

        {/* Center dot (spine is rendered globally) */}
        <div ref={dotRef} className="relative">
          <YearDot active={active} />
        </div>

        {/* Right column */}
        <div className="pl-12">
          {isImageLeft ? textElement : imageElement}
        </div>
      </div>
    </div>
  )
}

export default function StickyTimeline({ entries }: StickyTimelineProps) {
  const items = entries.length > 0 ? entries : fallbackEntries

  return (
    <section className="relative py-20 px-6 bg-black overflow-hidden">
      <div className="relative max-w-6xl mx-auto">
        {/* Section headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-6xl font-bold text-center uppercase tracking-tight mb-8"
        >
          Die <span className="gradient-text">Startup Contacts</span>
        </motion.h2>

        {/* Timeline content wrapper — spine is positioned relative to this */}
        <div className="relative">
          {/* Single continuous spine for desktop */}
          <TimelineSpine />
          {/* Single continuous spine for mobile */}
          <MobileSpine />

          {items.map((entry, i) => (
            <TimelineBlock key={entry.year} entry={entry} />
          ))}
        </div>
      </div>
    </section>
  )
}
