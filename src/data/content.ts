// Services, style identities, lookbook stories, craft process and demonstration testimonials.
// Durations, formats and anything marked "(confirm)" must be checked with NNUNJICloset before going live.

export type Service = {
  slug: string;
  name: string;
  summary: string;
  image: string;
  imageAlt: string;
  includes: string[];
  idealFor: string;
  format: string;
};

export const services: Service[] = [
  {
    slug: "wardrobe-consultation",
    name: "Personal Wardrobe Consultation",
    summary:
      "An unhurried conversation about how you live, what you love and what no longer serves you, ending with a clear direction for your wardrobe.",
    image: "dress-form.jpg",
    imageAlt: "A tailored pinstripe jacket on a dress form with a tape measure",
    includes: ["Lifestyle and style-goals conversation", "Body proportion and colour notes", "A written style direction to keep"],
    idealFor: "Anyone who wants to dress with more intention",
    format: "In the Lavington atelier, around 90 minutes (confirm)",
  },
  {
    slug: "image-consulting",
    name: "Image Consulting",
    summary:
      "For leaders, founders and public figures whose clothing speaks before they do. We define a personal image that is authentic, consistent and quietly powerful.",
    image: "portrait-bw.jpg",
    imageAlt: "Black-and-white portrait of a woman with braided hair and layered beaded necklaces",
    includes: ["Personal brand and audience review", "Signature palette and silhouettes", "Guidance for stage, camera and boardroom"],
    idealFor: "Professionals, speakers and public-facing roles",
    format: "Atelier sessions plus follow-up (confirm)",
  },
  {
    slug: "wardrobe-makeover",
    name: "Wardrobe Makeover",
    summary:
      "We work through your existing wardrobe piece by piece, keeping what works, reimagining what could and identifying the few pieces worth commissioning.",
    image: "fabrics-nairobi.jpg",
    imageAlt: "A wall of colourful patterned fabrics on display",
    includes: ["Closet edit and outfit building", "Alteration and restyling recommendations", "A shortlist of bespoke pieces to complete the wardrobe"],
    idealFor: "A new chapter, a new role or a fresh start",
    format: "At your home in Nairobi or in the atelier (confirm)",
  },
  {
    slug: "occasion-styling",
    name: "Occasion Styling",
    summary:
      "Weddings, galas, ruracio, graduations, launches. We style the whole look, from silhouette and fabric to accessories and the final fitting.",
    image: "runway-mermaid.jpg",
    imageAlt: "A model in a red floral mermaid gown on a runway",
    includes: ["Event brief and dress-code guidance", "Look design and sourcing", "Final fitting and day-of styling notes"],
    idealFor: "Brides, wedding parties, guests and honourees",
    format: "Scheduled around your event date (confirm)",
  },
  {
    slug: "bespoke-creation",
    name: "Bespoke Outfit Creation",
    summary:
      "From first sketch to final stitch: a garment designed for you alone, cut from your measurements and refined over a series of fittings.",
    image: "cutting.jpg",
    imageAlt: "Hands cutting fabric with tailoring shears along a chalk line",
    includes: ["Design consultation and sketches", "Fabric selection or client-sourced fabric", "Measurements and fittings until it is right"],
    idealFor: "Anyone wanting a piece that exists nowhere else",
    format: "Timeline agreed at consultation (confirm)",
  },
];

export const eventTypes = [
  "Wedding (bride)",
  "Wedding (guest or bridal party)",
  "Traditional ceremony / ruracio",
  "Gala or black-tie",
  "Corporate or professional image",
  "Graduation or milestone",
  "Everyday wardrobe",
  "Something else",
];

export type Identity = { name: string; line: string; description: string; image: string; imageAlt: string; pieces: string[] };

export const identities: Identity[] = [
  {
    name: "The Modern Heirloom",
    line: "Heritage prints, tailored with precision.",
    description:
      "For the woman who carries her roots with pride and wears them with polish. African prints and textiles cut into clean, contemporary lines that will still feel right in twenty years.",
    image: "bilara-pair.jpg",
    imageAlt: "Two models in fitted printed dresses, one with a ruffled shoulder",
    pieces: ["medallion-shift-dress", "heritage-pencil-skirt", "medallion-coat-ensemble"],
  },
  {
    name: "The Evening Romantic",
    line: "Trains, capes and the art of an entrance.",
    description:
      "Gowns that move like water and hold like architecture. Drama, but never costume: every flourish is balanced so the woman is always seen before the dress.",
    image: "runway-train.jpg",
    imageAlt: "A model on a runway in a teal gown with a long printed train",
    pieces: ["midnight-tide-gown", "cobalt-cape-gown", "rouge-mermaid-gown"],
  },
  {
    name: "The Sculpted Minimalist",
    line: "Ivory, line and quiet confidence.",
    description:
      "A restrained palette and strong shapes. Considered necklines, precise drape and a single detail that rewards a second look.",
    image: "white-jumpsuit.jpg",
    imageAlt: "A model in a strapless ivory jumpsuit with a gold waist detail",
    pieces: ["ivory-drape-jumpsuit", "atelier-poet-blouse"],
  },
  {
    name: "The Colour Maximalist",
    line: "Joyful print, generous volume.",
    description:
      "For the woman who dresses in full colour. Saturated hues, bold prints and silhouettes with movement, composed so that every element belongs.",
    image: "kitenge-orange.jpg",
    imageAlt: "A model in a flowing saffron gown with a long cape sleeve",
    pieces: ["saffron-cape-gown", "tiered-print-maxi-skirt", "wrapped-print-jacket"],
  },
];

export const process = [
  {
    step: "I",
    title: "Consultation",
    text: "We begin with you: your occasion, lifestyle, references and the feeling you want to carry. Measurements are taken with care.",
    image: "tools.jpg",
    imageAlt: "A tape measure, thread and gold scissors",
  },
  {
    step: "II",
    title: "Design & Fabric",
    text: "Sketches, silhouettes and fabric swatches are refined together until the design feels unmistakably yours.",
    image: "wax-print.jpg",
    imageAlt: "Folded wax-print fabrics",
  },
  {
    step: "III",
    title: "Pattern & Fittings",
    text: "A pattern is drafted to your measurements and the garment is fitted and adjusted in stages, never rushed.",
    image: "cutting.jpg",
    imageAlt: "Hands cutting a pattern from fabric",
  },
  {
    step: "IV",
    title: "Finishing & Handover",
    text: "Hand finishing, a final fitting and pressing. Your piece leaves the atelier ready for its moment.",
    image: "seamstress.jpg",
    imageAlt: "A seamstress pinning fabric by hand",
  },
];

export type Story = {
  slug: string;
  title: string;
  kicker: string;
  intro: string;
  cover: string;
  images: { image: string; alt: string; caption?: string; span?: "tall" | "wide" }[];
};

export const stories: Story[] = [
  {
    slug: "midnight-tide",
    title: "Midnight Tide",
    kicker: "Fashion story · Evening",
    intro:
      "An evening story told in deep water tones. Trains that follow a half-step behind, sheer capes and silhouettes built for the moment the room turns to look.",
    cover: "runway-train.jpg",
    images: [
      { image: "runway-train.jpg", alt: "A teal gown with a sheer cape bodice and printed train on a runway", caption: "Caped bodice, sweep train", span: "tall" },
      { image: "runway-dark.jpg", alt: "A model on a dark runway in a black gown with cut-out detail", caption: "Shadow and line" },
      { image: "black-gown.jpg", alt: "A woman seated on the floor in a black strapless evening gown against a dark backdrop", caption: "After hours", span: "wide" },
      { image: "runway-mermaid.jpg", alt: "A red floral mermaid gown on a runway", caption: "The mermaid line", span: "tall" },
      { image: "cape-terrace.jpg", alt: "A model in a print gown and blue cape framed by a curved white arch overlooking gardens", caption: "Cobalt at golden hour" },
    ],
  },
  {
    slug: "print-as-heirloom",
    title: "Print as Heirloom",
    kicker: "Collection highlight",
    intro:
      "Kitenge, wax print and heritage pattern, approached the way a couturier approaches brocade: placed with intention, matched at every seam and cut to last.",
    cover: "kitenge-sleeve.jpg",
    images: [
      { image: "kitenge-sleeve.jpg", alt: "A kitenge dress with bell sleeves against a wooden wall", span: "tall", caption: "Bell sleeves" },
      { image: "kitenge-throw.jpg", alt: "A bold printed wrap jacket on an outdoor stage", caption: "The wrap" },
      { image: "print-skirt.jpg", alt: "A woman on a beach in a full patterned maxi skirt and beaded jewellery", caption: "Coastal light", span: "tall" },
      { image: "ankara-white.jpg", alt: "A white top and striped print pencil skirt on an outdoor runway", caption: "The pencil line" },
      { image: "runway-skirt.jpg", alt: "A tiered print maxi skirt on a bright runway", caption: "Tiers in motion" },
    ],
  },
  {
    slug: "the-medallion-edit",
    title: "The Medallion Edit",
    kicker: "Limited collection",
    intro:
      "A capsule built around one idea: the single, perfectly placed motif. Coats, shifts and columns in ivory and green, made in small numbers.",
    cover: "bilara-pair.jpg",
    images: [
      { image: "bilara-pair.jpg", alt: "Two models in fitted printed dresses", span: "tall", caption: "The pair" },
      { image: "bilara-coat.jpg", alt: "A long printed coat with medallion motifs over a matching dress", caption: "Coat ensemble", span: "tall" },
      { image: "azura.jpg", alt: "A model in a strapless green and gold printed dress with a yellow head wrap", caption: "Column in green", span: "wide" },
      { image: "bilara-dress.jpg", alt: "A sleeveless shift dress with a green medallion motif", caption: "The shift" },
    ],
  },
  {
    slug: "ivory-hours",
    title: "Ivory Hours",
    kicker: "Fashion story · Bridal & ceremony",
    intro:
      "Whites and creams for ceremonies, second looks and quiet mornings. Lace, crisp cotton and sculpted crepe, each with one detail worth noticing.",
    cover: "bridal.jpg",
    images: [
      { image: "bridal.jpg", alt: "A bride from behind in a lace ballgown with a sheer back", span: "tall", caption: "Lace and illusion" },
      { image: "white-jumpsuit.jpg", alt: "An ivory strapless jumpsuit with gold waist detail", caption: "The second look", span: "wide" },
      { image: "blouse-market.jpg", alt: "A woman in a white puff-sleeve blouse and grey skirt in a market", caption: "Poet sleeves", span: "tall" },
      { image: "organza-runway.jpg", alt: "A blush organza dress with billowing sleeves on a runway", caption: "Organza cloud" },
      { image: "portrait-bw.jpg", alt: "Black-and-white portrait of a woman in beaded necklaces", caption: "Portrait" },
    ],
  },
  {
    slug: "inside-the-atelier",
    title: "Inside the Atelier",
    kicker: "Behind the scenes · Craftsmanship",
    intro:
      "Before the photograph, there is the work: chalk lines, pinned seams, the hum of a machine and the patience of many fittings.",
    cover: "dress-form.jpg",
    images: [
      { image: "dress-form.jpg", alt: "A pinstripe jacket on a dress form with tape measure", caption: "On the form", span: "wide" },
      { image: "cutting.jpg", alt: "Hands cutting fabric along a chalk line", caption: "The first cut" },
      { image: "atelier-bw.jpg", alt: "An industrial sewing machine in black and white", caption: "Construction" },
      { image: "seamstress.jpg", alt: "A seamstress pinning pink fabric", caption: "Pinning", span: "wide" },
      { image: "atelier-print.jpg", alt: "Hands guiding printed fabric through a sewing machine", caption: "Print under the needle" },
      { image: "atelier-machine.jpg", alt: "A tailor guiding patterned fabric through an industrial machine", caption: "Topstitching" },
      { image: "tape.jpg", alt: "Coiled yellow and white tailor's tape measures", caption: "Measure twice" },
      { image: "fabrics-nairobi.jpg", alt: "Bright patterned fabrics on display", caption: "The fabric library", span: "wide" },
    ],
  },
];

/**
 * DEMONSTRATION CONTENT. These are not real client reviews. They show where genuine, permission-cleared
 * client words will sit. Replace them (and set `demo: false`) or remove the section before going live.
 */
export const testimonials = [
  {
    quote:
      "I arrived with a folder of screenshots and left with a gown that felt like it had always been mine. Every fitting made it more me.",
    who: "Sample client · Bridal commission",
    demo: true,
  },
  {
    quote:
      "The wardrobe session changed how I get dressed for work. Fewer pieces, better pieces, and I finally know what suits me.",
    who: "Sample client · Image consulting",
    demo: true,
  },
  {
    quote:
      "They listened to what I wanted to feel at my ruracio, not just what I wanted to wear. The print placement was perfect.",
    who: "Sample client · Traditional ceremony",
    demo: true,
  },
];
