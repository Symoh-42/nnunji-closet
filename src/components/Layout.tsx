import { useEffect, useRef, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { ArrowRight, Mail, MapPin, Menu, X } from "lucide-react";
import { siteConfig, demoBanner } from "../../siteConfig";
import { categories } from "@/data/pieces";
import { cn, demoWhatsapp, fullAddress, whatsappLink } from "@/lib/utils";
import { useScrolled, useScrollLock } from "@/hooks/useReveal";
import { Logo, Txt } from "@/components/ui";

function DemoBanner() {
  const [open, setOpen] = useState(true);
  if (!demoBanner.enabled || !open) return null;
  return (
    <div className="relative z-50 bg-[#050505] py-1.5 pr-12 pl-4 text-center text-[11px] leading-5 text-white/70 sm:px-12 sm:text-xs">
      <span className="sm:hidden">Website concept by {demoBanner.name} ·</span>
      <span className="hidden sm:inline">
        Website concept for {siteConfig.name}, prepared by {demoBanner.name}. Photos are licensed placeholders; labelled items await confirmation.
      </span>{" "}
      WhatsApp{" "}
      <a href={demoWhatsapp()} className="font-semibold text-white underline-offset-2 hover:underline" target="_blank" rel="noreferrer">
        {demoBanner.whatsapp}
      </a>
      <span className="hidden sm:inline">
        {" "}·{" "}
        <a href={`mailto:${demoBanner.email}`} className="font-semibold text-white underline-offset-2 hover:underline">
          {demoBanner.email}
        </a>
      </span>
      <button
        type="button"
        onClick={() => setOpen(false)}
        aria-label="Dismiss demo banner"
        className="absolute top-0 right-0 grid h-full min-h-8 w-11 place-items-center text-base text-white/60 hover:text-white"
      >
        <span aria-hidden="true">×</span>
      </button>
    </div>
  );
}

function Header() {
  const scrolled = useScrolled(40);
  const [drawer, setDrawer] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => setDrawer(false), [pathname]);
  useScrollLock(drawer);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 z-40 transition-[background-color,border-color,top] duration-700",
          demoBanner.enabled && !scrolled ? "top-auto" : "top-0",
          scrolled ? "border-b border-ivory/8 bg-noir/92 backdrop-blur-md" : "border-b border-transparent bg-transparent",
        )}
      >
        <div className={cn("wrap flex items-center justify-between gap-6 transition-[height] duration-700", scrolled ? "h-[4.5rem]" : "h-[5.5rem]")}>
          <Link to="/" aria-label={`${siteConfig.name}, home`} className="shrink-0">
            <Logo light />
          </Link>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <NavLink
                    to={item.href}
                    className={({ isActive }) =>
                      cn(
                        "relative inline-flex px-3.5 py-3 text-[0.66rem] font-medium tracking-[0.24em] uppercase transition-colors after:absolute after:right-3.5 after:bottom-2 after:left-3.5 after:h-px after:origin-left after:bg-gold after:transition-transform after:duration-500 xl:px-4.5",
                        isActive ? "text-gold-soft after:scale-x-100" : "text-ivory/80 after:scale-x-0 hover:text-ivory hover:after:scale-x-100",
                      )
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Link to="/styling#book" className="btn btn-gold hidden min-h-11 px-5 text-[0.62rem] sm:inline-flex">
              <span>Book a Consultation</span>
            </Link>
            <button
              type="button"
              className="grid h-11 w-11 place-items-center text-ivory hover:text-gold-soft lg:hidden"
              aria-label="Open menu"
              aria-expanded={drawer}
              aria-controls="mobile-menu"
              onClick={() => setDrawer(true)}
            >
              <Menu className="h-6 w-6" strokeWidth={1.3} aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>
      <MobileDrawer open={drawer} onClose={() => setDrawer(false)} />
    </>
  );
}

function MobileDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <div
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      className={cn(
        "fixed inset-0 z-50 flex flex-col bg-noir text-ivory transition-[opacity,visibility] duration-500 lg:hidden",
        open ? "visible opacity-100" : "invisible opacity-0",
      )}
    >
      <div className="wrap flex h-[5.5rem] items-center justify-between">
        <Logo light />
        <button ref={closeRef} type="button" onClick={onClose} aria-label="Close menu" className="grid h-11 w-11 place-items-center hover:text-gold-soft">
          <X className="h-6 w-6" strokeWidth={1.3} aria-hidden="true" />
        </button>
      </div>
      <nav aria-label="Mobile" className="wrap flex-1 overflow-y-auto pt-6 pb-10">
        <ul className="space-y-1">
          {[{ label: "Home", href: "/" }, ...siteConfig.nav].map((item, i) => (
            <li key={item.href} className={cn(open && "rise")} style={{ "--d": `${80 + i * 60}ms` } as React.CSSProperties}>
              <NavLink
                to={item.href}
                end={item.href === "/"}
                className={({ isActive }) => cn("block py-2 font-display text-[2.2rem] leading-tight", isActive ? "text-gold-soft italic" : "text-ivory")}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="mt-10 border-t border-ivory/10 pt-8">
          <Link to="/styling#book" className="btn btn-gold w-full">
            <span>Book a Styling Consultation</span>
          </Link>
          <a href={`mailto:${siteConfig.contact.email}`} className="mt-6 flex items-center gap-3 text-sm text-ivory/70">
            <Mail className="h-4 w-4 text-gold" strokeWidth={1.4} aria-hidden="true" />
            {siteConfig.contact.email}
          </a>
          <p className="mt-3 flex items-center gap-3 text-sm text-ivory/70">
            <MapPin className="h-4 w-4 text-gold" strokeWidth={1.4} aria-hidden="true" />
            {fullAddress()}
          </p>
        </div>
      </nav>
    </div>
  );
}

function Footer() {
  const c = siteConfig.contact;
  const socials = Object.entries(siteConfig.social).filter(([, url]) => url);
  return (
    <footer className="grain relative overflow-hidden bg-noir text-ivory/70">
      <div className="wrap relative z-[2] pt-24 pb-10">
        <div className="border-b border-ivory/10 pb-16">
          <p className="font-display text-[clamp(2.2rem,6vw,5rem)] leading-[1] text-ivory">
            Redefine Couture.
            <br />
            <span className="text-gold-soft italic">Reinvent Confidence.</span>
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link to="/styling#book" className="btn btn-gold">
              <span>Book a Styling Consultation</span>
            </Link>
            <Link to="/collection" className="btn btn-ghost-light">
              <span>Discover the Collection</span>
            </Link>
          </div>
        </div>

        <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
          <div>
            <Logo light />
            <p className="mt-6 max-w-xs text-sm leading-relaxed font-light">
              A bespoke fashion atelier for custom couture, tailored pieces and personal styling in Lavington, Nairobi.
            </p>
            {socials.length > 0 ? (
              <ul className="mt-6 flex gap-4 text-xs tracking-[0.2em] uppercase">
                {socials.map(([k, url]) => (
                  <li key={k}>
                    <a href={url} target="_blank" rel="noreferrer" className="hover:text-gold-soft">{k}</a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-6 text-xs text-ivory/45">
                <Txt>Social media links (confirm)</Txt>
              </p>
            )}
          </div>
          <FooterCol title="The House">
            {siteConfig.nav.map((n) => (
              <FooterLink key={n.href} to={n.href}>{n.label}</FooterLink>
            ))}
          </FooterCol>
          <FooterCol title="Collection">
            {categories.map((cat) => (
              <FooterLink key={cat.id} to={`/collection?category=${cat.id}`}>{cat.label}</FooterLink>
            ))}
          </FooterCol>
          <FooterCol title="Visit & Contact">
            <li>
              <a href={`mailto:${c.email}`} className="hover:text-gold-soft">{c.email}</a>
            </li>
            <li>
              {c.phone ? (
                <a href={`tel:${c.phone.replace(/\s/g, "")}`} className="hover:text-gold-soft">{c.phone}</a>
              ) : (
                <span className="text-ivory/50"><Txt>Phone number (confirm)</Txt></span>
              )}
            </li>
            <li>
              <address className="not-italic">
                {c.address.line1}
                <br />
                {c.address.area}, {c.address.city}
              </address>
            </li>
            <li className="text-ivory/50"><Txt>{c.visitNote}</Txt></li>
            <li>
              <a href={whatsappLink(`Hello ${siteConfig.name}, I would like to enquire about a bespoke piece.`)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-gold-soft">
                WhatsApp enquiry <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </li>
          </FooterCol>
        </div>

        <div className="flex flex-col gap-4 border-t border-ivory/10 pt-8 text-xs text-ivory/45 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <p className="max-w-xl md:text-center">
            Concept website. All photographs are openly licensed placeholders, credited on the{" "}
            <Link to="/photo-credits" className="underline underline-offset-2 hover:text-gold-soft">photo credits</Link> page.
          </p>
          <div className="flex gap-5">
            <Link to="/privacy" className="hover:text-gold-soft">Privacy</Link>
            <Link to="/photo-credits" className="hover:text-gold-soft">Photo credits</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[0.64rem] font-medium tracking-[0.3em] text-gold-soft uppercase">{title}</p>
      <ul className="mt-6 space-y-3 text-sm font-light">{children}</ul>
    </div>
  );
}

function FooterLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <li>
      <Link to={to} className="transition-colors hover:text-gold-soft">{children}</Link>
    </li>
  );
}

/** Scrolls to the top on page change, or to the #hash target when present. */
function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      // Wait for lazy pages to render before scrolling to the anchor.
      const t = window.setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: "smooth", block: "start" }), 250);
      return () => window.clearTimeout(t);
    }
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname, hash]);
  return null;
}

export default function Layout() {
  const { pathname } = useLocation();
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:bg-gold focus:px-4 focus:py-2 focus:text-noir">
        Skip to content
      </a>
      <ScrollManager />
      <DemoBanner />
      <Header />
      <main id="main" key={pathname} className="page-enter">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
