'use client'

import Link from 'next/link'
import { StaggerContainer, StaggerItem } from '@/components/FadeIn'
import {
  type ScheduleSlot,
  type Workshop,
  formatLabels,
  formatStyle,
} from '@/lib/schedule'

interface Cta {
  label: string
  href: string
}

/* ── "STARTUP CONTACTS" Hintergrund-Watermark (füllt die ganze Section) ── */
function Watermark({ count = 24 }: { count?: number }) {
  return (
    <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
      {[...Array(count)].map((_, i) => (
        <span
          key={i}
          className="block text-[6rem] md:text-[10rem] font-bold uppercase text-white/[0.03] tracking-tighter whitespace-nowrap leading-none"
          style={{ transform: `translateX(${i % 2 === 0 ? '-5%' : '-15%'})` }}
        >
          STARTUP CONTACTS &nbsp; STARTUP CONTACTS &nbsp; STARTUP CONTACTS
        </span>
      ))}
    </div>
  )
}

interface SectionHeaderProps {
  eyebrow?: string
  title: string
  titleAccent?: string
  subtitle?: string
}

function SectionHeader({ eyebrow, title, titleAccent, subtitle }: SectionHeaderProps) {
  return (
    <div className="text-center mb-12">
      {eyebrow && (
        <span className="inline-flex items-center gap-2 font-mono text-sm md:text-base tracking-wide text-white/60 mb-5 px-3 py-1 rounded-full border border-white/10 bg-white/[0.04]">
          <span className="w-1.5 h-1.5 rounded-full bg-white/50" />
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight">
        <span className="text-white">{title}</span>
        {titleAccent && (
          <>
            {' '}
            <span className="gradient-text">{titleAccent}</span>
          </>
        )}
      </h2>
      {subtitle && (
        <p className="text-white/50 max-w-2xl mx-auto text-base md:text-lg mt-4">{subtitle}</p>
      )}
    </div>
  )
}

/* ── Schlichter Button (ohne Glow-/Klick-Effekt) ── */
function CtaRow({ cta }: { cta: Cta }) {
  return (
    <div className="mt-12 flex justify-center">
      <Link
        href={cta.href}
        className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-white/[0.10] hover:border-white/35"
      >
        {cta.label}
        <span aria-hidden>→</span>
      </Link>
    </div>
  )
}

/* ── Pausen-Trenner ── */
function BreakDivider({ slot }: { slot: ScheduleSlot }) {
  return (
    <div className="flex items-center gap-4 px-2 py-2">
      <span className="h-px flex-1 bg-white/10" />
      <span className="font-mono text-sm md:text-base text-white/50 whitespace-nowrap tracking-wide">
        {slot.startTime}
        {slot.endTime && `–${slot.endTime}`} · {slot.title || formatLabels.Break}
      </span>
      <span className="h-px flex-1 bg-white/10" />
    </div>
  )
}

/* ── Einzelne Schedule-Karte (opak, Badge oben rechts) ── */
function SlotCard({ slot }: { slot: ScheduleSlot }) {
  const style = formatStyle(slot.format)

  return (
    <div className="group relative flex gap-3 md:gap-4 rounded-2xl border border-white/10 bg-zinc-800 p-4 md:p-5 transition-colors duration-300 hover:bg-zinc-700 hover:border-white/20">
      {/* Farbiger Akzent-Balken */}
      <div className={`w-1.5 rounded-full shrink-0 ${style.accent}`} />

      <div className="min-w-0 flex-1">
        {/* Kopfzeile: Zeit links, Format-Badge oben rechts */}
        <div className="flex items-start justify-between gap-3">
          <span className="text-white font-semibold font-mono text-sm md:text-base">
            {slot.startTime}
            {slot.endTime && ` – ${slot.endTime}`}
          </span>
          <span
            className={`shrink-0 inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wide border ${style.badge}`}
          >
            {formatLabels[slot.format]}
          </span>
        </div>

        {slot.title && (
          <h4 className="mt-2 text-base md:text-lg font-bold text-white leading-snug">{slot.title}</h4>
        )}

        {slot.speaker && (
          <p className="mt-1.5 text-sm font-medium text-white/85">{slot.speaker}</p>
        )}

        {slot.company && <p className="mt-0.5 text-xs text-white/50">{slot.company}</p>}
      </div>
    </div>
  )
}

interface ScheduleProps {
  slots: ScheduleSlot[]
  eyebrow?: string
  title: string
  titleAccent?: string
  subtitle?: string
  id?: string
  /** Optionaler Button unter dem Schedule (z.B. zur ausführlichen Seite). */
  cta?: Cta
}

export default function Schedule({
  slots,
  eyebrow,
  title,
  titleAccent,
  subtitle,
  id,
  cta,
}: ScheduleProps) {
  return (
    <section className="relative bg-black px-6 py-20 overflow-hidden" id={id}>
      <Watermark />
      <div className="relative z-10 max-w-3xl mx-auto">
        <SectionHeader eyebrow={eyebrow} title={title} titleAccent={titleAccent} subtitle={subtitle} />

        <StaggerContainer stagger={0.07} className="space-y-3">
          {slots.map((slot, i) =>
            slot.format === 'Break' ? (
              <StaggerItem key={`${slot.startTime}-${i}`} direction="up" distance={16}>
                <BreakDivider slot={slot} />
              </StaggerItem>
            ) : (
              <StaggerItem key={`${slot.startTime}-${i}`} direction="up" distance={24}>
                <SlotCard slot={slot} />
              </StaggerItem>
            )
          )}
        </StaggerContainer>

        {cta && <CtaRow cta={cta} />}
      </div>
    </section>
  )
}

/* ── Workshops-Liste (ohne Zeiten) ── */
interface WorkshopsListProps {
  workshops: Workshop[]
  eyebrow?: string
  title: string
  titleAccent?: string
  subtitle?: string
  id?: string
  cta?: Cta
}

export function WorkshopsList({
  workshops,
  eyebrow,
  title,
  titleAccent,
  subtitle,
  id,
  cta,
}: WorkshopsListProps) {
  return (
    <section className="relative bg-black px-6 py-20 overflow-hidden" id={id}>
      <Watermark />
      <div className="relative z-10 max-w-5xl mx-auto">
        <SectionHeader eyebrow={eyebrow} title={title} titleAccent={titleAccent} subtitle={subtitle} />

        <StaggerContainer stagger={0.1} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {workshops.map((ws) => (
            <StaggerItem key={ws.title} direction="up" distance={24}>
              <div className="group relative flex gap-3 md:gap-4 rounded-2xl border border-white/10 bg-zinc-800 p-5 transition-colors duration-300 hover:bg-zinc-700 hover:border-white/20 h-full">
                <div className="w-1.5 rounded-full shrink-0 bg-white/30" />
                <div className="min-w-0 flex-1">
                  <h4 className="text-base md:text-lg font-bold text-white leading-snug">{ws.title}</h4>
                  {ws.speaker && (
                    <p className="mt-1.5 text-sm font-medium text-white/70">{ws.speaker}</p>
                  )}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {cta && <CtaRow cta={cta} />}
      </div>
    </section>
  )
}
