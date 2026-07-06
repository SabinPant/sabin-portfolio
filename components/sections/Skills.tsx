"use client";
import { motion, type Variants } from "framer-motion";

/* ─────────────────────────────────────────
   Data
───────────────────────────────────────── */
const coreStack = [
  "Java",
  "Node.js",
  "TypeScript",
  "PostgreSQL",
  "Next.js",
  "AWS",
];

const skillGroups = [
  {
    category: "Backend",
    index: "01",
    accent: "#6366f1",
    icon: "server",
    skills: [
      { name: "Node.js", level: "advanced" },
      { name: "Express.js", level: "advanced" },
      { name: "Java", level: "advanced" },
      { name: "TypeScript", level: "advanced" },
      { name: "NestJS", level: "intermediate" },
      { name: "Python", level: "intermediate" },
    ],
  },
  {
    category: "Frontend",
    index: "02",
    accent: "#3b82f6",
    icon: "layout",
    skills: [
      { name: "React", level: "advanced" },
      { name: "Next.js", level: "advanced" },
      { name: "Tailwind CSS", level: "advanced" },
      { name: "HTML5 / CSS3", level: "advanced" },
      { name: "JSP/JSTL", level: "intermediate" },
    ],
  },
  {
    category: "Databases",
    index: "03",
    accent: "#06b6d4",
    icon: "database",
    skills: [
      { name: "PostgreSQL", level: "advanced" },
      { name: "MySQL", level: "advanced" },
      { name: "Prisma ORM", level: "advanced" },
      { name: "MongoDB", level: "intermediate" },
      { name: "Redis", level: "intermediate" },
      { name: "Oracle", level: "intermediate" },
    ],
  },
  {
    category: "Cloud & Infra",
    index: "04",
    accent: "#f59e0b",
    icon: "cloud",
    skills: [
      { name: "AWS EC2", level: "certified" },
      { name: "AWS S3", level: "certified" },
      { name: "AWS Lambda", level: "certified" },
      { name: "Docker", level: "intermediate" },
      { name: "Vercel", level: "advanced" },
      { name: "Render", level: "advanced" },
    ],
  },
  {
    category: "Architecture",
    index: "05",
    accent: "#ec4899",
    icon: "layers",
    skills: [
      { name: "System Design", level: "advanced" },
      { name: "REST API", level: "advanced" },
      { name: "JWT Auth", level: "advanced" },
      { name: "RBAC", level: "advanced" },
      { name: "Event-Driven", level: "intermediate" },
      { name: "BullMQ", level: "intermediate" },
    ],
  },
  {
    category: "Tools & Workflow",
    index: "06",
    accent: "#10b981",
    icon: "tools",
    skills: [
      { name: "Git / GitHub", level: "advanced" },
      { name: "Postman", level: "advanced" },
      { name: "Swagger", level: "advanced" },
      { name: "Figma", level: "intermediate" },
      { name: "PowerBI", level: "intermediate" },
    ],
  },
];

/* ─────────────────────────────────────────
   Level styling — opacity-based, not badge
───────────────────────────────────────── */
const levelStyle: Record<
  string,
  { opacity: string; weight: string; suffix: string }
> = {
  advanced: { opacity: "opacity-100", weight: "font-medium", suffix: "" },
  intermediate: { opacity: "opacity-55", weight: "font-normal", suffix: "" },
  certified: { opacity: "opacity-100", weight: "font-semibold", suffix: "*" },
};

/* ─────────────────────────────────────────
   Icons — inline SVG only
───────────────────────────────────────── */
function Icon({ type, color }: { type: string; color: string }) {
  const p = {
    width: 16,
    height: 16,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
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
   Framer variants
───────────────────────────────────────── */
const rowVariant: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

/* ─────────────────────────────────────────
   Component
───────────────────────────────────────── */
export default function Skills() {
  return (
    <section
      id="skills"
      className="py-28 relative bg-(--secondary)/20 overflow-hidden"
    >
      {/* subtle grid texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <span
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full
                border border-(--border) bg-(--secondary)
                text-[10px] text-(--primary) mb-4 font-semibold tracking-[0.18em] uppercase"
              >
                Technical Skills
              </span>
              <h2 className="text-4xl lg:text-5xl font-bold tracking-tight">
                What I work <span className="text-(--primary)">with.</span>
              </h2>
            </div>
            {/* legend */}
            <div className="flex items-center gap-5 text-xs text-(--muted-foreground) pb-1">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-(--foreground) opacity-100 inline-block" />
                Advanced
              </span>
              <span className="flex items-center gap-1.5 opacity-55">
                <span className="w-1.5 h-1.5 rounded-full bg-(--foreground) inline-block" />
                Intermediate
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b] inline-block" />
                Certified*
              </span>
            </div>
          </div>
        </motion.div>

        {/* ── Core stack highlight bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="mb-12 p-5 rounded-2xl border border-(--primary)/25
            bg-(--primary)/5 flex flex-col sm:flex-row sm:items-center gap-4"
        >
          <span
            className="text-[10px] font-bold tracking-[0.2em] uppercase
            text-(--primary) whitespace-nowrap shrink-0"
          >
            Core Stack
          </span>
          <div className="h-px w-full sm:w-auto sm:h-4 bg-(--primary)/20 shrink-0" />
          <div className="flex flex-wrap gap-2">
            {coreStack.map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 + i * 0.07 }}
                className="px-3 py-1 rounded-lg text-sm font-semibold
                  text-(--primary) bg-(--primary)/10
                  border border-(--primary)/20"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* ── Skill rows — spec-sheet layout ── */}
        <div className="divide-y divide-(--border)">
          {skillGroups.map((group, i) => (
            <motion.div
              key={group.category}
              variants={rowVariant}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.07 }}
              className="group py-6 grid grid-cols-[1fr] lg:grid-cols-[220px_1fr] gap-4 lg:gap-8 items-start"
            >
              {/* Category label */}
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-mono text-(--muted-foreground) opacity-50 select-none w-6 shrink-0">
                  {group.index}
                </span>
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                  style={{
                    background: group.accent + "18",
                    border: `1px solid ${group.accent}30`,
                  }}
                >
                  <Icon type={group.icon} color={group.accent} />
                </div>
                <div>
                  <h3
                    className="text-sm font-semibold leading-tight"
                    style={{ color: group.accent }}
                  >
                    {group.category}
                  </h3>
                  <p className="text-[10px] text-(--muted-foreground) mt-0.5">
                    {group.skills.length} skills
                  </p>
                </div>
              </div>

              {/* Skills — inline tag flow */}
              <div className="flex flex-wrap gap-2 pl-9 lg:pl-0">
                {group.skills.map((skill, j) => {
                  const sty = levelStyle[skill.level];
                  const isCertified = skill.level === "certified";
                  return (
                    <motion.span
                      key={skill.name}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.06 + j * 0.04 }}
                      className={`
                        inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm
                        border transition-all duration-200 cursor-default
                        ${sty.opacity} ${sty.weight}
                        bg-(--card) text-(--foreground)
                        hover:opacity-100 hover:border-(--primary)/40
                        ${
                          isCertified
                            ? "border-[#f59e0b]/30 hover:border-[#f59e0b]/60"
                            : "border-(--border)"
                        }
                      `}
                    >
                      {isCertified && (
                        <span className="w-1 h-1 rounded-full bg-[#f59e0b] shrink-0" />
                      )}
                      {skill.name}
                      {sty.suffix && (
                        <span className="text-[#f59e0b] text-[10px] font-bold ml-0.5">
                          {sty.suffix}
                        </span>
                      )}
                    </motion.span>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Footer note ── */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-10 text-[11px] text-(--muted-foreground) text-right"
        >
          * AWS Certified: Cloud Practitioner, Solutions Architect, Developer,
          SysOps, ML Specialty
        </motion.p>
      </div>
    </section>
  );
}
