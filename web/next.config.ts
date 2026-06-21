import type { NextConfig } from 'next'

const securityHeaders = [
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.youtube.com https://www.googletagmanager.com https://js.stripe.com https://vivenu.com https://connect.facebook.net",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https://cdn.sanity.io https://img.youtube.com https://www.google-analytics.com https://www.googletagmanager.com https://www.google.com https://www.facebook.com",
      "media-src 'self' https://cdn.sanity.io blob:",
      "font-src 'self' data:",
      "connect-src 'self' https://connect.mailerlite.com https://*.sanity.io https://www.google-analytics.com https://*.google-analytics.com https://*.googletagmanager.com https://www.google.com https://api.stripe.com https://vivenu.com https://tickets.infield.live https://connect.facebook.net https://www.facebook.com",
      "frame-src https://www.youtube.com https://www.youtube-nocookie.com https://www.openstreetmap.org https://js.stripe.com https://tickets.infield.live https://vivenu.com",
      "object-src 'self' https://tickets.infield.live https://vivenu.com",
      "frame-ancestors 'none'",
    ].join('; '),
  },
]

const nextConfig: NextConfig = {
  images: {
    // Bilder werden bereits von Sanity (cdn.sanity.io) auf die passende Größe und
    // Format optimiert (siehe urlFor(...).width()/.height()/.auto('format')).
    // Vercels eigener Image-Optimizer ist damit überflüssig und hat zudem das
    // Kontingent aufgebraucht (HTTP 402 OPTIMIZED_IMAGE_REQUEST_PAYMENT_REQUIRED),
    // wodurch neue Bilder live nur grau erschienen. Wir liefern daher direkt aus.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.startup-contacts.de',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'POST, OPTIONS',
          },
        ],
      },
    ]
  },
  async redirects() {
    return [
      {
        source: '/studierende',
        destination: '/talente',
        permanent: true,
      },
      // Legacy Webflow URLs
      {
        source: '/unternehmen-old',
        destination: '/unternehmen',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
