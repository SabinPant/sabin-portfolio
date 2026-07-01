"use client";
import { motion, type Variants } from "framer-motion";

/* ─────────────────────────────────────────
   Data
───────────────────────────────────────── */
const experience = {
  role: "Full-Stack Developer Intern",
  company: "Leaflet Digital Solutions",
  monogram: "LD",
  location: "Kathmandu, Nepal",
  period: "March 2026 — June 2026",
  status: "completed",
  color: "#6366f1",
  impact: [
    {
      headline: "Architecture & implementation ownership",
      detail:
        "Building data-intensive systems with Node.js, Express, Next.js and PostgreSQL — responsible for both architecture decisions and day-to-day implementation.",
    },
    {
      headline: "Secured API pipelines at scale",
      detail:
        "Designed and hardened API layers with JWT authentication and role-based access control across multi-tenant applications.",
    },
    {
      headline: "Zero-ambiguity handoffs",
      detail:
        "Produced full Swagger API documentation, cutting frontend integration time and eliminating back-and-forth over contract details.",
    },
  ],
  stack: [
    "Node.js",
    "Express",
    "Next.js",
    "PostgreSQL",
    "JWT",
    "Swagger",
    "Prisma",
  ],
};

/* ─────────────────────────────────────────
   Variants
───────────────────────────────────────── */
const cardVariant: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: "easeOut" as const },
  },
};

const itemVariant: Variants = {
  hidden: { opacity: 0, x: -12 },
  show: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, delay: i * 0.1, ease: "easeOut" as const },
  }),
};

/* ─────────────────────────────────────────
   Component
───────────────────────────────────────── */
export default function Experience() {
  return (
    <section id="experience" className="py-28 relative overflow-hidden">
      {/* ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          w-[600px] h-[400px] rounded-full blur-[140px] opacity-[0.035]"
        style={{ background: "#6366f1" }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full
            border border-(--border) bg-(--secondary)
            text-[10px] text-(--primary) mb-4 font-semibold tracking-[0.18em] uppercase"
          >
            Experience
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight">
            Where I have <span className="text-(--primary)">worked.</span>
          </h2>
        </motion.div>

        {/* ── Timeline rail ── */}
        <div className="relative">
          {/* Vertical rail — gradient so it fades out at bottom */}
          <div
            aria-hidden
            className="absolute left-[27px] top-2 bottom-0 w-px"
            style={{
              background:
                "linear-gradient(to bottom, var(--primary) 0%, var(--border) 40%, transparent 100%)",
            }}
          />

          {/* ══════════════════════════
              Entry — current role
          ══════════════════════════ */}
          <motion.div
            variants={cardVariant}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="relative pl-16 pb-14"
          >
            {/* Timeline node — solid, completed role */}
            <div className="absolute left-[18px] top-[18px] z-10">
              <div
                className="w-[18px] h-[18px] rounded-full border-[3px] border-(--background)"
                style={{ background: experience.color }}
              />
            </div>

            {/* Connector tick */}
            <div
              aria-hidden
              className="absolute left-[36px] top-[26px] w-6 h-px opacity-30"
              style={{ background: experience.color }}
            />

            {/* ── Card ── */}
            <div
              className="bg-(--card) border border-(--border) rounded-2xl
              overflow-hidden hover:border-(--primary)/50 transition-colors duration-300"
            >
              {/* Card header band */}
              <div
                className="h-[3px] w-full"
                style={{
                  background: `linear-gradient(90deg, ${experience.color}, transparent)`,
                }}
              />

              <div className="p-6 sm:p-8">
                {/* Company identity row */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-7">
                  <div className="flex items-center gap-4">
                    {/* Monogram avatar */}
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center
                        text-sm font-bold tracking-wider flex-shrink-0 border"
                      style={{
                        background: experience.color + "18",
                        borderColor: experience.color + "35",
                        color: experience.color,
                      }}
                    >
                      {experience.monogram}
                    </div>

                    <div>
                      {/* Role — primary visual weight */}
                      <h3 className="text-lg font-bold text-(--foreground) leading-tight">
                        {experience.role}
                      </h3>
                      {/* Company — accent coloured, secondary weight */}
                      <p
                        className="text-sm font-semibold mt-0.5"
                        style={{ color: experience.color }}
                      >
                        {experience.company}
                      </p>
                      {/* Location — muted, tertiary */}
                      <p className="text-xs text-(--muted-foreground) mt-0.5 flex items-center gap-1.5">
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                        {experience.location}
                      </p>
                    </div>
                  </div>

                  {/* Period badge */}
                  <div className="flex flex-col items-start sm:items-end gap-1.5 flex-shrink-0">
                    <span
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full
                      bg-(--secondary) border border-(--border)
                      text-xs text-(--secondary-foreground) whitespace-nowrap"
                    >
                      {experience.period}
                    </span>
                    {/* "Completed" indicator */}
                    <span
                      className="inline-flex items-center gap-1.5 text-[11px]
                      font-medium text-(--muted-foreground)"
                    >
                      <svg
                        width="11"
                        height="11"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Completed
                    </span>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px w-full bg-(--border) mb-6" />

                {/* Impact points — headline + detail structure */}
                <ul className="space-y-5">
                  {experience.impact.map((point, i) => (
                    <motion.li
                      key={i}
                      custom={i}
                      variants={itemVariant}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true }}
                      className="flex gap-3"
                    >
                      <div
                        className="mt-[7px] w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: experience.color }}
                      />
                      <div>
                        <p className="text-sm font-semibold text-(--foreground) leading-snug mb-0.5">
                          {point.headline}
                        </p>
                        <p className="text-sm text-(--muted-foreground) leading-relaxed">
                          {point.detail}
                        </p>
                      </div>
                    </motion.li>
                  ))}
                </ul>

                {/* Stack tags */}
                <div className="flex flex-wrap gap-2 mt-7 pt-6 border-t border-(--border)">
                  {experience.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-lg bg-(--secondary) text-xs
                        font-mono text-(--secondary-foreground)
                        border border-(--border) hover:border-(--primary)/40
                        transition-colors duration-150"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* ══════════════════════════
              Next chapter — CTA card
          ══════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="relative pl-16"
          >
            {/* Timeline node — hollow, future */}
            <div
              className="absolute left-[18px] top-[18px] z-10 w-[18px] h-[18px] rounded-full
                border-2 border-(--border) bg-(--background)"
            />

            {/* CTA card */}
            <div
              className="group bg-(--card) border border-dashed border-(--border)
              rounded-2xl p-6 sm:p-8
              hover:border-(--primary)/40 hover:bg-(--primary)/[0.03]
              transition-all duration-300 cursor-default"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                <div className="flex items-center gap-4">
                  {/* Icon */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0
                    bg-(--secondary) border border-(--border)
                    text-(--primary) group-hover:border-(--primary)/40
                    transition-colors duration-300"
                  >
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
                      <path d="M12 8v4l3 3" />
                    </svg>
                  </div>

                  <div>
                    <p className="text-sm font-bold text-(--foreground)">
                      Next chapter
                    </p>
                    <p className="text-xs text-(--muted-foreground) mt-0.5">
                      Open to full-time roles, internships &amp; freelance
                    </p>
                    {/* Interest areas */}
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {[
                        "FinTech",
                        "Banking Systems",
                        "Backend Engineering",
                      ].map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] px-2 py-0.5 rounded-full
                            bg-(--secondary) border border-(--border)
                            text-(--muted-foreground)"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* CTA button */}
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg
                    bg-(--primary) text-white text-sm font-medium whitespace-nowrap
                    hover:opacity-90 active:scale-95 transition-all duration-150 flex-shrink-0"
                >
                  Get in Touch
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
