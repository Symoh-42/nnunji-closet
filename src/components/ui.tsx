import { useEffect, useState, type CSSProperties, type ElementType, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";
import { cn, img } from "@/lib/utils";
import { categoryLabel, type Piece } from "@/data/pieces";

/* ---------- Honesty labels ---------- */

export function ConfirmLabel({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "ml-1.5 inline-flex translate-y-[-1px] items-center rounded-[2px] border border-amber-500/60 bg-amber-100 px-1.5 py-px align-middle font-sans text-[0.56rem] font-semibold tracking-[0.14em] text-amber-900 not-italic uppercase",
        className,
      )}
      title="Detail to be confirmed by NNUNJICloset before publication"
    >
      To confirm
    </span>
  );
}

/** Renders text; any "(confirm)" becomes a visible TO CONFIRM label. */
export function Txt({ children }: { children: string }) {
  if (!children.includes("(confirm")) return <>{children}</>;
  const clean = children.replace(/\s*\((confirm[^)]*)\)/g, "").trim();
  return (
    <>
      {clean}
      <ConfirmLabel />
    </>
  );
}

/** Small tag for demonstration / placeholder content. */
export function DemoTag({ children = "Demonstration content", dark }: { children?: ReactNode; dark?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 border px-2 py-0.5 text-[0.58rem] font-semibold tracking-[0.18em] uppercase",
        dark ? "border-gold/50 text-gold-soft" : "border-amber-500/50 bg-amber-50 text-amber-900",
      )}
    >
      {children}
    </span>
  );
}

/* ---------- Motion ---------- */

export function Reveal({
  as: Tag = "div",
  delay = 0,
  className,
  children,
  id,
}: {
  as?: ElementType;
  delay?: number;
  className?: string;
  children: ReactNode;
  id?: string;
}) {
  const ref = useReveal<HTMLElement>();
  return (
    <Tag ref={ref} id={id} className={cn("reveal", className)} style={{ "--d": `${delay}ms` } as CSSProperties}>
      {children}
    </Tag>
  );
}

/** An image that unveils top-to-bottom when it scrolls into view. */
export function RevealImage({
  src,
  alt,
  className,
  imgClassName,
  delay = 0,
  eager,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  delay?: number;
  eager?: boolean;
}) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className={cn("reveal-img zoom-frame relative bg-bone", className)} style={{ "--d": `${delay}ms` } as CSSProperties}>
      <img
        src={img(src)}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        className={cn("h-full w-full object-cover", imgClassName)}
      />
    </div>
  );
}

/* ---------- Brand ---------- */

/**
 * Placeholder wordmark. NNUNJICloset's official logo was not available when this demo was built,
 * so this typographic mark stands in until the artwork is supplied - swap in an <img> here.
 */
export function Logo({ light = false, className }: { light?: boolean; className?: string }) {
  return (
    <span className={cn("flex flex-col items-start leading-none", className)}>
      <span className={cn("font-display text-[1.45rem] tracking-[0.2em] sm:text-[1.6rem]", light ? "text-ivory" : "text-noir")}>
        NNUNJI
      </span>
      <span className={cn("mt-1 flex w-full items-center gap-2 text-[0.55rem] font-medium tracking-[0.62em] uppercase", light ? "text-gold-soft" : "text-gold-deep")}>
        <span className="h-px flex-1 bg-current opacity-60" />
        Closet
        <span className="h-px flex-1 bg-current opacity-60" />
      </span>
    </span>
  );
}

export function Kicker({ children, light, className }: { children: ReactNode; light?: boolean; className?: string }) {
  return <p className={cn("kicker", light && "kicker-light", className)}>{children}</p>;
}

export function SectionHeading({
  kicker,
  title,
  intro,
  light,
  center,
  className,
}: {
  kicker: string;
  title: ReactNode;
  intro?: ReactNode;
  light?: boolean;
  center?: boolean;
  className?: string;
}) {
  return (
    <Reveal className={cn("max-w-2xl", center && "mx-auto text-center", className)}>
      <Kicker light={light} className={center ? "justify-center" : ""}>
        {kicker}
      </Kicker>
      <h2 className={cn("display-lg mt-6", light ? "text-ivory" : "text-noir")}>{title}</h2>
      {intro && <p className={cn("lead mt-6", light && "text-ivory/70", center && "mx-auto")}>{intro}</p>}
    </Reveal>
  );
}

/* ---------- Page hero (dark, editorial) ---------- */

export function PageHero({
  kicker,
  title,
  intro,
  image,
  imageAlt,
  children,
  crumbs,
  position = "center",
}: {
  kicker: string;
  title: ReactNode;
  intro?: ReactNode;
  image: string;
  imageAlt: string;
  children?: ReactNode;
  crumbs?: { label: string; href?: string }[];
  position?: string;
}) {
  return (
    <section className="grain relative isolate overflow-hidden bg-noir pt-40 pb-20 text-ivory sm:pt-48 sm:pb-28">
      <div className="absolute inset-y-0 right-0 -z-10 w-full overflow-hidden md:w-[52%]">
        <img src={img(image)} alt={imageAlt} className="settle h-full w-full object-cover opacity-55 md:opacity-90" style={{ objectPosition: position }} />
        <div className="absolute inset-0 bg-gradient-to-r from-noir via-noir/70 to-noir/10 md:via-noir/20" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-noir to-transparent" />
      </div>
      <div className="wrap">
        {crumbs && (
          <nav aria-label="Breadcrumb" className="fade-in mb-10">
            <ol className="flex flex-wrap items-center gap-2 text-[0.64rem] font-medium tracking-[0.24em] text-ivory/50 uppercase">
              <li>
                <Link to="/" className="hover:text-gold-soft">Home</Link>
              </li>
              {crumbs.map((c) => (
                <li key={c.label} className="flex items-center gap-2">
                  <span className="text-gold/70" aria-hidden="true">/</span>
                  {c.href ? (
                    <Link to={c.href} className="hover:text-gold-soft">{c.label}</Link>
                  ) : (
                    <span className="text-ivory/80" aria-current="page">{c.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <div className="max-w-2xl">
          <Kicker light className="rise">{kicker}</Kicker>
          <h1 className="display-xl rise mt-7 text-ivory" style={{ "--d": "120ms" } as CSSProperties}>{title}</h1>
          {intro && (
            <p className="rise mt-7 max-w-xl text-lg leading-relaxed font-light text-ivory/72" style={{ "--d": "240ms" } as CSSProperties}>
              {intro}
            </p>
          )}
          {children && <div className="rise mt-10" style={{ "--d": "360ms" } as CSSProperties}>{children}</div>}
        </div>
      </div>
    </section>
  );
}

/* ---------- Piece card ---------- */

export function PieceCard({ piece, priority, aspect = "aspect-[3/4]", delay = 0 }: { piece: Piece; priority?: boolean; aspect?: string; delay?: number }) {
  return (
    <Reveal delay={delay}>
      <Link to={`/collection/${piece.slug}`} className="group block" aria-label={`${piece.name}, ${categoryLabel(piece.category)}`}>
        <div className={cn("zoom-frame relative bg-bone", aspect)}>
          <img
            src={img(piece.image)}
            alt={piece.imageAlt}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            className="h-full w-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-noir/0 transition-colors duration-700 group-hover:bg-noir/15" />
          <span className="absolute top-4 right-4 grid h-10 w-10 translate-y-2 place-items-center rounded-full bg-ivory/90 text-noir opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            <ArrowUpRight className="h-4 w-4" strokeWidth={1.4} aria-hidden="true" />
          </span>
        </div>
        <div className="mt-5 flex items-start justify-between gap-4">
          <div>
            <p className="text-[0.62rem] font-medium tracking-[0.28em] text-taupe-deep uppercase">{categoryLabel(piece.category)}</p>
            <h3 className="mt-2 font-display text-[1.45rem] leading-tight text-noir transition-colors group-hover:text-gold-deep">{piece.name}</h3>
            <p className="mt-1.5 text-[0.92rem] font-light text-ink/70">{piece.tagline}</p>
          </div>
        </div>
      </Link>
    </Reveal>
  );
}

/* ---------- Photo credits (loaded once, used for captions) ---------- */

export type Credit = { title: string; name: string; link: string; source: string; license: string; w?: number; h?: number };
let creditCache: Record<string, Credit> | null = null;
let creditPromise: Promise<Record<string, Credit>> | null = null;

export function useCredits() {
  const [credits, setCredits] = useState<Record<string, Credit> | null>(creditCache);
  useEffect(() => {
    if (creditCache) return;
    creditPromise ??= fetch("/images/credits.json")
      .then((r) => r.json() as Promise<Record<string, Credit>>)
      .catch(() => ({}));
    creditPromise.then((c) => {
      creditCache = c;
      setCredits(c);
    });
  }, []);
  return credits;
}

/** Photos that show places, tools or fabric rather than a finished garment. */
const NON_GARMENT = new Set(["cutting.jpg", "dress-form.jpg", "seamstress.jpg", "wax-print.jpg", "fabrics-nairobi.jpg", "tools.jpg", "atelier-bw.jpg", "atelier-machine.jpg", "atelier-print.jpg", "tape.jpg", "portrait-bw.jpg"]);

export function PhotoCredit({ file, className, light }: { file: string; className?: string; light?: boolean }) {
  const credits = useCredits();
  const c = credits?.[file];
  return (
    <p className={cn("text-[0.7rem] leading-relaxed", light ? "text-ivory/50" : "text-taupe-deep", className)}>
      Placeholder photograph
      {c ? (
        <>
          {" "}by {c.name || "unknown"} · {c.license} ·{" "}
          <a href={c.link} target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-gold">
            source
          </a>
        </>
      ) : null}
      . {NON_GARMENT.has(file) ? "Not taken at the NNUNJICloset atelier." : "Shows another designer's garment, not NNUNJICloset work."}
    </p>
  );
}
