import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Über uns',
  description:
    'Über Startup Contacts & Venture Club Münster e.V.: Unser Team, unsere Mission und unsere Vision für die Zukunft der Zusammenarbeit.',
  alternates: { canonical: 'https://www.startup-contacts.de/ueber-uns' },
  openGraph: {
    title: 'Über uns | Startup Contacts',
    description: 'Das Team hinter der Startup Contacts und dem Venture Club Münster e.V.',
    url: 'https://www.startup-contacts.de/ueber-uns',
  },
}

import { client } from '@/lib/sanity/client'
import { ueberUnsPageQuery, teamQuery } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/image'
import HeroSection from '@/components/HeroSection'
import StickyTimeline from './StickyTimeline'
import MissionGrid from './MissionGrid'
import TeamGrid from './TeamGrid'

async function getUeberUnsData() {
  return client.fetch(ueberUnsPageQuery, {}, { cache: 'no-store' })
}

async function getTeamData() {
  return client.fetch(teamQuery, {}, { cache: 'no-store' })
}

export default async function UeberUnsPage() {
  const [data, teamMembers] = await Promise.all([getUeberUnsData(), getTeamData()])

  const heroImageUrl = data?.heroImage
    ? urlFor(data.heroImage).width(1920).height(1080).url()
    : undefined

  return (
    <>
      <HeroSection
        imageUrl={heroImageUrl}
        headline="ÜBER UNS"
        subtext="Wir bieten das Fundament, auf dem Innovation wachsen kann!"
      />

      <MissionGrid cards={data?.missionCards ?? []} />

      <StickyTimeline entries={data?.timelineEntries ?? []} />

      <TeamGrid members={teamMembers ?? []} />
    </>
  )
}
