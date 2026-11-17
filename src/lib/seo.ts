import { useEffect } from "react";
import { siteConfig, demoBanner } from "../../siteConfig";

type Seo = {
  title: string;
  description: string;
  path: string;
  image?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
};

function setMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = content;
}

/** Sets a unique title, description, canonical URL, Open Graph tags and JSON-LD per page. */
export function useSeo({ title, description, path, image = "runway-train.jpg", jsonLd }: Seo) {
  useEffect(() => {
    const fullTitle = path === "/" ? title : `${title} | ${siteConfig.name}`;
    const url = `${siteConfig.siteUrl}${path}`;
    document.title = fullTitle;
    setMeta("name", "description", description);
    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", url);
    setMeta("property", "og:image", `${siteConfig.siteUrl}/images/${image}`);
    setMeta("name", "twitter:title", fullTitle);
    setMeta("name", "twitter:description", description);
    if (demoBanner.enabled) setMeta("name", "robots", "noindex, nofollow");

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = url;

    document.getElementById("page-jsonld")?.remove();
    const data = [businessLd(), ...(jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [])];
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "page-jsonld";
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);
  }, [title, description, path, image, jsonLd]);
}

/** Only supplied facts: name, email and street address. No ratings, prices or opening hours until confirmed. */
function businessLd() {
  const a = siteConfig.contact.address;
  return {
    "@context": "https://schema.org",
    "@type": "ClothingStore",
    name: siteConfig.name,
    slogan: siteConfig.message,
    url: siteConfig.siteUrl,
    logo: `${siteConfig.siteUrl}/favicon.svg`,
    email: siteConfig.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: a.line1,
      addressLocality: `${a.area}, ${a.city}`,
      addressCountry: "KE",
    },
  };
}
