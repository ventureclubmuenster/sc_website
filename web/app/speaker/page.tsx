import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Speaker',
  description:
    'Unsere Speaker auf der Startup Contacts Münster: Gründer, Investoren und Innovatoren die Zukunft gestalten. 15. Juni 2026.',
  alternates: { canonical: 'https://www.startup-contacts.de/speaker' },
  openGraph: {
    title: 'Speaker | Startup Contacts',
    description: 'Gründer, Investoren und Innovatoren als Speaker auf der Startup Contacts Münster.',
    url: 'https://www.startup-contacts.de/speaker',
  },
}

const stageLabels: Record<string, string> = {
  'Main Stage': 'Main Stage',
  'Workshop Stage': 'Workshop',
  'Panel Stage': 'Ask me anything',
  'Podcast Stage': 'Live Podcast',
}

import Image from 'next/image'
import Link from 'next/link'
import { client } from '@/lib/sanity/client'
import { urlFor } from '@/lib/sanity/image'
import { speakersQuery, speakers2025Query } from '@/lib/sanity/queries'
import GoogleAdsConversion from '@/components/GoogleAdsConversion'

interface Speaker2025 {
  _id: string
  name: string
  title?: string
  stage?: string
  image?: object
  socialLinks?: {
    linkedin?: string
  }
}

interface Speaker2026 {
  _id: string
  name: string
  title?: string
  stage?: string
  image?: object
  socialLinks?: {
    linkedin?: string
    twitter?: string
  }
}

export default async function SpeakerPage() {
  const [speakers2026, speakers2025] = await Promise.all([
    client.fetch<Speaker2026[]>(speakersQuery),
    client.fetch<Speaker2025[]>(speakers2025Query),
  ])

  return (
    <main className="bg-background min-h-screen max-w-7xl mx-auto px-6 pb-16">
      <GoogleAdsConversion sendTo="AW-857927386/SPcmCOW--JMcENrdi5kD" />

      {/* ── Speaker 2026 ── */}
      <div className="py-16 text-center">
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight">
          <span className="gradient-text">SPEAKER </span>
          2026
        </h1>
        <p className="mt-4 text-white/60 text-base max-w-xl mx-auto">
          Diese Speaker sind dieses Jahr auf der Startup Contacts dabei!
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {speakers2026.map((speaker) => {
          const card = (
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl group">
              {speaker.image ? (
                <Image
                  src={urlFor(speaker.image).width(600).height(800).fit('crop').focalPoint(0.5, 0.2).url()}
                  alt={speaker.name}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="absolute inset-0 bg-card-grey" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                <p className="text-white font-bold text-lg md:text-xl leading-tight">
                  {speaker.name}
                </p>
                {speaker.title && (
                  <p className="text-white/70 text-sm mt-0.5 leading-snug">
                    {speaker.title}
                  </p>
                )}
                {speaker.stage && (
                  <p className="text-sc-orange text-sm font-medium mt-2">
                    {stageLabels[speaker.stage] ?? speaker.stage}
                  </p>
                )}
              </div>
              <div className="absolute inset-0 bg-sc-orange/0 group-hover:bg-sc-orange/10 transition-colors duration-300" />
            </div>
          )

          return speaker.socialLinks?.linkedin ? (
            <a
              key={speaker._id}
              href={speaker.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="block cursor-pointer"
              aria-label={`${speaker.name} auf LinkedIn`}
            >
              {card}
            </a>
          ) : (
            <div key={speaker._id}>{card}</div>
          )
        })}

        {/* "Coming soon" card */}
        <div className="relative aspect-[4/5] overflow-hidden rounded-xl liquid-glass flex items-center justify-center text-center p-6">
          <div>
            <svg className="w-8 h-8 text-sc-orange mx-auto mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" x2="12" y1="19" y2="22" /></svg>
            <p className="text-white font-bold text-lg leading-tight">
              Weitere Speaker werden bald bekannt gegeben
            </p>
            <p className="text-white/50 text-sm mt-2">Stay tuned!</p>
          </div>
        </div>
      </div>

      {/* ── Social Media CTA ── */}
      <section className="mt-16 mb-20 text-center">
        <p className="text-white/70 text-lg md:text-xl max-w-xl mx-auto mb-8">
          Folge uns auf Social Media, um keine Speaker Announcements zu verpassen
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="https://www.linkedin.com/company/ventureclubmuenster"
            target="_blank"
            rel="noopener noreferrer"
            className="liquid-glass rounded-full px-6 py-3 flex items-center gap-3 text-white hover:text-sc-orange transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
            LinkedIn
          </a>
          <a
            href="https://www.instagram.com/ventureclubmuenster/"
            target="_blank"
            rel="noopener noreferrer"
            className="liquid-glass rounded-full px-6 py-3 flex items-center gap-3 text-white hover:text-sc-orange transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" /></svg>
            Instagram
          </a>
          <Link
            href="/newsletter"
            className="gradient-bg rounded-full px-6 py-3 flex items-center gap-3 text-white font-semibold hover:opacity-90 transition-opacity"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" /></svg>
            Newsletter abonnieren
          </Link>
        </div>
      </section>

      {/* ── Trennlinie ── */}
      <div className="gradient-line h-px w-full mb-16" />

      {/* ── Speaker 2025 — Hall of Fame ── */}
      <div className="text-center mb-10">
        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight">
          <span className="gradient-text">SPEAKER </span>
          HALL OF FAME
        </h2>
        <p className="mt-4 text-white/60 text-base max-w-xl mx-auto">
          Hier findest du eine Übersicht aller unserer Speaker, die 2025 dabei waren!
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {speakers2025.map((speaker) => {
          const card = (
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl group">
              {speaker.image ? (
                <Image
                  src={urlFor(speaker.image).width(600).height(800).fit('crop').focalPoint(0.5, 0.2).url()}
                  alt={speaker.name}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="absolute inset-0 bg-card-grey" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                <p className="text-white font-bold text-lg md:text-xl leading-tight">
                  {speaker.name}
                </p>
                {speaker.title && (
                  <p className="text-white/70 text-sm mt-0.5 leading-snug">
                    {speaker.title}
                  </p>
                )}
                {speaker.stage && (
                  <p className="text-sc-orange text-sm font-medium mt-2">
                    {stageLabels[speaker.stage] ?? speaker.stage}
                  </p>
                )}
              </div>
              <div className="absolute inset-0 bg-sc-orange/0 group-hover:bg-sc-orange/10 transition-colors duration-300" />
            </div>
          )

          return speaker.socialLinks?.linkedin ? (
            <a
              key={speaker._id}
              href={speaker.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="block cursor-pointer"
              aria-label={`${speaker.name} auf LinkedIn`}
            >
              {card}
            </a>
          ) : (
            <div key={speaker._id}>{card}</div>
          )
        })}
      </div>

      {speakers2025.length === 0 && (
        <div className="text-center text-white/40 py-24 text-lg">
          Speaker werden bald bekannt gegeben.
        </div>
      )}
    </main>
  )
}
