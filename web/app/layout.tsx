import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { GoogleAnalytics } from '@next/third-parties/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})


export const metadata: Metadata = {
  metadataBase: new URL('https://www.startup-contacts.de'),
  title: {
    default: 'Startup Contacts | Startup Messe & Co-Creation Event in Münster 2026',
    template: '%s | Startup Contacts',
  },
  description:
    'Die größte studentisch organisierte Startup Messe in NRW. Co-Creation Event mit Startups, Talenten und Mittelstand am 15. Juni 2026 in der Halle Münsterland in Münster. Jetzt informieren.',
  keywords: [
    'Startup Contacts',
    'Startup Event Münster',
    'Co-Creation',
    'Karrieremesse Münster',
    'Startups Münster',
    'Venture Club Münster',
    'Innovation',
    'Netzwerk',
    'Startup Messe',
    'Startup Messe NRW',
    'Startup Messe Münster',
    'Innovations Messe',
    'Uni Münster Startups',
    'studentische Messe',
  ],
  authors: [{ name: 'Venture Club Münster e.V.' }],
  creator: 'Venture Club Münster e.V.',
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    url: 'https://www.startup-contacts.de',
    siteName: 'Startup Contacts',
    title: 'Startup Contacts | Startup Messe & Co-Creation Event in Münster 2026',
    description:
      'Die größte studentisch organisierte Startup Messe in NRW. Co-Creation mit Startups, Talenten und Mittelstand. 15. Juni 2026 in der Halle Münsterland in Münster.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Startup Contacts Münster',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Startup Contacts | Startup Messe & Co-Creation Event in Münster 2026',
    description:
      'Die größte studentisch organisierte Startup Messe in NRW. Co-Creation mit Startups, Talenten und Mittelstand. 15. Juni 2026 in der Halle Münsterland in Münster.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://www.startup-contacts.de',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="de">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}>
        <Header />
        <main className="pt-24">{children}</main>
        <Footer />
      </body>
      <GoogleAnalytics gaId="G-W5HR3M7CMJ" />
    </html>
  )
}
