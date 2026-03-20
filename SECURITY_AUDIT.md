# Security Audit — startup-contacts.de
**Datum:** 20. März 2026

---

## Überblick

Vor dem Launch wurde ein vollständiges Security-Audit der Next.js-App (`web/`) durchgeführt. Alle kritischen und mittleren Probleme wurden behoben. Der Build ist danach erfolgreich, `npm audit` zeigt 0 Vulnerabilities.

---

## Code-Änderungen

### 1. `web/app/api/newsletter/route.ts` — Input-Validierung

**Problem:** Der Newsletter-Endpoint akzeptierte beliebige Eingaben ohne Prüfung — Angriffsvektoren für DoS, Injection und Spam.

**Änderungen:**
- E-Mail-Format-Validierung per Regex (RFC 5321, max. 254 Zeichen)
- Typ-Prüfung aller Felder (`typeof === 'string'`)
- Längen-Limit 100 Zeichen für Vor- und Nachname
- `role`-Feld wird gegen eine feste Allowlist geprüft (keine freie Texteingabe mehr)
- `console.error` loggt nicht mehr die vollständige MailerLite-Response (Information Disclosure), sondern nur noch den HTTP-Status

```ts
// Neu hinzugefügt:
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const ALLOWED_ROLES = ['Studierende/r', 'Startup-Gründer/in', 'Unternehmen', 'Investor/in', 'Sonstige']

if (!EMAIL_REGEX.test(email) || email.length > 254) { ... }
if (firstName.length > 100 || lastName.length > 100) { ... }
if (!ALLOWED_ROLES.includes(role)) { ... }
```

---

### 2. `web/next.config.ts` — Security-Headers & CORS

**Problem:** Keine HTTP-Security-Headers — die Website war anfällig für Clickjacking, MIME-Sniffing und fehlende Referrer-Kontrolle. API-Endpoints waren von jeder Origin erreichbar.

**Änderungen:**
- `X-Frame-Options: DENY` — verhindert Clickjacking via iframe
- `X-Content-Type-Options: nosniff` — verhindert MIME-Type-Sniffing
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` — deaktiviert Kamera, Mikrofon, Geolocation
- `Content-Security-Policy` — erlaubt nur eigene Origin + Sanity CDN + MailerLite
- CORS auf `/api/*` beschränkt auf `startup-contacts.de`

```ts
// Neu hinzugefügt in next.config.ts:
async headers() {
  return [
    { source: '/(.*)', headers: securityHeaders },
    { source: '/api/:path*', headers: corsHeaders }
  ]
}
```

---

### 3. `web/package.json` / `package-lock.json` — Dependency-Updates

**Problem:** `npm audit` meldete mehrere High-Severity-CVEs.

**Gefixt via `npm audit fix --force`:**

| Paket | CVE | Schwere |
|-------|-----|---------|
| `next` 16.1.6 → 16.2.0 | CSRF-Bypass in Server Actions, HTTP Request Smuggling, DoS durch unbegrenzte Cache-Größe | Moderate |
| `flatted` | Unbounded Recursion DoS, Prototype Pollution | High |
| `tar` | Hardlink/Symlink Path Traversal | High |
| `undici` | WebSocket-Parser-Overflow, CRLF-Injection, Request Smuggling | High |

---

## Was nicht geändert wurde (bewusst)

- `.env.local` — war nie committed (`.gitignore` deckt `.env*` ab), kein Leak
- Kein `dangerouslySetInnerHTML` im Code — kein XSS-Risiko
- Sanity-Client korrekt konfiguriert (CDN nur in Production, keine Write-Token im Frontend)

---

## Offene Punkte (manuell in Vercel erledigen)

1. **MailerLite API-Key** als Vercel Secret eintragen (nicht als plain Env-Var)
2. **`NEXT_PUBLIC_SITE_URL=https://www.startup-contacts.de`** als Vercel Env-Var setzen
3. **Sanity Dashboard → API → CORS Origins**: Nur `https://www.startup-contacts.de` erlauben
