import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { img } from "@/lib/utils";
import { useScrollLock } from "@/hooks/useReveal";
import { PhotoCredit } from "@/components/ui";

export type Slide = { image: string; alt: string; caption?: string };

/** Full-screen gallery: arrow keys, Escape, swipe, focus trapped and restored on close. */
export function Lightbox({ slides, start, title, onClose }: { slides: Slide[]; start: number; title: string; onClose: () => void }) {
  const [i, setI] = useState(start);
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const touchX = useRef<number | null>(null);
  useScrollLock(true);

  const go = useCallback((d: number) => setI((x) => (x + d + slides.length) % slides.length), [slides.length]);

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "Tab" && dialogRef.current) {
        const f = dialogRef.current.querySelectorAll<HTMLElement>("button, a[href]");
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      opener?.focus();
    };
  }, [go, onClose]);

  // Preload neighbours
  useEffect(() => {
    [1, -1].forEach((d) => {
      const s = slides[(i + d + slides.length) % slides.length];
      const im = new Image();
      im.src = img(s.image);
    });
  }, [i, slides]);

  const s = slides[i];
  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${title} gallery`}
      className="fade-in fixed inset-0 z-[70] flex flex-col bg-noir/97 text-ivory"
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
        touchX.current = null;
      }}
    >
      <div className="flex items-center justify-between px-4 py-3 sm:px-8">
        <p className="text-[0.62rem] tracking-[0.3em] text-ivory/60 uppercase">
          {title} <span className="ml-3 font-display text-sm tracking-normal text-gold-soft">{String(i + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}</span>
        </p>
        <button ref={closeRef} type="button" onClick={onClose} aria-label="Close gallery" className="grid h-12 w-12 place-items-center hover:text-gold-soft">
          <X className="h-6 w-6" strokeWidth={1.2} aria-hidden="true" />
        </button>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 sm:px-20">
        <img key={s.image} src={img(s.image)} alt={s.alt} className="fade-in max-h-full max-w-full object-contain" />
        <button type="button" onClick={() => go(-1)} aria-label="Previous image" className="absolute left-2 grid h-12 w-12 place-items-center rounded-full bg-noir/50 hover:text-gold-soft sm:left-6">
          <ChevronLeft className="h-6 w-6" strokeWidth={1.2} aria-hidden="true" />
        </button>
        <button type="button" onClick={() => go(1)} aria-label="Next image" className="absolute right-2 grid h-12 w-12 place-items-center rounded-full bg-noir/50 hover:text-gold-soft sm:right-6">
          <ChevronRight className="h-6 w-6" strokeWidth={1.2} aria-hidden="true" />
        </button>
      </div>

      <div className="px-4 py-4 text-center sm:px-8" aria-live="polite">
        {s.caption && <p className="font-display text-lg italic">{s.caption}</p>}
        <PhotoCredit file={s.image} light className="mx-auto mt-1 max-w-2xl" />
      </div>
    </div>
  );
}
