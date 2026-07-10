"use client";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { useEffect, useRef, useState, CSSProperties } from "react";
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
  const animationRef = useRef<number | undefined>(undefined);

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

const stats = [
  { value: 4, suffix: "+", label: "Years Coding", accent: "#6366f1" },
  { value: 5, suffix: "x", label: "AWS Certified", accent: "#f59e0b" },
  { value: 4, suffix: "+", label: "Major Projects", accent: "#06b6d4" },
  { value: 20, suffix: "+", label: "Technologies", accent: "#10b981" },
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
    desc: "Gaming is what got me into coding in the first place. I started out wanting to build my own games, and that curiosity led me down the rabbit hole of programming. These days I still enjoy diving into a good game like Mobile Legends or sometimes PUBG, though I'm not as active as I used to be.",
    accent: "#6366f1",
    funFact: "I once spent more time modding a game than actually playing it",
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
    desc: "I love trying out new dishes and experiencing different cultures. There's something special about how food brings people together and tells stories about where they come from. Exploring new cuisines is one of my favorite ways to understand the world beyond my own bubble.",
    accent: "#f59e0b",
    funFact: "I judge cities by their street food scene",
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
    desc: "I love exploring new places, especially nature spots with lots of greenery and peaceful vibes. There's nothing better than discovering a quiet trail, a hidden waterfall, or just sitting somewhere with a beautiful view. Travel clears my mind and gives me fresh energy.",
    accent: "#06b6d4",
    funFact:
      "I prefer getting a little lost, it's the best way to find hidden gems",
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
    desc: "Music is my constant companion, especially when I'm deep in code. Whether it's lo-fi beats for focus sessions or something energetic to kick off the day, I've always got something playing in the background. It sets the mood for everything I do.",
    accent: "#ec4899",
    funFact: "My playlists are organized by mood, not genre",
  },
];

/* Animation Variants */
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const childVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.215, 0.61, 0.355, 1.0] },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function About() {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [activeInterest, setActiveInterest] = useState(interests[0]);

  return (
    <section
      id="about"
      className="py-28 relative overflow-hidden bg-(--background)"
    >
      {/* Ambient glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 -right-20 w-130 h-130 will-change-transform"
        style={{
          background:
            "radial-gradient(circle, rgba(99,102,241,0.035) 0%, transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-15 -left-15 w-95 h-95 will-change-transform"
        style={{
          background:
            "radial-gradient(circle, rgba(59,130,246,0.025) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-20"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-(--border) bg-(--secondary) text-[10px] text-(--primary) mb-5 font-semibold tracking-[0.18em] uppercase">
            About Me
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
            The developer behind{" "}
            <span className="text-(--primary)">the architecture.</span>
          </h2>
          <p className="mt-4 text-(--muted-foreground) max-w-xl mx-auto text-[0.95rem] leading-relaxed">
            Backend-focused developer who genuinely enjoys figuring out how
            complex systems fit together.
          </p>
        </motion.div>

        {/* Main layout grid */}
        <div className="grid lg:grid-cols-[360px_1fr] gap-14 xl:gap-20 items-start mb-20">
          {/* LEFT: Image + Stats */}
          <div className="lg:sticky lg:top-28 flex flex-col gap-6 self-start w-full max-w-90 mx-auto lg:mx-0">
            {/* Photo card */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative w-full"
            >
              <div
                aria-hidden
                className="absolute inset-0 translate-x-2.5 translate-y-2.5 rounded-2xl border border-(--primary)/15 pointer-events-none"
              />
              <div className="relative rounded-2xl overflow-hidden border border-(--border) bg-(--card) shadow-sm">
                <div
                  aria-hidden
                  className="absolute inset-0 z-10 pointer-events-none rounded-2xl bg-linear-to-b from-transparent via-transparent to-(--background)/60"
                />

                <div className="relative w-full aspect-3/4">
                  <Image
                    src="/images/sabinpanta.jpg"
                    alt="Sabin Pant"
                    fill
                    sizes="(max-width: 768px) 100vw, 360px"
                    className="object-cover object-top transition-opacity duration-500 ease-out"
                    priority={true}
                    quality={85}
                    onLoad={() => setImageLoaded(true)}
                    style={{ opacity: imageLoaded ? 1 : 0 }}
                  />
                  {!imageLoaded && (
                    <div className="absolute inset-0 bg-(--secondary) animate-pulse" />
                  )}
                </div>

                {/* Availability badge */}
                <div className="absolute bottom-0 left-0 right-0 z-20 px-4 pb-4">
                  <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-(--background)/70 backdrop-blur-md border border-(--border)">
                    <span className="relative shrink-0">
                      <span className="block w-2 h-2 rounded-full bg-emerald-400" />
                      <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-60" />
                    </span>
                    <div>
                      <p className="text-xs font-semibold text-(--foreground) leading-snug">
                        Available for opportunities
                      </p>
                      <p className="text-[11px] text-(--muted-foreground)">
                        Full-time · Internship · Freelance
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Stats grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-40px" }}
              className="grid grid-cols-2 gap-3 w-full"
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  variants={childVariants}
                  style={{ "--local-accent": stat.accent } as CSSProperties}
                  className="bg-(--card) border border-(--border) rounded-xl p-4 transition-all duration-300 ease-out cursor-default will-change-transform group hover:border-(--local-accent)/40 hover:shadow-[0_4px_20px_-4px_rgba(var(--local-accent),0.1)] hover:-translate-y-0.5"
                >
                  <div
                    className="text-2xl font-bold mb-0.5 tabular-nums transition-transform duration-300 group-hover:scale-105 origin-left"
                    style={{ color: stat.accent }}
                  >
                    <CountUp
                      target={stat.value}
                      suffix={stat.suffix}
                      delay={150 + i * 80}
                    />
                  </div>
                  <div className="text-[11px] text-(--muted-foreground) font-medium tracking-wide">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT: Story blocks */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-8 pt-1"
          >
            <div className="flex flex-wrap gap-2">
              {[
                "Full-Stack Developer",
                "BSc Computing · London Met",
                "5× AWS Certified",
              ].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-[11px] font-medium tracking-wide bg-(--secondary) border border-(--border) text-(--secondary-foreground) shadow-sm"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="space-y-3">
              <h3 className="flex items-center gap-2 text-xs font-semibold tracking-[0.15em] uppercase text-(--primary)">
                <span className="h-3 w-0.5 rounded-full bg-(--primary)" />
                Origin Story
              </h3>
              <p className="text-(--muted-foreground) leading-[1.8] text-[0.95rem] font-normal text-justify lg:text-left">
                Honestly? It started because I wanted to make my own game. That
                sent me down the Computer Science path in high school, where I
                picked up C and C++ and got hooked almost immediately,
                there&apos;s something satisfying about a program finally
                running the way it&apos;s supposed to. Somewhere along the way,
                my curiosity drifted from &quot;how do I build a game&quot; to
                &quot;how do real systems actually work,&quot; and I ended up
                falling for backend architecture, data pipelines, and cloud
                infrastructure instead.
              </p>
            </div>

            <div className="h-px w-full bg-(--border) opacity-60" />

            <div className="space-y-3">
              <h3 className="flex items-center gap-2 text-xs font-semibold tracking-[0.15em] uppercase text-(--primary)">
                <span className="h-3 w-0.5 rounded-full bg-(--primary)" />
                Why Backend & System Design
              </h3>
              <p className="text-(--muted-foreground) leading-[1.8] text-[0.95rem] font-normal text-justify lg:text-left">
                I like backend because that&apos;s where the real puzzle is.
                Figuring out how to handle race conditions, keep data consistent
                across services, and design a schema that won&apos;t fall apart
                six months from now, that stuff genuinely interests me.
                I&apos;ll happily spend an hour sketching out how different
                parts of a system talk to each other before writing a single
                line of code. Frontend gets the spotlight, but backend is what
                keeps the lights on.
              </p>
            </div>

            <div className="h-px w-full bg-(--border) opacity-60" />

            <div className="space-y-3">
              <h3 className="flex items-center gap-2 text-xs font-semibold tracking-[0.15em] uppercase text-(--primary)">
                <span className="h-3 w-0.5 rounded-full bg-(--primary)" />
                Where I&apos;m Headed
              </h3>
              <p className="text-(--muted-foreground) leading-[1.8] text-[0.95rem] font-normal text-justify lg:text-left">
                Long term, I want to work on the kind of infrastructure where
                there&apos;s zero room for error, think banking systems, payment
                processing, real-time transactions. The stuff where a bug
                isn&apos;t just annoying, it&apos;s a real problem for real
                people. That pressure is exactly what pulls me in. I want to be
                the person building systems people can trust without even
                thinking about it.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Interests & Hobbies */}
        <div className="mt-16 w-full">
          {/* Section Header */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-(--primary) font-semibold text-sm uppercase tracking-wider">
              Outside the Code
            </span>
            <div className="flex-1 h-px bg-linear-to-r from-(--border) to-transparent" />
          </div>

          {/* Interactive Interest Cards */}
          <div className="rounded-2xl border border-(--border) bg-(--card)/40 backdrop-blur-md overflow-hidden flex flex-col md:flex-row shadow-2xl relative">
            {/* Left Sidebar (Navigation) */}
            <div className="w-full md:w-70 bg-(--background)/50 border-b md:border-b-0 md:border-r border-(--border) flex flex-row md:flex-col p-3 gap-2 overflow-x-auto hide-scrollbar z-20">
              {interests.map((item) => {
                const isActive = activeInterest.id === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveInterest(item)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl border-l-2 transition-all duration-300 ease-out shrink-0 md:shrink ${
                      isActive
                        ? "bg-(--secondary) border-(--primary)"
                        : "border-transparent hover:bg-(--secondary)/50"
                    }`}
                  >
                    <div
                      className={`transition-colors duration-300 ${
                        isActive
                          ? "text-(--primary)"
                          : "text-(--muted-foreground)"
                      }`}
                    >
                      {item.icon}
                    </div>
                    <span
                      className={`text-sm font-semibold tracking-wide whitespace-nowrap transition-colors duration-300 ${
                        isActive
                          ? "text-(--foreground)"
                          : "text-(--muted-foreground)"
                      }`}
                    >
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Right Content Display */}
            <div className="flex-1 relative p-8 md:p-12 min-h-95 flex flex-col justify-center">
              {/* Subtle background pattern */}
              <div
                className="absolute inset-0 pointer-events-none opacity-[0.08] dark:opacity-[0.04]"
                style={{
                  backgroundImage: `radial-gradient(circle, var(--border) 1px, transparent 1px)`,
                  backgroundSize: "20px 20px",
                }}
              />

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeInterest.id}
                  initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="relative z-10 w-full max-w-2xl"
                >
                  {/* Icon & Label */}
                  <div className="flex items-center gap-3 mb-6">
                    <div style={{ color: activeInterest.accent }}>
                      {activeInterest.icon}
                    </div>
                    <h3 className="text-3xl font-bold text-(--foreground) tracking-tight">
                      {activeInterest.label}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-(--muted-foreground) text-[0.95rem] leading-relaxed mb-8">
                    {activeInterest.desc}
                  </p>

                  {/* Fun Fact Bubble */}
                  <div
                    className="inline-flex items-start gap-3 px-5 py-4 rounded-2xl"
                    style={{
                      backgroundColor: activeInterest.accent + "12",
                      border: `1px solid ${activeInterest.accent}25`,
                    }}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{
                        color: activeInterest.accent,
                        marginTop: "2px",
                        flexShrink: 0,
                      }}
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                      <path d="M12 17h.01" />
                    </svg>
                    <div>
                      <p
                        className="text-xs font-semibold uppercase tracking-wider mb-1"
                        style={{ color: activeInterest.accent }}
                      >
                        Fun Fact
                      </p>
                      <p className="text-sm text-(--foreground) leading-relaxed">
                        {activeInterest.funFact}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
