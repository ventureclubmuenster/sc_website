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
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https://cdn.sanity.io https://img.youtube.com",
      "font-src 'self' data:",
      "connect-src 'self' https://connect.mailerlite.com https://*.sanity.io",
      "frame-src https://www.youtube.com https://www.youtube-nocookie.com",
      "frame-ancestors 'none'",
    ].join('; '),
  },
]

const nextConfig: NextConfig = {
  images: {
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
