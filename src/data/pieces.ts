// Catalogue of DESIGN CONCEPTS for the bespoke collection.
// These are not stock and carry no prices: every piece is made to order after a consultation.
// Photographs are openly licensed placeholders showing garments by other designers (see public/images/credits.json),
// so every piece page says so. Replace `image` with NNUNJICloset's own photography and edit the copy freely.

export const categories = [
  { id: "dresses", label: "Bespoke Dresses", blurb: "Dresses cut to one body, one moment and one personality." },
  { id: "tops", label: "Tailored Tops", blurb: "Blouses, wraps and structured tops that anchor a wardrobe." },
  { id: "skirts", label: "Custom Skirts", blurb: "From precise pencil lines to sweeping tiered volume." },
  { id: "occasion", label: "Occasion Wear", blurb: "Gowns for weddings, galas and the evenings you will remember." },
  { id: "statement", label: "Statement Pieces", blurb: "Sculptural silhouettes designed to be seen and remembered." },
  { id: "limited", label: "Limited Collections", blurb: "Small, numbered capsules built around a single idea." },
] as const;

export type CategoryId = (typeof categories)[number]["id"];

export type Piece = {
  slug: string;
  name: string;
  category: CategoryId;
  /** Short line used on cards. */
  tagline: string;
  image: string;
  imageAlt: string;
  /** Extra images for the detail gallery (atelier and fabric details). */
  details: { image: string; alt: string; caption: string }[];
  description: string[];
  silhouette: string[];
  fabric: string[];
  craftsmanship: string[];
  customisation: { label: string; options: string[] }[];
  idealFor: string[];
  /** Name of a limited collection, if any. */
  collection?: string;
  featured?: boolean;
};

const atelierDetails = {
  cutting: { image: "cutting.jpg", alt: "Hands cutting a marked pattern from cloth with tailoring shears", caption: "Pattern cutting" },
  form: { image: "dress-form.jpg", alt: "A pinstripe jacket on a tailor's dress form with a tape measure draped over it", caption: "Fitting on the form" },
  seamstress: { image: "seamstress.jpg", alt: "A seamstress pinning pink fabric at a work table", caption: "Hand finishing" },
  wax: { image: "wax-print.jpg", alt: "Folded African wax-print fabrics in blue, green and gold", caption: "Print selection" },
  fabrics: { image: "fabrics-nairobi.jpg", alt: "Rows of brightly patterned African fabrics on display", caption: "Fabric library" },
  tools: { image: "tools.jpg", alt: "A tape measure, thread spool and gold embroidery scissors on white", caption: "Tools of the atelier" },
  machine: { image: "atelier-bw.jpg", alt: "Black-and-white photograph of an industrial sewing machine beside folded garments", caption: "Construction" },
};

export const pieces: Piece[] = [
  {
    slug: "midnight-tide-gown",
    name: "The Midnight Tide Gown",
    category: "occasion",
    tagline: "A sheer caped bodice over a sweeping printed train.",
    image: "runway-train.jpg",
    imageAlt: "A model on a runway in a deep teal gown with a sheer caped bodice and a long printed train",
    details: [atelierDetails.form, atelierDetails.cutting, atelierDetails.seamstress],
    description: [
      "Conceived for the evening that deserves an entrance, the Midnight Tide pairs a translucent capelet bodice with a fitted, floor-sweeping skirt that pools into a generous train.",
      "The silhouette is deliberately quiet at the shoulder and dramatic at the hem, so the wearer moves through a room with the gown following a half-step behind.",
    ],
    silhouette: ["Fitted through the bodice, waist and hip", "Sheer cape-sleeve overlay falling to the elbow", "Fluted hem with a sweep train"],
    fabric: ["Shown in a printed satin-faced base with a chiffon overlay", "Can be developed in silk crepe, duchess satin or a client-chosen print", "Lined for structure and comfort"],
    craftsmanship: ["Pattern drafted from the client's own measurements", "Internal boning and a waist stay to hold the line", "Hand-rolled hems on the overlay"],
    customisation: [
      { label: "Neckline", options: ["Bateau", "Sweetheart under sheer", "High illusion neck"] },
      { label: "Sleeve", options: ["Capelet (as shown)", "Full sheer sleeve", "Sleeveless"] },
      { label: "Train", options: ["Sweep", "Chapel", "Detachable"] },
    ],
    idealFor: ["Galas and black-tie dinners", "Evening weddings", "Award ceremonies"],
    featured: true,
  },
  {
    slug: "rouge-mermaid-gown",
    name: "The Rouge Mermaid Gown",
    category: "occasion",
    tagline: "Floral print sculpted into a dramatic fishtail.",
    image: "runway-mermaid.jpg",
    imageAlt: "A model on a runway in a fitted red and ivory floral gown flaring into a mermaid hem",
    details: [atelierDetails.wax, atelierDetails.form, atelierDetails.machine],
    description: [
      "A study in contour: the Rouge Mermaid holds close from collarbone to knee before releasing into tiered, flared volume.",
      "Print placement is planned panel by panel so the pattern travels with the body rather than breaking at the seams.",
    ],
    silhouette: ["High round neck with short sleeve", "Body-skimming to the knee", "Godet-flared mermaid hem"],
    fabric: ["Shown in a red-and-ivory floral print", "Suits stretch crepe, brocade or structured cotton print", "Optional contrast lining at the flare"],
    craftsmanship: ["Print matched across every seam", "Godets set by hand for an even flare", "Invisible centre-back closure"],
    customisation: [
      { label: "Sleeve", options: ["Cap sleeve (as shown)", "Long fitted sleeve", "Off-shoulder"] },
      { label: "Hem", options: ["Floor length", "Sweep train"] },
      { label: "Print", options: ["Floral", "Client-sourced fabric", "Solid colour"] },
    ],
    idealFor: ["Wedding guests and bridal parties", "Evening receptions", "Milestone celebrations"],
    featured: true,
  },
  {
    slug: "lace-bridal-gown",
    name: "The Lace Bridal Gown",
    category: "occasion",
    tagline: "Corded lace, a sheer back and a full ballgown skirt.",
    image: "bridal.jpg",
    imageAlt: "A bride seen from behind in a white lace ballgown with a sheer back and floral appliqué, holding a bouquet",
    details: [atelierDetails.seamstress, atelierDetails.form, atelierDetails.tools],
    description: [
      "A bridal commission begins with a conversation about the day, the venue and the woman wearing the gown, long before a single piece of lace is cut.",
      "This concept balances a softly structured bodice and a sheer, appliquéd back with a skirt full enough to fill a church aisle.",
    ],
    silhouette: ["Fitted bodice with sheer illusion back", "Long lace sleeves", "Full ballgown skirt"],
    fabric: ["Corded or guipure lace appliqué", "Tulle and organza skirt layers", "Silk or satin lining"],
    craftsmanship: ["Lace motifs cut out and placed by hand", "Multiple fittings over the build", "Covered buttons and loop closure"],
    customisation: [
      { label: "Back", options: ["Sheer illusion (as shown)", "Low V", "Closed back"] },
      { label: "Skirt", options: ["Ballgown", "A-line", "Convertible with detachable overskirt"] },
      { label: "Second look", options: ["None", "Reception dress", "Traditional ceremony outfit"] },
    ],
    idealFor: ["Church and garden weddings", "Second-look reception changes", "Vow renewals"],
  },
  {
    slug: "medallion-shift-dress",
    name: "The Medallion Shift Dress",
    category: "dresses",
    tagline: "Clean shift lines framed by a placed medallion print.",
    image: "bilara-dress.jpg",
    imageAlt: "A model in a sleeveless shift dress of ivory geometric print with a large green medallion motif and green trim",
    details: [atelierDetails.wax, atelierDetails.cutting, atelierDetails.tools],
    description: [
      "The Medallion Shift is a lesson in restraint: a simple shape that lets one carefully placed motif do the talking.",
      "Designed to move from boardroom to evening with nothing more than a change of jewellery.",
    ],
    silhouette: ["Square neckline", "Straight shift falling just above the knee", "Contrast trim at the neck and hem"],
    fabric: ["Shown in printed cotton with a contrast piping trim", "Suits cotton sateen, linen blends or wax print"],
    craftsmanship: ["Motif positioned during cutting, not left to chance", "Self-faced neckline for a clean edge", "Side-seam pockets on request"],
    customisation: [
      { label: "Length", options: ["Above knee (as shown)", "Knee", "Midi"] },
      { label: "Sleeve", options: ["Sleeveless", "Cap sleeve", "Three-quarter sleeve"] },
      { label: "Pockets", options: ["None", "Side-seam pockets"] },
    ],
    idealFor: ["Workwear with personality", "Daytime events", "Travel capsules"],
    collection: "The Medallion Edit",
  },
  {
    slug: "bell-sleeve-kitenge-dress",
    name: "The Bell-Sleeve Kitenge Dress",
    category: "dresses",
    tagline: "Easy kitenge volume with sculpted bell sleeves.",
    image: "kitenge-sleeve.jpg",
    imageAlt: "A model leaning on a weathered wooden wall wearing a blue-green kitenge dress with wide bell sleeves",
    details: [atelierDetails.fabrics, atelierDetails.machine, atelierDetails.seamstress],
    description: [
      "Relaxed through the body and expressive at the arm, this dress is designed for warm afternoons and long conversations.",
      "Its proportions are adjusted to each client so the volume flatters rather than overwhelms.",
    ],
    silhouette: ["Round neck", "Loose trapeze body", "Tiered bell sleeves to the elbow"],
    fabric: ["Shown in kitenge cotton print", "Suits kitenge, kanga-inspired prints or linen"],
    craftsmanship: ["Sleeve tiers gathered and finished by hand", "French seams inside", "Pattern balanced to the client's shoulder width"],
    customisation: [
      { label: "Length", options: ["Midi", "Maxi", "Mini"] },
      { label: "Waist", options: ["Loose (as shown)", "Self-tie belt", "Elasticated back"] },
      { label: "Sleeve volume", options: ["Dramatic", "Softened"] },
    ],
    idealFor: ["Weekend gatherings", "Holidays and travel", "Cultural celebrations"],
  },
  {
    slug: "gilded-garden-gown",
    name: "The Gilded Garden Gown",
    category: "dresses",
    tagline: "A long column of golden print with a sculpted bodice.",
    image: "runway-gold.jpg",
    imageAlt: "A model on a dimly lit runway in a long gold and green printed column gown",
    details: [atelierDetails.form, atelierDetails.wax, atelierDetails.machine],
    description: [
      "A floor-length column that reads as quietly regal: a fitted bodice, a gently gathered skirt and a print chosen to catch the light.",
      "A versatile commission that can be dressed up for a reception or softened for a garden lunch.",
    ],
    silhouette: ["Fitted, corset-seamed bodice", "Gathered column skirt to the floor", "Optional shoulder straps"],
    fabric: ["Shown in a gold-ground printed cotton", "Suits brocade, metallic jacquard or silk print"],
    craftsmanship: ["Princess seams shaped over multiple fittings", "Hand-gathered waist", "Fully lined bodice"],
    customisation: [
      { label: "Bodice", options: ["Strapless", "Halter", "Wide strap"] },
      { label: "Skirt", options: ["Gathered column (as shown)", "Pleated", "A-line"] },
      { label: "Finish", options: ["Matte", "Metallic thread detail"] },
    ],
    idealFor: ["Formal daytime events", "Receptions", "Family celebrations"],
  },
  {
    slug: "atelier-poet-blouse",
    name: "The Atelier Poet Blouse",
    category: "tops",
    tagline: "Crisp ivory cotton with voluminous gathered sleeves.",
    image: "blouse-sleeves.jpg",
    imageAlt: "A woman in a crisp white blouse with a square neck and large gathered sleeves, standing beside a market stall",
    details: [atelierDetails.tools, atelierDetails.seamstress, atelierDetails.cutting],
    description: [
      "The white shirt, reconsidered. A square neckline and fitted bodice anchor sleeves that open like sails.",
      "A wardrobe cornerstone that pairs as easily with tailored trousers as with a printed maxi skirt.",
    ],
    silhouette: ["Square neckline", "Fitted, cropped-to-waist bodice", "Gathered statement sleeves with fitted cuffs"],
    fabric: ["Shown in white cotton poplin", "Suits poplin, organza, linen or silk"],
    craftsmanship: ["Sleeve heads hand-gathered for even volume", "Narrow rolled hem", "Hidden side zip"],
    customisation: [
      { label: "Sleeve", options: ["Full gathered (as shown)", "Puff to elbow", "Bishop sleeve"] },
      { label: "Neckline", options: ["Square", "Sweetheart", "Boat neck"] },
      { label: "Colour", options: ["Ivory", "Black", "Taupe", "Client choice"] },
    ],
    idealFor: ["Smart-casual wardrobes", "Creative workplaces", "Pairing with statement skirts"],
    featured: true,
  },
  {
    slug: "wrapped-print-jacket",
    name: "The Wrapped Print Jacket",
    category: "tops",
    tagline: "A cropped kimono-sleeve wrap in bold print.",
    image: "kitenge-throw.jpg",
    imageAlt: "A model on an outdoor stage in a bold red, blue and yellow printed wrap jacket with wide sleeves and a tied waist",
    details: [atelierDetails.fabrics, atelierDetails.cutting, atelierDetails.machine],
    description: [
      "A structured wrap with wide kimono sleeves and a sash that cinches the waist: a jacket that turns jeans and a white tee into a look.",
      "Designed as a layering piece that can travel across seasons and occasions.",
    ],
    silhouette: ["Wide kimono sleeve", "Cropped wrap front with self sash", "Optional peplum"],
    fabric: ["Shown in a bold printed cotton", "Suits wax print, brocade or textured suiting"],
    craftsmanship: ["Interfaced front edges hold their shape", "Contrast lining available", "Hand-finished sash"],
    customisation: [
      { label: "Length", options: ["Cropped (as shown)", "Hip", "Duster"] },
      { label: "Lining", options: ["Self", "Contrast solid", "Unlined"] },
      { label: "Closure", options: ["Sash", "Single button", "Open"] },
    ],
    idealFor: ["Elevated casual looks", "Cultural events", "Layering over dresses"],
  },
  {
    slug: "heritage-pencil-skirt",
    name: "The Heritage Pencil Skirt",
    category: "skirts",
    tagline: "A precise pencil line in a horizontal heritage print.",
    image: "ankara-white.jpg",
    imageAlt: "A model on an outdoor runway in a white top and a knee-length pencil skirt in a striped African print",
    details: [atelierDetails.wax, atelierDetails.form, atelierDetails.tools],
    description: [
      "Tailoring at its most disciplined: a pencil skirt drafted to the client's waist-to-hip proportions so it sits perfectly without pulling.",
      "The horizontal print is aligned across every seam, a small detail that separates bespoke from ready-to-wear.",
    ],
    silhouette: ["High waist", "Pencil line tapering to the knee", "Contrast hem band"],
    fabric: ["Shown in a striped cotton print", "Suits wax print, suiting wool or stretch twill"],
    craftsmanship: ["Stripes matched at side and back seams", "Walking vent or kick pleat", "Fully lined with a waist facing"],
    customisation: [
      { label: "Length", options: ["Knee (as shown)", "Below knee", "Midi"] },
      { label: "Back", options: ["Vent", "Kick pleat", "Slit"] },
      { label: "Waist", options: ["High", "Natural"] },
    ],
    idealFor: ["Office and corporate wear", "Conferences", "Pairing with tailored tops"],
  },
  {
    slug: "tiered-print-maxi-skirt",
    name: "The Tiered Print Maxi Skirt",
    category: "skirts",
    tagline: "Generous tiers that move beautifully with every step.",
    image: "runway-skirt.jpg",
    imageAlt: "A model on a bright runway wearing a black crop top and a full-length tiered skirt in purple, red and blue print",
    details: [atelierDetails.fabrics, atelierDetails.seamstress, atelierDetails.machine],
    description: [
      "A celebration of movement: graduated tiers in a single bold print, balanced so the skirt swings without adding bulk at the hip.",
      "Pair with a fitted crop or the Atelier Poet Blouse for an easy, considered look.",
    ],
    silhouette: ["Fitted yoke at the hip", "Three graduated tiers", "Floor length"],
    fabric: ["Shown in a cotton wax print", "Suits wax print, cotton voile or silk twill"],
    craftsmanship: ["Tier ratios calculated for even drape", "Concealed side pocket", "Hand-finished waistband"],
    customisation: [
      { label: "Tiers", options: ["Three (as shown)", "Two", "Four"] },
      { label: "Waist", options: ["Fitted band", "Paperbag tie"] },
      { label: "Length", options: ["Floor", "Ankle", "Midi"] },
    ],
    idealFor: ["Festive gatherings", "Destination events", "Statement daywear"],
  },
  {
    slug: "saffron-cape-gown",
    name: "The Saffron Cape Gown",
    category: "statement",
    tagline: "Liquid saffron folds with a dramatic cape sleeve.",
    image: "kitenge-orange.jpg",
    imageAlt: "A model on an outdoor stage in a flowing saffron-orange gown with a long draped cape sleeve and embroidered neckline",
    details: [atelierDetails.form, atelierDetails.seamstress, atelierDetails.tools],
    description: [
      "Colour as confidence. The Saffron Cape Gown drapes from an embroidered neckline into a single sweeping cape sleeve that reaches the floor.",
      "A piece for the woman who has decided she will be remembered.",
    ],
    silhouette: ["Embroidered round neckline", "Column body", "Asymmetric floor-length cape sleeve"],
    fabric: ["Shown in a lustrous saffron fabric with embroidered detail", "Suits silk satin, crepe-back satin or shot taffeta"],
    craftsmanship: ["Neckline embroidery placed by hand", "Cape weighted at the hem to fall cleanly", "Internal stays to anchor the drape"],
    customisation: [
      { label: "Cape", options: ["One sleeve (as shown)", "Both sleeves", "Back cape"] },
      { label: "Embroidery", options: ["Tonal", "Gold thread", "Beaded"] },
      { label: "Colour", options: ["Saffron", "Emerald", "Ivory", "Client choice"] },
    ],
    idealFor: ["Cultural ceremonies", "Red-carpet moments", "Statement wedding guest looks"],
    featured: true,
  },
  {
    slug: "organza-cloud-dress",
    name: "The Organza Cloud Dress",
    category: "statement",
    tagline: "Sheer billowing sleeves and soft geometric appliqué.",
    image: "organza-runway.jpg",
    imageAlt: "A model on a runway in a blush organza dress with billowing sheer sleeves and pastel geometric appliqué",
    details: [atelierDetails.seamstress, atelierDetails.tools, atelierDetails.cutting],
    description: [
      "Lightness made architectural. Layers of organza create volume that floats rather than weighs, with patchwork appliqué adding a painterly touch.",
      "An editorial piece that photographs as beautifully as it wears.",
    ],
    silhouette: ["High neck", "Oversized balloon sleeves", "Layered A-line skirt to the knee"],
    fabric: ["Shown in blush organza with pastel appliqué", "Suits silk organza, tulle or gazar"],
    craftsmanship: ["Appliqué shapes cut and set by hand", "Sleeve volume built from layered organza", "Finished with narrow French seams"],
    customisation: [
      { label: "Length", options: ["Knee (as shown)", "Midi", "Floor"] },
      { label: "Appliqué", options: ["Geometric", "Floral", "None"] },
      { label: "Colour", options: ["Blush", "Ivory", "Black"] },
    ],
    idealFor: ["Editorial shoots", "Art and fashion events", "Garden parties"],
  },
  {
    slug: "cobalt-cape-gown",
    name: "The Cobalt Cape Gown",
    category: "statement",
    tagline: "A fitted print gown framed by a floor-length chiffon cape.",
    image: "cape-gown.jpg",
    imageAlt: "A model on curved white stairs in a fitted floral print gown with a cobalt-blue chiffon cape",
    details: [atelierDetails.form, atelierDetails.fabrics, atelierDetails.seamstress],
    description: [
      "Two textures in conversation: a body-skimming print gown and a weightless cobalt chiffon cape that trails behind.",
      "The cape can be detached, turning one commission into two distinct evening looks.",
    ],
    silhouette: ["Strapless sweetheart bodice", "Fitted mermaid gown", "Detachable shoulder cape to the floor"],
    fabric: ["Shown in floral print with cobalt chiffon", "Suits stretch print, brocade or satin with silk chiffon"],
    craftsmanship: ["Cape attached with discreet hand-sewn hooks", "Corsetry inside the bodice", "Rolled-hem chiffon"],
    customisation: [
      { label: "Cape", options: ["Detachable (as shown)", "Fixed", "None"] },
      { label: "Cape colour", options: ["Cobalt", "Black", "Champagne", "Client choice"] },
      { label: "Gown print", options: ["Floral", "Solid", "Client-sourced"] },
    ],
    idealFor: ["Evening weddings", "Dinners and galas", "Pre-wedding shoots"],
    featured: true,
  },
  {
    slug: "medallion-coat-ensemble",
    name: "The Medallion Coat Ensemble",
    category: "limited",
    tagline: "A matching coat and dress in placed medallion print.",
    image: "bilara-coat.jpg",
    imageAlt: "A model wearing a long ivory printed coat with green medallion motifs and trim over a matching dress",
    details: [atelierDetails.wax, atelierDetails.form, atelierDetails.cutting],
    description: [
      "The anchor of The Medallion Edit capsule: an unstructured long coat lined in mint, worn over a coordinating shift.",
      "Limited pieces are made in small numbers so each client's ensemble remains rare.",
    ],
    silhouette: ["Collarless open-front coat", "Three-quarter sleeves with contrast cuffs", "Coordinating shift underneath"],
    fabric: ["Shown in printed cotton with contrast trim and lining", "Suits cotton sateen, linen or lightweight wool"],
    craftsmanship: ["Motifs mirrored across the coat fronts", "Contrast lining bagged and hand-closed", "Matching piping throughout"],
    customisation: [
      { label: "Coat length", options: ["Knee (as shown)", "Midi", "Cropped"] },
      { label: "Lining", options: ["Mint contrast", "Ivory", "Client choice"] },
      { label: "Ensemble", options: ["Coat and dress", "Coat only", "Coat and trousers"] },
    ],
    idealFor: ["Statement daywear", "Church and ceremonies", "Travel and events"],
    collection: "The Medallion Edit",
  },
  {
    slug: "ivory-drape-jumpsuit",
    name: "The Ivory Drape Jumpsuit",
    category: "limited",
    tagline: "A strapless ivory jumpsuit with a sculpted gold waist.",
    image: "white-jumpsuit.jpg",
    imageAlt: "A model outdoors in a strapless ivory jumpsuit with draped legs and a gold waist detail",
    details: [atelierDetails.form, atelierDetails.seamstress, atelierDetails.tools],
    description: [
      "A modern alternative to the gown: a strapless ivory jumpsuit with fluid draped legs and a gold accent at the waist.",
      "Part of the Ivory Hours capsule, conceived for civil ceremonies, rehearsal dinners and second looks.",
    ],
    silhouette: ["Strapless straight neckline", "Defined waist with gold detail", "Wide draped trouser leg"],
    fabric: ["Shown in ivory crepe", "Suits heavy crepe, silk cady or satin-back crepe"],
    craftsmanship: ["Bodice boned for a secure strapless fit", "Drape set on the form, not flat", "Hand-finished waist detail"],
    customisation: [
      { label: "Neckline", options: ["Strapless (as shown)", "One shoulder", "Halter"] },
      { label: "Waist detail", options: ["Gold", "Self-fabric", "Pearl"] },
      { label: "Leg", options: ["Draped wide", "Straight", "Palazzo"] },
    ],
    idealFor: ["Civil and destination weddings", "Rehearsal dinners", "Second looks"],
    collection: "Ivory Hours",
  },
];

export const pieceBySlug = (slug: string) => pieces.find((p) => p.slug === slug);
export const categoryLabel = (id: CategoryId) => categories.find((c) => c.id === id)?.label ?? id;
