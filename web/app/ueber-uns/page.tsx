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
