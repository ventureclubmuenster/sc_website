'use client'

import Image from 'next/image'
import { useState } from 'react'

interface TabData {
  image?: string
  text1: string
  text2: string
  cta: string
  heading: string
  headingHighlight: string
  buttonText: string
  buttonLink: string
}

interface InfoTabsProps {
  aussteller: TabData
  besucher: TabData
}

export default function InfoTabs({ aussteller, besucher }: InfoTabsProps) {
  const [activeTab, setActiveTab] = useState<'aussteller' | 'besucher'>('aussteller')

  const tab = activeTab === 'aussteller' ? aussteller : besucher

  const imageBlock = (
    <div className="relative aspect-[4/5] rounded-xl overflow-hidden">
      {tab.image ? (
        <Image
          src={tab.image}
          alt={tab.heading + ' ' + tab.headingHighlight}
          fill
          className="object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-white/5" />
      )}
    </div>
  )

  const textBlock = (
    <div className="flex flex-col justify-center">
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold uppercase mb-10">
        <span className="text-white">{tab.heading} </span>
        <span className="text-sc-orange">{tab.headingHighlight}</span>
      </h2>

      {tab.text1 && (
        <p className="text-white/80 text-sm md:text-base leading-relaxed mb-8 whitespace-pre-line">
          {tab.text1}
        </p>
      )}

      {tab.text2 && (
        <p className="text-white/80 text-sm md:text-base leading-relaxed mb-10">
          {tab.text2}
        </p>
      )}

      {tab.cta && (
        <p className="text-white font-bold text-sm md:text-base mb-8">
          {tab.cta}
        </p>
      )}

      <a
        href={tab.buttonLink}
        className="inline-flex items-center justify-center gap-2 border border-white/30 text-white text-sm px-8 py-3 rounded-full hover:bg-white/10 transition-colors w-fit"
      >
        {tab.buttonText} &rarr;
      </a>
    </div>
  )

  return (
    <section className="bg-black px-6 py-20">
      <div className="max-w-7xl mx-auto">
        {/* Tab Navigation */}
        <div className="flex justify-center gap-40 md:gap-64 mb-16 border-b border-white/10 pb-4">
          <button
            onClick={() => setActiveTab('besucher')}
            className={`text-lg md:text-xl font-bold transition-colors ${
              activeTab === 'besucher'
                ? 'text-sc-orange'
                : 'text-white/50 hover:text-white/80'
            }`}
          >
            Für Besucher
          </button>
          <button
            onClick={() => setActiveTab('aussteller')}
            className={`text-lg md:text-xl font-bold transition-colors ${
              activeTab === 'aussteller'
                ? 'text-sc-orange'
                : 'text-white/50 hover:text-white/80'
            }`}
          >
            Für Aussteller
          </button>
        </div>

        {/* Content - mirrored layout per tab */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {activeTab === 'aussteller' ? (
            <>
              {imageBlock}
              {textBlock}
            </>
          ) : (
            <>
              {textBlock}
              {imageBlock}
            </>
          )}
        </div>
      </div>
    </section>
  )
}
