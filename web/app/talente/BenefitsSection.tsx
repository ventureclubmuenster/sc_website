import Image from 'next/image'
import Link from 'next/link'

interface Props {
  salitosLogoUrl?: string
  workshopsImageUrl?: string
  startupSceneImageUrl?: string
  speakerImageUrls?: string[]
}

export default function BenefitsSection({
  salitosLogoUrl,
  workshopsImageUrl,
  startupSceneImageUrl,
  speakerImageUrls = [],
}: Props) {
  return (
    <section className="relative z-10 px-6 pt-8 pb-4">
      <div className="max-w-5xl mx-auto">
        <p className="text-center text-white/30 text-xs tracking-[0.2em] uppercase mb-8">
          Deine Perks
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {/* Free Drinks */}
          <div className="bg-[#1A1A1A] rounded-xl p-6 flex flex-col items-center justify-center gap-5 min-h-[150px]">
            <div className="flex items-center justify-center gap-5">
              {salitosLogoUrl && (
                <Image
                  src={salitosLogoUrl}
                  alt="Salitos"
                  width={52}
                  height={52}
                  className="object-contain"
                />
              )}
              <Image
                src="/logos/effect.svg"
                alt="Effect Energy"
                width={56}
                height={46}
                className="object-contain"
                style={{ filter: 'brightness(0) invert(1)' }}
                unoptimized
              />
            </div>
            <span className="text-white/40 text-xs tracking-widest uppercase">Free Drinks</span>
          </div>

          {/* Aro Bowl */}
          <div className="bg-[#1A1A1A] rounded-xl p-6 flex flex-col items-center justify-center gap-5 min-h-[150px]">
            <Image
              src="/logos/aro.png"
              alt="Aro Bowl"
              width={72}
              height={72}
              className="object-contain"
              style={{ filter: 'brightness(0) invert(1)' }}
            />
            <span className="text-white/40 text-xs tracking-widest uppercase">Mittagessen dabei</span>
          </div>

          {/* Startup Szene */}
          <div className="relative rounded-xl overflow-hidden flex flex-col items-center justify-center gap-2 min-h-[150px] bg-[#1A1A1A]">
            {startupSceneImageUrl && (
              <div className="absolute inset-0 z-0">
                <Image
                  src={startupSceneImageUrl}
                  alt=""
                  fill
                  className="object-cover opacity-25"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
              </div>
            )}
            <span className="relative z-10 text-white font-bold text-base text-center leading-snug px-4">
              Startup Szene<br />Münster
            </span>
            <span className="relative z-10 text-white/50 text-xs text-center">30+ Aussteller vor Ort</span>
          </div>

          {/* Top Speaker */}
          <div className="bg-[#1A1A1A] rounded-xl p-6 flex flex-col items-center justify-center gap-4 min-h-[150px]">
            {speakerImageUrls.length > 0 && (
              <div className="flex items-center">
                <div className="flex -space-x-3">
                  {speakerImageUrls.map((url, i) => (
                    <div
                      key={i}
                      className="w-11 h-11 rounded-full border-2 border-[#1A1A1A] overflow-hidden relative"
                      style={{ zIndex: speakerImageUrls.length - i }}
                    >
                      <Image src={url} alt="" fill className="object-cover" />
                    </div>
                  ))}
                </div>
                <div
                  className="w-11 h-11 rounded-full border-2 border-[#1A1A1A] bg-white/10 flex items-center justify-center -ml-3"
                  style={{ zIndex: 0 }}
                >
                  <span className="text-white/70 text-xs font-bold">+</span>
                </div>
              </div>
            )}
            <div className="flex flex-col items-center gap-1">
              <span className="text-white/40 text-xs uppercase tracking-widest">Top Speaker</span>
              <span className="text-white/30 text-xs text-center">und viele mehr</span>
            </div>
          </div>

          {/* Zeitgeist Afterparty */}
          <div className="bg-[#1A1A1A] rounded-xl p-6 flex flex-col items-center justify-center gap-5 min-h-[150px]">
            <Image
              src="/logos/zeitgeist.jpg"
              alt="Zeitgeist"
              width={64}
              height={64}
              className="rounded-full object-cover"
            />
            <span className="text-white/40 text-xs uppercase tracking-widest">Afterparty</span>
          </div>

          {/* Workshops */}
          <div className="relative rounded-xl overflow-hidden flex flex-col items-center justify-center gap-2 min-h-[150px] bg-[#1A1A1A]">
            {workshopsImageUrl && (
              <div className="absolute inset-0 z-0">
                <Image
                  src={workshopsImageUrl}
                  alt=""
                  fill
                  className="object-cover opacity-25"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
              </div>
            )}
            <span className="relative z-10 text-white font-bold text-base text-center leading-snug">
              Workshops
            </span>
            <span className="relative z-10 text-white/50 text-xs text-center">Hands-on Sessions</span>
          </div>
        </div>

        <div className="flex justify-center mt-10 mb-4">
          <Link
            href="/tickets"
            className="group inline-flex items-center gap-2 text-white/50 hover:text-white text-sm tracking-wide transition-colors"
          >
            <span>Jetzt Ticket sichern</span>
            <span
              aria-hidden
              className="gradient-text font-bold transition-transform group-hover:translate-x-0.5"
            >
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}
