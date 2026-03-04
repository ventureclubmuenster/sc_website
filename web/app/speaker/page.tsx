import Image from 'next/image'
import { client } from '@/lib/sanity/client'
import { urlFor } from '@/lib/sanity/image'
import { speakers2025Query } from '@/lib/sanity/queries'

interface Speaker {
  _id: string
  name: string
  title?: string
  stage?: string
  image?: object
  socialLinks?: {
    linkedin?: string
  }
}

export default async function SpeakerPage() {
  const speakers: Speaker[] = await client.fetch(speakers2025Query)

  return (
    <main className="bg-background min-h-screen">
      {/* Header */}
      <div className="py-16 text-center px-4">
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight">
          UNSERE{' '}
          <span className="text-venture-purple">SPEAKER</span>
        </h1>
        <p className="mt-4 text-white/60 text-base max-w-xl mx-auto">
          Hier findest du eine Übersicht aller unserer Speaker, die zuletzt mit dabei waren!
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 px-4 md:px-6">
        {speakers.map((speaker) => {
          const card = (
            <div className="relative aspect-[3/4] overflow-hidden rounded-xl group">
              {/* Image */}
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

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

              {/* Text */}
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
                  <p className="text-venture-purple text-sm font-medium mt-2">
                    {speaker.stage}
                  </p>
                )}
              </div>

              {/* Hover tint */}
              <div className="absolute inset-0 bg-venture-purple/0 group-hover:bg-venture-purple/10 transition-colors duration-300" />
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

      {speakers.length === 0 && (
        <div className="text-center text-white/40 py-24 text-lg">
          Speaker werden bald bekannt gegeben.
        </div>
      )}
    </main>
  )
}
