# PRD: startup-contacts.de Relaunch (v3.1)
Date: March 4, 2026 | Owner: Venture Club Münster e.V.

## Stack
Next.js (App Router), Sanity.io, Tailwind CSS, Vercel

## Monorepo Structure
- Root: `sc_website/`
- Sanity Studio: `sc_website/studio-startup-contacts-website/`
- Next.js App: to be initialized in root `sc_website/`

## Sanity
- Project ID: `7zy866a4` | Dataset: `production`
- Studio local: http://localhost:3333

## Event Scope
Keynotes, Panel Discussions, Workshops, Co-creation, Live Podcast, VIP Networking, Fairground Exhibitors

## Audiences
Talents (students), Startups, Investors, Mittelstand

## Design Identity
- Black: `#000000`, Card-Grey: `#1A1A1A`, Venture Purple: `#7B61FF`
- "Why Startup Contacts" cards: INSPIRATION, COMMUNITY, EXPERIENCE — bg image + dark overlay + white text

## CMS Singletons
- **siteSettings**: navLinks (dynamic header), clubLogo, eventDate, global SEO
- **landingPage**: modular homepage, "Why Startup Contacts" section

## CMS Document Types
- **speaker**: name, slug, role, bio, image (hotspot), socialLinks, seo
- **program**: title, type (Keynote/Panel/Workshop/Podcast), startTime, endTime, location, speakers[], description
- **partner**: name, category (Platin/Gold/Silber/Netzwerk), logo, url
- **exhibitor**: name, type (Startup/Unternehmen/Investor/Partner), description, standNumber, logo
- **team**: name, role, image (hotspot), linkedin

## Core Frontend Features
1. **Dynamic sticky header** — fetches navLinks from siteSettings in `app/layout.tsx`
2. **Sanity Image URL Builder** — respect hotspot on all images
3. **SEO** — every page fetches metadata from Sanity; target Lighthouse >95
4. **Asset management** — all images via @sanity/image-url

## Page Targets
- Homepage (landingPage singleton)
- Speakers listing + detail pages
- Program / Schedule
- Partners & Sponsors
- Exhibitors
- Board/Team
