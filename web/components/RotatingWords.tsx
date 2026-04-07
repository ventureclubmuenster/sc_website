'use client'

import { useState, useEffect, useCallback } from 'react'

const words = [
  'Afterparty.',
  'Startups.',
  'Co-Creation.',
  'Workshops.',
  'Mainstage.',
  'Podcast.',
  'Catering.',
  'Partner.',
]

type Phase = 'visible' | 'exit' | 'waiting' | 'enter'

export default function RotatingWords() {
  const [index, setIndex] = useState(0)
  const [phase, setPhase] = useState<Phase>('visible')

  const cycle = useCallback(() => {
    // 1. slide current word up & out
    setPhase('exit')

    setTimeout(() => {
      // 2. advance word, position below (invisible)
      setIndex((prev) => (prev + 1) % words.length)
      setPhase('waiting')

      // 3. next frame: slide new word up into view
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setPhase('enter')

          // 4. settle
          setTimeout(() => setPhase('visible'), 50)
        })
      })
    }, 350)
  }, [])

  useEffect(() => {
    const id = setInterval(cycle, 2400)
    return () => clearInterval(id)
  }, [cycle])

  const wordStyle = (): string => {
    switch (phase) {
      case 'visible':
        return 'translate-y-0 opacity-100 transition-all duration-300 ease-out'
      case 'exit':
        return '-translate-y-[110%] opacity-0 transition-all duration-300 ease-in'
      case 'waiting':
        return 'translate-y-[110%] opacity-0'
      case 'enter':
        return 'translate-y-0 opacity-100 transition-all duration-300 ease-out'
    }
  }

  return (
    <section className="py-40 md:py-56 px-6 bg-black">
      <div className="max-w-6xl mx-auto flex items-center justify-center">
        <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tight text-center">
          <span className="text-white block">Freu dich auf</span>
          <span className="relative inline-flex overflow-hidden h-[1.15em] items-center justify-center w-full">
            <span className={`gradient-text inline-block ${wordStyle()}`}>
              {words[index]}
            </span>
          </span>
        </h2>
      </div>
    </section>
  )
}
