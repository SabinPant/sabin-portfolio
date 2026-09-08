"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowDown, ArrowRight, MapPin } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";

/* =========================================
   Data
========================================= */
const experiences = [
  {
    role: "Developer Intern",
    company: "Karmachari Sanchaya Kosh (EPF Nepal)",
    location: "Lalitpur, Pulchowk · On-site",
    period: "August 2026 – Present",
    completed: false,
    impact: [
      {
        headline: "Working out what to build",
        detail:
          "Sitting in with the dev team and the people who actually use the system to figure out what they need, then writing it up and mapping out how the pieces and the data fit together before anyone starts coding.",
      },
      {
        headline: "Backend work",
        detail:
          "Building features and REST APIs in .NET on top of an Oracle database, inside a system that is already live and being used every day.",
      },
    ],
    stack: [".NET", "ASP.NET", "FastAPI", "REST APIs", "Oracle"],
  },
  {
    role: "Full-Stack Developer Intern",
    company: "Leaflet Digital Solutions",
    location: "Kathmandu, Nepal",
    period: "March 2026 – June 2026",
    completed: true,
    impact: [
      {
        headline: "Built things end to end",
        detail:
          "Worked on data-heavy apps with Node.js, Express, Next.js and PostgreSQL. I made the calls on how things were structured and then did the actual building too.",
      },
      {
        headline: "Locked down the APIs",
        detail:
          "Set up JWT auth and role-based access on apps that served several clients at once, so nobody could reach data that was not theirs.",
      },
      {
        headline: "Wrote the API docs",
        detail:
          "Put together proper Swagger docs, which meant the frontend devs stopped having to message me every time they wanted to know what an endpoint returned.",
      },
    ],
    stack: ["Node.js", "Express", "Next.js", "PostgreSQL", "JWT", "Swagger"],
  },
];

/* =========================================
   Component
========================================= */
export default function Experience() {
  const reduce = useReducedMotion();

  /* An entry rises, then its own lines follow. Motion is dropped
     entirely when the visitor asks for less of it. */
  const entry: Variants = reduce
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 24 },
        show: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            ease: "easeOut" as const,
            when: "beforeChildren",
            staggerChildren: 0.07,
          },
        },
      };

  const line: Variants = reduce
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, x: -10 },
        show: {
          opacity: 1,
          x: 0,
          transition: { duration: 0.35, ease: "easeOut" as const },
        },
      };

  return (
    <section id="experience" className="bg-background py-24 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <SectionHeader
          title="Experience"
          description="Two internships so far, one still going. Newest first."
        />

        {/* A drawn axis: one continuous hairline, a node per role, the
            present at the top, the rule capped where the record ends. */}
        <div className="relative mt-12 sm:mt-14">
          <span
            aria-hidden="true"
            className="absolute bottom-0 left-3 top-3 w-px -translate-x-1/2 bg-border"
          />
          <span
            aria-hidden="true"
            className="absolute bottom-0 left-3 h-px w-2.5 -translate-x-1/2 bg-border"
          />

          <ol className="space-y-12 pb-6 sm:space-y-14">
            {experiences.map((experience, index) => {
              const current = !experience.completed;
              /* Counted from the earliest role up, because the order here
                 is a real chronology and not a ranking. */
              const ordinal = String(experiences.length - index).padStart(
                2,
                "0",
              );

              return (
                <motion.li
                  key={experience.company}
                  variants={entry}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-80px" }}
                  className="relative pl-9 sm:pl-12"
                >
                  {/* Node marker, sitting on the rule */}
                  <span
                    aria-hidden="true"
                    className={`tnum absolute left-0 top-0 flex h-6 w-6 items-center justify-center rounded-full border bg-background font-mono text-[10px] ${
                      current
                        ? "border-primary text-primary ring-[3px] ring-signal-haze"
                        : "border-border-strong text-faint-foreground"
                    }`}
                  >
                    {ordinal}
                    {current && (
                      <span className="absolute -right-0.5 -top-0.5 flex h-2 w-2">
                        {!reduce && (
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal-lit opacity-60" />
                        )}
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-signal-lit ring-2 ring-background" />
                      </span>
                    )}
                  </span>

                  {/* Dates lead, the way a timeline reads */}
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="label-micro tnum">{experience.period}</span>
                    {current && (
                      <span className="font-mono text-[0.66rem] uppercase tracking-[0.13em] text-primary">
                        Current
                      </span>
                    )}
                  </div>

                  <h3 className="display mt-2 text-xl text-foreground sm:text-2xl">
                    {experience.role}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-secondary-foreground">
                    {experience.company}
                  </p>
                  <p className="mt-1.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <MapPin size={12} aria-hidden="true" className="shrink-0" />
                    {experience.location}
                  </p>

                  {/* What the role actually consisted of */}
                  <ul className="mt-6 space-y-4">
                    {experience.impact.map((point) => (
                      <motion.li
                        key={point.headline}
                        variants={line}
                        className="flex gap-3"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-[0.6rem] h-px w-3 shrink-0 bg-border-strong"
                        />
                        <div className="min-w-0">
                          <p className="text-[13px] font-semibold leading-snug text-foreground">
                            {point.headline}
                          </p>
                          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                            {point.detail}
                          </p>
                        </div>
                      </motion.li>
                    ))}
                  </ul>

                  <motion.div
                    variants={line}
                    className="mt-6 flex flex-wrap gap-1.5"
                  >
                    {experience.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-sm border border-border bg-secondary px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </motion.div>
                </motion.li>
              );
            })}
          </ol>
        </div>

        {/* Availability, as a status line rather than one more card */}
        <motion.div
          initial={reduce ? undefined : { opacity: 0, y: 16 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mt-12 flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="flex items-center gap-2.5 text-sm text-muted-foreground">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 shrink-0 rounded-full bg-good"
            />
            Open to full-time roles and internships right now.
          </p>
          <a
            href="#contact"
            data-touch-target
            className="inline-flex w-fit items-center gap-2 rounded-lg border border-border-strong px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary"
          >
            Get in touch
            <ArrowRight size={14} aria-hidden="true" />
          </a>
        </motion.div>

        {/* Hands the reader forward */}
        <a
          href="#projects"
          data-touch-target
          className="group mt-12 flex w-fit items-center gap-3"
        >
          <span className="label-micro transition-colors group-hover:text-primary">
            Next: what I built
          </span>
          <ArrowDown
            size={13}
            aria-hidden="true"
            className="text-faint-foreground transition-all group-hover:translate-y-0.5 group-hover:text-primary"
          />
        </a>
      </div>
    </section>
  );
}
