import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "../../siteConfig";
import { useSeo } from "@/lib/seo";
import { img } from "@/lib/utils";
import { ConfirmLabel, Kicker, PageHero, Reveal, RevealImage, SectionHeading, Txt } from "@/components/ui";

const values = [
  ["Individuality", "We design for one person at a time. Your story, proportions and instincts lead every decision."],
  ["Craft", "Patterns drafted by hand, seams finished with care, fittings repeated until the garment is right."],
  ["Heritage", "African textiles and silhouettes treated with the same reverence couture gives to silk and lace."],
  ["Confidence", "The measure of our work is how you feel when you wear it, and how long that feeling lasts."],
];

export default function About() {
  useSeo({
    title: "The Atelier | Our Story",
    description:
      "The story of NNUNJICloset, a bespoke fashion atelier on Muthangari Road in Lavington, Nairobi, uniting couture technique, African textile heritage and personal styling.",
    path: "/about",
    image: "dress-form.jpg",
  });

  return (
    <>
      <PageHero
        kicker="The Atelier"
        title={<>A closet without <em className="text-gold-soft">limits.</em></>}
        intro="NNUNJICloset is a bespoke fashion house built on a simple conviction: that a woman's wardrobe should be written around her life, not the other way around."
        image="dress-form.jpg"
        imageAlt="A tailored jacket on a dress form with a tape measure"
        position="30% 50%"
        crumbs={[{ label: "The Atelier" }]}
      />

      {/* Opening essay */}
      <section className="bg-ivory py-24 sm:py-36">
        <div className="wrap grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
          <Reveal>
            <Kicker>Our Story</Kicker>
            <p className="mt-8 font-display text-[clamp(1.9rem,3.4vw,3rem)] leading-[1.15] text-noir">
              Some garments are worn. <em className="text-gold-deep">Others are inhabited.</em> We make the second kind.
            </p>
          </Reveal>
          <Reveal delay={120} className="space-y-6 text-[1.04rem] leading-[1.9] font-light text-ink/80">
            <p>
              <span className="float-left mt-1 mr-3 font-display text-[4.2rem] leading-[0.8] text-gold-deep">N</span>
              NNUNJICloset began with the belief that personal style is a form of self-authorship. Too many women dress in clothes made for an average that does not exist. The atelier exists to correct that: to listen first, then design something that could only belong to the person in front of us.
            </p>
            <p>
              Our work sits where couture discipline meets African creative heritage. A kitenge can be cut with the precision of a Savile Row lapel; a bridal gown can carry the memory of a grandmother's textile. We treat every fabric, every body and every brief with the same seriousness.
            </p>
            <p>
              Beyond the garments, we offer styling: helping clients understand their proportions, palettes and instincts so that confidence becomes a habit, not an occasion.
            </p>
            <p className="text-sm text-taupe-deep">
              Founding story, founder profile and milestones to be supplied by NNUNJICloset. <ConfirmLabel />
            </p>
          </Reveal>
        </div>
      </section>

      {/* Image band */}
      <section className="bg-ivory pb-24 sm:pb-36">
        <div className="wrap grid grid-cols-12 gap-3 sm:gap-5">
          <RevealImage src="cutting.jpg" alt="Hands cutting fabric along a chalk line" className="col-span-7 aspect-[4/3]" />
          <RevealImage src="seamstress.jpg" alt="A seamstress pinning fabric at a work table" className="col-span-5 mt-16 aspect-[3/4] sm:mt-28" delay={150} />
          <RevealImage src="fabrics-nairobi.jpg" alt="Bright patterned African fabrics on display" className="col-span-5 -mt-10 aspect-[3/4] sm:-mt-24" delay={250} />
          <RevealImage src="tools.jpg" alt="A tape measure, thread and embroidery scissors" className="col-span-7 aspect-[4/3]" delay={350} />
        </div>
        <p className="wrap mt-4 text-xs text-taupe-deep">Placeholder photographs of other workshops, to be replaced with images of the NNUNJICloset atelier.</p>
      </section>

      {/* Values */}
      <section className="grain relative overflow-hidden bg-noir py-24 text-ivory sm:py-32">
        <div className="wrap relative z-[2]">
          <SectionHeading light kicker="What We Stand For" title={<>Four principles, <em className="text-gold-soft">every stitch</em></>} />
          <div className="mt-16 grid gap-px bg-ivory/10 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(([t, d], i) => (
              <Reveal key={t} delay={i * 100} className="bg-noir p-8 sm:p-10">
                <p className="font-display text-sm text-gold">0{i + 1}</p>
                <h3 className="mt-5 font-display text-3xl">{t}</h3>
                <p className="mt-4 text-sm leading-relaxed font-light text-ivory/65">{d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Founder placeholder */}
      <section className="bg-ivory-2 py-24 sm:py-32">
        <div className="wrap grid items-center gap-14 md:grid-cols-[0.8fr_1.2fr] md:gap-20">
          <Reveal className="relative aspect-[4/5] border border-dashed border-taupe/60 bg-ivory">
            <div className="absolute inset-0 grid place-items-center p-10 text-center">
              <div>
                <p className="font-display text-6xl text-bone">N</p>
                <p className="mt-4 text-[0.62rem] tracking-[0.28em] text-taupe-deep uppercase">Founder portrait</p>
                <p className="mt-1 text-xs text-taupe">To be supplied</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <Kicker>The Creative Director</Kicker>
            <h2 className="display-lg mt-6 text-noir">
              <Txt>Founder name (confirm)</Txt>
            </h2>
            <p className="lead mt-6">
              This space is reserved for the founder's own words: her training, her inspirations and why she started NNUNJICloset. It has been left deliberately blank rather than invented.
            </p>
            <p className="mt-6 text-sm text-taupe-deep">Biography, credentials and portrait to be provided by the brand.</p>
          </Reveal>
        </div>
      </section>

      {/* Visit */}
      <section className="relative isolate overflow-hidden bg-noir py-28 text-ivory sm:py-36">
        <img src={img("atelier-bw.jpg")} alt="" loading="lazy" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-30" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-noir via-noir/80 to-noir/40" />
        <div className="wrap">
          <Reveal className="max-w-2xl">
            <Kicker light>Visit the Atelier</Kicker>
            <h2 className="display-lg mt-6">
              {siteConfig.contact.address.line1}, <em className="text-gold-soft">{siteConfig.contact.address.area}</em>
            </h2>
            <p className="mt-6 text-lg font-light text-ivory/75">
              A private space for consultations and fittings in the leafy heart of Lavington, Nairobi. <Txt>{siteConfig.contact.visitNote}</Txt>
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link to="/styling#book" className="btn btn-gold">
                <span>Book a Consultation</span>
              </Link>
              <Link to="/contact" className="btn btn-ghost-light">
                <span>Directions & contact</span> <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
