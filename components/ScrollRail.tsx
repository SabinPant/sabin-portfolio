"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/* ═══════════════════════════════════════════════════════════
   Scroll rail

   Wayfinding, not a feature. It answers two questions a long
   page otherwise leaves open: where am I, and how much is left.
   Desktop only, the navbar already carries orientation on small
   screens and this would only crowd them.
   ═══════════════════════════════════════════════════════════ */

const SECTIONS = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact" },
] as const;

/* Same offset the navbar and the terminal scroll with */
const SCROLL_OFFSET = 80;

export default function ScrollRail() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    /* "hero" is watched but never gets a marker: while it owns the band
       the rail has nothing to point at, so it stays out of the way. */
    const ids = SECTIONS.map((s) => s.id);
    const targets = ["hero", ...ids]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (targets.length === 0) return;

    const inBand = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) inBand.add(entry.target.id);
          else inBand.delete(entry.target.id);
        }

        const current = ids.find((id) => inBand.has(id));
        if (current) setActive(current);
        else if (inBand.has("hero")) setActive(null);
        /* Neither: the reader is past the last section, so hold the last
           reading instead of blinking the rail off at the end of the page. */
      },
      /* Same observation band the navbar reads from, so the two
         instruments never disagree about where the reader is. */
      { rootMargin: `-${SCROLL_OFFSET}px 0px -60% 0px`, threshold: 0 },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
    window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
  };

  const index = SECTIONS.findIndex((s) => s.id === active);
  const shown = index >= 0;

  return (
    <nav
      aria-label="Page sections"
      className={`hidden lg:block fixed right-2 xl:right-5 top-1/2 -translate-y-1/2 z-30 ${
        reduce ? "" : "transition-opacity duration-300"
      } ${shown ? "opacity-100" : "opacity-0 invisible pointer-events-none"}`}
    >
      <ul className="relative flex flex-col items-center">
        {/* Spine, drawn between the first and last marker centres */}
        <span
          aria-hidden="true"
          className="absolute left-1/2 -translate-x-1/2 top-3.5 bottom-3.5 w-px bg-border"
        />

        {SECTIONS.map((s) => {
          const isActive = s.id === active;
          return (
            <li key={s.id}>
              <button
                type="button"
                onClick={() => scrollToSection(s.id)}
                aria-label={`Go to ${s.label}`}
                aria-current={isActive ? "true" : undefined}
                className="group relative flex h-7 w-7 items-center justify-center"
              >
                <span
                  aria-hidden="true"
                  className={`pointer-events-none absolute right-full mr-1.5 whitespace-nowrap rounded-sm border border-border bg-elevated px-1.5 py-0.5 font-mono text-[0.66rem] uppercase tracking-[0.13em] opacity-0 shadow-lift-1 group-hover:opacity-100 group-focus-visible:opacity-100 ${
                    isActive ? "text-primary" : "text-muted-foreground"
                  } ${reduce ? "" : "transition-opacity duration-150"}`}
                >
                  {s.label}
                </span>

                <span
                  aria-hidden="true"
                  className={`rounded-full ${reduce ? "" : "transition-all duration-200"} ${
                    isActive
                      ? "h-1.75 w-1.75 bg-primary"
                      : "h-1.25 w-1.25 bg-border-strong group-hover:bg-muted-foreground"
                  }`}
                />
              </button>
            </li>
          );
        })}
      </ul>

      {/* How much is left, read as an instrument rather than a heading */}
      <p aria-hidden="true" className="label-micro tnum mt-1.5 text-center">
        {String(Math.max(index + 1, 1)).padStart(2, "0")}/
        {String(SECTIONS.length).padStart(2, "0")}
      </p>
    </nav>
  );
}
