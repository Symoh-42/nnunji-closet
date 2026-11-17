// ALL brand-wide details for this website live in this one file: name, contacts, address, hours,
// navigation and the demo banner. Pieces, services, lookbook stories and testimonials live in src/data/.
//
// HONESTY RULES
// - Never invent prices, stock, awards, press features, client names, founding years or testimonials.
// - Any text containing "(confirm)" renders with a visible "TO CONFIRM" label on the page.
// - Leave unknown contact details as "" - the site hides empty fields (or labels them) instead of inventing them.
// - Every photograph is an openly licensed placeholder by another photographer/designer, credited in
//   public/images/credits.json, and is labelled as such until NNUNJICloset supplies its own photography.

export const siteConfig = {
  name: "NNUNJICloset",
  /** The wordmark is split so the logo can set "NNUNJI" and "Closet" differently. */
  wordmark: { primary: "NNUNJI", secondary: "Closet" },
  message: "Redefine Couture. Reinvent Confidence.",
  headline: "Where Individuality Becomes Art.",
  description:
    "NNUNJICloset is a bespoke fashion atelier in Lavington, Nairobi, creating custom couture, tailored pieces and personal styling for women who dress with intention.",
  /** Used for canonical URLs, the sitemap and link previews. Set VITE_SITE_URL in production. */
  siteUrl: (import.meta.env?.VITE_SITE_URL as string | undefined) ?? "https://nnunji-closet.vercel.app",

  contact: {
    /** Publicly listed email supplied in the brief. */
    email: "nnunji@gmail.com",
    /** Leave "" until the atelier confirms a number. Click-to-call and WhatsApp hide or fall back automatically. */
    phone: "" as string,
    /** WhatsApp in international format without "+", e.g. "2547XXXXXXXX". "" = WhatsApp opens and the visitor picks the chat. */
    whatsapp: "" as string,
    address: {
      line1: "38 Muthangari Road",
      area: "Lavington",
      city: "Nairobi",
      country: "Kenya",
    },
    mapQuery: "38 Muthangari Road, Lavington, Nairobi",
    visitNote: "Atelier visits by appointment (confirm)",
    hours: [
      { days: "Monday - Friday", time: "9:00am - 6:00pm (confirm)" },
      { days: "Saturday", time: "10:00am - 4:00pm (confirm)" },
      { days: "Sunday & public holidays", time: "Closed (confirm)" },
    ],
  },

  /** Leave a URL "" to hide that link. None were verified at the time of building this demo. */
  social: {
    instagram: "",
    tiktok: "",
    pinterest: "",
  },

  nav: [
    { label: "Collection", href: "/collection" },
    { label: "Personal Styling", href: "/styling" },
    { label: "Lookbook", href: "/lookbook" },
    { label: "The Atelier", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
};

/** Demo banner shown on top of every page while pitching. `enabled: true` also sets noindex. */
export const demoBanner = {
  enabled: true,
  name: "Simeon",
  whatsapp: "0704 662 432", // local format - links to wa.me automatically
  email: "msimeon937@gmail.com",
};
