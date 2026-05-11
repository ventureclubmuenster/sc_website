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

export default function PartnerSection({
  rFactoryLogoUrl,
  vcmDescription,
  rFactoryDescription,
}: PartnerSectionProps) {
  const vcmText =
    vcmDescription ??
    'Wir bringen Studierende, Startups und den Mittelstand in Münster zusammen und veranstalten die Startup Contacts.'
  const rFactoryText =
    rFactoryDescription ??
    'R-Factory steht für strukturierte Innovations- und Co-Creation-Prozesse zwischen Unternehmen, Talenten und Startups.'

  return (
    <section className="relative z-10 px-6 py-20">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-extrabold uppercase text-center mb-4">
          <span className="text-white">GEMEINSAM MIT </span>
          <span className="gradient-text">R-FACTORY</span>
        </h2>
        <p className="text-white/50 text-center max-w-2xl mx-auto mb-12 text-base md:text-lg">
          Wir machen Co-Creation gemeinsam mit einem Partner, der Innovationsprozesse lebt.
        </p>

        <div className="relative overflow-hidden py-8 md:py-12 -mx-4 md:-mx-8 px-4 md:px-8">
          <WatermarkBackground />
          <StaggerContainer
            stagger={0.15}
            className="relative z-10 grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 md:gap-4 items-center"
          >
          {/* VCM */}
          <StaggerItem direction="left">
            <div className="liquid-glass rounded-2xl p-8 h-full flex flex-col items-center text-center transition-colors duration-300 hover:bg-black/40">
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
              <p className="text-white/60 text-sm md:text-base leading-relaxed max-w-sm">
                {vcmText}
              </p>
            </div>
          </StaggerItem>

          {/* × */}
          <StaggerItem direction="none">
            <div className="flex items-center justify-center py-4">
              <span className="text-5xl md:text-7xl font-black gradient-text">×</span>
            </div>
          </StaggerItem>

          {/* R-Factory */}
          <StaggerItem direction="right">
            <div className="liquid-glass rounded-2xl p-8 h-full flex flex-col items-center text-center transition-colors duration-300 hover:bg-black/40">
              <div className="relative w-32 h-32 mb-6 flex items-center justify-center">
                <ImagePlaceholder
                  src={rFactoryLogoUrl}
                  alt="R-Factory"
                  label="R-Factory Logo"
                  width={128}
                  height={128}
                  className="object-contain w-32 h-32"
                  rounded="rounded-xl"
                />
              </div>
              <h3 className="text-xl md:text-2xl font-extrabold uppercase tracking-wide text-white mb-3">
                R-Factory
              </h3>
              <p className="text-white/60 text-sm md:text-base leading-relaxed max-w-sm">
                {rFactoryText}
              </p>
            </div>
          </StaggerItem>
          </StaggerContainer>
        </div>
      </div>
    </section>
  )
}
