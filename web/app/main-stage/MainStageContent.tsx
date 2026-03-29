'use client'

import Image from 'next/image'
import FadeIn, { StaggerContainer, StaggerItem } from '@/components/FadeIn'
import { urlFor } from '@/lib/sanity/image'

interface Speaker {
  _id: string
  name: string
  title?: string
  image?: unknown
}

interface ProgramItem {
  _id: string
  title: string
  type: string
  startTime?: string
  endTime?: string
  location?: string
  description?: string
  speakers?: Speaker[]
}

interface MainStageContentProps {
  keynotes: ProgramItem[]
  panels: ProgramItem[]
  firesideChats: ProgramItem[]
  flashbackTitle?: string
  flashbackTags?: string[]
}

/* ── Inline SVG Icons ── */
function MicIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" x2="12" y1="19" y2="22" />
    </svg>
  )
}

function UsersIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}

function FireIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    </svg>
  )
}

function formatTime(iso?: string) {
  if (!iso) return ''
  return new Date(iso).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })
}

/* ── Program Card ── */
function ProgramCard({ item }: { item: ProgramItem }) {
  return (
    <div className="group relative bg-white/[0.04] backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden p-6 hover:border-sc-orange/30 transition-colors duration-500">
      <div className="absolute -top-16 -right-16 w-40 h-40 bg-sc-orange/5 rounded-full blur-3xl group-hover:bg-sc-orange/15 transition-all duration-500" />

      {item.startTime && (
        <span className="text-sc-orange text-sm font-bold uppercase tracking-wide">
          {formatTime(item.startTime)}
          {item.endTime && ` – ${formatTime(item.endTime)}`}
        </span>
      )}

      <h4 className="mt-2 text-lg font-bold uppercase tracking-wide group-hover:text-sc-orange transition-colors duration-300">
        {item.title}
      </h4>

      {item.location && (
        <p className="mt-1 text-sm text-white/40">{item.location}</p>
      )}

      {item.description && (
        <p className="mt-3 text-sm text-white/60 leading-relaxed">{item.description}</p>
      )}

      {item.speakers && item.speakers.length > 0 && (
        <div className="mt-4 flex items-center gap-3 flex-wrap">
          {item.speakers.map((speaker) => (
            <div key={speaker._id} className="flex items-center gap-2">
              {speaker.image ? (
                <Image
                  src={urlFor(speaker.image).width(80).height(80).url()}
                  alt={speaker.name}
                  width={32}
                  height={32}
                  className="rounded-full object-cover"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-card-grey flex items-center justify-center text-xs font-bold text-white/40">
                  {speaker.name.charAt(0)}
                </div>
              )}
              <div>
                <p className="text-sm font-medium">{speaker.name}</p>
                {speaker.title && (
                  <p className="text-xs text-white/40">{speaker.title}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default function MainStageContent({
  keynotes,
  panels,
  firesideChats,
  flashbackTitle,
  flashbackTags,
}: MainStageContentProps) {
  return (
    <>
      {/* ── Programm-Highlights ── */}
      <section className="relative py-32 px-6 bg-black overflow-hidden">
        {/* Watermark */}
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <span
              key={i}
              className="block text-[6rem] md:text-[10rem] font-bold uppercase text-white/[0.04] tracking-tighter whitespace-nowrap leading-none"
              style={{ transform: `translateX(${i % 2 === 0 ? '-5%' : '-15%'})` }}
            >
              STARTUP CONTACTS &nbsp; STARTUP CONTACTS &nbsp; STARTUP CONTACTS
            </span>
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <FadeIn direction="up" duration={0.7}>
            <h2 className="text-4xl md:text-6xl font-bold text-center uppercase tracking-tight">
              Programm-<span className="gradient-text">Highlights</span>
            </h2>
          </FadeIn>

          <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Keynotes Column */}
            <div>
              <FadeIn direction="up" delay={0.1}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-sc-orange/10 flex items-center justify-center">
                    <MicIcon className="w-6 h-6 text-sc-orange" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-tight">
                    Keynotes
                  </h3>
                </div>
                <p className="text-white/60 leading-relaxed mb-8">
                  Lerne von denjenigen, die den Weg bereits gegangen sind. Unsere Speaker teilen ihre persönlichen Erfahrungen beim Aufbau von Unternehmen und zeigen auf, wie Visionen in der wirtschaftlichen Realität bestehen.
                </p>
              </FadeIn>

              <StaggerContainer stagger={0.1} className="space-y-4">
                {keynotes.length > 0 ? (
                  keynotes.map((item) => (
                    <StaggerItem key={item._id} direction="up" distance={30}>
                      <ProgramCard item={item} />
                    </StaggerItem>
                  ))
                ) : (
                  <FadeIn direction="up">
                    <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-8 text-center">
                      <MicIcon className="w-10 h-10 text-white/20 mx-auto mb-3" />
                      <p className="text-white/40">Keynotes werden bald bekannt gegeben.</p>
                    </div>
                  </FadeIn>
                )}
              </StaggerContainer>
            </div>

            {/* Panels Column */}
            <div>
              <FadeIn direction="up" delay={0.2}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-sc-orange/10 flex items-center justify-center">
                    <UsersIcon className="w-6 h-6 text-sc-orange" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-tight">
                    Paneltalks
                  </h3>
                </div>
                <p className="text-white/60 leading-relaxed mb-8">
                  Wir bringen verschiedene Sichtweisen an einen Tisch. In den Panels diskutieren Experten über die drängenden Fragen der Branche und liefern neue Perspektiven durch den direkten Austausch.
                </p>
              </FadeIn>

              <StaggerContainer stagger={0.1} className="space-y-4">
                {panels.length > 0 ? (
                  panels.map((item) => (
                    <StaggerItem key={item._id} direction="up" distance={30}>
                      <ProgramCard item={item} />
                    </StaggerItem>
                  ))
                ) : (
                  <FadeIn direction="up">
                    <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-8 text-center">
                      <UsersIcon className="w-10 h-10 text-white/20 mx-auto mb-3" />
                      <p className="text-white/40">Panels werden bald bekannt gegeben.</p>
                    </div>
                  </FadeIn>
                )}
              </StaggerContainer>
            </div>

            {/* Fireside Chats Column */}
            <div>
              <FadeIn direction="up" delay={0.3}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-sc-orange/10 flex items-center justify-center">
                    <FireIcon className="w-6 h-6 text-sc-orange" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-tight">
                    Fireside Chats
                  </h3>
                </div>
                <p className="text-white/60 leading-relaxed mb-8">
                  Intime Gespräche am imaginären Lagerfeuer. Unsere Speaker öffnen sich in lockerer Atmosphäre und geben ehrliche Einblicke hinter die Kulissen ihrer Reise.
                </p>
              </FadeIn>

              <StaggerContainer stagger={0.1} className="space-y-4">
                {firesideChats.length > 0 ? (
                  firesideChats.map((item) => (
                    <StaggerItem key={item._id} direction="up" distance={30}>
                      <ProgramCard item={item} />
                    </StaggerItem>
                  ))
                ) : (
                  <FadeIn direction="up">
                    <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-8 text-center">
                      <FireIcon className="w-10 h-10 text-white/20 mx-auto mb-3" />
                      <p className="text-white/40">Fireside Chats werden bald bekannt gegeben.</p>
                    </div>
                  </FadeIn>
                )}
              </StaggerContainer>
            </div>
          </div>
        </div>
      </section>

      {/* ── Themen-Flashback (vorerst ausgeblendet) ── */}
      <section className="relative py-32 px-6 overflow-hidden hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-card-grey to-sc-orange/10" />
        <span className="absolute right-6 top-1/2 -translate-y-1/2 text-[8rem] md:text-[14rem] font-bold uppercase text-white/[0.03] pointer-events-none select-none tracking-tighter leading-none text-right">
          20<br />25
        </span>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <FadeIn direction="up" duration={0.7}>
            <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tight">
              {flashbackTitle || 'DAS WAR DIE MAINSTAGE 2025'}
            </h2>
          </FadeIn>

          <StaggerContainer stagger={0.08} className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {(flashbackTags && flashbackTags.length > 0
              ? flashbackTags
              : ['KI-Revolution', 'Sustainable Startups', 'Fail Forward Stories', 'Bootstrapping vs. VC']
            ).map((tag) => (
              <StaggerItem key={tag} direction="up" distance={20}>
                <span className="flex items-center justify-center px-5 py-3 rounded-full bg-white/[0.06] border border-white/10 text-sm md:text-base font-bold uppercase tracking-wide hover:border-sc-orange/40 hover:bg-sc-orange/10 transition-all duration-300 cursor-default text-center">
                  {tag}
                </span>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </>
  )
}
