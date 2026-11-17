import { Link, useSearchParams } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { categories, pieces, type CategoryId } from "@/data/pieces";
import { useSeo } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { Kicker, PageHero, PieceCard, Reveal } from "@/components/ui";

export default function Collection() {
  const [params, setParams] = useSearchParams();
  const raw = params.get("category");
  const active = (categories.some((c) => c.id === raw) ? raw : "all") as CategoryId | "all";
  const list = active === "all" ? pieces : pieces.filter((p) => p.category === active);
  const cat = categories.find((c) => c.id === active);

  useSeo({
    title: cat ? `${cat.label} | Bespoke Collection` : "The Bespoke Collection",
    description:
      "Explore NNUNJICloset's bespoke collection: dresses, tailored tops, custom skirts, occasion wear, statement pieces and limited collections, each made to order in Nairobi.",
    path: "/collection",
    image: "runway-mermaid.jpg",
  });

  const select = (id: string) => {
    const next = new URLSearchParams(params);
    if (id === "all") next.delete("category");
    else next.set("category", id);
    setParams(next, { replace: true, preventScrollReset: true });
  };

  return (
    <>
      <PageHero
        kicker="The Bespoke Collection"
        title={<>Designed as concepts. <em className="text-gold-soft">Made only for you.</em></>}
        intro="Each piece below is a starting point. Silhouette, fabric, length and detail are refined with you at consultation, then cut to your measurements."
        image="runway-mermaid.jpg"
        imageAlt="A model in a red floral mermaid gown on a runway"
        position="50% 20%"
        crumbs={[{ label: "Collection" }]}
      />

      <section className="bg-ivory pt-14 pb-28 sm:pt-20">
        <div className="wrap">
          {/* Filter */}
          <div className="sticky top-[4.5rem] z-20 -mx-4 border-b border-line bg-ivory/95 px-4 backdrop-blur sm:-mx-6 sm:px-6 lg:-mx-12 lg:px-12">
            <div role="group" aria-label="Filter by category" className="flex gap-1 overflow-x-auto py-3 [scrollbar-width:none]">
              {[{ id: "all", label: "All Pieces" }, ...categories].map((c) => (
                <button
                  key={c.id}
                  type="button"
                  aria-pressed={active === c.id}
                  onClick={() => select(c.id)}
                  className={cn(
                    "min-h-11 shrink-0 px-4 text-[0.64rem] font-medium tracking-[0.22em] whitespace-nowrap uppercase transition-colors",
                    active === c.id ? "bg-noir text-ivory" : "text-ink/65 hover:text-noir",
                  )}
                >
                  {c.label}
                  <span className={cn("ml-2 font-display text-xs tracking-normal", active === c.id ? "text-gold-soft" : "text-taupe")}>
                    {c.id === "all" ? pieces.length : pieces.filter((p) => p.category === c.id).length}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-12 flex flex-col justify-between gap-4 sm:flex-row sm:items-end" aria-live="polite">
            <div>
              <h2 className="display-md text-noir">{cat ? cat.label : "All pieces"}</h2>
              <p className="mt-2 font-light text-ink/70">{cat ? cat.blurb : "Fifteen design concepts across six categories."}</p>
            </div>
            <p className="max-w-sm text-xs leading-relaxed text-taupe-deep sm:text-right">
              Concept pieces for illustration: not stock, and not priced. Photographs are licensed placeholders showing other designers' work.
            </p>
          </div>

          <div key={active} className="mt-12 grid grid-cols-1 gap-x-6 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((p, i) => (
              <PieceCard key={p.slug} piece={p} priority={i < 3} delay={(i % 3) * 100} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-noir-2 py-20 text-ivory">
        <div className="wrap grid gap-10 md:grid-cols-[1.4fr_1fr] md:items-center">
          <Reveal>
            <Kicker light>How a commission works</Kicker>
            <p className="mt-6 font-display text-[clamp(1.7rem,3vw,2.6rem)] leading-tight">
              Choose a concept, or arrive with an idea of your own. We design it together, then make it to measure.
            </p>
          </Reveal>
          <Reveal delay={150} className="flex flex-wrap gap-3 md:justify-end">
            <Link to="/styling#book" className="btn btn-gold">
              <span>Book a Consultation</span>
            </Link>
            <Link to="/contact" className="btn btn-ghost-light">
              <span>Ask a question</span> <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
