import type { MetadataRoute } from 'next'

const BASE_URL = 'https://www.startup-contacts.de'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { url: '/', priority: 1.0, changeFrequency: 'weekly' as const },
    { url: '/startups', priority: 0.9, changeFrequency: 'weekly' as const },
    { url: '/unternehmen', priority: 0.9, changeFrequency: 'weekly' as const },
    { url: '/talente', priority: 0.9, changeFrequency: 'weekly' as const },
    { url: '/investoren', priority: 0.8, changeFrequency: 'weekly' as const },
    { url: '/speaker', priority: 0.8, changeFrequency: 'weekly' as const },
    { url: '/partner', priority: 0.7, changeFrequency: 'monthly' as const },
    { url: '/co-creation', priority: 0.7, changeFrequency: 'monthly' as const },
    { url: '/workshops', priority: 0.7, changeFrequency: 'monthly' as const },
    { url: '/main-stage', priority: 0.7, changeFrequency: 'monthly' as const },
    { url: '/podcast', priority: 0.6, changeFrequency: 'monthly' as const },
    { url: '/innovation-village', priority: 0.7, changeFrequency: 'monthly' as const },
    { url: '/ueber-uns', priority: 0.6, changeFrequency: 'monthly' as const },
    { url: '/advisory-board', priority: 0.5, changeFrequency: 'monthly' as const },
    { url: '/jobwall', priority: 0.6, changeFrequency: 'weekly' as const },
    { url: '/newsletter', priority: 0.5, changeFrequency: 'monthly' as const },
  ]

  return routes.map(({ url, priority, changeFrequency }) => ({
    url: `${BASE_URL}${url}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }))
}
