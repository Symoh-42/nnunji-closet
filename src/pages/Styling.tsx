import { useState } from "react";
import { ArrowRight, Clock, Mail, MapPin } from "lucide-react";
import { siteConfig } from "../../siteConfig";
import { services } from "@/data/content";
import { useSeo } from "@/lib/seo";
import { cn, fullAddress } from "@/lib/utils";
import { Kicker, PageHero, Reveal, RevealImage, SectionHeading, Txt } from "@/components/ui";
import { ConsultationBooking } from "@/components/forms";

export default function Styling() {
  const [service, setService] = useState<string | undefined>(undefined);
  useSeo({
    title: "Personal Styling & Wardrobe Consultations",
    description:
      "Personal wardrobe consultations, image consulting, wardrobe makeovers, occasion styling and bespoke outfit creation at NNUNJICloset in Lavington, Nairobi. Book a styling consultation.",
    path: "/styling",
    image: "dress-form.jpg",
  });

  const choose = (name: string) => {
    setService(name);
    document.getElementById("book")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <PageHero
        kicker="The Personal Styling Experience"
        title={<>Dressing well begins with <em className="text-gold-soft">knowing yourself.</em></>}
        intro="Private, unhurried sessions that help you understand what suits you, why it works and how to build a wardrobe that carries your confidence."
        image="portrait-bw.jpg"
        imageAlt="Black-and-white portrait of a woman in layered beaded necklaces"
        position="50% 25%"
        crumbs={[{ label: "Personal Styling" }]}
      >
        <a href="#book" className="btn btn-gold">
          <span>Book a Consultation</span>
        </a>
      </PageHero>

      {/* Services */}
      <section className="bg-ivory py-24 sm:py-32" aria-labelledby="services-title">
        <div className="wrap">
          <SectionHeading
            kicker="Five Services"
            title={<span id="services-title">A service for every <em className="text-gold-deep">chapter</em></span>}
            intro="Every engagement starts with listening. Services can be combined, and many clients begin with a consultation before commissioning a bespoke piece."
          />
          <div className="mt-20 space-y-24 sm:space-y-32">
            {services.map((s, i) => (
              <article key={s.slug} id={s.slug} className="grid scroll-mt-28 items-center gap-10 md:grid-cols-2 md:gap-16 lg:gap-24">
                <RevealImage src={s.image} alt={s.imageAlt} className={cn("aspect-[4/5]", i % 2 === 1 && "md:order-2")} imgClassName="object-top" />
                <Reveal>
                  <p className="font-display text-5xl text-gold/70">0{i + 1}</p>
                  <h3 className="display-md mt-4 text-noir">{s.name}</h3>
                  <p className="mt-5 text-[1.02rem] leading-[1.85] font-light text-ink/80">{s.summary}</p>
                  <ul className="mt-7 space-y-2.5 border-l border-gold/50 pl-5 text-[0.97rem] font-light text-ink/80">
                    {s.includes.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                  <dl className="mt-8 grid gap-5 text-sm sm:grid-cols-2">
                    <div>
                      <dt className="label">Ideal for</dt>
                      <dd className="mt-2 font-light text-ink/80">{s.idealFor}</dd>
                    </div>
                    <div>
                      <dt className="label">Format</dt>
                      <dd className="mt-2 font-light text-ink/80"><Txt>{s.format}</Txt></dd>
                    </div>
                  </dl>
                  <button type="button" onClick={() => choose(s.name)} className="link-line mt-9 text-noir">
                    Book this service <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                </Reveal>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Journey */}
      <section className="grain relative overflow-hidden bg-noir py-24 text-ivory sm:py-32">
        <div className="wrap relative z-[2]">
          <SectionHeading light kicker="What to Expect" title={<>Your consultation, <em className="text-gold-soft">step by step</em></>} />
          <ol className="mt-16 grid gap-px bg-ivory/10 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Request", "Choose your service, occasion and a preferred date using the form below."],
              ["Confirm", "The atelier replies to confirm the appointment and anything to bring along."],
              ["Consult", "We talk, look, try and measure. You leave with a clear style direction."],
              ["Create", "If you choose, the direction becomes a bespoke commission or a styled wardrobe."],
            ].map(([t, d], i) => (
              <Reveal as="li" key={t} delay={i * 110} className="bg-noir p-8">
                <p className="font-display text-sm text-gold">Step 0{i + 1}</p>
                <p className="mt-4 font-display text-2xl">{t}</p>
                <p className="mt-3 text-sm leading-relaxed font-light text-ivory/65">{d}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Booking */}
      <section id="book" className="scroll-mt-16 bg-ivory py-24 sm:py-32" aria-labelledby="book-title">
        <div className="wrap grid gap-14 lg:grid-cols-[1fr_1.7fr] lg:gap-20">
          <aside>
            <Reveal className="lg:sticky lg:top-28">
              <Kicker>Book a Styling Consultation</Kicker>
              <h2 id="book-title" className="display-lg mt-6 text-noir">
                Reserve your <em className="text-gold-deep">moment</em>
              </h2>
              <p className="lead mt-6">Three short steps. The atelier will confirm your appointment personally.</p>
              <ul className="mt-10 space-y-5 border-t border-line pt-8 text-[0.95rem] font-light text-ink/80">
                <li className="flex gap-4">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold-deep" strokeWidth={1.3} aria-hidden="true" />
                  <span>
                    {fullAddress()}
                    <span className="mt-1 block text-sm text-taupe-deep"><Txt>{siteConfig.contact.visitNote}</Txt></span>
                  </span>
                </li>
                <li className="flex gap-4">
                  <Mail className="mt-0.5 h-5 w-5 shrink-0 text-gold-deep" strokeWidth={1.3} aria-hidden="true" />
                  <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-gold-deep">{siteConfig.contact.email}</a>
                </li>
                <li className="flex gap-4">
                  <Clock className="mt-0.5 h-5 w-5 shrink-0 text-gold-deep" strokeWidth={1.3} aria-hidden="true" />
                  <span className="space-y-1">
                    {siteConfig.contact.hours.map((h) => (
                      <span key={h.days} className="block">
                        <span className="text-ink">{h.days}:</span> <Txt>{h.time}</Txt>
                      </span>
                    ))}
                  </span>
                </li>
              </ul>
            </Reveal>
          </aside>
          <div className="border border-line bg-ivory-2/60 p-6 sm:p-10 lg:p-12">
            <ConsultationBooking defaultService={service} />
          </div>
        </div>
      </section>
    </>
  );
}
