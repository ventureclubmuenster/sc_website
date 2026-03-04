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

## PRD Reference
- Full condensed PRD: memory/prd.md – READ THIS at the start of every session
