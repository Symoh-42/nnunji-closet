import { useState } from "react";
import { Link } from "react-router-dom";
import { Expand } from "lucide-react";
import { stories, type Story } from "@/data/content";
import { useSeo } from "@/lib/seo";
import { cn, img } from "@/lib/utils";
import { Kicker, Reveal } from "@/components/ui";
import { Lightbox } from "@/components/Lightbox";

export default function Lookbook() {
  const [open, setOpen] = useState<{ story: Story; index: number } | null>(null);
  useSeo({
    title: "Lookbook | Editorial Portfolio",
    description:
      "The NNUNJICloset lookbook: fashion stories, collection highlights and behind-the-scenes craftsmanship from a bespoke atelier in Lavington, Nairobi.",
    path: "/lookbook",
    image: "bilara-pair.jpg",
  });

  return (
    <>
      {/* Hero: split editorial plates */}
      <section className="grain relative overflow-hidden bg-noir pt-36 pb-16 text-ivory sm:pt-44">
        <div className="wrap relative z-[2]">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-end">
            <div>
              <Kicker light className="rise">The Lookbook</Kicker>
              <h1 className="display-xxl rise mt-8" style={{ "--d": "120ms" } as React.CSSProperties}>
                Editorial
                <br />
                <em className="text-gold-soft">Portfolio</em>
              </h1>
              <p className="rise mt-8 max-w-md text-lg font-light text-ivory/70" style={{ "--d": "240ms" } as React.CSSProperties}>
                Fashion stories, collection highlights and a look inside the atelier. Select any image to view it full screen.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {["runway-train.jpg", "kitenge-orange.jpg", "bridal.jpg"].map((f, i) => (
                <div key={f} className={cn("unveil aspect-[3/5] overflow-hidden", i === 1 && "translate-y-10")} style={{ "--d": `${300 + i * 150}ms` } as React.CSSProperties}>
                  <img src={img(f)} alt="" className="h-full w-full object-cover object-top" />
                </div>
              ))}
            </div>
          </div>
          <p className="mt-20 text-xs text-ivory/40">
            All lookbook photographs are openly licensed placeholders by other photographers and designers, credited in each gallery and on the{" "}
            <Link to="/photo-credits" className="underline underline-offset-2 hover:text-gold-soft">photo credits</Link> page.
          </p>
        </div>
      </section>

      {/* Story index */}
      <nav aria-label="Lookbook stories" className="sticky top-[4.5rem] z-20 border-b border-line bg-ivory/95 backdrop-blur">
        <ul className="wrap flex gap-1 overflow-x-auto py-3 [scrollbar-width:none]">
          {stories.map((s, i) => (
            <li key={s.slug} className="shrink-0">
              <a href={`#${s.slug}`} className="inline-flex min-h-11 items-center gap-2 px-4 text-[0.64rem] font-medium tracking-[0.22em] whitespace-nowrap text-ink/70 uppercase hover:text-noir">
                <span className="font-display text-xs tracking-normal text-gold-deep">0{i + 1}</span> {s.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {stories.map((s, si) => (
        <StorySection key={s.slug} story={s} n={si + 1} dark={si % 2 === 1} onOpen={(index) => setOpen({ story: s, index })} />
      ))}

      {open && (
        <Lightbox
          slides={open.story.images}
          start={open.index}
          title={open.story.title}
          onClose={() => setOpen(null)}
        />
      )}
    </>
  );
}

function StorySection({ story, n, dark, onOpen }: { story: Story; n: number; dark: boolean; onOpen: (i: number) => void }) {
  return (
    <section id={story.slug} className={cn("scroll-mt-32", dark ? "bg-noir text-ivory" : "bg-ivory")} aria-labelledby={`${story.slug}-title`}>
      {/* Full-bleed cover */}
      <div className="group relative h-[78svh] min-h-[28rem] w-full overflow-hidden bg-noir">
        <img src={img(story.cover)} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover object-[50%_22%] transition-transform duration-[2000ms] ease-out group-hover:scale-[1.03]" />
        <div className="absolute inset-0 bg-gradient-to-t from-noir/90 via-noir/25 to-noir/10" />
        <div className="wrap absolute inset-x-0 bottom-0 pb-12 text-ivory sm:pb-16">
          <p className="font-display text-[clamp(4rem,10vw,9rem)] leading-none text-ivory/12">0{n}</p>
          <p className="-mt-6 text-[0.62rem] font-medium tracking-[0.32em] text-gold-soft uppercase sm:-mt-10">{story.kicker}</p>
          <h2 id={`${story.slug}-title`} className="display-xl mt-4">{story.title}</h2>
        </div>
        <button type="button" onClick={() => onOpen(0)} className="absolute inset-0 z-10 cursor-zoom-in" aria-label={`Open the ${story.title} gallery full screen`}>
          <span className="absolute top-6 right-6 inline-flex items-center gap-2 bg-noir/50 px-3 py-2 text-[0.6rem] tracking-[0.24em] text-ivory uppercase opacity-80 backdrop-blur transition-opacity group-hover:opacity-100">
            <Expand className="h-3.5 w-3.5" aria-hidden="true" /> Full screen
          </span>
        </button>
      </div>

      <div className="wrap py-20 sm:py-28">
        <Reveal className="max-w-2xl">
          <p className={cn("font-display text-[clamp(1.4rem,2.4vw,2rem)] leading-snug", dark ? "text-ivory/90" : "text-noir")}>{story.intro}</p>
        </Reveal>
        <ul className="mt-14 grid grid-flow-dense auto-rows-[12rem] grid-cols-2 gap-3 sm:auto-rows-[17rem] sm:gap-4 lg:grid-cols-4 lg:auto-rows-[19rem]">
          {story.images.map((im, i) => (
            <Reveal
              as="li"
              key={im.image + i}
              delay={(i % 4) * 90}
              className={cn(im.span === "tall" && "row-span-2", im.span === "wide" && "col-span-2")}
            >
              <button type="button" onClick={() => onOpen(i)} className="group relative block h-full w-full overflow-hidden bg-noir-3" aria-label={`View full screen: ${im.caption ?? im.alt}`}>
                <img src={img(im.image)} alt={im.alt} loading="lazy" className="h-full w-full object-cover object-top transition-transform duration-[1400ms] ease-[var(--ease-couture)] group-hover:scale-[1.05]" />
                {im.caption && (
                  <span className="absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-noir/80 to-transparent p-4 pt-10 text-left font-display text-base text-ivory italic opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                    {im.caption}
                  </span>
                )}
              </button>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
