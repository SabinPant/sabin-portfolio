"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Download, ArrowRight, ArrowDown } from "lucide-react";
import Terminal from "@/components/Terminal";

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/SabinPant",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/sabinpant",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
  },
];

const facts = [
  { value: "5", label: "AWS certifications" },
  { value: "2", label: "Internships" },
  { value: "6", label: "Projects" },
];

export default function Hero() {
  const reduce = useReducedMotion();
  const fade = reduce
    ? {}
    : { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 } };

  return (
    <section id="hero" className="relative border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-28 sm:pt-32 lg:pt-36 pb-16 sm:pb-20">
        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-10 lg:gap-14 items-start">
          {/* ── Identity ── */}
          <div className="min-w-0 lg:pt-6">
            <motion.p
              {...fade}
              transition={{ duration: 0.5 }}
              className="label-micro mb-4"
            >
              Full-Stack &amp; Backend Developer
            </motion.p>

            <motion.h1
              {...fade}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="display text-5xl sm:text-6xl lg:text-7xl"
            >
              Sabin Pant
            </motion.h1>

            <motion.p
              {...fade}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-5 text-base sm:text-[17px] text-muted-foreground leading-relaxed max-w-[46ch]"
            >
              I&apos;m a backend developer based in Kathmandu. I like working out
              how a system should fit together before I start writing code, so it
              still makes sense a few months later. Mostly APIs, databases, and
              the parts nobody sees.
            </motion.p>

            <motion.div
              {...fade}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="mt-8 flex flex-col sm:flex-row flex-wrap gap-3"
            >
              <a
                href="#projects"
                data-touch-target
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
              >
                View projects
                <ArrowRight size={16} aria-hidden="true" />
              </a>
              <a
                href="/SabinPant_CV.pdf"
                download
                data-touch-target
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-border-strong text-sm font-medium hover:bg-secondary transition-colors"
              >
                <Download size={15} aria-hidden="true" />
                Download CV
              </a>
            </motion.div>

            <motion.div
              {...fade}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-7 flex items-center gap-6"
            >
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-touch-target
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {s.icon}
                  {s.label}
                </a>
              ))}
            </motion.div>
          </div>

          {/* ── The terminal, as the centerpiece ── */}
          <motion.div
            {...fade}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="flex w-full min-w-0 flex-col gap-4"
          >
            <Terminal />

            <dl className="grid grid-cols-3 divide-x divide-border border border-border rounded-lg bg-card overflow-hidden">
              {facts.map((f) => (
                <div key={f.label} className="min-w-0 px-2 sm:px-3 py-3.5 text-center">
                  <dt className="sr-only">{f.label}</dt>
                  <dd className="display text-2xl tnum text-foreground">
                    {f.value}
                  </dd>
                  <dd className="mt-1 text-[10.5px] sm:text-[11px] text-muted-foreground leading-tight hyphens-auto">
                    {f.label}
                  </dd>
                </div>
              ))}
            </dl>
          </motion.div>
        </div>

        {/* Hands the reader to the next section instead of ending flat */}
        <motion.a
          {...fade}
          transition={{ duration: 0.5, delay: 0.3 }}
          href="#about"
          data-touch-target
          className="mt-14 sm:mt-16 flex items-center gap-3 group w-fit"
        >
          <span className="label-micro group-hover:text-primary transition-colors">
            Next: how I got here
          </span>
          <ArrowDown
            size={13}
            aria-hidden="true"
            className="text-faint-foreground group-hover:text-primary group-hover:translate-y-0.5 transition-all"
          />
        </motion.a>
      </div>
    </section>
  );
}
