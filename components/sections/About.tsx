"use client";

import {
  motion,
  AnimatePresence,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowDown } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";

/* ═══════════════════════════════════════════════════════════
   CountUp: a readout that settles on its value.
   With prefers-reduced-motion the figure renders at its target
   immediately instead of counting up to it.
   ═══════════════════════════════════════════════════════════ */
function CountUp({
  target,
  suffix = "",
  delay = 200,
}: {
  target: number;
  suffix?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const [count, setCount] = useState(reduce ? target : 0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  const animationRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    // Already rendered at target via the initial state above, so there is
    // nothing left to synchronize here.
    if (reduce) return;

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
              setCount(Math.floor(target * easeOutCubic));

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
  }, [target, delay, reduce]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

/* ═══════════════════════════════════════════════════════════
   Content
   ═══════════════════════════════════════════════════════════ */

const stats = [
  { value: 4, suffix: "+", label: "Years coding" },
  { value: 5, suffix: "", label: "AWS certifications" },
  { value: 6, suffix: "", label: "Projects" },
  { value: 20, suffix: "+", label: "Technologies" },
];

const story = [
  {
    title: "How I got here",
    body: "I got into this because I wanted to make my own game. That is what pushed me to take Computer Science in high school, where I picked up C and C++. Somewhere along the way I stopped caring about finishing the game and got a lot more interested in how the systems behind it actually worked. That is how I ended up on the backend side, working on APIs, databases and cloud stuff.",
  },
  {
    title: "Why backend and system design",
    body: "Backend is where the problems I actually enjoy are. Two requests hitting the same row at the same time, data that has to stay right across a few services, a database schema you will not regret in six months. I usually spend a while working out how the pieces talk to each other before I write much code, because untangling that later is genuinely painful.",
  },
  {
    title: "Where I'm headed",
    body: "I want to end up on systems where being correct actually matters. The kind where a bug is not just an annoying ticket you pick up next sprint, it is something that costs more than any one person can reasonably cover, and saying sorry does not undo it. That pressure is the part I find interesting rather than scary. If something I build just quietly does its job and nobody ever has to think about it, that is the whole point.",
  },
];

const interests = [
  {
    id: "gaming",
    label: "Gaming",
    icon: (
      <svg
        width="20"
        height="20"
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
    desc: "Gaming is what got me into coding in the first place. I wanted to build my own games, and that curiosity led me into programming. I still play now and then, mostly Mobile Legends and sometimes PUBG.",
    funFact: "I once spent more time modding a game than actually playing it.",
  },
  {
    id: "food",
    label: "Food & Culture",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
        <path d="M7 2v20" />
        <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
      </svg>
    ),
    desc: "I like trying new dishes and learning about different cultures. Food tells you a lot about where people come from, and exploring new cuisines is one of my favorite ways to understand a place.",
    funFact: "I judge cities by their street food scene.",
  },
  {
    id: "travel",
    label: "Travelling",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z" />
      </svg>
    ),
    desc: "I like exploring new places, especially quiet nature spots. A trail, a waterfall, or just a good view is enough to reset my head after a long week.",
    funFact:
      "I prefer getting a little lost. It's the best way to find hidden spots.",
  },
  {
    id: "music",
    label: "Music",
    icon: (
      <svg
        width="20"
        height="20"
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
    desc: "There's usually something playing while I work, lo-fi when I need to focus, something with more energy to start the day.",
    funFact: "My playlists are organized by mood, not genre.",
  },
];

/* Stagger belongs to the readout rows only. The prose fades as one block. */
const readoutContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.08 },
  },
};

const readoutRow: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.215, 0.61, 0.355, 1.0] },
  },
};

export default function About() {
  const reduce = useReducedMotion();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [activeInterest, setActiveInterest] = useState(interests[0]);

  /* One motion contract for the section, dropped wholesale when the
     visitor asks for less movement. */
  const rise = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 14 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-80px" },
      };

  return (
    <section id="about" className="bg-background py-20 sm:py-28">
      {/* Narrower than the hero: this section is meant to be read, not scanned */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <SectionHeader
          title="About"
          description="A bit about how I got into this, and what I want to work on next."
        />

        <div className="mt-14 grid lg:grid-cols-[280px_1fr] gap-10 xl:gap-16 items-start">
          {/* ── LEFT: portrait plate and stat readout, pinned while the story scrolls ── */}
          <div className="lg:sticky lg:top-24 self-start w-full min-w-0 max-w-sm mx-auto lg:mx-0 flex flex-col gap-4">
            <motion.div
              {...(reduce
                ? {}
                : {
                    initial: { opacity: 0, y: 14 },
                    whileInView: { opacity: 1, y: 0 },
                    viewport: { once: true, margin: "-60px" },
                  })}
              transition={{ duration: 0.5 }}
              className="rounded-lg border border-border-strong bg-card overflow-hidden shadow-lift-2"
            >
              {/* The same equipment plate the terminal wears, so the two read as one kit */}
              <div className="flex items-center justify-between gap-3 px-3.5 py-2 border-b border-border bg-secondary">
                <span className="font-mono text-[11px] text-muted-foreground truncate"></span>
                <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-primary shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-signal-lit" />
                </span>
              </div>

              <div className="relative w-full aspect-3/4">
                <Image
                  src="/images/sabinpanta.jpg"
                  alt="Sabin Pant"
                  fill
                  sizes="(max-width: 1024px) 100vw, 280px"
                  className="object-cover object-top transition-opacity duration-500 ease-out"
                  loading="lazy"
                  quality={85}
                  onLoad={() => setImageLoaded(true)}
                  style={{ opacity: imageLoaded ? 1 : 0 }}
                />
                {!imageLoaded && (
                  <div className="absolute inset-0 bg-secondary animate-pulse" />
                )}
              </div>
            </motion.div>

            {/* Stat readout: one bordered strip with internal dividers, the
                vertical cousin of the facts strip under the terminal */}
            <motion.dl
              {...(reduce
                ? {}
                : {
                    variants: readoutContainer,
                    initial: "hidden",
                    whileInView: "show",
                    viewport: { once: true, margin: "-40px" },
                  })}
              className="rounded-lg border border-border bg-card divide-y divide-border overflow-hidden"
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  variants={reduce ? undefined : readoutRow}
                  className="flex items-baseline justify-between gap-4 px-4 py-3"
                >
                  <dt className="text-[12px] text-muted-foreground">
                    {stat.label}
                  </dt>
                  <dd className="display tnum text-xl text-foreground">
                    <CountUp
                      target={stat.value}
                      suffix={stat.suffix}
                      delay={150 + i * 80}
                    />
                  </dd>
                </motion.div>
              ))}
            </motion.dl>
          </div>

          {/* ── RIGHT: the story, held to an article measure ── */}
          <motion.div
            {...rise}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="flex flex-col"
          >
            {story.map((block, i) => (
              <div
                key={block.title}
                className={
                  i > 0 ? "mt-8 pt-8 border-t border-border" : undefined
                }
              >
                <div className="flex gap-4 sm:gap-6">
                  <span className="label-micro tnum pt-2 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <h3 className="display text-xl sm:text-2xl text-foreground">
                      {block.title}
                    </h3>
                    <p className="mt-3 max-w-[64ch] text-[0.95rem] leading-[1.8] text-muted-foreground">
                      {block.body}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Outside work: wider than the prose, to break the column rhythm ── */}
        <div className="mt-20">
          <p className="label-micro">Outside work</p>
          <h3 className="display mt-3 text-2xl sm:text-3xl text-foreground">
            What I do when I close the laptop
          </h3>

          <div className="mt-6 rounded-lg border border-border bg-card overflow-hidden flex flex-col md:flex-row">
            {/* Selector */}
            <div className="w-full md:w-60 bg-secondary border-b md:border-b-0 md:border-r border-border grid grid-cols-2 md:flex md:flex-col p-2 gap-1">
              {interests.map((item) => {
                const isActive = activeInterest.id === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setActiveInterest(item)}
                    className={`flex min-w-0 items-center gap-2.5 sm:gap-3 px-2.5 sm:px-3.5 py-3 rounded-md border-l-2 text-left transition-colors duration-200 ${
                      isActive
                        ? "bg-card border-primary"
                        : "border-transparent hover:bg-card/60"
                    }`}
                  >
                    <span
                      className={`shrink-0 transition-colors duration-200 ${
                        isActive ? "text-primary" : "text-muted-foreground"
                      }`}
                    >
                      {item.icon}
                    </span>
                    <span
                      className={`min-w-0 text-[13px] sm:text-sm font-medium leading-tight md:whitespace-nowrap transition-colors duration-200 ${
                        isActive ? "text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Panel */}
            <div className="flex-1 min-w-0 p-5 sm:p-9 md:p-11 min-h-64 sm:min-h-72 flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeInterest.id}
                  initial={reduce ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? { opacity: 1 } : { opacity: 0, y: -8 }}
                  transition={{ duration: reduce ? 0 : 0.25, ease: "easeOut" }}
                  className="w-full max-w-[62ch]"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-primary">{activeInterest.icon}</span>
                    <h4 className="display text-2xl text-foreground">
                      {activeInterest.label}
                    </h4>
                  </div>

                  <p className="mt-4 text-[0.95rem] leading-[1.8] text-muted-foreground">
                    {activeInterest.desc}
                  </p>

                  <div className="mt-6 flex items-start gap-3 border-l-2 border-border-strong pl-4">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-faint-foreground mt-0.5 shrink-0"
                      aria-hidden="true"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                      <path d="M12 17h.01" />
                    </svg>
                    <p className="text-sm leading-relaxed text-secondary-foreground">
                      {activeInterest.funFact}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Hands the reader forward instead of ending on a flat edge */}
        <motion.a
          {...rise}
          transition={{ duration: 0.45 }}
          href="#skills"
          data-touch-target
          className="mt-16 flex items-center gap-3 group w-fit"
        >
          <span className="label-micro group-hover:text-primary transition-colors">
            Next: what I build with
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
