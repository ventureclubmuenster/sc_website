import { StaggerContainer, StaggerItem } from '@/components/FadeIn'

interface Station {
  time?: string
  title?: string
  description?: string
}

interface AblaufTimelineProps {
  stations?: Station[]
}

const defaults: Station[] = [
  { time: '09:00', title: 'Kick-off & Challenge-Pitch', description: 'Begrüßung, Teambuilding und Vorstellung der 4 Corporate Challenges.' },
  { time: '09:55', title: 'Design Thinking Workshop', description: 'Problem Framing, „How Might We", Ideation & Crazy 8s.' },
  { time: '11:00', title: 'Arbeitsphase I', description: 'Problemraum und Lösungsrichtung. Experten rotieren durch die Teams.' },
  { time: '12:30', title: 'Lunch & Networking', description: 'Pause, Austausch mit Messebesuchern und Ideen challengen.' },
  { time: '13:15', title: 'Prototyping & Konzept', description: 'Micro-Workshop mit KI-Tools, dann Konzept und Pitch aufbauen.' },
  { time: 'Ende', title: 'Ende & Vorstellung der Ergebnisse', description: 'Bewertung und Abschluss vor offenem Publikum.' },
]

export default function AblaufTimeline({ stations }: AblaufTimelineProps) {
  const items = stations?.length ? stations : defaults

  return (
    <section className="relative z-10 px-6 py-20 overflow-hidden" id="ablauf">
      <div className="max-w-6xl mx-auto relative">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 font-mono text-sm md:text-base tracking-wide text-white/60 mb-5 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03]">
            <span className="w-1.5 h-1.5 rounded-full gradient-bg" />
            Ablauf / Sprint-Struktur
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold uppercase mb-4">
            <span className="text-white">EIN TAG, KLARE </span>
            <span className="gradient-text">ARBEITSPHASEN</span>
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto text-base md:text-lg">
            Von 09:00 bis 16:30 Uhr. Kompakt, strukturiert, mit klarem Output.
          </p>
        </div>

        {/* Desktop: horizontale Timeline mit fließender Animation */}
        <div className="hidden md:block relative">
          <div className="absolute top-[7px] left-0 right-0 h-[2px] timeline-line-flow rounded-full opacity-80" />
          <StaggerContainer stagger={0.1} className="relative grid grid-cols-6 gap-2">
            {items.map((s, i) => (
              <StaggerItem key={i} direction="up">
                <div className="flex flex-col items-center text-center">
                  <div className="w-4 h-4 rounded-full gradient-bg shadow-lg shadow-orange-500/30 ring-1 ring-white/20" />
                  <div className="mt-6 text-sm font-mono text-white/40">{s.time}</div>
                  <div className="mt-1 text-base font-bold text-white leading-tight">{s.title}</div>
                  {s.description && (
                    <div className="mt-2 text-xs text-white/50 leading-relaxed">{s.description}</div>
                  )}
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        {/* Mobile: vertikale Timeline mit fließender Animation */}
        <div className="md:hidden relative">
          <div className="absolute left-[22px] top-0 bottom-0 w-[2px] timeline-line-flow-vertical rounded-full opacity-80" />
          <StaggerContainer stagger={0.08} className="space-y-6">
            {items.map((s, i) => (
              <StaggerItem key={i} direction="left">
                <div className="flex items-start gap-4 relative">
                  <div className="flex-shrink-0 w-12 flex justify-center pt-1.5">
                    <div className="w-4 h-4 rounded-full gradient-bg shadow-lg shadow-orange-500/30 ring-1 ring-white/20" />
                  </div>
                  <div className="flex-1 pt-1">
                    <div className="text-sm font-mono text-white/40">{s.time}</div>
                    <div className="text-lg font-bold text-white leading-tight">{s.title}</div>
                    {s.description && (
                      <div className="mt-1 text-sm text-white/50 leading-relaxed">{s.description}</div>
                    )}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  )
}
