import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Partner',
  description:
    'Unsere Partner der Startup Contacts Münster: Gemeinsam gestalten wir Deutschlands größtes Co-Creation Event. 15. Juni 2026.',
  alternates: { canonical: 'https://www.startup-contacts.de/partner' },
  openGraph: {
    title: 'Partner | Startup Contacts',
    description: 'Unsere Partner der Startup Contacts Münster — gemeinsam Zukunft gestalten.',
    url: 'https://www.startup-contacts.de/partner',
  },
}

import { client } from '@/lib/sanity/client'
import { partnersQuery, partners2025Query } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/image'
import PartnerInquiryCTA from '@/components/PartnerInquiryCTA'

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

const categoryOrder = ['main', 'supporter', 'attendance', 'food-beverage', 'network'] as const

const categoryLabels: Record<string, { highlight: string; rest: string }> = {
  main: { highlight: 'MAIN', rest: 'PARTNER' },
  supporter: { highlight: 'SUPPORTER', rest: '' },
  attendance: { highlight: 'ATTENDANCE', rest: 'PARTNER' },
  'food-beverage': { highlight: 'FOOD & BEVERAGE', rest: 'PARTNER' },
  network: { highlight: 'NETWORK', rest: 'PARTNER' },
}

function renderPartnerGroups(partners: Partner[]) {
  const grouped = categoryOrder
    .map((cat) => ({
      category: cat,
      partners: partners.filter((p) => p.category === cat),
    }))
    .filter((group) => group.partners.length > 0)

  return grouped.map((group) => {
    const label = categoryLabels[group.category]

    return (
      <div key={group.category}>
        <h3 className="text-2xl md:text-3xl font-extrabold uppercase tracking-wide mb-8 text-center">
          <span className="gradient-text">{label.highlight}</span>
          {label.rest && <span className="text-white"> {label.rest}</span>}
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {group.partners.map((partner) => {
            const card = (
              <div
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
                  <span
                    className={`text-sm font-medium ${
                      partner.whiteBackground === false ? 'text-white/60' : 'text-black/50'
                    }`}
                  >
                    {partner.name}
                  </span>
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

            return <div key={partner._id}>{card}</div>
          })}

          {/* "und viele mehr" tile */}
          <div className="flex items-center justify-center rounded-xl aspect-[2/1] border border-white/10 border-dashed">
            <span className="text-white/30 text-sm font-medium tracking-wide">und viele mehr</span>
          </div>
        </div>
      </div>
    )
  })
}

async function getPartners2026(): Promise<Partner[]> {
  return client.fetch(partnersQuery, {}, { cache: 'no-store' })
}

async function getPartners2025(): Promise<Partner[]> {
  return client.fetch(partners2025Query, {}, { cache: 'no-store' })
}

export default async function PartnerPage() {
  const [partners2026, partners2025] = await Promise.all([
    getPartners2026(),
    getPartners2025(),
  ])

  return (
    <>
      <section className="bg-black px-6 pt-32 pb-20">
        <div className="max-w-7xl mx-auto">
          {/* ── Partner 2026 ── */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight">
              <span className="gradient-text">PARTNER </span>
              2026
            </h2>
            <p className="mt-4 text-white/60 text-base max-w-xl mx-auto">
              Diese Partner sind dieses Jahr auf der Startup Contacts dabei!
            </p>
          </div>

          {partners2026.length > 0 && (
            <div className="space-y-16 mb-12">{renderPartnerGroups(partners2026)}</div>
          )}

          {/* "Bald weitere Partner" Card */}
          <div className="liquid-glass rounded-xl p-8 md:p-10 text-center max-w-2xl mx-auto">
            <svg
              className="w-8 h-8 text-sc-orange mx-auto mb-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            <p className="text-white font-bold text-lg leading-tight">
              Weitere Partner werden bald bekannt gegeben
            </p>
            <p className="text-white/50 text-sm mt-2">Stay tuned!</p>
          </div>

          {/* ── Partner werden CTA ── */}
          <section className="mt-20 text-center">
            <h3 className="text-xl md:text-2xl font-semibold text-white mb-3">
              Werde Partner
            </h3>
            <p className="text-white/60 text-sm md:text-base max-w-xl mx-auto mb-6">
              Werde Teil von Deutschlands größtem Co-Creation Event und erreiche über 1.111 Studierende, Gründer:innen und Entscheider:innen.
            </p>
            <PartnerInquiryCTA />
          </section>

          {/* ── Trennlinie ── */}
          <div className="gradient-line h-px w-full mt-20 mb-16" />

          {/* ── Partner Hall of Fame (2025) ── */}
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight">
              <span className="gradient-text">PARTNER </span>
              HALL OF FAME
            </h2>
            <p className="mt-4 text-white/60 text-base max-w-xl mx-auto">
              Hier findest du eine Übersicht aller unserer Partner, die 2025 dabei waren!
            </p>
          </div>

          <div className="space-y-16">{renderPartnerGroups(partners2025)}</div>

          {partners2025.length === 0 && (
            <div className="text-center text-white/40 py-24 text-lg">
              Partner werden bald bekannt gegeben.
            </div>
          )}
        </div>
      </section>
    </>
  )
}
