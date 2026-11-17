import { useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowDown } from "lucide-react";
import { siteConfig } from "../../siteConfig";
import { pieceBySlug } from "@/data/pieces";
import { identities, process, stories, testimonials } from "@/data/content";
import { useSeo } from "@/lib/seo";
import { cn, img } from "@/lib/utils";
import { DemoTag, Kicker, PieceCard, Reveal, RevealImage, SectionHeading } from "@/components/ui";

export default function Home() {
  useSeo({
    title: "NNUNJICloset | Bespoke Couture & Personal Styling in Lavington, Nairobi",
    description:
      "Where individuality becomes art. NNUNJICloset creates bespoke couture, tailored pieces and personal styling from its atelier at 38 Muthangari Road, Lavington, Nairobi.",
    path: "/",
  });
  return (
    <>
      <Hero />
      <Marquee />
      <Manifesto />
      <Featured />
      <Story />
      <Identities />
      <Craft />
      <Editorial />
      <Testimonials />
      <ClosingCta />
    </>
  );
}

/* ---------- Hero ---------- */

function Hero() {
  return (
    <section className="grain relative isolate flex min-h-[100svh] overflow-hidden bg-noir text-ivory" aria-labelledby="hero-title">
      <div className="absolute inset-0 -z-10 md:left-[36%]">
        <img
          src={img("runway-train.jpg")}
          alt="A model on a runway in a deep teal gown with a sheer caped bodice and a long printed train"
          fetchPriority="high"
          className="settle h-full w-full object-cover object-[50%_18%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/55 to-noir/20 md:bg-gradient-to-r md:from-noir md:via-noir/25 md:to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-noir/90 to-transparent" />
      </div>

      {/* Inset plate */}
      <div className="unveil absolute top-[22%] right-[5%] z-0 hidden w-[12vw] max-w-[210px] min-w-[150px] border border-gold/40 bg-noir/40 p-2 xl:block" style={{ "--d": "700ms" } as CSSProperties}>
        <img src={img("cape-gown.jpg")} alt="" className="aspect-[3/4] w-full object-cover" />
      </div>

      <div className="wrap flex min-h-[100svh] flex-col justify-end pt-40 pb-16 sm:pb-20">
        <div className="max-w-3xl">
          <Kicker light className="rise">Bespoke Couture Atelier · Lavington, Nairobi</Kicker>
          <h1 id="hero-title" className="display-xxl rise mt-8 text-ivory" style={{ "--d": "150ms" } as CSSProperties}>
            Where Individuality
            <br />
            <span className="text-gold-soft italic">Becomes Art.</span>
          </h1>
          <p className="rise mt-8 max-w-lg text-[1.05rem] leading-relaxed font-light text-ivory/75 sm:text-lg" style={{ "--d": "300ms" } as CSSProperties}>
            Bespoke garments and personal styling for women who dress with intention. Every piece is designed around one person, cut to her measurements and finished by hand.
          </p>
          <div className="rise mt-10 flex flex-wrap gap-3" style={{ "--d": "450ms" } as CSSProperties}>
            <Link to="/collection" className="btn btn-gold">
              <span>Discover the Collection</span>
            </Link>
            <Link to="/styling#book" className="btn btn-ghost-light">
              <span>Book a Styling Consultation</span>
            </Link>
          </div>
        </div>

        <div className="fade-in mt-16 flex items-end justify-between gap-6 border-t border-ivory/12 pt-6 text-[0.62rem] tracking-[0.26em] text-ivory/50 uppercase" style={{ "--d": "900ms" } as CSSProperties}>
          <a href="#manifesto" className="inline-flex items-center gap-3 hover:text-gold-soft">
            <ArrowDown className="h-3.5 w-3.5 animate-bounce" aria-hidden="true" /> Scroll
          </a>
          <p className="text-right">
            Plate I · The Midnight Tide Gown, concept
            <span className="mt-1 block tracking-[0.14em] normal-case text-ivory/40">Placeholder photograph, see photo credits</span>
          </p>
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const words = ["Bespoke Couture", "Personal Styling", "Wardrobe Transformation", "Occasion Wear", "Made to Measure", "Lavington, Nairobi"];
  const row = [...words, ...words];
  return (
    <div className="overflow-hidden border-y border-ivory/8 bg-noir-2 py-5 text-ivory/60" aria-hidden="true">
      <div className="marquee flex w-max gap-12 whitespace-nowrap">
        {row.map((w, i) => (
          <span key={i} className="flex items-center gap-12 font-display text-xl italic sm:text-2xl">
            {w} <span className="h-1.5 w-1.5 rotate-45 bg-gold not-italic" />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------- Manifesto ---------- */

function Manifesto() {
  return (
    <section id="manifesto" className="scroll-mt-16 bg-ivory py-28 sm:py-40">
      <div className="wrap">
        <Reveal className="mx-auto max-w-5xl text-center">
          <Kicker className="justify-center">The House Philosophy</Kicker>
          <p className="mt-10 font-display text-[clamp(2rem,4.6vw,4.1rem)] leading-[1.1] text-noir">
            Redefine Couture. <span className="text-gold-deep italic">Reinvent Confidence.</span>
          </p>
          <p className="lead mx-auto mt-10 max-w-2xl">
            We believe the most beautiful garment is the one that could only belong to you. NNUNJICloset exists to translate personality into silhouette, and confidence into something you can wear.
          </p>
        </Reveal>
        <div className="mx-auto mt-20 grid max-w-5xl gap-px bg-line sm:grid-cols-3">
          {[
            ["Individuality", "No templates and no copies. Each commission begins with who you are."],
            ["Craftsmanship", "Patterns drafted to your measurements, refined over unhurried fittings."],
            ["Confidence", "Clothes that change how you stand, speak and enter a room."],
          ].map(([t, d], i) => (
            <Reveal key={t} delay={i * 120} className="bg-ivory px-6 py-8 text-center sm:px-8">
              <p className="font-display text-sm text-gold-deep">0{i + 1}</p>
              <h3 className="mt-3 font-display text-2xl text-noir">{t}</h3>
              <p className="mt-3 text-[0.95rem] font-light text-ink/70">{d}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Featured pieces ---------- */

function Featured() {
  const featured = ["midnight-tide-gown", "saffron-cape-gown", "atelier-poet-blouse", "cobalt-cape-gown"].map((s) => pieceBySlug(s)!);
  const offsets = ["lg:mt-0", "lg:mt-28", "lg:mt-10", "lg:mt-40"];
  return (
    <section className="bg-ivory-2 py-24 sm:py-32" aria-labelledby="featured-title">
      <div className="wrap">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            kicker="Featured Couture"
            title={<span id="featured-title">Pieces made to be <em className="text-gold-deep">remembered</em></span>}
            intro="A selection of design concepts from the bespoke collection. Every piece is made to order and fully customisable."
          />
          <Reveal>
            <Link to="/collection" className="link-line text-noir">
              View the full collection <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p, i) => (
            <div key={p.slug} className={offsets[i]}>
              <PieceCard piece={p} delay={i * 110} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Story ---------- */

function Story() {
  return (
    <section className="overflow-hidden bg-ivory py-24 sm:py-36" aria-labelledby="story-title">
      <div className="wrap grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
        <div className="relative pb-24 sm:pb-32">
          <RevealImage src="dress-form.jpg" alt="A tailored pinstripe jacket on a dress form with a tape measure draped over the shoulders" className="aspect-[4/5] w-[82%]" imgClassName="object-[30%_50%]" />
          <RevealImage
            src="atelier-bw.jpg"
            alt="Black-and-white photograph of an industrial sewing machine beside folded garments"
            className="absolute right-0 bottom-0 aspect-[4/3] w-[58%] border-[10px] border-ivory"
            delay={300}
          />
          <p className="absolute top-6 -left-3 hidden origin-top-left -rotate-90 text-[0.6rem] tracking-[0.4em] text-taupe uppercase sm:block" style={{ transform: "rotate(-90deg) translateX(-100%)" }}>
            The Atelier · Lavington
          </p>
        </div>
        <Reveal>
          <Kicker>The NNUNJICloset Story</Kicker>
          <h2 id="story-title" className="display-lg mt-6 text-noir">
            Clothing as a quiet <em className="text-gold-deep">declaration</em> of self.
          </h2>
          <div className="mt-8 space-y-5 text-[1.02rem] leading-[1.85] font-light text-ink/80">
            <p>
              NNUNJICloset was imagined as a closet without limits: a place where a woman's wardrobe is not bought off a rail but authored, piece by piece, around her life.
            </p>
            <p>
              From a private atelier on Muthangari Road in Lavington, the house brings together couture technique and African textile heritage, personal styling and patient tailoring, to create clothes that feel inevitable on the person wearing them.
            </p>
            <p className="border-l border-gold pl-5 font-display text-xl text-noir italic">Individuality is not a trend. It is the whole point.</p>
          </div>
          <Link to="/about" className="link-line mt-10 text-noir">
            Discover the atelier <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Signature style identities (tabs) ---------- */

function Identities() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const onKey = (e: KeyboardEvent, i: number) => {
    const n = identities.length;
    let to = -1;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") to = (i + 1) % n;
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") to = (i - 1 + n) % n;
    if (e.key === "Home") to = 0;
    if (e.key === "End") to = n - 1;
    if (to >= 0) {
      e.preventDefault();
      setActive(to);
      tabs.current[to]?.focus();
    }
  };
  const id = identities[active];

  return (
    <section className="grain relative overflow-hidden bg-noir py-24 text-ivory sm:py-36" aria-labelledby="identities-title">
      <div className="wrap relative z-[2]">
        <SectionHeading
          light
          kicker="Signature Style Identities"
          title={<span id="identities-title">Four ways to wear <em className="text-gold-soft">yourself</em></span>}
          intro="Most clients recognise themselves in one identity and borrow from another. They are a starting point for conversation, never a box."
        />
        <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
          <div role="tablist" aria-label="Style identities" aria-orientation="vertical" className="flex flex-col border-t border-ivory/12">
            {identities.map((it, i) => (
              <button
                key={it.name}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                role="tab"
                id={`identity-tab-${i}`}
                aria-selected={i === active}
                aria-controls="identity-panel"
                tabIndex={i === active ? 0 : -1}
                onClick={() => setActive(i)}
                onKeyDown={(e) => onKey(e, i)}
                className="group flex items-baseline gap-6 border-b border-ivory/12 py-6 text-left transition-colors sm:py-7"
              >
                <span className={cn("font-display text-sm transition-colors", i === active ? "text-gold" : "text-ivory/35")}>0{i + 1}</span>
                <span className="flex-1">
                  <span className={cn("block font-display text-[1.65rem] leading-tight transition-colors sm:text-[2.1rem]", i === active ? "text-ivory italic" : "text-ivory/50 group-hover:text-ivory/80")}>
                    {it.name}
                  </span>
                  <span className={cn("mt-1 block text-sm font-light transition-colors", i === active ? "text-gold-soft" : "text-ivory/40")}>{it.line}</span>
                </span>
              </button>
            ))}
          </div>

          <div id="identity-panel" role="tabpanel" aria-labelledby={`identity-tab-${active}`} className="grid gap-8 sm:grid-cols-[1.1fr_1fr] sm:items-end">
            <div className="relative aspect-[3/4] overflow-hidden bg-noir-3">
              {identities.map((it, i) => (
                <img
                  key={it.image}
                  src={img(it.image)}
                  alt={i === active ? it.imageAlt : ""}
                  aria-hidden={i !== active}
                  loading="lazy"
                  className={cn("absolute inset-0 h-full w-full object-cover object-top transition-all duration-[1200ms]", i === active ? "scale-100 opacity-100" : "scale-105 opacity-0")}
                />
              ))}
            </div>
            <div key={active} className="page-enter">
              <p className="text-[0.95rem] leading-[1.85] font-light text-ivory/75">{id.description}</p>
              <p className="mt-8 text-[0.62rem] font-medium tracking-[0.28em] text-gold-soft uppercase">Pieces to explore</p>
              <ul className="mt-4 space-y-2">
                {id.pieces.map((s) => {
                  const p = pieceBySlug(s);
                  return p ? (
                    <li key={s}>
                      <Link to={`/collection/${s}`} className="group inline-flex items-center gap-2 font-display text-lg text-ivory hover:text-gold-soft">
                        {p.name}
                        <ArrowRight className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" aria-hidden="true" />
                      </Link>
                    </li>
                  ) : null;
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Craftsmanship ---------- */

function Craft() {
  return (
    <section className="bg-ivory py-24 sm:py-36" aria-labelledby="craft-title">
      <div className="wrap">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-end">
          <SectionHeading kicker="Craftsmanship & Tailoring" title={<span id="craft-title">Made slowly. Made <em className="text-gold-deep">precisely.</em> Made for you.</span>} />
          <Reveal>
            <p className="lead">
              Bespoke is a process, not a product. Each garment moves through four careful stages, with as many fittings as it takes for the piece to feel like a second skin.
            </p>
          </Reveal>
        </div>
        <ol className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {process.map((s, i) => (
            <Reveal as="li" key={s.step} delay={i * 120}>
              <div className="zoom-frame relative aspect-[4/5] bg-bone">
                <img src={img(s.image)} alt={s.imageAlt} loading="lazy" className="h-full w-full object-cover" />
                <span className="absolute top-4 left-4 font-display text-4xl text-ivory drop-shadow-[0_2px_12px_rgb(0_0_0/0.5)]">{s.step}</span>
              </div>
              <h3 className="mt-6 font-display text-2xl text-noir">{s.title}</h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed font-light text-ink/75">{s.text}</p>
            </Reveal>
          ))}
        </ol>
        <Reveal className="mt-16 grid gap-6 border-t border-line pt-10 sm:grid-cols-3">
          {[
            ["Your measurements", "Every pattern is drafted for one body, never graded from a size chart."],
            ["Your fabric", "Choose from curated fabrics or bring a textile with meaning to you."],
            ["Your timeline", "Timelines are agreed honestly at consultation, never rushed."],
          ].map(([t, d]) => (
            <div key={t}>
              <p className="font-display text-xl text-noir">{t}</p>
              <p className="mt-2 text-sm font-light text-ink/70">{d}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Editorial projects ---------- */

function Editorial() {
  const picks = ["midnight-tide", "print-as-heirloom", "inside-the-atelier"].map((s) => stories.find((x) => x.slug === s)!);
  const [first, ...rest] = picks;
  return (
    <section className="bg-ivory-2 py-24 sm:py-36" aria-labelledby="editorial-title">
      <div className="wrap">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading kicker="Selected Editorial Projects" title={<span id="editorial-title">Stories in <em className="text-gold-deep">cloth</em></span>} />
          <Reveal>
            <Link to="/lookbook" className="link-line text-noir">
              Enter the lookbook <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
        <div className="mt-16 grid gap-6 lg:grid-cols-[1.25fr_1fr]">
          <EditorialCard story={first} className="aspect-[4/5] lg:aspect-auto lg:h-full lg:min-h-[44rem]" />
          <div className="grid gap-6">
            {rest.map((s, i) => (
              <EditorialCard key={s.slug} story={s} className="aspect-[4/3]" delay={(i + 1) * 140} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function EditorialCard({ story, className, delay = 0 }: { story: (typeof stories)[number]; className?: string; delay?: number }) {
  return (
    <Reveal delay={delay}>
      <Link to={`/lookbook#${story.slug}`} className={cn("group zoom-frame relative block h-full overflow-hidden bg-noir", className)}>
        <img src={img(story.cover)} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover object-top opacity-85" />
        <div className="absolute inset-0 bg-gradient-to-t from-noir/90 via-noir/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-6 text-ivory sm:p-9">
          <p className="text-[0.6rem] font-medium tracking-[0.3em] text-gold-soft uppercase">{story.kicker}</p>
          <h3 className="mt-3 font-display text-3xl sm:text-4xl">{story.title}</h3>
          <span className="link-line mt-5 text-ivory/80 group-hover:text-ivory">
            View story <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </span>
        </div>
      </Link>
    </Reveal>
  );
}

/* ---------- Testimonials (demo) ---------- */

function Testimonials() {
  return (
    <section className="bg-ivory py-24 sm:py-32" aria-labelledby="voices-title">
      <div className="wrap">
        <div className="text-center">
          <SectionHeading center kicker="Client Voices" title={<span id="voices-title">In their <em className="text-gold-deep">words</em></span>} />
          <Reveal className="mt-6">
            <DemoTag>Demonstration content · Illustrative testimonials, not real client reviews</DemoTag>
          </Reveal>
        </div>
        <div className="mt-16 grid gap-px bg-line md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal as="figure" key={i} delay={i * 120} className="flex flex-col bg-ivory p-8 sm:p-10">
              <span className="font-display text-6xl leading-none text-gold" aria-hidden="true">"</span>
              <blockquote className="mt-2 flex-1 font-display text-[1.3rem] leading-snug text-noir italic">{t.quote}</blockquote>
              <figcaption className="mt-8 text-[0.66rem] font-medium tracking-[0.24em] text-taupe-deep uppercase">{t.who}</figcaption>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 text-center text-xs text-taupe-deep">
          These placeholders show where genuine, permission-cleared client words will appear.
        </p>
      </div>
    </section>
  );
}

/* ---------- Closing CTA ---------- */

function ClosingCta() {
  return (
    <section className="relative isolate overflow-hidden bg-noir py-32 text-ivory sm:py-44">
      <img src={img("cape-terrace.jpg")} alt="" loading="lazy" className="absolute inset-0 -z-10 h-full w-full object-cover object-[50%_40%] opacity-45" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-noir via-noir/70 to-noir/30" />
      <div className="wrap">
        <Reveal className="max-w-2xl">
          <Kicker light>Private Appointments</Kicker>
          <h2 className="display-xl mt-7 text-ivory">
            Your wardrobe, <em className="text-gold-soft">authored</em> by you.
          </h2>
          <p className="mt-7 max-w-lg text-lg font-light text-ivory/75">
            Begin with a styling consultation at the atelier on Muthangari Road. We will listen first, then design.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link to="/styling#book" className="btn btn-gold">
              <span>Book a Styling Consultation</span>
            </Link>
            <a href={`mailto:${siteConfig.contact.email}`} className="btn btn-ghost-light">
              <span>{siteConfig.contact.email}</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
