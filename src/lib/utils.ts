import { siteConfig, demoBanner } from "../../siteConfig";

export const cn = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(" ");

export const img = (name: string) => `/images/${name}`;

/** WhatsApp link to the atelier. With no confirmed number, WhatsApp opens with the message ready and the visitor picks the chat. */
export function whatsappLink(message: string) {
  const n = siteConfig.contact.whatsapp.replace(/\D/g, "");
  const text = encodeURIComponent(message);
  return n ? `https://wa.me/${n}?text=${text}` : `https://wa.me/?text=${text}`;
}

export function mailtoLink(subject: string, body: string) {
  return `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function demoWhatsapp() {
  const digits = demoBanner.whatsapp.replace(/\D/g, "");
  const intl = digits.startsWith("0") ? `254${digits.slice(1)}` : digits;
  return `https://wa.me/${intl}`;
}

export const fullAddress = () => {
  const a = siteConfig.contact.address;
  return `${a.line1}, ${a.area}, ${a.city}`;
};

export const mapsEmbed = (q: string) => `https://www.google.com/maps?q=${encodeURIComponent(q)}&output=embed`;
export const directionsLink = (q: string) => `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(q)}`;

export const todayIso = () => {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
};

export const formatDate = (iso: string) =>
  iso ? new Date(iso + "T00:00:00").toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "long", year: "numeric" }) : "";
