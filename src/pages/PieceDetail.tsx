import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { categoryLabel, pieceBySlug, pieces } from "@/data/pieces";
import { useSeo } from "@/lib/seo";
import { cn, img } from "@/lib/utils";
import { Kicker, PhotoCredit, PieceCard, Reveal } from "@/components/ui";
import { PieceRequestForm } from "@/components/forms";
import { NotFound } from "@/pages/Misc";

export default function PieceDetail() {
  const { slug = "" } = useParams();
  const piece = pieceBySlug(slug);
  if (!piece) return <NotFound />;
  return <PieceView key={piece.slug} slug={slug} />;
}

function PieceView({ slug }: { slug: string }) {
  const piece = pieceBySlug(slug)!;
  const gallery = [{ image: piece.image, alt: piece.imageAlt, caption: "The concept" }, ...piece.details];
  const [current, setCurrent] = useState(0);
  const shown = gallery[current];

  useSeo({
    title: `${piece.name} | ${categoryLabel(piece.category)}`,
    description: `${piece.name}: ${piece.tagline} A bespoke ${categoryLabel(piece.category).toLowerCase()} concept by NNUNJICloset, made to order in Nairobi.`,
    path: `/collection/${piece.slug}`,
    image: piece.image,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      name: piece.name,
      description: piece.description[0],
      genre: categoryLabel(piece.category),
    },
  });

  const idx = pieces.findIndex((p) => p.slug === piece.slug);
  const prev = pieces[(idx - 1 + pieces.length) % pieces.length];
  const next = pieces[(idx + 1) % pieces.length];
  const related = [...pieces.filter((p) => p.category === piece.category && p.slug !== piece.slug), ...pieces.filter((p) => p.category !== piece.category && p.slug !== piece.slug)].slice(0, 3);

  return (
    <>
      <div className="h-[5.5rem] bg-noir" aria-hidden="true" />
      <section className="bg-ivory pt-8 pb-24 sm:pt-12">
        <div className="wrap">
          <nav aria-label="Breadcrumb" className="fade-in">
            <ol className="flex flex-wrap items-center gap-2 text-[0.62rem] font-medium tracking-[0.24em] text-taupe-deep uppercase">
              <li><Link to="/" className="hover:text-noir">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link to="/collection" className="hover:text-noir">Collection</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link to={`/collection?category=${piece.category}`} className="hover:text-noir">{categoryLabel(piece.category)}</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-noir" aria-current="page">{piece.name}</li>
            </ol>
          </nav>

          <div className="mt-10 grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
            {/* Gallery */}
            <div className="lg:sticky lg:top-24 lg:self-start">
              <div className="grid gap-4 sm:grid-cols-[5rem_1fr]">
                <ul className="order-2 flex gap-3 sm:order-1 sm:flex-col" aria-label="Gallery images">
                  {gallery.map((g, i) => (
                    <li key={g.image}>
                      <button
                        type="button"
                        onClick={() => setCurrent(i)}
                        aria-label={`Show image ${i + 1}: ${g.caption}`}
                        aria-pressed={i === current}
                        className={cn("block aspect-[3/4] w-16 overflow-hidden border transition-all sm:w-20", i === current ? "border-noir" : "border-transparent opacity-60 hover:opacity-100")}
                      >
                        <img src={img(g.image)} alt="" className="h-full w-full object-cover" loading="lazy" />
                      </button>
                    </li>
                  ))}
                </ul>
                <figure className="order-1 sm:order-2">
                  <div className="relative aspect-[3/4] overflow-hidden bg-bone">
                    <img key={shown.image} src={img(shown.image)} alt={shown.alt} className="fade-in h-full w-full object-cover object-top" />
                    <span className="absolute top-4 left-4 bg-noir/80 px-3 py-1.5 text-[0.58rem] font-medium tracking-[0.24em] text-ivory uppercase backdrop-blur">
                      {shown.caption}
                    </span>
                  </div>
                  <figcaption className="mt-3">
                    <PhotoCredit file={shown.image} />
                  </figcaption>
                </figure>
              </div>
            </div>

            {/* Details */}
            <div>
              <Kicker className="rise">{categoryLabel(piece.category)}{piece.collection ? ` · ${piece.collection}` : ""}</Kicker>
              <h1 className="display-xl rise mt-6 text-noir" style={{ "--d": "100ms" } as React.CSSProperties}>{piece.name}</h1>
              <p className="rise mt-5 font-display text-xl text-gold-deep italic" style={{ "--d": "200ms" } as React.CSSProperties}>{piece.tagline}</p>
              <div className="rise mt-8 space-y-4 text-[1.02rem] leading-[1.85] font-light text-ink/80" style={{ "--d": "300ms" } as React.CSSProperties}>
                {piece.description.map((d) => (
                  <p key={d}>{d}</p>
                ))}
              </div>

              <div className="mt-10 flex flex-wrap gap-3">
                <a href="#request" className="btn btn-noir">
                  <span>Request This Piece</span>
                </a>
                <Link to="/styling#book" className="btn btn-ghost">
                  <span>Book a Consultation</span>
                </Link>
              </div>
              <p className="mt-4 text-xs text-taupe-deep">Made to order · Priced on consultation · Not held as stock</p>

              <dl className="mt-14 divide-y divide-line border-y border-line">
                <Spec title="Silhouette" items={piece.silhouette} />
                <Spec title="Fabric notes" items={piece.fabric} />
                <Spec title="Craftsmanship" items={piece.craftsmanship} />
                <div className="py-7">
                  <dt className="text-[0.64rem] font-medium tracking-[0.26em] text-taupe-deep uppercase">Customisation options</dt>
                  <dd className="mt-5 grid gap-5 sm:grid-cols-3">
                    {piece.customisation.map((c) => (
                      <div key={c.label}>
                        <p className="font-display text-lg text-noir">{c.label}</p>
                        <ul className="mt-2 space-y-1 text-sm font-light text-ink/75">
                          {c.options.map((o) => (
                            <li key={o}>{o}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </dd>
                </div>
                <div className="py-7">
                  <dt className="text-[0.64rem] font-medium tracking-[0.26em] text-taupe-deep uppercase">Ideal for</dt>
                  <dd className="mt-4 flex flex-wrap gap-2">
                    {piece.idealFor.map((o) => (
                      <span key={o} className="border border-line px-3 py-1.5 text-sm text-ink/80">{o}</span>
                    ))}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* Request form */}
      <section id="request" className="scroll-mt-20 bg-ivory-2 py-24 sm:py-32">
        <div className="wrap grid gap-14 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <Reveal>
            <Kicker>Request a Piece</Kicker>
            <h2 className="display-lg mt-6 text-noir">Make the {piece.name.replace(/^The /, "")} <em className="text-gold-deep">yours</em></h2>
            <p className="lead mt-6">Tell us how you would like it made. The atelier will reply to arrange a consultation and fittings.</p>
            <ul className="mt-8 space-y-3 text-[0.95rem] font-light text-ink/75">
              {["No payment is taken online", "Measurements taken at the atelier or shared by you", "Design refined with you before cutting"].map((t) => (
                <li key={t} className="flex gap-3">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-gold-deep" strokeWidth={1.5} aria-hidden="true" /> {t}
                </li>
              ))}
            </ul>
          </Reveal>
          <div className="border border-line bg-ivory p-6 sm:p-10">
            <PieceRequestForm piece={piece} />
          </div>
        </div>
      </section>

      {/* Prev / next */}
      <nav aria-label="More pieces" className="border-y border-line bg-ivory">
        <div className="wrap grid grid-cols-2 divide-x divide-line">
          <Link to={`/collection/${prev.slug}`} className="group flex items-center gap-4 py-8 pr-4">
            <ArrowLeft className="h-4 w-4 shrink-0 text-taupe transition-transform group-hover:-translate-x-1" aria-hidden="true" />
            <span>
              <span className="block text-[0.6rem] tracking-[0.26em] text-taupe-deep uppercase">Previous</span>
              <span className="mt-1 block font-display text-lg text-noir sm:text-xl">{prev.name}</span>
            </span>
          </Link>
          <Link to={`/collection/${next.slug}`} className="group flex items-center justify-end gap-4 py-8 pl-4 text-right">
            <span>
              <span className="block text-[0.6rem] tracking-[0.26em] text-taupe-deep uppercase">Next</span>
              <span className="mt-1 block font-display text-lg text-noir sm:text-xl">{next.name}</span>
            </span>
            <ArrowRight className="h-4 w-4 shrink-0 text-taupe transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
      </nav>

      <section className="bg-ivory py-24">
        <div className="wrap">
          <h2 className="display-md text-noir">You may also consider</h2>
          <div className="mt-12 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p, i) => (
              <PieceCard key={p.slug} piece={p} delay={i * 100} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function Spec({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="grid gap-3 py-7 sm:grid-cols-[10rem_1fr] sm:gap-8">
      <dt className="text-[0.64rem] font-medium tracking-[0.26em] text-taupe-deep uppercase">{title}</dt>
      <dd>
        <ul className="space-y-2 text-[0.97rem] font-light text-ink/80">
          {items.map((i) => (
            <li key={i} className="flex gap-3">
              <span className="mt-[0.7em] h-px w-3 shrink-0 bg-gold" aria-hidden="true" />
              {i}
            </li>
          ))}
        </ul>
      </dd>
    </div>
  );
}
