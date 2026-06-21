import Image from 'next/image'
import { StaggerContainer, StaggerItem } from '@/components/FadeIn'
import ImagePlaceholder from './ImagePlaceholder'
import WatermarkBackground from './WatermarkBackground'
import vcmLogo from '@/app/images/VCM_logo.png'

interface PartnerSectionProps {
  rFactoryLogoUrl?: string
  vcmDescription?: string
  rFactoryDescription?: string
}

const vcmDefault = `*Wir bringen Talente, Startups und Mittelstand zusammen.*
Der Venture Club Münster ist die studentische Innovationsplattform der Universität und Hochschulen in Münster. Wir veranstalten die Startup Contacts, das größte Co-Creation Event Deutschlands rund um Gründertum und Innovation.
Unser Fokus: Studierende und Young Professionals direkt mit Startups und Mittelstand für echte Co-Creation zu verbinden, praxisnah und unkompliziert.
_Ziel: junge Talente und den regionalen Mittelstand direkt verbinden, damit aus Hochschulen und Wirtschaft gemeinsam die Innovation von morgen entsteht._`

const rFactoryDefault = `*More than a system. Shaping the future together.*
Die R-Factory eG bringt Corporates, Start-ups und junge Talente aus der EUREGIO (Münster–Osnabrück–Enschede) zusammen für eine starke Wirtschaft. Keine Theorie, sondern echte Cases, überzeugende Lösungen, starke Wirkung. Mit sieben Hochschulen, über 130.000 Studierenden und 30 starken Mitgliedern verbinden wir die richtigen Zutaten für Innovation aus den Bereichen FinTech, Industrial Resilience uvm.
_Ziel: die besten Wachstumsbedingungen für Start-ups – und the next economic miracle, made by EUREGIO._`

function renderRichLine(line: string, key: number) {
  // Inline-Formatierung:
  //   _text_   → fett + kursiv + gradient (nicht weiß)
  //   **text** → fett + weiß
  //   *text*   → fett + gradient (nicht kursiv) — Marker-Zeile
  const parts: React.ReactNode[] = []
  let idx = 0
  const regex = /(_([^_]+)_|\*\*([^*]+)\*\*|\*([^*]+)\*)/g
  let lastIndex = 0
  let match: RegExpExecArray | null
  while ((match = regex.exec(line)) !== null) {
    if (match.index > lastIndex) {
      parts.push(line.slice(lastIndex, match.index))
    }
    if (match[2] !== undefined) {
      parts.push(
        <em key={`${key}-bi-${idx++}`} className="text-white/80 font-bold italic">
          {match[2]}
        </em>
      )
    } else if (match[3] !== undefined) {
      parts.push(
        <strong key={`${key}-b-${idx++}`} className="text-white font-bold">
          {match[3]}
        </strong>
      )
    } else if (match[4] !== undefined) {
      parts.push(
        <em key={`${key}-i-${idx++}`} className="gradient-text font-semibold not-italic">
          {match[4]}
        </em>
      )
    }
    lastIndex = match.index + match[0].length
  }
  if (lastIndex < line.length) {
    parts.push(line.slice(lastIndex))
  }
  return <span key={key}>{parts}</span>
}

export default function PartnerSection({
  rFactoryLogoUrl,
  vcmDescription,
  rFactoryDescription,
}: PartnerSectionProps) {
  const vcmText = vcmDescription ?? vcmDefault
  const vcmLines = vcmText.split(/\n+/).filter((l) => l.trim().length > 0)
  const rFactoryText = rFactoryDescription ?? rFactoryDefault
  const rFactoryLines = rFactoryText.split(/\n+/).filter((l) => l.trim().length > 0)

  return (
    <section className="relative z-10 px-6 py-20 overflow-hidden" id="r-factory">
      <WatermarkBackground opacityClass="text-white/[0.03]" />
      <div className="relative z-10 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-extrabold uppercase text-center mb-4">
          <span className="text-white">GEMEINSAM MIT </span>
          <span className="gradient-text">R-FACTORY</span>
        </h2>
        <p className="text-white/50 text-center max-w-2xl mx-auto mb-6 md:mb-8 text-base md:text-lg">
          Wir machen Co-Creation gemeinsam mit einem Partner, der Innovationsprozesse&nbsp;lebt.
        </p>

        <div className="relative pt-2 md:pt-4 pb-8 md:pb-12">
          <StaggerContainer
            stagger={0.15}
            className="relative z-10 grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 md:gap-4 items-stretch"
          >
          {/* VCM */}
          <StaggerItem direction="left">
            <div className="liquid-glass rounded-2xl p-6 md:p-8 h-full flex flex-col items-center text-center transition-colors duration-300 hover:bg-black/40">
              <div className="relative w-32 h-32 mb-6 flex items-center justify-center">
                <Image
                  src={vcmLogo}
                  alt="Venture Club Münster"
                  width={128}
                  height={128}
                  className="object-contain"
                />
              </div>
              <h3 className="text-xl md:text-2xl font-extrabold uppercase tracking-wide text-white mb-3">
                Venture Club Münster
              </h3>
              <div className="text-white/65 text-sm md:text-base leading-relaxed max-w-md space-y-3">
                {vcmLines.map((line, i) => (
                  <p key={i}>{renderRichLine(line, i)}</p>
                ))}
              </div>
            </div>
          </StaggerItem>

          {/* × */}
          <StaggerItem direction="none" className="h-full">
            <div className="h-full flex items-center justify-center py-4">
              <span className="text-5xl md:text-7xl font-black gradient-text">×</span>
            </div>
          </StaggerItem>

          {/* R-Factory */}
          <StaggerItem direction="right">
            <div className="liquid-glass rounded-2xl p-6 md:p-8 h-full flex flex-col items-center text-center transition-colors duration-300 hover:bg-black/40">
              <div className="relative w-32 h-32 mb-6 flex items-center justify-center">
                <ImagePlaceholder
                  src={rFactoryLogoUrl}
                  alt="R-Factory"
                  label="Sanity → Co-Creation → Veranstalter → R-Factory Logo"
                  width={128}
                  height={128}
                  className="object-contain w-32 h-32"
                  rounded="rounded-xl"
                />
              </div>
              <h3 className="text-xl md:text-2xl font-extrabold uppercase tracking-wide text-white mb-3">
                R-Factory
              </h3>
              <div className="text-white/65 text-sm md:text-base leading-relaxed max-w-md space-y-3">
                {rFactoryLines.map((line, i) => (
                  <p key={i}>{renderRichLine(line, i)}</p>
                ))}
              </div>
            </div>
          </StaggerItem>
          </StaggerContainer>
        </div>
      </div>
    </section>
  )
}
