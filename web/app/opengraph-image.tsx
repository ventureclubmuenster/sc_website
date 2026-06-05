import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

// Route segment config
export const alt = 'Startup Contacts 2026 – Startup Messe & Co-Creation Event in Münster'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// Dynamically generated Open Graph / social-share preview image (1200×630).
// Served at /opengraph-image and injected into og:image / twitter:image automatically.
export default async function Image() {
  const logoData = await readFile(
    join(process.cwd(), 'app/images/SC_logo_größer_und_weiss.png'),
  )
  const logoSrc = `data:image/png;base64,${logoData.toString('base64')}`

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#000000',
          color: '#ffffff',
          padding: '80px',
          position: 'relative',
        }}
      >
        {/* Brand accent bar */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '12px',
            backgroundColor: '#FF5C00',
          }}
        />

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={360} height={360} alt="Startup Contacts" style={{ marginBottom: '24px' }} />

        <div
          style={{
            fontSize: '40px',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            textAlign: 'center',
          }}
        >
          Startup Messe &amp; Co-Creation Event
        </div>

        <div
          style={{
            display: 'flex',
            marginTop: '28px',
            fontSize: '30px',
            color: '#FF5C00',
            fontWeight: 600,
          }}
        >
          15. Juni 2026 · Halle Münsterland Münster
        </div>

        <div
          style={{
            marginTop: '16px',
            fontSize: '24px',
            color: '#bdbdbd',
          }}
        >
          Die größte studentisch organisierte Startup Messe in NRW
        </div>
      </div>
    ),
    { ...size },
  )
}
