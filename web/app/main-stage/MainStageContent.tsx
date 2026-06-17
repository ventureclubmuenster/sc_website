'use client'

import FadeIn, { StaggerContainer, StaggerItem } from '@/components/FadeIn'
import Schedule from '@/components/Schedule'
import { mainStageSchedule } from '@/lib/schedule'

interface MainStageContentProps {
  flashbackTitle?: string
  flashbackTags?: string[]
}

export default function MainStageContent({
  flashbackTitle,
  flashbackTags,
}: MainStageContentProps) {
  return (
    <>
      {/* ── Programm / Ablauf Main Stage ── */}
      <Schedule
        slots={mainStageSchedule}
        eyebrow="Programm / Main Stage"
        title="DER"
        titleAccent="ABLAUF"
        subtitle="Keynotes, Paneltalks & Fireside Chats der komplette Main-Stage-Tag am 8. Juni 2027."
        id="ablauf"
      />

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
