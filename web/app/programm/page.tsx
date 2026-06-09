import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Programm',
  description:
    'Das komplette Programm der Startup Contacts 2026 in Münster: Main Stage, Live Podcasts und Workshops im Überblick. 15. Juni 2026.',
  alternates: { canonical: 'https://www.startup-contacts.de/programm' },
  openGraph: {
    title: 'Programm | Startup Contacts 2026 Münster',
    description:
      'Main Stage, Live Podcasts und Workshops im Überblick — der ganze Tag der Startup Contacts am 15. Juni 2026.',
    url: 'https://www.startup-contacts.de/programm',
  },
}

import { client } from '@/lib/sanity/client'
import { programmPageQuery, workshopsPageQuery } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/image'
import HeroSection from '@/components/HeroSection'
import Schedule, { WorkshopsList } from '@/components/Schedule'
import { mainStageSchedule, podcastSchedule, type Workshop } from '@/lib/schedule'

const fallbackWorkshops: Workshop[] = [
  { title: 'Prompt & LLM: Startup-Superpower leicht gemacht', speaker: 'Michael Ramich (Google AI Trainer)' },
  { title: 'Durch das richtige Netzwerk zum Pre-Seed-Erfolg', speaker: 'Johannes Weimer & Dr. Max Lülff' },
  { title: 'How to better Network', speaker: 'Paula Menninghaus & Jonas Heeke' },
  { title: 'Fail Forward: Resilienz als Erfolgsfaktor', speaker: 'Hannah Dombrowa & Anna Dahlhoff' },
]

interface ProgrammPageData {
  heroImage?: { asset: { _ref: string } }
}

async function getPageData() {
  const [programmPage, workshopsData] = await Promise.all([
    client.fetch<ProgrammPageData | null>(programmPageQuery, {}, { cache: 'no-store' }),
    client.fetch(workshopsPageQuery, {}, { cache: 'no-store' }),
  ])

  const ws2026: { title: string; speaker?: string }[] = workshopsData?.workshops2026 ?? []
  const workshops: Workshop[] = ws2026.length > 0
    ? ws2026.map((w) => ({ title: w.title, speaker: w.speaker }))
    : fallbackWorkshops

  return { programmPage, workshops }
}

export default async function ProgrammPage() {
  const { programmPage, workshops } = await getPageData()

  // Bild aus Sanity bevorzugen, sonst lokales Fallback-Bild aus /public/images
  const heroImageUrl = programmPage?.heroImage
    ? urlFor(programmPage.heroImage).width(1920).height(1080).url()
    : '/images/programm-hero.jpg'

  return (
    <>
      <HeroSection
        imageUrl={heroImageUrl}
        headline="DAS PROGRAMM"
        subtext="Main Stage, Live Podcasts und Workshops"
        subtextLarge
        highlight="15. Juni 2026 · Münster"
      />

      <Schedule
        slots={mainStageSchedule}
        eyebrow="Programm / Main Stage"
        title="MAIN"
        titleAccent="STAGE"
        subtitle="Keynotes, Paneltalks & Fireside Chats auf der großen Bühne."
        id="mainstage"
        cta={{ label: 'Mehr zur Main Stage', href: '/main-stage' }}
      />

      <Schedule
        slots={podcastSchedule}
        eyebrow="Programm / Live Podcasts"
        title="LIVE"
        titleAccent="PODCASTS"
        subtitle="Gründungsgeschichten hautnah — live aus dem Podcast-Studio."
        id="podcast"
        cta={{ label: 'Mehr zum Podcast', href: '/podcast' }}
      />

      <WorkshopsList
        workshops={workshops}
        eyebrow="Programm / Workshops"
        title="DEINE"
        titleAccent="WORKSHOPS"
        subtitle="Hands-on lernen mit Experten aus ganz Deutschland."
        id="workshops"
        cta={{ label: 'Alle Workshops ansehen', href: '/workshops' }}
      />
    </>
  )
}
