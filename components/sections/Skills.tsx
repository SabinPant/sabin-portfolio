"use client";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";

/* ─────────────────────────────────────────
   Data
───────────────────────────────────────── */
const coreStack = [
  "Java",
  ".NET",
  "Node.js",
  "Laravel",
  "TypeScript",
  "PostgreSQL",
];

const skillGroups = [
  {
    category: "Backend",
    icon: "server",
    skills: [
      { name: "Spring Boot / Java EE", level: "advanced" },
      { name: "Node.js", level: "advanced" },
      { name: "Express / NestJS", level: "advanced" },
      { name: "Laravel", level: "advanced" },
      { name: ".NET", level: "intermediate" },
      { name: "Python", level: "intermediate" },
    ],
  },
  {
    category: "Frontend",
    icon: "layout",
    skills: [
      { name: "React", level: "advanced" },
      { name: "Next.js", level: "advanced" },
      { name: "Tailwind CSS", level: "advanced" },
      { name: "HTML5 / CSS3", level: "advanced" },
      { name: "ASP.NET MVC", level: "intermediate" },
      { name: "JSP / JSTL", level: "intermediate" },
    ],
  },
  {
    category: "Databases",
    icon: "database",
    skills: [
      { name: "PostgreSQL", level: "advanced" },
      { name: "MySQL", level: "advanced" },
      { name: "MongoDB", level: "intermediate" },
      { name: "Redis", level: "intermediate" },
      { name: "Oracle", level: "intermediate" },
    ],
  },
  {
    category: "Cloud & Infra",
    icon: "cloud",
    skills: [
      { name: "AWS", level: "certified" },
      { name: "Docker", level: "intermediate" },
      { name: "Vercel", level: "advanced" },
      { name: "Render", level: "advanced" },
    ],
  },
  {
    category: "Architecture",
    icon: "layers",
    skills: [
      { name: "System Design", level: "advanced" },
      { name: "REST API", level: "advanced" },
      { name: "JWT / Session Auth", level: "advanced" },
      { name: "RBAC", level: "advanced" },
    ],
  },
  {
    category: "Tools & Workflow",
    icon: "tools",
    skills: [
      { name: "Git / GitHub", level: "advanced" },
      { name: "Postman", level: "advanced" },
      { name: "Power BI", level: "intermediate" },
      { name: "Microsoft Office", level: "intermediate" },
    ],
  },
];

const totalSkills = skillGroups.reduce((n, g) => n + g.skills.length, 0);

/* Depth is carried by ground and ink rather than opacity: daily tools sit
   raised on card, occasional ones sit flush with the recessed section ground,
   and the one certified entry is the only lit thing on the sheet. */
const levelStyle: Record<string, string> = {
  advanced: "bg-card border-border text-foreground font-medium",
  intermediate: "bg-transparent border-border text-muted-foreground font-normal",
  certified: "bg-signal-haze border-primary/50 text-foreground font-medium",
};

/* ─────────────────────────────────────────
   Icons: inline SVG only
───────────────────────────────────────── */
function Icon({ type }: { type: string }) {
  const p = {
    width: 16,
    height: 16,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  if (type === "server")
    return (
      <svg {...p}>
        <rect x="2" y="2" width="20" height="8" rx="2" />
        <rect x="2" y="14" width="20" height="8" rx="2" />
        <line x1="6" y1="6" x2="6.01" y2="6" />
        <line x1="6" y1="18" x2="6.01" y2="18" />
      </svg>
    );
  if (type === "layout")
    return (
      <svg {...p}>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="9" y1="21" x2="9" y2="9" />
      </svg>
    );
  if (type === "database")
    return (
      <svg {...p}>
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
        <path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3" />
      </svg>
    );
  if (type === "cloud")
    return (
      <svg {...p}>
        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
      </svg>
    );
  if (type === "layers")
    return (
      <svg {...p}>
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    );
  if (type === "tools")
    return (
      <svg {...p}>
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    );
  return null;
}

/* ─────────────────────────────────────────
   Component
───────────────────────────────────────── */
export default function Skills() {
  const reduce = useReducedMotion();

  const rowVariant: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 18 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0 : 0.5, ease: "easeOut" as const },
    },
  };

  const panelReveal = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 12 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.45 },
      };

  return (
    <section
      id="skills"
      className="py-20 sm:py-28 relative bg-secondary/30 border-y border-border"
    >
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="mb-12 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <SectionHeader
            title="Skills"
            description="What I work with day to day. Dimmed items are ones I use less often."
          />
          {/* legend */}
          <div className="flex items-center gap-4 shrink-0 lg:pb-1">
            <span className="label-micro tnum">{totalSkills} entries</span>
            <span className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />
              AWS certified
            </span>
          </div>
        </div>

        {/* ── Core stack ── */}
        <motion.div
          {...panelReveal}
          className="mb-12 p-5 rounded-lg border border-border-strong bg-card flex flex-col sm:flex-row sm:items-center gap-4"
        >
          <span className="label-micro whitespace-nowrap shrink-0">
            Core stack
          </span>
          <div className="hidden sm:block h-4 w-px bg-border shrink-0" />
          <div className="flex flex-wrap gap-2">
            {coreStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-md text-sm font-medium text-foreground bg-secondary border border-border"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Column plate. Names the figure on each row so the number is data,
            not decoration. */}
        <div className="hidden lg:grid grid-cols-[220px_1fr] gap-8 pb-2.5 border-b border-border-strong">
          <div className="flex items-center justify-between">
            <span className="label-micro">Domain</span>
            <span className="label-micro">Count</span>
          </div>
          <span className="label-micro">Tools and frameworks</span>
        </div>

        {/* ── Skill rows, spec-sheet layout ── */}
        <div className="divide-y divide-border border-t border-border lg:border-t-0">
          {skillGroups.map((group, i) => (
            <motion.div
              key={group.category}
              variants={rowVariant}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: reduce ? 0 : i * 0.07 }}
              className="py-6 grid grid-cols-[1fr] lg:grid-cols-[220px_1fr] gap-4 lg:gap-8 items-start"
            >
              {/* Category label */}
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-md flex items-center justify-center shrink-0 bg-secondary border border-border text-muted-foreground">
                  <Icon type={group.icon} />
                </div>
                <h3 className="text-sm font-semibold leading-tight text-foreground">
                  {group.category}
                </h3>
                <span className="label-micro tnum ml-auto shrink-0">
                  {group.skills.length}
                  <span className="sr-only"> entries</span>
                </span>
              </div>

              {/* Skills, inline tag flow */}
              <div className="flex flex-wrap gap-2 pl-10 lg:pl-0">
                {group.skills.map((skill, j) => {
                  const isCertified = skill.level === "certified";
                  const chipReveal = reduce
                    ? {}
                    : {
                        initial: { opacity: 0 },
                        whileInView: { opacity: 1 },
                        viewport: { once: true },
                        transition: { delay: i * 0.05 + j * 0.03 },
                      };
                  return (
                    <motion.span
                      key={skill.name}
                      {...chipReveal}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm border ${
                        levelStyle[skill.level]
                      }`}
                    >
                      {isCertified && (
                        <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      )}
                      {skill.name}
                    </motion.span>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Hands the reader to the credential behind the one lit entry */}
        <div className="mt-10 pt-6 border-t border-border flex justify-end">
          <a
            href="#certifications"
            data-touch-target
            className="inline-flex items-center gap-3 group"
          >
            <span className="label-micro group-hover:text-primary transition-colors">
              Next: the 5 AWS certifications behind that mark
            </span>
            <ArrowRight
              size={13}
              aria-hidden="true"
              className="text-faint-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
