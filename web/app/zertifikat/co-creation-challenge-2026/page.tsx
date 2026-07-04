import type { Metadata } from 'next'

const PDF_URL = '/zertifikate/co-creation-challenge-2026.pdf'
const PAGE_URL =
  'https://www.startup-contacts.de/zertifikat/co-creation-challenge-2026'

export const metadata: Metadata = {
  title: 'Teilnahmezertifikat – Co-Creation Challenge 2026',
  description:
    'Teilnahmezertifikat der Co-Creation Challenge 2026 im Rahmen der Startup Contacts Münster. Organisiert von Venture Club Münster e.V. und R-Factory eG.',
  alternates: { canonical: PAGE_URL },
  // Nicht öffentlich: nicht indexieren, nicht verlinkt (unlisted Credential-URL)
  robots: { index: false, follow: false },
}

export default function ZertifikatCoCreationChallenge2026() {
  return (
    <main className="min-h-screen px-6 py-24 sm:py-28">
      <div className="mx-auto w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-sm uppercase tracking-widest text-white/50 mb-3">
            Venture Club Münster e.V. &amp; R-Factory eG
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
            TEILNAHME<span className="gradient-text">ZERTIFIKAT</span>
          </h1>
          <p className="text-white/70 text-lg">Co-Creation Challenge 2026</p>
          <p className="text-white/40 text-sm mt-2">
            Credential-ID VC-RF-CCC26 · Münster, 15. Juni 2026
          </p>
        </div>

        {/* PDF-Vorschau */}
        <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/[0.02] shadow-2xl">
          <object
            data={PDF_URL}
            type="application/pdf"
            className="w-full h-[70vh] min-h-[480px]"
            aria-label="Teilnahmezertifikat Co-Creation Challenge 2026 (PDF)"
          >
            <div className="p-10 text-center text-white/60">
              Die PDF-Vorschau kann in deinem Browser nicht angezeigt werden.
            </div>
          </object>
        </div>

        {/* Aktionen */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={PDF_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-sc-orange px-8 py-3 font-semibold text-black transition hover:opacity-90"
          >
            Zertifikat als PDF öffnen
          </a>
          <a
            href={PDF_URL}
            download
            className="inline-flex items-center justify-center rounded-full border border-white/20 px-8 py-3 font-semibold text-white transition hover:bg-white/10"
          >
            Herunterladen
          </a>
        </div>

        <p className="mt-10 text-center text-xs text-white/40 max-w-xl mx-auto">
          Dieses Zertifikat bestätigt die Teilnahme an der Co-Creation Challenge am
          15.06.2026 im Rahmen der Startup Contacts Münster.
        </p>
      </div>
    </main>
  )
}
