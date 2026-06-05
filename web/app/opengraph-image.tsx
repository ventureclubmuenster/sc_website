import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

// Route segment config
export const alt = 'Startup Contacts 2026 – Startup Messe & Co-Creation Event in Münster'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

async function img(p: string) {
  return `data:image/png;base64,${(await readFile(join(process.cwd(), p))).toString('base64')}`
}

// Dynamically generated Open Graph / social-share preview image (1200×630).
// Served at /opengraph-image and injected into og:image / twitter:image automatically.
// Design: editorial layout on a white→light-orange gradient, brand logo top-left,
// the orange waveform mark bleeding off the right edge, date as an orange pill.
export default async function Image() {
  const logo = await img('app/images/og-logo.png')
  const mark = await img('app/images/og-mark.png')

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          backgroundImage: 'linear-gradient(135deg, #FFFFFF 0%, #FFE2CE 100%)',
          position: 'relative',
          fontFamily: 'sans-serif',
          overflow: 'hidden',
        }}
      >
        {/* Oversized waveform mark bleeding off the right edge */}
        <img
          src={mark}
          width={780}
          height={715}
          style={{ position: 'absolute', right: -180, top: -50, opacity: 0.16, transform: 'rotate(8deg)' }}
        />

        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 88px' }}>
          <img src={logo} width={380} height={132} style={{ marginBottom: 40 }} />

          <div style={{ fontSize: 62, fontWeight: 800, color: '#0A0A0A', letterSpacing: -1, lineHeight: 1.05, maxWidth: 840 }}>
            Startup Messe &amp; Co-Creation Event
          </div>

          <div style={{ display: 'flex', marginTop: 28 }}>
            <div
              style={{
                display: 'flex',
                backgroundImage: 'linear-gradient(90deg, #FF7A00, #FF3D00)',
                color: '#ffffff',
                fontSize: 28,
                fontWeight: 700,
                padding: '12px 28px',
                borderRadius: 999,
              }}
            >
              15. Juni 2026 · Halle Münsterland Münster
            </div>
          </div>

          <div style={{ marginTop: 22, fontSize: 25, color: '#5A5A5A', maxWidth: 780 }}>
            Die größte studentisch organisierte Startup Messe in NRW
          </div>
        </div>
      </div>
    ),
    { ...size },
  )
}
