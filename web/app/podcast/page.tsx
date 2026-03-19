import { client } from '@/lib/sanity/client'
import { podcastPageQuery } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/image'
import HeroSection from '@/components/HeroSection'
import WartelisteButton from '@/components/WartelisteButton'
import PodcastGrid from './PodcastGrid'

interface PodcastEpisode {
  guestName: string
  title: string
  description: string
  youtubeId: string
}

interface PodcastPageData {
  heroImage?: { asset: { _ref: string } }
  quote?: string
  quoteAuthor?: string
  podcastEpisodes?: PodcastEpisode[]
  studioImage?: { asset: { _ref: string } }
}

async function getPageData(): Promise<PodcastPageData | null> {
  return client.fetch(podcastPageQuery, {}, { cache: 'no-store' })
}

const defaultEpisodes: PodcastEpisode[] = [
  {
    guestName: 'Max Mustermann',
    title: 'Von der Idee zum Unicorn',
    description: 'Wie aus einer Skizze auf dem Bierdeckel ein erfolgreiches Startup wurde.',
    youtubeId: 'dQw4w9WgXcQ',
  },
  {
    guestName: 'Lisa Beispiel',
    title: 'Scheitern als Sprungbrett',
    description: 'Warum ihr erstes Startup scheiterte und warum das das Beste war, was passieren konnte.',
    youtubeId: 'dQw4w9WgXcQ',
  },
]

export default async function PodcastPage() {
  const data = await getPageData()

  const quote = data?.quote || 'Gründen ist kein Sprint, es ist ein Marathon mit Hindernissen, aber die Aussicht ist es wert.'
  const quoteAuthor = data?.quoteAuthor || ''
  const episodes = data?.podcastEpisodes?.length ? data.podcastEpisodes : defaultEpisodes

  const heroImageUrl = data?.heroImage
    ? urlFor(data.heroImage).width(1920).height(1080).url()
    : undefined

  const studioImageUrl = data?.studioImage
    ? urlFor(data.studioImage).width(1200).height(800).url()
    : undefined

  return (
    <>
      <HeroSection
        imageUrl={heroImageUrl}
        headline="STARTUP VOICES"
        subtext="Spannende Gründungsgeschichten und Persönlichkeiten hautnah erleben."
        highlight="Live aus unserem Podcast-Studio auf der Messe."
      >
        <a
          href="#episoden"
          className="inline-block text-white/50 text-sm md:text-base font-medium border border-white/20 rounded-full px-6 py-2 hover:text-white hover:border-white/40 transition-all duration-300"
        >
          Zu den Episoden ↓
        </a>
      </HeroSection>

      {/* Featured Quote */}
      <section className="relative bg-black px-6 py-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <span
              key={i}
              className="block text-[6rem] md:text-[10rem] font-bold uppercase text-white/[0.02] tracking-tighter whitespace-nowrap leading-none"
              style={{ transform: `translateX(${i % 2 === 0 ? '-5%' : '-15%'})` }}
            >
              PODCAST &nbsp; STARTUP VOICES &nbsp; PODCAST
            </span>
          ))}
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <span className="text-sc-orange text-7xl md:text-9xl font-bold leading-none select-none">&ldquo;</span>
          <blockquote
            className="text-white text-xl md:text-3xl font-bold italic leading-relaxed -mt-8"
            style={{ textShadow: '0 2px 12px rgba(0, 0, 0, 0.5)' }}
          >
            {quote}
          </blockquote>
          {quoteAuthor && (
            <p className="text-sc-orange font-semibold text-base md:text-lg mt-6">
              — {quoteAuthor}
            </p>
          )}
        </div>
      </section>

      {/* Podcast Episodes */}
      <section id="episoden" className="bg-black px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-extrabold uppercase text-center tracking-tight mb-4">
            <span className="text-white">UNSERE </span>
            <span className="text-sc-orange">EPISODEN</span>
          </h2>
          <p className="text-white/50 text-sm md:text-base text-center mb-14 max-w-2xl mx-auto">
            Schau dir die neuesten Folgen an und lerne die Köpfe hinter den Startups kennen.
          </p>

          <PodcastGrid episodes={episodes} />
        </div>
      </section>

      {/* Studio Teaser */}
      <section className="relative bg-black px-6 py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
          {studioImageUrl ? (
            <div className="w-full md:w-1/2 aspect-video rounded-2xl overflow-hidden relative">
              <img
                src={studioImageUrl}
                alt="Podcast Studio"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
          ) : (
            <div className="w-full md:w-1/2 aspect-video rounded-2xl bg-white/5 overflow-hidden" />
          )}

          <div className="w-full md:w-1/2">
            <h2 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight">
              <span className="text-white">SEI DAS NÄCHSTE MAL </span>
              <span className="text-sc-orange">DABEI</span>
            </h2>
            <p className="text-white/60 text-base md:text-lg mt-6 leading-relaxed">
              Verfolge unsere Podcasts live auf der Messe und zieh dir die besten Insights direkt von der Podcast Lounge. Tauch ein in die Stories und Visionen unserer Gäste.
            </p>
            <div className="mt-8">
              <WartelisteButton />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
