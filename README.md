# Cartospatial Technologies – Website (Astro)

Land survey company website for **https://cartospatialtechnologies.com** – Kumbakonam, serving all 38 districts of Tamil Nadu.

## Run locally
```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # static site in ./dist
npm run preview    # preview the production build
npm run images     # re-optimise photos from /assets into /public/img (run after adding photos)
```

## Structure
| Path | What it is |
|---|---|
| `src/data/site.ts` | Phone, email, address, social links – edit business details here once |
| `src/data/services.ts` | 8 services: SEO titles, descriptions, Tamil text, FAQs |
| `src/data/districts.ts` | All 38 Tamil Nadu districts (towns, tags, coordinates) and the 10 city pages |
| `src/data/pricing.ts` | Cost-estimator settings – **add real rates and set `SHOW_PRICES = true`** |
| `src/data/faqs.ts` | Site-wide English & Tamil FAQs |
| `src/content/` | Original page content carried over from the HTML site |
| `src/pages/` | Routes (English, `/ta/` Tamil, `/locations/`, `/services/<service>/<city>/`) |
| `assets/` | Original full-size photos (not deployed) |
| `public/img/` | Optimised WebP images that are deployed |

## Pages generated (106)
- Home, About, Team, Projects (+ field photo gallery), Contact, FAQ, Cost Estimator, 404
- 8 service pages + services index
- 38 district pages + locations index with interactive map and "Do you serve my district?" checker
- 40 "<service> in <city>" pages (Total Station / DGPS / Drone / LiDAR × 10 major cities)
- Tamil: home, 8 services, contact (with hreflang links)

## Configuration (`.env`, see `.env.example`)
- `PUBLIC_GA_ID` – Google Analytics 4 (tracks calls, WhatsApp, leads, estimator)
- `PUBLIC_GSC_VERIFICATION` – Google Search Console
- `PUBLIC_WEB3FORMS_KEY` – email every enquiry
- `PUBLIC_SHEETS_WEBHOOK` – log every enquiry in Google Sheets (`docs/google-sheet-leads.md`)

## Deploy
Works on Vercel, Netlify or Cloudflare Pages (build `npm run build`, output `dist`).
301 redirects from the old `/pages/*.html` URLs are in `vercel.json` and `public/_redirects`.
After going live: submit `https://cartospatialtechnologies.com/sitemap-index.xml` in Google Search Console and link the site from the Google Business Profile.
