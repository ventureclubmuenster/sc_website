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
Keynotes, Panel Discussions, Workshops, Co-creation, Live Podcast, VIP Networking, Fairground Exhibitors, Innovation Village

## Audiences
Talents (students), Startups, Investors, Unternehmen (Mittelstand)

## Fokusfelder (für Startups & Unternehmen)
- Produktion
- Logistik & Einkauf
- Energie & Nachhaltigkeit
- Bau- & Handwerk
- Betriebs Infrastruktur
- Lifestyle

## Design Identity
- Black: `#000000`, Card-Grey: `#1A1A1A`, SC-Orange: `#FF5E00`
- CSS variable: `--sc-orange` / Tailwind class: `sc-orange`
- Style: Bold white typography, dark-to-orange gradient overlays on photos, high contrast
- Inspired by Instagram post template (bold headlines, orange accent, photo backgrounds)
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

## Website Navigation & Page Structure

### Top-Level Nav: Besucher (Dropdown)

**Startups** (`/startups`)
- Eine einmalige Kombination: Kontakt zu Studis + Kontakt zu innovationssuchenden Unternehmen
- Fokusfelder (siehe oben)

**Talente** (`/studierende` — URL bleibt!)
- Hero: Full-width Messestand-Foto (from Sanity CMS), dark/orange gradient overlay
- Bold headline: "TALENTE AUFGEPASST"
- Subtext: "Die Chance den Arbeitgeber von morgen zu finden" / "30+ Startups und Unternehmen"
- Creative decorative element (e.g. question mark) — details TBD
- "Gestalte mit" — Aufruf zur aktiven Teilnahme

**Unternehmen** (`/unternehmen`)
- "Ihr Unternehmen treibt die Branche voran?"
- "Kommen Sie vorbei, bringen Sie Ihr Wissen ein"
- "Fördern Sie die Branche durch Startups und lassen Sie sich inspirieren"
- Co-Creation als Innovationstreiber
- Einmalige Kombination (Startups + Talente + Unternehmen)
- Fokusfelder (siehe oben)

**Investoren** (`/investoren`)
- Investor Breakfast
- Startups aus den Bereichen (Fokusfelder)
- Wer letztes Jahr dabei war (Startups & Investoren)
- Münster: Top-5 Gründungshochschulen DE

### Top-Level Nav: Programm (Dropdown)
- Co-Creation Corner
- Workshops: "Erhalte Skills", Workshops letztes Jahr
- Main Stage: Keynotes, Fireside Chats, Paneltalks, Speaker
- Podcast
- Innovation Village

### Top-Level Nav: Speaker (Eigenständige Seite)
### Top-Level Nav: Partner (Eigenständige Seite)

### Top-Level Nav: Über uns (Dropdown)
- VCM (Venture Club Münster)
- Advisory Board
- Jobwall

## Legacy Page Targets (reference)
- Homepage (landingPage singleton)
- Speakers listing + detail pages
- Program / Schedule
- Partners & Sponsors
- Exhibitors
- Board/Team
