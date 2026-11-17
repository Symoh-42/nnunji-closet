# NNUNJICloset: bespoke fashion atelier website concept

A luxury website concept for **NNUNJICloset**, a bespoke fashion brand at 38 Muthangari Road, Lavington, Nairobi. Its brand line is *"Redefine Couture. Reinvent Confidence."* The site is designed to feel like a couture atelier rather than an online shop: it has no cart, no prices and no stock claims.

**Stack:** React 19 · Vite 7 · TypeScript · Tailwind CSS v4 · React Router 7 · React Hook Form + Zod · Lucide icons. It is frontend-only, with no backend: forms validate locally, then show a summary the visitor can send by email or WhatsApp.

**Design:** rich black (`noir`), ivory, warm taupe and restrained gold. Headings use Bodoni Moda (editorial serif) and body text uses Hanken Grotesk. Motion includes scroll reveals, image "unveil" clips, slow hero settle, hover zooms and a marquee, and all of it is switched off under `prefers-reduced-motion`.

## Run

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build (writes sitemap.xml and robots.txt)
npm run preview
```

## Pages

| Route | Page |
|---|---|
| `/` | Home: editorial hero ("Where Individuality Becomes Art."), marquee, house philosophy, featured couture, brand story, signature style identities (keyboard-accessible tabs), craftsmanship process, editorial projects, demonstration testimonials, closing CTA |
| `/collection` | Bespoke catalogue with six category filters (`?category=dresses` etc.) |
| `/collection/:slug` | Piece page (15 concepts): gallery, description, silhouette, fabric and craftsmanship notes, customisation options, **request-a-piece form**, previous/next, related pieces |
| `/styling` | Personal styling: 5 services, what to expect, **3-step consultation booking** (event type, service, preferred date and time, format, contact details, style notes) |
| `/lookbook` | Editorial portfolio: 5 stories with full-bleed covers, responsive mosaic galleries and a full-screen lightbox (arrow keys, Escape, swipe, focus trap) |
| `/about` | Brand story, values, founder placeholder, visit the atelier |
| `/contact` | Enquiry journey (3 paths), contact details, hours, general enquiry form (`?piece=slug` pre-selects a piece), map and directions |
| `/privacy`, `/photo-credits`, `*` | Privacy notice draft, photo credits, 404 |

## Where to edit

| What | File |
|---|---|
| Name, email, phone, WhatsApp, address, hours, social links, navigation, demo banner | `siteConfig.ts` |
| Catalogue pieces and categories | `src/data/pieces.ts` |
| Styling services, event types, style identities, craft process, lookbook stories, testimonials | `src/data/content.ts` |
| Forms (booking, request-a-piece, enquiry) | `src/components/forms.tsx` |
| Colours, fonts, motion | `src/index.css` (`@theme`) |
| Logo | `Logo` in `src/components/ui.tsx` and `public/favicon.svg` |
| Photos and credits | `public/images/` and `public/images/credits.json` |

## Honesty rules

This concept is pitched to a real business, so nothing is invented:

- **Any text containing `(confirm)` shows a visible TO CONFIRM label.** Remove the marker once NNUNJICloset confirms the detail.
- **Supplied facts only:** the email `nnunji@gmail.com` and the address `38 Muthangari Road, Lavington, Nairobi` came from the brief. Phone, WhatsApp number, opening hours, visit policy and social links are labelled TO CONFIRM. With no WhatsApp number set, WhatsApp opens with the message ready and the visitor chooses the chat.
- **Photography:** every image is an openly licensed placeholder from Wikimedia Commons (CC BY, CC BY-SA or CC0), credited at `/photo-credits`. **The garments shown were made by other designers**, for example at Lagos Fashion & Design Week, by Iris Santos Design, and by Kenyan models photographed for Wiki Loves Africa. Each piece page, the lookbook lightbox, the footer and the demo banner say so. All of them must be replaced with NNUNJICloset's own photography before launch.
- **Catalogue:** the 15 pieces are *design concepts* written to match the placeholder photos. There are no prices, no stock and no lead times. Fabric notes say "Shown in…" and "Suits…" rather than claiming materials.
- **Testimonials:** the three quotes are clearly tagged *Demonstration content · Illustrative testimonials, not real client reviews*, and attributed to "Sample client". Replace them with real, permission-cleared words, or remove the section.
- **Founder and history:** no founder name, biography, founding year, awards or press are given. The About page has a labelled placeholder.
- **Logo:** no official logo was available, so the "NNUNJI / Closet" wordmark is a stand-in.
- **Forms:** not connected to anything. The confirmation screen says *nothing has been sent yet* and offers "Send by email" (opens the visitor's mail app addressed to the supplied email) and "Send on WhatsApp".
- Research note: a web search found no listing for "NNUNJICloset". There is a Nairobi handmade-accessories business called "Nnunji" (Ngong Road), but its connection to this brand is unconfirmed, so none of its details were used.

## Before going live

1. Set `demoBanner.enabled` to `false` in `siteConfig.ts`. This removes the banner and the `noindex` tag, and `robots.txt` will then allow indexing.
2. Set `VITE_SITE_URL` to the production domain so canonical URLs, Open Graph tags and the sitemap point to it.
3. Replace all photography with NNUNJICloset's own work, and update `public/images/credits.json` (or remove the credits page).
4. Resolve every TO CONFIRM label. Add the phone and WhatsApp number, hours, social links, founder profile and official logo.
5. Replace or remove the demonstration testimonials.
6. Connect the forms to an email service or form endpoint (the `onSubmit` handlers in `src/components/forms.tsx`).

## Deploy

**GitHub:** create an empty repo named `nnunji-closet`, then:

```bash
git init && git add . && git commit -m "NNUNJICloset website concept"
git branch -M main
git remote add origin https://github.com/<you>/nnunji-closet.git
git push -u origin main
```

**Vercel:** import the repo. The framework preset is Vite, the build command is `npm run build` and the output directory is `dist`. `vercel.json` already rewrites routes to `index.html` for client-side routing, and `public/_redirects` does the same on Netlify. Add the `VITE_SITE_URL` environment variable.
