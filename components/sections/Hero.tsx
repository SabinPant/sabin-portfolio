"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";
import { Download } from "lucide-react";
import Image from "next/image";

/* ─────────────── HOOKS ─────────────── */

/** Tracks the active breakpoint so layout-sensitive values (orbit radii,
 *  photo size) can respond to real viewport size instead of only flipping
 *  at the single `lg` grid breakpoint. */
function useBreakpoint() {
  const [bp, setBp] = useState<"xs" | "sm" | "md" | "lg">("lg");

  useEffect(() => {
    const query = (min: number) => window.matchMedia(`(min-width: ${min}px)`);
    const mqLg = query(1024);
    const mqMd = query(768);
    const mqSm = query(480);

    const update = () => {
      if (mqLg.matches) setBp("lg");
      else if (mqMd.matches) setBp("md");
      else if (mqSm.matches) setBp("sm");
      else setBp("xs");
    };

    update();
    [mqLg, mqMd, mqSm].forEach((mq) => mq.addEventListener("change", update));
    return () => {
      [mqLg, mqMd, mqSm].forEach((mq) =>
        mq.removeEventListener("change", update),
      );
    };
  }, []);

  return bp;
}

/* ─────────────── TYPEWRITER ─────────────── */
function Typewriter({
  lines,
  className,
}: {
  lines: { text: string; delay: number; color?: string }[];
  className?: string;
}) {
  const [revealed, setRevealed] = useState<number[]>([]);

  useEffect(() => {
    const timers = lines.map((line, i) =>
      setTimeout(() => setRevealed((p) => [...p, i]), line.delay),
    );
    return () => timers.forEach(clearTimeout);
  }, [lines]);

  return (
    <div className={className}>
      {lines.map((line, i) => (
        <AnimatePresence key={i}>
          {revealed.includes(i) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2 font-mono text-xs sm:text-sm leading-7 whitespace-nowrap"
            >
              <span style={{ color: line.color ?? "var(--muted-foreground)" }}>
                {line.text}
              </span>
              {i === lines.length - 1 && (
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="inline-block w-2 h-4 bg-(--primary)"
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      ))}
    </div>
  );
}

/* ─────────────── MAGNETIC BUTTON ─────────────── */
function MagneticButton({
  children,
  href,
  className,
  download,
}: {
  children: React.ReactNode;
  href?: string;
  className?: string;
  download?: boolean;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 20 });
  const sy = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMouse = (e: React.MouseEvent) => {
    if (prefersReducedMotion) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.35);
    y.set((e.clientY - cy) * 0.35);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      download={download}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ x: sx, y: sy }}
      whileTap={{ scale: 0.96 }}
      className={className}
    >
      {children}
    </motion.a>
  );
}

/* ─────────────── NOISE GRAIN LAYER ─────────────── */
function GrainOverlay() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 opacity-[0.035]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
        backgroundSize: "128px 128px",
      }}
    />
  );
}

/* ─────────────── ORBIT RING ─────────────── */
function OrbitRing({
  radius,
  duration,
  startAngle,
  iconText,
  color,
  badgeSize = 36,
  reduceMotion = false,
}: {
  radius: number;
  duration: number;
  startAngle: number;
  iconText: string;
  color: string;
  badgeSize?: number;
  reduceMotion?: boolean;
}) {
  return (
    <div
      aria-hidden
      className="absolute inset-0 flex items-center justify-center"
      style={{ pointerEvents: "none" }}
    >
      <motion.div
        animate={reduceMotion ? undefined : { rotate: 360 }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
        style={{
          width: radius * 2,
          height: radius * 2,
          position: "absolute",
        }}
      >
        <motion.div
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: `translateX(-50%) rotate(${startAngle}deg) translateY(-${radius}px)`,
          }}
        >
          <motion.div
            animate={reduceMotion ? undefined : { rotate: -360 }}
            transition={{ duration, repeat: Infinity, ease: "linear" }}
            style={{
              width: badgeSize,
              height: badgeSize,
              borderRadius: 8,
              background: color + "18",
              border: `1px solid ${color}33`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: Math.max(10, badgeSize * 0.32),
              fontFamily: "monospace",
              color,
              backdropFilter: "blur(4px)",
            }}
          >
            {iconText}
          </motion.div>
        </motion.div>
      </motion.div>
      {/* Ring border */}
      <div
        style={{
          width: radius * 2,
          height: radius * 2,
          position: "absolute",
          borderRadius: "50%",
          border: `1px dashed var(--border)`,
          opacity: 0.4,
        }}
      />
    </div>
  );
}

/* ─────────────── SCANLINE ─────────────── */
function Scanline() {
  const prefersReducedMotion = useReducedMotion();
  if (prefersReducedMotion) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute left-0 right-0 h-px z-20"
      style={{
        background:
          "linear-gradient(90deg, transparent, var(--primary), transparent)",
        opacity: 0.15,
      }}
      animate={{ top: ["0%", "100%"] }}
      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
    />
  );
}

/* ─────────────── MAIN HERO ─────────────── */
export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const bp = useBreakpoint();

  // Responsive photo/orbit sizing — scales down smoothly instead of only
  // flipping at the single `lg` breakpoint the grid uses.
  const photoSize =
    bp === "lg" ? 320 : bp === "md" ? 280 : bp === "sm" ? 220 : 200;
  const showOrbits = bp === "lg" || bp === "md";
  const orbitScale = bp === "lg" ? 1 : 0.72;

  const terminalLines = useMemo(
    () => [
      { text: "$ whoami", delay: 600, color: "#6366f1" },
      {
        text: "→ sabin_pant :: full-stack engineer",
        delay: 1000,
        color: "#e8e8f0",
      },
      { text: "$ cat approach.txt", delay: 1700, color: "#6366f1" },
      {
        text: "→ architecture first. code second.",
        delay: 2100,
        color: "#a0a0b8",
      },
      { text: "$ ls specialties/", delay: 2800, color: "#6366f1" },
      {
        text: "→ system-design  auth  APIs  cloud",
        delay: 3200,
        color: "#a0a0b8",
      },
      { text: "$ status --check", delay: 4000, color: "#6366f1" },
      { text: "→ open to opportunities ▋", delay: 4400, color: "#4ade80" },
    ],
    [],
  );

  const socialLinks = useMemo(
    () => [
      {
        label: "GitHub",
        href: "https://github.com/SabinPant",
        icon: (
          <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
        ),
      },
      {
        label: "LinkedIn",
        href: "https://linkedin.com/in/sabinpant",
        icon: (
          <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
          </svg>
        ),
      },
    ],
    [],
  );

  const statBadges = useMemo(
    () => [
      { value: "5×", label: "AWS Certs" },
      { value: "4+", label: "Projects" },
      { value: "1st", label: "Architecture" },
    ],
    [],
  );

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* ── Background layers ── */}
      <GrainOverlay />
      <Scanline />

      {/* Grid lines */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* ── Main content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-10 sm:gap-8 lg:gap-16 items-center min-h-screen py-20 sm:py-24">
          {/* ── LEFT: Text side ── */}
          <div className="flex flex-col justify-center items-center text-center lg:items-start lg:text-left order-2 lg:order-1">
            {/* Name — big, editorial. Real heading is visually hidden;
                the two animated lines below are presentational only, so
                screen readers/SEO see one clean <h1> instead of two. */}
            <h1 className="sr-only">Sabin Pant</h1>
            <div aria-hidden="true" className="mb-4 overflow-hidden">
              <motion.div
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.2,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <div
                  className="font-bold leading-none tracking-tighter"
                  style={{
                    fontSize: "clamp(2.75rem, 13vw, 7rem)",
                    color: "var(--foreground)",
                  }}
                >
                  SABIN
                </div>
              </motion.div>
              <motion.div
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.3,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <div
                  className="font-bold leading-none tracking-tighter"
                  style={{
                    fontSize: "clamp(2.75rem, 13vw, 7rem)",
                    color: "var(--primary)",
                    WebkitTextStroke: "2px var(--primary)",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  PANT
                  <span style={{ WebkitTextFillColor: "var(--primary)" }}>
                    .
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Role line */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="flex items-center gap-3 mb-6 w-full max-w-xs sm:max-w-sm lg:max-w-none lg:w-auto"
            >
              <div className="h-px w-8 bg-(--primary) shrink-0" />
              <span className="text-sm sm:text-base lg:text-lg font-mono text-(--secondary-foreground) tracking-widest uppercase whitespace-nowrap">
                Full-Stack Engineer
              </span>
              <div className="h-px flex-1 bg-(--border)" />
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="text-(--muted-foreground) text-sm sm:text-base lg:text-lg leading-relaxed max-w-md mx-auto lg:mx-0 mb-8"
            >
              An hour of planning saves a week of debugging. Before I even fire
              up my IDE, I&apos;m mapping out system flows, sketching schemas,
              and predicting where things might break (hello, race conditions).{" "}
              <span className="text-(--foreground) font-medium">
                For me, the design phase isn’t just prep work—it’s the actual
                work.
              </span>
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.75 }}
              className="flex flex-col sm:flex-row flex-wrap gap-4 mb-10 w-full sm:w-auto"
            >
              <MagneticButton
                href="#projects"
                className="group relative px-7 py-3.5 rounded-xl bg-(--primary) text-white font-semibold overflow-hidden cursor-pointer text-center"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  View my work
                  <motion.span
                    animate={
                      prefersReducedMotion ? undefined : { x: [0, 4, 0] }
                    }
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </span>
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </MagneticButton>

              <MagneticButton
                href="/SabinPant_CV.pdf"
                download
                className="group relative px-7 py-3.5 rounded-xl border border-(--border) text-(--foreground) font-semibold hover:border-(--primary) transition-colors overflow-hidden cursor-pointer text-center"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <Download size={15} />
                  Download CV
                </span>
                <div className="absolute inset-0 bg-(--primary)/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </MagneticButton>
            </motion.div>

            {/* Social row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="flex items-center flex-wrap justify-center lg:justify-start gap-3"
            >
              <span className="text-xs text-(--muted-foreground) font-mono uppercase tracking-wider">
                Find me on
              </span>
              <div className="h-px w-4 bg-(--border)" />
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-(--muted-foreground) hover:text-(--primary) transition-colors text-sm font-mono"
                >
                  {s.icon}
                  <span className="text-xs">{s.label}</span>
                </a>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT: Visual side ── */}
          <div className="flex flex-col items-center order-1 lg:order-2 w-full lg:pl-8">
            <div
              className="relative transition-[width,height] duration-300"
              style={{ width: photoSize, height: photoSize }}
            >
              {/* Orbiting tech badges — hidden below md, where there isn't
                  enough room for them to read as anything but clutter */}
              {showOrbits && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <OrbitRing
                    radius={180 * orbitScale}
                    duration={22}
                    startAngle={0}
                    badgeSize={36 * orbitScale}
                    reduceMotion={!!prefersReducedMotion}
                    iconText="TS"
                    color="#3b82f6"
                  />
                  <OrbitRing
                    radius={220 * orbitScale}
                    duration={32}
                    startAngle={90}
                    badgeSize={36 * orbitScale}
                    reduceMotion={!!prefersReducedMotion}
                    iconText="JAVA"
                    color="#b07219"
                  />
                </div>
              )}

              {/* Photo container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.9,
                  delay: 0.3,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="absolute inset-0 z-10"
              >
                <div className="relative w-full h-full">
                  {/* Rotating gradient border */}
                  <motion.div
                    animate={prefersReducedMotion ? undefined : { rotate: 360 }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute -inset-1 rounded-[38%_62%_63%_37%/41%_44%_56%_59%]"
                    style={{
                      background:
                        "conic-gradient(from 0deg, #6366f1, #8b5cf6, #6366f1)",
                      opacity: 0.5,
                    }}
                  />
                  <Image
                    src="/images/sabinpant.jpg"
                    alt="Sabin Pant"
                    fill
                    sizes="(min-width: 1024px) 320px, (min-width: 768px) 280px, (min-width: 480px) 220px, 200px"
                    priority
                    quality={85}
                    className="z-10 object-cover border-4 border-(--secondary)"
                    style={{
                      borderRadius: "38% 62% 63% 37% / 41% 44% 56% 59%",
                    }}
                  />
                  {/* Inner highlight */}
                  <div
                    className="absolute inset-0 z-20 pointer-events-none"
                    style={{
                      borderRadius: "38% 62% 63% 37% / 41% 44% 56% 59%",
                      background:
                        "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 50%)",
                    }}
                  />
                </div>
              </motion.div>
            </div>

            {/* Stat badges row - below photo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.95 }}
              className="grid grid-cols-3 gap-2 sm:gap-3 mt-6 w-full max-w-95"
            >
              {statBadges.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-(--card) border border-(--border) rounded-xl px-2 py-2.5 sm:px-4 sm:py-3 text-center backdrop-blur-sm min-w-0"
                >
                  <div className="text-lg sm:text-xl font-bold text-(--primary) leading-none">
                    {stat.value}
                  </div>
                  <div className="text-[9px] sm:text-[10px] text-(--muted-foreground) mt-1 font-medium uppercase tracking-wider truncate">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Terminal card — below stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8 }}
              className="relative z-10 mt-6 rounded-xl border border-(--border) bg-(--card) overflow-hidden w-full max-w-95"
            >
              {/* Terminal title bar */}
              <div className="flex items-center gap-2 px-3 sm:px-4 py-2.5 border-b border-(--border) bg-(--secondary)/50">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/70 shrink-0" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70 shrink-0" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/70 shrink-0" />
                <span className="ml-2 text-xs text-(--muted-foreground) font-mono truncate">
                  sabin@portfolio: ~
                </span>
              </div>
              <div className="p-3 sm:p-4 overflow-x-auto">
                <Typewriter
                  lines={terminalLines}
                  className="min-w-max sm:min-w-0"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="hidden sm:flex absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-(--muted-foreground) z-20"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase font-mono">
          Scroll
        </span>
        <motion.div
          animate={prefersReducedMotion ? undefined : { y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border border-(--border) flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 rounded-full bg-(--primary) opacity-70" />
        </motion.div>
      </motion.div>
    </section>
  );
}
