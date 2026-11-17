import { Link } from "react-router-dom";
import { siteConfig } from "../../siteConfig";
import { useSeo } from "@/lib/seo";
import { img } from "@/lib/utils";
import { PageHero, useCredits } from "@/components/ui";

export function Privacy() {
  useSeo({ title: "Privacy Notice", description: `How ${siteConfig.name} handles the personal details you share through this website.`, path: "/privacy" });
  return (
    <>
      <PageHero kicker="Legal" title="Privacy notice" intro="Draft for review by NNUNJICloset before publication." image="tools.jpg" imageAlt="Tailoring tools" crumbs={[{ label: "Privacy" }]} />
      <section className="bg-ivory py-20">
        <div className="wrap max-w-3xl space-y-8 text-[1rem] leading-[1.85] font-light text-ink/85">
          <Block title="What we collect">
            When you request a consultation or a bespoke piece, you may share your name, email, phone number, preferred dates, event details and style notes. You may also choose to share measurements later in the process.
          </Block>
          <Block title="How it is used">
            Only to respond to your request, arrange appointments and make your garment. Details are not sold or shared for marketing.
          </Block>
          <Block title="This concept website">
            The forms on this concept website do not transmit or store anything. When you choose "Send by email" or "Send on WhatsApp", your own email or WhatsApp app opens with the message ready for you to send.
          </Block>
          <Block title="Your rights">
            Under the Kenya Data Protection Act, 2019 you may ask to see, correct or delete the personal data held about you. Write to{" "}
            <a href={`mailto:${siteConfig.contact.email}`} className="text-noir underline underline-offset-2">{siteConfig.contact.email}</a>.
          </Block>
        </div>
      </section>
    </>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-display text-2xl text-noir">{title}</h2>
      <p className="mt-3">{children}</p>
    </div>
  );
}

export function PhotoCredits() {
  useSeo({ title: "Photo Credits", description: "Credits and licences for the placeholder photographs used on this website.", path: "/photo-credits" });
  const credits = useCredits();
  const list = credits ? Object.entries(credits) : null;
  return (
    <>
      <PageHero
        kicker="Credits"
        title="Photo credits"
        intro="Every photograph on this concept website is an openly licensed placeholder from Wikimedia Commons. Garments shown are the work of other designers, not NNUNJICloset, and will be replaced with the atelier's own photography."
        image="wax-print.jpg"
        imageAlt="Folded wax-print fabrics"
        crumbs={[{ label: "Photo Credits" }]}
      />
      <section className="bg-ivory py-20">
        <div className="wrap">
          {list === null && <p className="text-taupe-deep" role="status">Loading credits...</p>}
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {(list ?? []).map(([file, c]) => (
              <li key={file} className="flex gap-4 border border-line bg-ivory-2/50 p-4">
                <img src={img(file)} alt="" loading="lazy" className="h-24 w-20 shrink-0 object-cover" />
                <div className="min-w-0 text-sm">
                  <p className="truncate font-display text-base text-noir" title={c.title}>{c.title}</p>
                  <p className="truncate text-taupe-deep">{c.name || "Unknown"} · {c.source}</p>
                  <p className="text-taupe-deep">{c.license}</p>
                  <a href={c.link} target="_blank" rel="noreferrer" className="text-xs text-gold-deep underline-offset-2 hover:underline">
                    Source and licence
                  </a>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-10 text-sm text-taupe-deep">
            Images are resized and compressed from the originals. CC BY-SA images remain under their original licences. <Link to="/" className="text-noir underline">Back to home</Link>
          </p>
        </div>
      </section>
    </>
  );
}

export function NotFound() {
  useSeo({ title: "Page not found", description: "This page could not be found.", path: "/404" });
  return (
    <section className="grain relative grid min-h-[85vh] place-items-center overflow-hidden bg-noir px-4 pt-24 text-center text-ivory">
      <div className="relative z-[2]">
        <p className="font-display text-[clamp(6rem,18vw,14rem)] leading-none text-ivory/10">404</p>
        <h1 className="display-lg -mt-8 sm:-mt-14">This piece is <em className="text-gold-soft">not in the closet.</em></h1>
        <p className="mx-auto mt-6 max-w-md font-light text-ivory/65">The page you were looking for has moved or never existed.</p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link to="/" className="btn btn-gold"><span>Return home</span></Link>
          <Link to="/collection" className="btn btn-ghost-light"><span>View the collection</span></Link>
        </div>
      </div>
    </section>
  );
}
