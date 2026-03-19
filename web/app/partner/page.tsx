import { client } from '@/lib/sanity/client'
import { partners2025Query } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/image'

interface Partner {
  _id: string
  name: string
  category: 'main' | 'supporter' | 'attendance' | 'food-beverage' | 'network'
  logo?: {
    asset: { _ref: string }
  }
  whiteBackground?: boolean
  url?: string
}

const categoryOrder = ['main', 'supporter', 'food-beverage', 'network'] as const

const categoryLabels: Record<string, { highlight: string; rest: string }> = {
  main: { highlight: 'MAIN', rest: 'PARTNER' },
  supporter: { highlight: 'SUPPORTER', rest: '' },
  'food-beverage': { highlight: 'FOOD & BEVERAGE', rest: 'PARTNER' },
  network: { highlight: 'NETWORK', rest: 'PARTNER' },
}

async function getPartners(): Promise<Partner[]> {
  return client.fetch(partners2025Query, {}, { cache: 'no-store' })
}

export default async function PartnerPage() {
  const partners = await getPartners()

  const grouped = categoryOrder
    .map((cat) => ({
      category: cat,
      partners: partners.filter((p) =>
        cat === 'supporter'
          ? p.category === 'supporter' || p.category === 'attendance'
          : p.category === cat
      ),
    }))
    .filter((group) => group.partners.length > 0)

  return (
    <>
      {/* Header Section */}
      <section className="bg-black pt-32 pb-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold uppercase tracking-tight">
            <span className="text-white">UNSERE </span>
            <span className="gradient-text">PARTNER</span>
          </h1>
          <p className="text-white/60 text-sm md:text-base mt-6 max-w-3xl mx-auto">
            Wir danken allen unseren Partnern, die die Startup Contacts möglich machen. Hier findest du eine Übersicht aller unserer Partner, die zuletzt mit dabei waren. Klicke auf eines der Logos um mehr zu erfahren!
          </p>
        </div>
      </section>

      {/* Partner Grid */}
      <section className="min-h-screen bg-black px-6 pb-20">
        <div className="max-w-7xl mx-auto space-y-16">
          {grouped.map((group) => {
          const label = categoryLabels[group.category]

          return (
            <div key={group.category}>
              {/* Category Heading */}
              <h2 className="text-2xl md:text-3xl font-extrabold uppercase tracking-wide mb-8">
                <span className="gradient-text">{label.highlight}</span>
                {label.rest && <span className="text-white"> {label.rest}</span>}
              </h2>

              {/* Logo Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {group.partners.map((partner) => {
                  const card = (
                    <div
                      key={partner._id}
                      className={`group flex items-center justify-center rounded-xl overflow-hidden aspect-[2/1] p-4 transition-all duration-300 hover:-translate-y-1 ${
                        partner.whiteBackground === false
                          ? 'bg-black border border-white/10 hover:bg-black'
                          : 'bg-white hover:bg-white'
                      }`}
                    >
                      {partner.logo ? (
                        <img
                          src={urlFor(partner.logo).width(600).fit('max').url()}
                          alt={partner.name}
                          className="max-w-[80%] max-h-[70%] object-contain"
                        />
                      ) : (
                        <span className={`text-sm font-medium ${partner.whiteBackground === false ? 'text-white/60' : 'text-black/50'}`}>{partner.name}</span>
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
    </>
  )
}
