import Image from 'next/image'
import { client } from '@/lib/sanity/client'
import { partners2025Query } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/image'

interface Partner {
  _id: string
  name: string
  category: 'platin' | 'gold' | 'silber' | 'network'
  logo?: {
    asset: { _ref: string }
  }
  url?: string
}

const categoryOrder = ['platin', 'gold', 'silber', 'network'] as const

const categoryLabels: Record<string, { highlight: string; rest: string }> = {
  platin: { highlight: 'MAIN', rest: 'PARTNER' },
  gold: { highlight: 'GOLD', rest: 'PARTNER' },
  silber: { highlight: 'SUPPORTER', rest: '' },
  network: { highlight: 'NETZWERK', rest: 'PARTNER' },
}

async function getPartners(): Promise<Partner[]> {
  return client.fetch(partners2025Query, {}, { cache: 'no-store' })
}

export default async function PartnerPage() {
  const partners = await getPartners()

  const grouped = categoryOrder
    .map((cat) => ({
      category: cat,
      partners: partners.filter((p) => p.category === cat),
    }))
    .filter((group) => group.partners.length > 0)

  return (
    <section className="min-h-screen bg-black px-6 py-20">
      <div className="max-w-7xl mx-auto space-y-16">
        {grouped.map((group) => {
          const label = categoryLabels[group.category]

          return (
            <div key={group.category}>
              {/* Category Heading */}
              <h2 className="text-2xl md:text-3xl font-extrabold uppercase tracking-wide mb-8">
                <span className="text-venture-purple">{label.highlight}</span>
                {label.rest && <span className="text-white"> {label.rest}</span>}
              </h2>

              {/* Logo Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {group.partners.map((partner) => {
                  const card = (
                    <div
                      key={partner._id}
                      className="group flex items-center justify-center bg-white/90 rounded-xl p-6 h-24 md:h-28 transition-all duration-300 hover:-translate-y-1 hover:bg-white"
                    >
                      {partner.logo ? (
                        <div className="relative w-full h-full">
                          <Image
                            src={urlFor(partner.logo).width(400).height(200).url()}
                            alt={partner.name}
                            fill
                            className="object-contain"
                          />
                        </div>
                      ) : (
                        <span className="text-black/50 text-sm font-medium">{partner.name}</span>
                      )}
                    </div>
                  )

                  if (partner.url) {
                    return (
                      <a
                        key={partner._id}
                        href={partner.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {card}
                      </a>
                    )
                  }

                  return card
                })}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
