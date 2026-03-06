import Image from 'next/image'
import { client } from '@/lib/sanity/client'
import { advisoryBoardQuery } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/image'

interface Advisor {
  _id: string
  name: string
  role: string
  image?: {
    asset: { _ref: string }
    hotspot?: { x: number; y: number }
  }
  linkedin?: string
}

async function getAdvisors(): Promise<Advisor[]> {
  return client.fetch(advisoryBoardQuery, {}, { next: { revalidate: 3600 } })
}

export default async function AdvisoryBoardPage() {
  const advisors = await getAdvisors()

  return (
    <section className="min-h-screen bg-black px-6 py-20">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <h1 className="text-5xl md:text-7xl font-extrabold text-center mb-6">
          <span className="text-venture-purple">SC26</span>{' '}
          <span className="text-white">Advisory Board</span>
        </h1>

        {/* Subheading */}
        <p className="text-white/70 text-center mb-20 max-w-3xl mx-auto text-base md:text-lg">
          Unser Advisory Board unterstützt uns mit Veranstaltungswissen sowie wertvollen Kontakten in
          die Startup-Szene. Wir bedanken uns für den Support und freuen uns auf eine erfolgreiche
          Startup Contacts!
        </p>

        {/* Advisor Grid */}
        {(() => {
          const renderCard = (advisor: Advisor) => {
            const card = (
              <div className="group flex flex-col items-center text-center transition-transform duration-300 hover:-translate-y-2 cursor-pointer">
                <div className="relative w-40 h-40 md:w-48 md:h-48 mb-5 rounded-full border-[3px] border-venture-purple overflow-hidden bg-white/5">
                  {advisor.image ? (
                    <Image
                      src={urlFor(advisor.image).width(400).height(400).url()}
                      alt={advisor.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-white/20">
                      <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                      </svg>
                    </div>
                  )}
                </div>
                <h3 className="text-sm md:text-base font-bold text-white uppercase tracking-wide">
                  {advisor.name}
                </h3>
                {advisor.role && (
                  <p className="text-xs md:text-sm text-white/50 mt-1">{advisor.role}</p>
                )}
              </div>
            )

            if (advisor.linkedin) {
              return (
                <a key={advisor._id} href={advisor.linkedin} target="_blank" rel="noopener noreferrer">
                  {card}
                </a>
              )
            }
            return <div key={advisor._id}>{card}</div>
          }

          const firstRow = advisors.slice(0, 4)
          const secondRow = advisors.slice(4)

          return (
            <div className="space-y-14">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-14 justify-items-center">
                {firstRow.map(renderCard)}
              </div>
              {secondRow.length > 0 && (
                <div className="flex flex-wrap justify-center gap-x-10 gap-y-14 [&>*]:w-[calc((100%-120px)/4)]">
                  {secondRow.map(renderCard)}
                </div>
              )}
            </div>
          )
        })()}
      </div>
    </section>
  )
}
