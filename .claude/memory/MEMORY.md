# startup-contacts.de Relaunch – Project Memory

## Project Overview
- **Client**: Venture Club Münster e.V.
- **Event**: startup-contacts.de career fair
- **Stack**: Next.js (App Router), Sanity.io, Tailwind CSS, Vercel
- **Monorepo root**: `/home/lucas/Desktop/projects/sc_website_local/sc_website/`

## Sanity Config
- **Studio folder**: `studio-startup-contacts-website/`
- **Project ID**: `7zy866a4`
- **Dataset**: `production`
- **Local Studio URL**: http://localhost:3333

## Design Tokens
- Black: `#000000`
- Card-Grey: `#1A1A1A`
- Venture Purple: `#7B61FF`

## Schema Status (as of session start)
Registered in index.ts: speaker, seo, partner, program, siteSettings, landingPage
NOT yet registered: team, exhibitor (files exist but missing from index.ts)

### Schema gaps vs PRD
- siteSettings missing: navLinks (array), clubLogo (image), eventDate (date)
- landingPage only has `whyUs` – may need hero / other sections later
- team.ts and exhibitor.ts need to be added to index.ts

## Next.js App
- Location: `sc_website/web/` (monorepo subfolder, alongside studio/)
- Stack: Next.js 16 App Router, TypeScript, Tailwind CSS, next-sanity, @sanity/image-url
- Run: `cd web && npm run dev` (needs `source ~/.nvm/nvm.sh` first – nvm not on PATH by default)
- Sanity lib: `web/lib/sanity/client.ts`, `image.ts`, `queries.ts`
- Brand colors defined in `web/app/globals.css` via @theme inline
- Dynamic header: `web/components/Header.tsx` (async server component, fetches navLinks from Sanity)
- next.config.ts: cdn.sanity.io allowed for next/image
- .env.local: NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET set

## Website Navigation Structure (NEW — March 2026)

Top-level nav items are visible dropdowns. URLs stay as established (e.g. Talente → /studierende).

### Besucher (Dropdown)
- **Startups** → /startups
- **Talente** → /studierende (URL bleibt!)
- **Unternehmen** → /unternehmen
- **Investoren** → /investoren

### Programm (Dropdown)
- Co-Creation Corner
- Workshops
- Main Stage
- Podcast
- Innovation Village

### Speaker (Link)
### Partner (Link)

### Über uns (Dropdown)
- VCM
- Advisory Board
- Jobwall

---

## Fokusfelder (shared by Startups & Unternehmen pages)
- Produktion
- Logistik & Einkauf
- Energie & Nachhaltigkeit
- Bau- & Handwerk
- Betriebs Infrastruktur
- Lifestyle

## PRD Reference
- Full condensed PRD: memory/prd.md – READ THIS at the start of every session
