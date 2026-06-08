"use client";
import { motion, type Variants } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

function CountUp({
  target,
  suffix = "",
  delay = 200,
}: {
  target: number;
  suffix?: string;
  delay?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  const animationRef = useRef<number | undefined>(undefined); // Fix: Add undefined

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          setTimeout(() => {
            if (started.current) return;
            started.current = true;

            let startTime: number | null = null;
            const duration = 1400;

            const animate = (currentTime: number) => {
              if (!startTime) startTime = currentTime;
              const elapsed = currentTime - startTime;
              const progress = Math.min(1, elapsed / duration);
              const easeOutCubic = 1 - Math.pow(1 - progress, 3);
              const currentCount = Math.floor(target * easeOutCubic);
              setCount(currentCount);

              if (progress < 1) {
                animationRef.current = requestAnimationFrame(animate);
              } else {
                setCount(target);
              }
            };

            animationRef.current = requestAnimationFrame(animate);
          }, delay);
        }
      },
      { threshold: 0.5, rootMargin: "50px" },
    );

    if (ref.current) observer.observe(ref.current);
    return () => {
      observer.disconnect();
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [target, delay]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

/* ─────────────────────────────────────────
   Data (unchanged)
───────────────────────────────────────── */
const stats = [
  { value: 2, suffix: "+", label: "Years Coding", accent: "#6366f1" },
  { value: 5, suffix: "x", label: "AWS Certified", accent: "#f59e0b" },
  { value: 3, suffix: "", label: "Major Projects", accent: "#06b6d4" },
  { value: 20, suffix: "+", label: "Technologies", accent: "#10b981" },
];

const interests = [
  {
    label: "Gaming",
    desc: "Where it all started gaming sparked my curiosity to understand how software really works.",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="6" width="20" height="12" rx="4" />
        <path d="M12 12h.01M8 10v4M10 12H6" />
        <circle cx="16" cy="11" r="0.75" fill="currentColor" stroke="none" />
        <circle cx="18" cy="13" r="0.75" fill="currentColor" stroke="none" />
      </svg>
    ),
    accent: "#6366f1",
  },
  {
    label: "Music",
    desc: "Rhythm and patterns music keeps me grounded and sharpens pattern recognition.",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </svg>
    ),
    accent: "#ec4899",
  },
  {
    label: "Travelling",
    desc: "New cities, new perspectives travel rewires how I think and approach problems.",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    accent: "#06b6d4",
  },
  {
    label: "FinTech & Banking",
    desc: "My career north star building the systems that move money reliably at scale.",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="9" width="18" height="12" rx="2" />
        <path d="M3 9l9-6 9 6" />
        <line x1="12" y1="12" x2="12" y2="21" />
        <line x1="8" y1="12" x2="8" y2="21" />
        <line x1="16" y1="12" x2="16" y2="21" />
      </svg>
    ),
    accent: "#10b981",
  },
];

/* ─────────────────────────────────────────
   Framer helpers
───────────────────────────────────────── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
  },
};
const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -20 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  },
};
const fadeRight: Variants = {
  hidden: { opacity: 0, x: 20 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  },
};

/* ─────────────────────────────────────────
   Component
───────────────────────────────────────── */
export default function About() {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <section id="about" className="py-28 relative overflow-hidden">
      {/* ── ambient glows — GPU-friendly ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-[-80px] right-[-80px] w-[520px] h-[520px] will-change-transform"
        style={{
          background:
            "radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[-60px] left-[-60px] w-[380px] h-[380px] will-change-transform"
        style={{
          background:
            "radial-gradient(circle, rgba(59,130,246,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-20"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--border)] bg-[var(--secondary)] text-[10px] text-[var(--primary)] mb-5 font-semibold tracking-[0.18em] uppercase">
            About Me
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
            The developer behind{" "}
            <span className="text-[var(--primary)]">the architecture.</span>
          </h2>
          <p className="mt-4 text-[var(--muted-foreground)] max-w-xl mx-auto text-[0.95rem] leading-relaxed">
            Backend-first. System-design obsessed. Built to handle what happens
            at scale.
          </p>
        </motion.div>

        {/* Main two-column grid */}
        <div className="grid lg:grid-cols-[400px_1fr] gap-14 xl:gap-20 items-start mb-16">
          {/* LEFT: image + stats */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col gap-6"
          >
            {/* Photo card - OPTIMIZED with Next.js Image */}
            <div className="relative w-full max-w-[360px] mx-auto lg:mx-0">
              <div
                aria-hidden
                className="absolute inset-0 translate-x-[10px] translate-y-[10px] rounded-2xl border border-[var(--primary)]/20 pointer-events-none"
              />

              <div className="relative rounded-2xl overflow-hidden border border-[var(--border)] bg-[var(--card)]">
                <div
                  aria-hidden
                  className="absolute inset-0 z-10 pointer-events-none rounded-2xl bg-gradient-to-b from-transparent via-transparent to-[var(--background)]/55"
                />

                {/* Optimized Image */}
                <div className="relative w-full aspect-[3/4]">
                  <Image
                    src="/images/sabinpanta.jpg"
                    alt="Sabin Pant"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                    className="object-cover object-top"
                    priority={false}
                    loading="eager"
                    quality={85}
                    onLoad={() => setImageLoaded(true)}
                    style={{
                      opacity: imageLoaded ? 1 : 0,
                      transition: "opacity 0.3s ease",
                    }}
                  />
                  {!imageLoaded && (
                    <div className="absolute inset-0 bg-[var(--secondary)] animate-pulse" />
                  )}
                </div>

                {/* availability badge */}
                <div className="absolute bottom-0 left-0 right-0 z-20 px-4 pb-4">
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[var(--background)]/70 backdrop-blur-md border border-[var(--border)]"
                  >
                    <span className="relative flex-shrink-0">
                      <span className="block w-2 h-2 rounded-full bg-emerald-400" />
                      <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-60" />
                    </span>
                    <div>
                      <p className="text-xs font-semibold text-[var(--foreground)] leading-snug">
                        Available for opportunities
                      </p>
                      <p className="text-[11px] text-[var(--muted-foreground)]">
                        Full-time · Internship · Freelance
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Stats grid - OPTIMIZED with will-change */}
            <div className="grid grid-cols-2 gap-3 w-full max-w-[360px] mx-auto lg:mx-0">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ delay: 0.08 + i * 0.07, duration: 0.4 }}
                  className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-4 hover:border-[var(--primary)]/40 hover:scale-[1.02] transition-all duration-200 cursor-default will-change-transform"
                >
                  <div
                    className="text-2xl font-bold mb-0.5 tabular-nums"
                    style={{ color: stat.accent }}
                  >
                    {/* Add delay based on index to stagger counter starts */}
                    <CountUp
                      target={stat.value}
                      suffix={stat.suffix}
                      delay={200 + i * 100}
                    />
                  </div>
                  <div className="text-[11px] text-[var(--muted-foreground)] font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT: story - unchanged */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col gap-7 pt-1"
          >
            <div className="flex flex-wrap gap-2">
              {[
                "Full-Stack Intern @ Leaflet Digital",
                "BSc Computing · London Met",
                "5× AWS Certified",
              ].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-[11px] font-medium tracking-wide bg-[var(--secondary)] border border-[var(--border)] text-[var(--secondary-foreground)]"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="space-y-2">
              <h3 className="text-xs font-semibold tracking-[0.15em] uppercase text-[var(--primary)]">
                Origin Story
              </h3>
              <p className="text-[var(--muted-foreground)] leading-[1.8] text-[0.95rem]">
                It started with a game. I wanted to build one, so in high
                school, I decided to pursue a Computer Science degree. I began
                by picking up C and C++, and that first taste of building a
                powerful foundation in programming paradigms and Data Structures
                and Algorithms (DSA) was addictive. As my curiosity deepened, my
                interests naturally shifted from games to real-world
                applications. Every layer I pulled back revealed something more
                interesting underneath leading me from C/C++ to Java, then into
                backend architecture, and ultimately to databases and cloud
                infrastructure.
              </p>
            </div>

            <div className="h-px w-full bg-[var(--border)]" />

            <div className="space-y-2">
              <h3 className="text-xs font-semibold tracking-[0.15em] uppercase text-[var(--primary)]">
                Why Backend & System Design
              </h3>
              <p className="text-[var(--muted-foreground)] leading-[1.8] text-[0.95rem]">
                Backend is the foundation everything else relies on. I'm drawn
                to it because it's where complexity actually lives race
                conditions, transaction atomicity, distributed consistency,
                schema design. I like thinking about systems before I touch
                code: mapping the actors, designing the data flow,
                stress-testing the edge cases on paper first. The frontend
                shines because the backend orchestrates it. I'm the one behind
                the curtain making that happen.
              </p>
            </div>

            <div className="h-px w-full bg-[var(--border)]" />

            <div className="space-y-2">
              <h3 className="text-xs font-semibold tracking-[0.15em] uppercase text-[var(--primary)]">
                Where I'm Headed
              </h3>
              <p className="text-[var(--muted-foreground)] leading-[1.8] text-[0.95rem]">
                My goal is to work on enterprise-level infrastructure the kind
                that doesn't get a second chance. Banking systems, stock market
                platforms, payment gateways, financial data pipelines. Systems
                where a bug isn't just a bug, it's a liability. That high-stakes
                environment is exactly what drives me: designing for
                correctness, reliability, and scale in domains where all three
                are non-negotiable.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Interests section */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="space-y-5"
        >
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-[var(--border)]" />
            <span className="text-[10px] font-semibold tracking-[0.18em] uppercase text-[var(--muted-foreground)]">
              Interests
            </span>
            <div className="h-px flex-1 bg-[var(--border)]" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {interests.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: i * 0.07, duration: 0.4 }}
                className="group bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 hover:border-[var(--primary)]/40 hover:-translate-y-1 transition-all duration-200 cursor-default will-change-transform"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-colors duration-250"
                  style={{
                    background: item.accent + "18",
                    borderColor: item.accent + "35",
                    color: item.accent,
                  }}
                >
                  {item.icon}
                </div>
                <h4 className="text-sm font-semibold text-[var(--foreground)] mb-1.5">
                  {item.label}
                </h4>
                <p className="text-[11.5px] text-[var(--muted-foreground)] leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
