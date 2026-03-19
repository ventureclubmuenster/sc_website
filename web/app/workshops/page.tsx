import { client } from '@/lib/sanity/client'
import { workshopsPageQuery } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/image'
import HeroSection from '@/components/HeroSection'
import WorkshopHighlights from './WorkshopHighlights'
import WorkshopPreview2026 from './WorkshopPreview2026'

const fallbackWorkshops = [
  {
    title: 'Prompt & LLM: Startup-Superpower leicht gemacht',
    speaker: 'Michael Ramich (Google AI Trainer)',
    description: 'Praktische Anwendung von Sprachmodellen im unternehmerischen Alltag.',
  },
  {
    title: 'Durch das richtige Netzwerk zum Pre-Seed-Erfolg',
    speaker: 'Johannes Weimer & Dr. Max Lülff',
    description: 'Strategischer Beziehungsaufbau für die frühe Phase der Unternehmensgründung.',
  },
  {
    title: 'How to better Network',
    speaker: 'Paula Menninghaus & Jonas Heeke',
    description: 'Systematischer Aufbau eines belastbaren beruflichen Netzwerks.',
  },
  {
    title: 'Fail Forward: Resilienz als Erfolgsfaktor',
    speaker: 'Hannah Dombrowa & Anna Dahlhoff',
    description: 'Methoden zum produktiven Umgang mit Rückschlägen im Studium und Beruf.',
  },
]

async function getWorkshopsPage() {
  return client.fetch(workshopsPageQuery, {}, { cache: 'no-store' })
}

export default async function WorkshopsPage() {
  const data = await getWorkshopsPage()

  const heroImageUrl = data?.heroImage
    ? urlFor(data.heroImage).width(1920).height(1080).url()
    : undefined

  const workshops = data?.workshopHistory?.length > 0
    ? data.workshopHistory
    : fallbackWorkshops

  return (
    <>
      <HeroSection
        imageUrl={heroImageUrl}
        headline="HIER LERNST DU SKILLS FÜR MORGEN."
        subtext="Lerne direkt von Experten aus ganz Deutschland, in Themen wie KI, Karriere, Management und vieles mehr."
      />

      <WorkshopHighlights workshops={workshops} />
      <WorkshopPreview2026 />
    </>
  )
}
