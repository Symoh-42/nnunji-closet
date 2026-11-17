import { Link, useSearchParams } from "react-router-dom";
import { ArrowRight, CalendarHeart, Mail, MapPin, MessageCircle, Navigation, Phone, Scissors } from "lucide-react";
import { siteConfig } from "../../siteConfig";
import { useSeo } from "@/lib/seo";
import { directionsLink, fullAddress, mapsEmbed, whatsappLink } from "@/lib/utils";
import { Kicker, PageHero, Reveal, Txt } from "@/components/ui";
import { EnquiryForm } from "@/components/forms";

const paths = [
  {
    icon: CalendarHeart,
    title: "Book a styling consultation",
    text: "The best first step for most clients: a private session at the atelier.",
    href: "/styling#book",
    cta: "Book a consultation",
  },
  {
    icon: Scissors,
    title: "Request a bespoke piece",
    text: "Found a concept you love? Request it from its page with your customisation.",
    href: "/collection",
    cta: "Browse the collection",
  },
  {
    icon: Mail,
    title: "Send a general enquiry",
    text: "Questions, collaborations or press. Use the form below and we will reply.",
    href: "#enquiry",
    cta: "Write to us",
  },
];

export default function Contact() {
  const [params] = useSearchParams();
  const c = siteConfig.contact;
  useSeo({
    title: "Contact & Visit the Atelier",
    description: `Contact NNUNJICloset: email ${c.email} or visit the atelier at ${fullAddress()}. Book a styling consultation or request a bespoke piece.`,
    path: "/contact",
    image: "cape-terrace.jpg",
  });

  return (
    <>
      <PageHero
        kicker="Contact"
        title={<>Begin your <em className="text-gold-soft">commission.</em></>}
        intro="Whether you have a date in the diary or simply a feeling you want to wear, there is a clear first step."
        image="cape-terrace.jpg"
        imageAlt="A model in a printed gown and blue cape framed by a white arch"
        position="50% 35%"
        crumbs={[{ label: "Contact" }]}
      />

      {/* Enquiry journey */}
      <section className="bg-ivory py-20 sm:py-28" aria-labelledby="journey-title">
        <div className="wrap">
          <Reveal>
            <Kicker>Your enquiry journey</Kicker>
            <h2 id="journey-title" className="display-md mt-5 max-w-xl text-noir">Choose the path that suits you</h2>
          </Reveal>
          <ol className="mt-12 grid gap-px bg-line md:grid-cols-3">
            {paths.map((p, i) => {
              const inner = (
                <>
                  <div className="flex items-center justify-between">
                    <p.icon className="h-7 w-7 text-gold-deep" strokeWidth={1.1} aria-hidden="true" />
                    <span className="font-display text-sm text-taupe">0{i + 1}</span>
                  </div>
                  <h3 className="mt-8 font-display text-2xl text-noir">{p.title}</h3>
                  <p className="mt-3 flex-1 text-[0.95rem] font-light text-ink/70">{p.text}</p>
                  <span className="link-line mt-8 self-start text-noir">
                    {p.cta} <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                </>
              );
              const cls = "group flex h-full flex-col bg-ivory p-8 transition-colors hover:bg-ivory-2 sm:p-10";
              return (
                <Reveal as="li" key={p.title} delay={i * 110}>
                  {p.href.startsWith("#") ? (
                    <a href={p.href} className={cls}>{inner}</a>
                  ) : (
                    <Link to={p.href} className={cls}>{inner}</Link>
                  )}
                </Reveal>
              );
            })}
          </ol>
        </div>
      </section>

      {/* Form + details */}
      <section id="enquiry" className="scroll-mt-16 bg-ivory-2 py-24 sm:py-32">
        <div className="wrap grid gap-14 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
          <Reveal>
            <Kicker>Contact details</Kicker>
            <h2 className="display-lg mt-6 text-noir">The <em className="text-gold-deep">atelier</em></h2>
            <ul className="mt-10 space-y-7 text-[0.98rem] font-light text-ink/85">
              <li className="flex gap-4">
                <Mail className="mt-1 h-5 w-5 shrink-0 text-gold-deep" strokeWidth={1.3} aria-hidden="true" />
                <div>
                  <p className="label">Email</p>
                  <a href={`mailto:${c.email}`} className="mt-1 inline-block font-display text-xl text-noir hover:text-gold-deep">{c.email}</a>
                </div>
              </li>
              <li className="flex gap-4">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-gold-deep" strokeWidth={1.3} aria-hidden="true" />
                <div>
                  <p className="label">Atelier</p>
                  <address className="mt-1 not-italic">
                    {c.address.line1}
                    <br />
                    {c.address.area}, {c.address.city}, {c.address.country}
                  </address>
                  <p className="mt-1 text-sm text-taupe-deep"><Txt>{c.visitNote}</Txt></p>
                </div>
              </li>
              <li className="flex gap-4">
                <Phone className="mt-1 h-5 w-5 shrink-0 text-gold-deep" strokeWidth={1.3} aria-hidden="true" />
                <div>
                  <p className="label">Phone</p>
                  {c.phone ? (
                    <a href={`tel:${c.phone.replace(/\s/g, "")}`} className="mt-1 inline-block hover:text-gold-deep">{c.phone}</a>
                  ) : (
                    <p className="mt-1 text-taupe-deep"><Txt>Number to be published (confirm)</Txt></p>
                  )}
                </div>
              </li>
              <li className="flex gap-4">
                <MessageCircle className="mt-1 h-5 w-5 shrink-0 text-gold-deep" strokeWidth={1.3} aria-hidden="true" />
                <div>
                  <p className="label">WhatsApp</p>
                  <a href={whatsappLink(`Hello ${siteConfig.name}, I would like to enquire about a bespoke piece.`)} target="_blank" rel="noreferrer" className="mt-1 inline-block hover:text-gold-deep">
                    Start a WhatsApp message
                  </a>
                  {!c.whatsapp && <p className="text-sm text-taupe-deep"><Txt>Atelier WhatsApp number (confirm)</Txt></p>}
                </div>
              </li>
            </ul>
            <div className="mt-10 border-t border-line pt-8">
              <p className="label">Hours</p>
              <dl className="mt-4 space-y-2 text-sm">
                {c.hours.map((h) => (
                  <div key={h.days} className="flex justify-between gap-4 border-b border-line/70 pb-2">
                    <dt className="text-ink">{h.days}</dt>
                    <dd className="text-right font-light text-ink/75"><Txt>{h.time}</Txt></dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
          <div className="border border-line bg-ivory p-6 sm:p-10 lg:p-12">
            <h2 className="display-md text-noir">Send an enquiry</h2>
            <p className="mt-3 mb-10 text-[0.95rem] font-light text-ink/70">We reply personally. Fields marked optional can be left blank.</p>
            <EnquiryForm pieceSlug={params.get("piece") ?? undefined} />
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="bg-noir" aria-label="Map">
        <div className="relative h-[26rem] sm:h-[32rem]">
          <iframe
            title={`Map showing ${fullAddress()}`}
            src={mapsEmbed(c.mapQuery)}
            className="h-full w-full grayscale-[0.85] contrast-[1.05] invert-[0.92] hue-rotate-180"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div className="absolute bottom-6 left-4 max-w-xs bg-ivory p-6 shadow-[var(--shadow-soft)] sm:left-10">
            <p className="font-display text-xl text-noir">{siteConfig.name}</p>
            <p className="mt-1 text-sm font-light text-ink/75">{fullAddress()}</p>
            <a href={directionsLink(c.mapQuery)} target="_blank" rel="noreferrer" className="link-line mt-4 text-noir">
              <Navigation className="h-3.5 w-3.5" aria-hidden="true" /> Get directions
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
