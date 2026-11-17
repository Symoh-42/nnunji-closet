import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath, URL } from "node:url";
import { siteConfig, demoBanner } from "./siteConfig";
import { pieces } from "./src/data/pieces";

const siteUrl = (process.env.VITE_SITE_URL ?? siteConfig.siteUrl).replace(/\/$/, "");

/** Writes sitemap.xml and robots.txt from the site data, and blocks indexing while the demo banner is on. */
function seoFiles(): Plugin {
  return {
    name: "nnunji-seo-files",
    transformIndexHtml(html) {
      const robots = demoBanner.enabled ? `<meta name="robots" content="noindex, nofollow" />` : "";
      return html.replace("<!--robots-->", robots).replaceAll("%SITE_URL%", siteUrl);
    },
    generateBundle() {
      const pages = ["/", "/collection", "/styling", "/lookbook", "/about", "/contact", "/privacy", "/photo-credits"];
      const urls = [...pages, ...pieces.map((p) => `/collection/${p.slug}`)];
      const today = new Date().toISOString().slice(0, 10);
      const sitemap =
        `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
        urls.map((u) => `  <url><loc>${siteUrl}${u}</loc><lastmod>${today}</lastmod></url>`).join("\n") +
        `\n</urlset>\n`;
      const robots = demoBanner.enabled
        ? `# Demo site - indexing disabled until demoBanner.enabled is false in siteConfig.ts\nUser-agent: *\nDisallow: /\n`
        : `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`;
      this.emitFile({ type: "asset", fileName: "sitemap.xml", source: sitemap });
      this.emitFile({ type: "asset", fileName: "robots.txt", source: robots });
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), seoFiles()],
  resolve: { alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) } },
});
