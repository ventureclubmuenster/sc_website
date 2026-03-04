import Image from 'next/image'
import { client } from '@/lib/sanity/client'
import { advisoryBoardQuery } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/image'

interface TeamMember {
  _id: string
  name: string
  role: string
  image?: {
    asset: { _ref: string }
    hotspot?: { x: number; y: number }
  }
  linkedin?: string
}

async function getTeam(): Promise<TeamMember[]> {
  return client.fetch(advisoryBoardQuery, {}, { next: { revalidate: 3600 } })
}

export default async function AdvisoryBoardPage() {
  const team = await getTeam()

  return (
    <section className="px-6 py-20">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
          Advisory Board
        </h1>
        <p className="text-white/60 text-center mb-16 max-w-2xl mx-auto">
          Die Menschen hinter Startup Contacts
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {team.map((member) => (
            <div
              key={member._id}
              className="group relative bg-card-grey rounded-2xl overflow-hidden border border-white/5 transition-all duration-300 hover:border-venture-purple/50 hover:shadow-[0_0_30px_rgba(123,97,255,0.15)] hover:-translate-y-1"
            >
              {/* Image */}
              <div className="relative aspect-[3/4] overflow-hidden bg-white/5">
                {member.image ? (
                  <Image
                    src={urlFor(member.image).width(600).height(800).url()}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-white/20">
                    <svg
                      className="w-20 h-20"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                    </svg>
                  </div>
                )}

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* LinkedIn icon on hover */}
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-4 right-4 p-2 rounded-full bg-white/10 backdrop-blur-sm text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-venture-purple"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                )}
              </div>

              {/* Info */}
              <div className="p-5">
                <h3 className="text-lg font-semibold text-white">
                  {member.name}
                </h3>
                {member.role && (
                  <p className="text-sm text-white/50 mt-1">{member.role}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
