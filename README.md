# Ceejay Creations

A React + Tailwind CSS + Framer Motion rebuild of the Ceejay Creations
marketing site — refactored from the original static HTML/CSS/JS portfolio
into a component-driven, high-converting agency site.

## Stack

- **React 18** + **React Router 6** (SPA routing, custom 404)
- **Tailwind CSS** (design tokens in `tailwind.config.js`)
- **Framer Motion** (scroll-in reveals, modal transitions, the sliding nav pill)
- **Lucide React** (icon set)
- **react-helmet-async** (per-page SEO tags)

## Getting started

```bash
npm install
cp .env.example .env      # then fill in your GA4 measurement ID
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

## Project structure

```
src/
  components/   Navbar, Hero, About, Projects, Reviews, Guarantee,
                FAQ, Footer, BookingModal, HireModal, SEO
  pages/        Home, Legal (Terms/Privacy), NotFound (404)
  data/         projects.js, reviews.js, faq.js — edit these to update content
  hooks/        useGoogleAnalytics.js — GA4 page-view + custom event tracking
```

## Configuring analytics & search console

### Performance, security and SEO notes

- Images & Core Web Vitals: Prefer pre-sized, optimized images (WebP/AVIF) hosted on a CDN or generated at build time. Project thumbnails under `src/data/projects.js` reference `/...png` files — ensure these are optimized and available in `public/` or on your CDN. Buttons use Unsplash with WebP format; for production host static images sized for target resolutions.
- Lazy loading: Most images now include `loading="lazy"`. Keep using `loading="lazy"` or React `Suspense` for deferred content.
- Content Security Policy: A basic CSP meta tag is included in `index.html`. Review and harden it for your deployment; removing `unsafe-inline` for styles and scripts is recommended once you configure nonces or hashes.
- Robots & Sitemap: `public/robots.txt` and `public/sitemap.xml` are included as templates — replace example.com with your real site and expand the sitemap or generate it at deploy time.
- Open Graph image: `index.html` has an `og:image` meta and supports overriding via `VITE_OG_IMAGE`.

## Configuring analytics & search console

1. **Google Analytics 4** — create a `.env` file (see `.env.example`) and set
   `VITE_GA_MEASUREMENT_ID` to your GA4 measurement ID (`G-XXXXXXXXXX`). The
   `useGoogleAnalytics` hook injects `gtag.js` once and fires a `page_view`
   event on every route change. Use the exported `trackEvent(name, params)`
   helper to log custom events (already wired into both modals' open/submit
   actions).
2. **Google Search Console** — either replace the `google-site-verification` meta tag in `index.html` with the token Google gives you, or set VITE_GSC_TOKEN in your `.env` (Vite will expose it at build time). The small client script in `index.html` will apply the token to the meta tag when present.

## Editing content

- **Projects / portfolio** — `src/data/projects.js`
- **Client reviews** — `src/data/reviews.js`
- **FAQ** — `src/data/faq.js`
- **Contact email** — configured by `VITE_CONTACT_EMAIL` in `.env`, defaulting to `ceejaycreationofficial@gmail.com`. Set this value to override it; see `.env.example` for a template.
- **WhatsApp inquiries** — both Hire Us and Request a Call submissions open a prefilled WhatsApp message. The destination defaults to `0758934463` in Kenya's international format and can be overridden with `VITE_WHATSAPP_NUMBER`.

## Notes on the booking & hire modals

Both modals are fully controlled React components (`BookingModal.jsx`,
`HireModal.jsx`) — no DOM queries, all state lives in `useState`. On submit,
each opens a prefilled WhatsApp message containing the submitted details and
then shows the local confirmation UI.
