import type { Metadata } from 'next'
import Image from 'next/image'
import Script from 'next/script'
import scMark from '@/app/images/og-mark.png'
import { urlFor } from '@/lib/sanity/image'
import HeroVideo from '@/components/HeroVideo'
import AnimatedStatsGrid from '@/components/AnimatedStatsGrid'
import CtaButton from './CtaButton'
import SpeakerGrid from './SpeakerGrid'
import SliderBanner from './SliderBanner'
import WatermarkBg from './WatermarkBg'
import {
  getAdLandingPage,
  type AdLandingPage,
  type AdStat,
  type AdFormat,
  type AdSpeaker,
  type AdZielgruppe,
  type AdLogo,
  type AdFaq,
} from './sanity'

// ── Secret: nicht indexieren, nicht verlinken ────────────────────────────────
export const metadata: Metadata = {
  title: { absolute: 'Startup Contacts 2026 – Jetzt Ticket sichern' },
  description:
    'Die größte studentisch organisierte Startup Messe in NRW. 15. Juni 2026, Halle Münsterland Münster. Jetzt Ticket sichern.',
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
  alternates: { canonical: undefined },
  openGraph: {
    title: 'Startup Contacts 2026 – Jetzt Ticket sichern',
    description:
      'Die größte studentisch organisierte Startup Messe in NRW. 15. Juni 2026, Halle Münsterland Münster.',
  },
}

// Secret-Ticketshop (Fallback, falls in Sanity kein Link gepflegt ist).
const SECRET_TICKET_URL =
  'https://tickets.infield.live/event/69777da5382b6da735040ed6/6a194aef06e962eac8cc2904'

// ── Code-Fallbacks: Seite sieht sofort vollständig aus, auch ohne Sanity-Pflege ─
const FALLBACK: Required<
  Pick<
    AdLandingPage,
    | 'ctaLabel'
    | 'heroHeadline'
    | 'heroHeadlineMuted'
    | 'heroSubline'
    | 'heroDateLabel'
    | 'heroLocationLabel'
    | 'statsHeading'
    | 'statsSubheading'
    | 'formateHeading'
    | 'speakerHeading'
    | 'zielgruppenHeading'
    | 'logosHeading'
    | 'faqHeading'
  >
> & {
  stats: AdStat[]
  formatItems: AdFormat[]
  speakers: AdSpeaker[]
  zielgruppen: AdZielgruppe[]
  faq: AdFaq[]
} = {
  ctaLabel: 'Ticket sichern',
  heroHeadline: 'Zukunft Zusammenarbeit',
  heroHeadlineMuted: 'durch',
  heroSubline:
    'Die größte studentisch organisierte Startup Messe in NRW.\nWo Studierende, Startups und Mittelstand aufeinandertreffen.',
  heroDateLabel: '15. Juni 2026',
  heroLocationLabel: 'Halle Münsterland',
  statsHeading: 'Stell dir vor was …',
  statsSubheading: '… Gemeinsam erreichen können',
  formateHeading: 'Was du erwarten kannst',
  speakerHeading: 'Unsere Speaker',
  zielgruppenHeading: 'Wen du erwarten kannst',
  logosHeading: 'Mit dabei',
  faqHeading: 'Häufige Fragen',
  stats: [
    { number: '20+', label: 'Speaker & Themen' },
    { number: '1000+', label: 'Besucher' },
    { number: '35+', label: 'Stände' },
  ],
  formatItems: [
    { title: 'WORKSHOPS', description: 'Hands-on Sessions zu KI, Karriere, Gründung und mehr' },
    { title: 'LIVE PODCAST', description: 'Gründungsgeschichten und Persönlichkeiten hautnah im Studio' },
    { title: 'TALKS', description: 'Keynotes, Panels und Fireside Chats auf der Main Stage' },
    { title: 'INNOVATION VILLAGE', description: 'Über 30 Aussteller zeigen ihre Innovationen an einem Ort' },
  ],
  speakers: [
    { name: 'Jan Kraume', role: 'Co-Founder @OACE' },
    { name: 'Splash' },
    { name: 'Knounity' },
    { name: 'Hannes & Jeremy' },
  ],
  zielgruppen: [
    { label: 'Startups' },
    { label: 'Corporates' },
    { label: 'Talente' },
    { label: 'Investoren' },
  ],
  faq: [
    { question: 'Wann findet die Startup Contacts 2026 statt?', answer: 'Die Startup Contacts findet am 15. Juni 2026 in der Halle Münsterland in Münster statt.' },
    { question: 'Welche Formate bietet die Startup Contacts?', answer: 'Co-Creation Sessions, Workshops, Live Podcasts, Main Stage Talks und das Innovation Village mit Startups aus sechs Fokusfeldern.' },
    { question: 'Können Auszubildende und Schüler auch ein Student-Ticket kaufen?', answer: 'Ja, Auszubildende und Schüler können ebenfalls ein Student-Ticket kaufen. Ladet dazu einfach einen Ausweis eurer Schule oder Berufsschule hoch.' },
    { question: 'Für wen ist die Startup Messe gedacht?', answer: 'Für Studierende und Talente, Gründerinnen und Gründer, mittelständische Unternehmen aus NRW und Investoren, die am deutschen Startup Ökosystem teilhaben wollen.' },
    { question: 'Wo genau ist die Halle Münsterland?', answer: 'Albersloher Weg 32, 48155 Münster. Gut erreichbar mit Auto, Bus und Bahn.' },
    { question: 'Was kostet ein Ticket?', answer: 'Alle Ticketoptionen findest du auf unserer Ticketseite. Studierende erhalten vergünstigten Eintritt.' },
  ],
}

export default async function Sc26LandingPage() {
  const data = (await getAdLandingPage()) || {}

  const ctaLabel = data.ctaLabel || FALLBACK.ctaLabel
  const ticketUrl = data.ticketUrl || SECRET_TICKET_URL

  const headline = data.heroHeadline || FALLBACK.heroHeadline
  const headlineParts = headline.split(' ')
  const headlineFirst = headlineParts[0]
  const headlineRest = headlineParts.slice(1).join(' ')
  const headlineMuted = data.heroHeadlineMuted || FALLBACK.heroHeadlineMuted
  const subline = data.heroSubline || FALLBACK.heroSubline

  const stats = data.stats?.length ? data.stats : FALLBACK.stats
  const formatItems = data.formatItems?.length ? data.formatItems : FALLBACK.formatItems
  const speakers = data.speakers?.length ? data.speakers : FALLBACK.speakers
  const zielgruppen = data.zielgruppen?.length ? data.zielgruppen : FALLBACK.zielgruppen
  const logos = data.companyLogos || []
  const faq = data.faq?.length ? data.faq : FALLBACK.faq

  // Pro Section ein leicht anderer CTA-Text (Hero/Final nutzen den editierbaren ctaLabel).
  const cta = (label: string, size: 'sm' | 'md' | 'lg' = 'lg') => (
    <CtaButton href={ticketUrl} label={label} size={size} />
  )

  return (
    <div className="bg-[#141414] text-white overflow-x-hidden">
      {/* ── Meta Pixel (identisch zu /tickets) ───────────────────────────────── */}
      <Script id="meta-pixel" strategy="afterInteractive">{`
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '1022744900324105');
        fbq('track', 'PageView');
      `}</Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img height="1" width="1" style={{ display: 'none' }}
          src="https://www.facebook.com/tr?id=1022744900324105&ev=PageView&noscript=1"
          alt=""
        />
      </noscript>

      {/* /sc26 nutzt eine eigene Navbar (unten) statt des globalen Headers → globalen
          <header> ausblenden, main-Padding entfernen. Der globale <footer> bleibt sichtbar
          und dient als Fußzeile. Dieses <style> existiert nur, solange /sc26 gerendert wird
          → betrifft keine andere Route. */}
      <style
        dangerouslySetInnerHTML={{
          __html:
            'header{display:none!important}main{padding-top:0!important}.h-display,.h-section{font-weight:750!important}',
        }}
      />

      {/* ── ① Hero ───────────────────────────────────────────────── */}

      {/* Handy/Tablet: Video als eingebetteter aspect-video-Block — exakt die
          gleiche Funktionsweise wie die Startseite (in-flow, nicht als Hintergrund),
          damit iOS das Video zuverlässig automatisch abspielt. */}
      <section className="lg:hidden relative bg-[#141414] overflow-hidden">
        {/* Navbar — über dem Video, auf grauem Seiten-Hintergrund, mit kleinem
            Abstand zur oberen Kante und zum Video. */}
        <nav className="px-3 pt-3 pb-3">
          <div className="max-w-4xl mx-auto liquid-glass rounded-full px-5 h-14 flex items-center justify-center gap-2.5">
            <Image
              src={scMark}
              alt="Startup Contacts Münster"
              priority
              className="h-7 w-auto object-contain shrink-0"
            />
            <span className="text-white font-semibold tracking-wide text-[11px] text-center whitespace-nowrap">
              STARTUP CONTACTS MÜNSTER · 15. Juni 2026
            </span>
          </div>
        </nav>

        {/* Video */}
        <div className="relative w-full aspect-video overflow-hidden">
          <HeroVideo videoUrl={data.heroVideoUrl} youtubeId="1NUZVnJK3XE" />
        </div>

        {/* Inhalt unter dem Video */}
        <div className="px-5 pt-6 pb-8 bg-black">
          <h1 className="font-bold uppercase leading-[0.85] tracking-tighter text-white text-[clamp(1.75rem,7.5vw,4rem)] -ml-0.5">
            {headlineFirst}
            <br />
            <span className="text-white/55">{headlineMuted}</span>
            <br />
            {headlineRest}
            <span className="gradient-text">.</span>
          </h1>

          <p className="mt-4 max-w-2xl whitespace-pre-line text-white/60 text-sm leading-snug">
            {subline}
          </p>

          <div className="mt-5 flex flex-row items-center justify-center gap-4">
            <div className="flex flex-col font-bold uppercase tracking-tight">
              <span className="text-xl gradient-text">
                {data.heroDateLabel || FALLBACK.heroDateLabel}
              </span>
              <span className="text-sm text-white/60">
                {data.heroLocationLabel || FALLBACK.heroLocationLabel}
              </span>
            </div>
            <div>
              <CtaButton href={ticketUrl} label={ctaLabel} size="sm" />
            </div>
          </div>
        </div>
      </section>

      {/* Desktop: Vollbild-Video als Hintergrund mit überlagertem Text */}
      <section className="relative hidden lg:flex min-h-[88vh] flex-col justify-end overflow-hidden">
        <HeroVideo videoUrl={data.heroVideoUrl} youtubeId="1NUZVnJK3XE" cover />

        {/* Navbar — über dem Video, leicht durchsichtig (liquid-glass), mit Abstand zum oberen Rand.
            Liegt in der Hero-Section → scrollt mit der Hero weg (folgt nicht dauerhaft). */}
        <nav className="absolute top-4 lg:top-6 left-3 right-3 sm:left-4 sm:right-4 z-20">
          <div className="max-w-4xl lg:max-w-5xl mx-auto liquid-glass rounded-full px-5 sm:px-8 lg:px-10 h-14 sm:h-16 lg:h-20 flex items-center justify-center gap-2.5 sm:gap-3 lg:gap-4">
            <Image
              src={scMark}
              alt="Startup Contacts Münster"
              priority
              className="h-7 sm:h-9 lg:h-11 w-auto object-contain shrink-0"
            />
            <span className="text-white font-semibold tracking-wide text-[11px] sm:text-sm md:text-base lg:text-lg text-center whitespace-nowrap">
              STARTUP CONTACTS MÜNSTER · 15. Juni 2026<span className="hidden sm:inline"> · Halle Münsterland</span>
            </span>
          </div>
        </nav>

        <div className="relative z-10 w-full px-5 sm:px-8 pb-12 pt-28">
          <h1 className="h-display text-white -ml-1" style={{ fontSize: 'clamp(1.75rem, 5.4vw, 7.25rem)' }}>
            {headlineFirst}
            <br />
            <span className="text-white/55">{headlineMuted}</span>
            <br />
            {headlineRest}
            <span className="gradient-text">.</span>
          </h1>

          <p className="mt-5 sm:mt-6 max-w-2xl whitespace-pre-line text-white/65 text-base sm:text-xl lg:text-2xl leading-snug">
            {subline}
          </p>

          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row sm:items-end gap-5 sm:gap-10">
            <div className="flex flex-col font-bold uppercase tracking-tight">
              <span className="text-xl md:text-3xl gradient-text">
                {data.heroDateLabel || FALLBACK.heroDateLabel}
              </span>
              <span className="text-sm md:text-lg text-white/60">
                {data.heroLocationLabel || FALLBACK.heroLocationLabel}
              </span>
            </div>
            <div>
              <CtaButton
                href={ticketUrl}
                label={ctaLabel}
                size="md"
                className="sm:px-9 sm:py-4 sm:text-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── ①½ Logo-Slidebanner (1:1 wie Startseite) ─────────────── */}
      <SliderBanner logos={data.sliderLogos} />

      {/* ── ② Stell dir vor was … (Zahlen) ───────────────────────── */}
      <section className="relative py-24 sm:py-28 px-6 overflow-hidden">
        <WatermarkBg />
        <div className="relative z-10">
          <h2 className="h-section text-center">
            {renderHeadingWithAccent(data.statsHeading || FALLBACK.statsHeading)}
          </h2>

          <AnimatedStatsGrid
            cards={stats.map((s) => ({
              number: s.number || '',
              label: s.label || '',
              imageUrl: s.image ? urlFor(s.image).width(600).height(450).url() : undefined,
            }))}
          />

          <h2 className="h-section text-center mt-12">
            {renderHeadingWithAccent(data.statsSubheading || FALLBACK.statsSubheading)}
          </h2>
        </div>
      </section>

      {/* ── ③ Was du erwarten kannst (Formate, ohne Links) ───────── */}
      <section className="relative py-24 sm:py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-[750] uppercase text-center mb-12">
            {renderHeadingWithAccent(data.formateHeading || FALLBACK.formateHeading)}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {formatItems.map((f, i) => (
              <div
                key={f._key || i}
                className="group relative h-60 sm:h-64 rounded-3xl overflow-hidden border border-white/10 transition-colors duration-500 hover:border-sc-orange/70"
              >
                {f.image ? (
                  <Image
                    src={urlFor(f.image).width(800).height(600).url()}
                    alt={f.title || ''}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-[#1f1f1f] to-[#161616]" />
                )}
                <div className="absolute inset-0 bg-black/50" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                  <h3 className="text-white text-xl md:text-2xl font-extrabold uppercase tracking-wider">
                    {f.title}
                  </h3>
                  {f.description && (
                    <p className="mt-3 max-w-xs text-white/70 text-sm">{f.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 flex justify-center">{cta('Jetzt Platz sichern', 'md')}</div>
        </div>
      </section>

      {/* ── ④ Unsere Speaker (STARTUP-CONTACTS-Wasserzeichen bis unter den CTA) ─ */}
      <section className="relative py-24 sm:py-28 px-6 overflow-hidden">
        <WatermarkBg />
        <div className="relative z-10">
          <h2 className="h-section text-center">
            {renderHeadingWithAccent(data.speakerHeading || FALLBACK.speakerHeading)}
          </h2>
          <SpeakerGrid speakers={speakers} />
          <p className="mt-10 text-center text-white/45 text-base sm:text-lg">
            … und viele weitere spannende{' '}
            <a
              href="/speaker"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white underline underline-offset-4 hover:text-sc-orange transition-colors"
            >
              Speaker
            </a>
          </p>
          <div className="mt-10 flex justify-center">{cta('Live dabei sein', 'md')}</div>
        </div>
      </section>

      {/* ── ⑤ Wen du erwarten kannst ─────────────────────────────── */}
      <section className="relative py-24 sm:py-28 px-6">
        <div className="relative z-10 max-w-7xl mx-auto">
          <h2 className="h-section text-center">
            {renderHeadingWithAccent(data.zielgruppenHeading || FALLBACK.zielgruppenHeading)}
          </h2>

          <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4">
            {zielgruppen.map((z, i) => (
              <div
                key={z._key || i}
                className="group relative w-full max-w-[440px] mx-auto aspect-[3/4] rounded-3xl overflow-hidden flex items-end p-6 border border-white/10 transition-colors duration-500 hover:border-sc-orange/70"
              >
                {z.image ? (
                  <Image
                    src={urlFor(z.image).width(500).height(667).url()}
                    alt={z.label || ''}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-[#1f1f1f] to-[#161616]" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <span className="relative z-10 text-lg font-bold uppercase tracking-wide group-hover:text-sc-orange transition-colors duration-300">
                  {z.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ⑥ Aussteller-/Firmen-Logos ───────────────────────────── */}
      <section className="relative py-24 sm:py-28 px-6 overflow-hidden">
        <WatermarkBg />
        <div className="relative z-10 max-w-7xl mx-auto">
          <h2 className="h-section text-center mb-12">
            {renderHeadingWithAccent(data.logosHeading || FALLBACK.logosHeading)}
          </h2>

          {logos.length > 0 ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {logos.map((logo: AdLogo, i: number) => {
                const tileClass = `w-full max-w-[360px] mx-auto rounded-2xl overflow-hidden aspect-[2/1] flex items-center justify-center border transition-all duration-300 ${
                  logo.whiteBackground ? 'bg-white border-transparent' : 'bg-[#1c1c1c] border-white/10'
                } ${logo.url ? 'cursor-pointer hover:-translate-y-0.5 hover:border-sc-orange/60 hover:shadow-[0_8px_24px_rgba(255,94,0,0.18)]' : ''}`
                const inner = logo.logo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={urlFor(logo.logo).width(600).fit('max').url()}
                    alt={logo.name || `Logo ${i + 1}`}
                    className="w-3/4 h-3/4 object-contain"
                  />
                ) : (
                  <span className={`text-sm font-semibold ${logo.whiteBackground ? 'text-black/60' : 'text-white/60'}`}>
                    {logo.name}
                  </span>
                )
                return logo.url ? (
                  <a
                    key={logo._key || i}
                    href={logo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={tileClass}
                    aria-label={logo.name ? `${logo.name} – Website öffnen` : 'Website öffnen'}
                  >
                    {inner}
                  </a>
                ) : (
                  <div key={logo._key || i} className={tileClass}>
                    {inner}
                  </div>
                )
              })}
              </div>
              <p className="mt-8 text-center text-white/45 text-base sm:text-lg">
                … und viele weitere innovative{' '}
                <a
                  href="/innovation-village#aussteller-2026"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white underline underline-offset-4 hover:text-sc-orange transition-colors"
                >
                  Unternehmen
                </a>
              </p>
            </>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-full max-w-[360px] mx-auto rounded-2xl aspect-[2/1] bg-[#1c1c1c] border border-dashed border-white/10"
                  />
                ))}
              </div>
              <p className="mt-6 text-center text-white/40 text-sm">
                Aussteller-Logos werden in Kürze ergänzt — und viele weitere innovative Unternehmen.
              </p>
            </>
          )}

          <div className="mt-12 flex justify-center">{cta('Jetzt Ticket sichern', 'md')}</div>
        </div>
      </section>

      {/* ── ⑦ FAQ ────────────────────────────────────────────────── */}
      <section className="relative py-24 sm:py-28 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="h-section text-center">
            {renderHeadingWithAccent(data.faqHeading || FALLBACK.faqHeading)}
          </h2>

          <div className="mt-12 divide-y divide-white/10 border-t border-b border-white/10">
            {faq.map((item: AdFaq, i: number) => (
              <details key={item._key || i} className="group py-3.5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-base md:text-lg font-semibold text-white">
                  <span>{item.question}</span>
                  <span className="text-sc-orange transition-transform duration-300 group-open:rotate-45 text-2xl leading-none">
                    +
                  </span>
                </summary>
                <div className="mt-4 body whitespace-pre-line">
                  {renderAnswer(item.answer || '', ticketUrl)}
                </div>
              </details>
            ))}
          </div>

          <p className="mt-10 body text-center">
            Bei weiteren Fragen meldet euch bitte bei{' '}
            <a
              href="mailto:info@startup-contacts.de"
              className="text-sc-orange hover:underline underline-offset-4"
            >
              info@startup-contacts.de
            </a>
          </p>
        </div>
      </section>

      {/* Darunter rendert das globale Layout den echten Seiten-Footer (nicht mehr ausgeblendet). */}
    </div>
  )
}

/**
 * Rendert eine Überschrift und färbt das/die Akzent-Wort(e) im VCM-Colorway (Orange-Gradient):
 * - "du"/"dir" (z.B. "Stell DIR vor was …", "Wen DU erwarten kannst"), sonst
 * - ein Wort mit führendem "…" inkl. Folgewort (z.B. "… GEMEINSAM erreichen können"), sonst
 * - das letzte Wort.
 */
function renderHeadingWithAccent(text: string) {
  const words = text.split(' ')
  const accent = new Set<number>()
  const duIdx = words.findIndex((w) => /^(du|dir)[.,!…]*$/i.test(w))
  const ellipsisIdx = words.findIndex((w) => w.startsWith('…') || w.startsWith('...'))

  if (duIdx >= 0) {
    accent.add(duIdx)
  } else if (ellipsisIdx >= 0) {
    accent.add(ellipsisIdx)
    if (ellipsisIdx + 1 < words.length) accent.add(ellipsisIdx + 1)
  } else {
    accent.add(words.length - 1)
  }

  return (
    <>
      {words.map((w, i) => (
        <span key={i} className={accent.has(i) ? 'gradient-text' : undefined}>
          {w}
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </>
  )
}

/**
 * Rendert eine FAQ-Antwort. Das Wort "Ticketseite" wird zum orange-unterstrichenen Link
 * auf den Ticketshop (bleibt in Sanity als normaler Text editierbar).
 */
function renderAnswer(answer: string, ticketUrl: string) {
  const token = 'Ticketseite'
  if (!answer.includes(token)) return answer
  const parts = answer.split(token)
  return parts.map((part, i) => (
    <span key={i}>
      {part}
      {i < parts.length - 1 && (
        <a
          href={ticketUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sc-orange underline underline-offset-4"
        >
          {token}
        </a>
      )}
    </span>
  ))
}
