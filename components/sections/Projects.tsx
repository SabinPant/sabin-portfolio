"use client";
import { motion } from "framer-motion";

const projects = [
  {
    title: "MediLife",
    subtitle: "Hospital Management System",
    description:
      "A full-featured hospital management platform built under strict MVC architecture covering patient registration, doctor approval workflows, appointment scheduling, billing, and medical records across three roles.",
    highlights: [
      "Dual booking flow: Quick Consult and Admin-assigned appointments with rejection handling",
      "BCrypt password hashing, session-based auth with configurable timeout and account lock/unlock",
      "Notification system triggered by booking, billing, and account events with CSV export",
    ],
    stack: [
      "Java 21",
      "Jakarta EE",
      "Apache Tomcat 10",
      "MySQL",
      "Maven",
      "JSP/JSTL",
    ],
    github: "https://github.com/Sabinpabt23",
    color: "from-blue-500/10 to-cyan-500/10",
    border: "hover:border-blue-500/50",
    accent: "#3b82f6",
    arch: [
      { label: "JSP Frontend", icon: "browser", color: "#3b82f6" },
      { label: "Servlet API", icon: "server", color: "#6366f1" },
      { label: "DAO Layer", icon: "layers", color: "#8b5cf6" },
      { label: "MySQL DB", icon: "database", color: "#06b6d4" },
    ],
  },
  {
    title: "WealthWise",
    subtitle: "Dual-System Finance Manager & Digital Wallet",
    description:
      "A two-application ecosystem: WealthWallet (digital wallet with P2P transfers) and WealthWise (budget tracking with AI spending analysis), communicating via secure OAuth-style token exchange.",
    highlights: [
      "Tiered KYC verification, atomic database transactions with idempotency protection",
      "JWT with HttpOnly cookies, AES-256 encryption between the two apps",
      "Gemini AI-powered spending insights, role-based admin panel with real-time analytics",
    ],
    stack: [
      "Next.js 14",
      "Node.js",
      "Express",
      "PostgreSQL",
      "Prisma",
      "Tailwind",
      "Gemini AI",
    ],
    github: "https://github.com/Sabinpabt23",
    color: "from-violet-500/10 to-purple-500/10",
    border: "hover:border-violet-500/50",
    accent: "#8b5cf6",
    arch: [
      { label: "Next.js UI", icon: "layout", color: "#8b5cf6" },
      { label: "Express API", icon: "server", color: "#6366f1" },
      { label: "Prisma ORM", icon: "layers", color: "#a855f7" },
      { label: "PostgreSQL", icon: "database", color: "#7c3aed" },
    ],
  },
];

type ArchNode = { label: string; icon: string; color: string };

function ArchDiagram({ nodes, accent }: { nodes: ArchNode[]; accent: string }) {
  return (
    <div className="w-full h-full flex items-center justify-center p-6">
      <div className="flex items-center gap-2 flex-wrap justify-center">
        {nodes.map((node, i) => (
          <div key={node.label} className="flex items-center gap-2">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ scale: 1.08, y: -4 }}
              className="flex flex-col items-center gap-2 cursor-default"
            >
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center border border-white/10 relative group"
                style={{
                  background: node.color + "22",
                  boxShadow: `0 0 20px ${node.color}22`,
                }}
              >
                <div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `${node.color}33`,
                    boxShadow: `0 0 30px ${node.color}44`,
                  }}
                />
                {node.icon === "browser" && (
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={node.color}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="3" width="20" height="18" rx="2" />
                    <line x1="2" y1="8" x2="22" y2="8" />
                    <line x1="6" y1="5.5" x2="6.01" y2="5.5" />
                    <line x1="9" y1="5.5" x2="9.01" y2="5.5" />
                    <line x1="12" y1="5.5" x2="12.01" y2="5.5" />
                  </svg>
                )}
                {node.icon === "server" && (
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={node.color}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="2" width="20" height="8" rx="2" />
                    <rect x="2" y="14" width="20" height="8" rx="2" />
                    <line x1="6" y1="6" x2="6.01" y2="6" />
                    <line x1="6" y1="18" x2="6.01" y2="18" />
                  </svg>
                )}
                {node.icon === "layers" && (
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={node.color}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="12 2 2 7 12 12 22 7 12 2" />
                    <polyline points="2 17 12 22 22 17" />
                    <polyline points="2 12 12 17 22 12" />
                  </svg>
                )}
                {node.icon === "database" && (
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={node.color}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <ellipse cx="12" cy="5" rx="9" ry="3" />
                    <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
                    <path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3" />
                  </svg>
                )}
                {node.icon === "layout" && (
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={node.color}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <line x1="3" y1="9" x2="21" y2="9" />
                    <line x1="9" y1="21" x2="9" y2="9" />
                  </svg>
                )}
              </div>
              <span className="text-xs text-[var(--muted-foreground)] font-medium text-center leading-tight">
                {node.label}
              </span>
            </motion.div>
            {i < nodes.length - 1 && (
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                whileInView={{ opacity: 1, scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 + 0.1 }}
                className="flex items-center gap-1 mb-4"
              >
                <div
                  className="w-6 h-px"
                  style={{
                    background: `linear-gradient(90deg, ${nodes[i].color}, ${nodes[i + 1].color})`,
                  }}
                />
                <svg
                  width="6"
                  height="10"
                  viewBox="0 0 6 10"
                  fill={nodes[i + 1].color}
                >
                  <path d="M0 0L6 5L0 10z" />
                </svg>
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-32 relative bg-[var(--secondary)]/20">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--border)] bg-[var(--secondary)] text-xs text-[var(--primary)] mb-4 font-medium tracking-widest uppercase">
            Projects
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold">
            Things I have <span className="text-[var(--primary)]">built.</span>
          </h2>
          <p className="text-[var(--muted-foreground)] mt-4 max-w-lg mx-auto">
            Every project starts with architecture. Here is what that looks like
            in practice.
          </p>
        </motion.div>

        <div className="space-y-32">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={`flex flex-col ${i % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"} gap-12 items-center`}
            >
              {/* Architecture visual */}
              <div className="flex-1 w-full">
                <div
                  className={`relative rounded-2xl border border-[var(--border)] bg-gradient-to-br ${project.color} ${project.border} transition-all duration-500 overflow-hidden`}
                  style={{ minHeight: "280px" }}
                >
                  {/* Top bar */}
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--border)]/50">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                    <span className="ml-2 text-xs text-[var(--muted-foreground)] font-mono">
                      {project.title.toLowerCase()}/architecture
                    </span>
                  </div>

                  {/* Arch diagram */}
                  <ArchDiagram nodes={project.arch} accent={project.accent} />

                  {/* Glow */}
                  <div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-24 blur-3xl opacity-20 pointer-events-none"
                    style={{ background: project.accent }}
                  />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 space-y-5">
                <div>
                  <p
                    className="text-xs font-medium tracking-widest uppercase mb-2"
                    style={{ color: project.accent }}
                  >
                    {project.subtitle}
                  </p>
                  <h3 className="text-3xl lg:text-4xl font-bold text-[var(--foreground)]">
                    {project.title}
                  </h3>
                </div>

                <p className="text-[var(--muted-foreground)] leading-relaxed">
                  {project.description}
                </p>

                <ul className="space-y-2.5">
                  {project.highlights.map((h, j) => (
                    <motion.li
                      key={j}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: j * 0.1 }}
                      className="flex gap-3 text-sm text-[var(--secondary-foreground)]"
                    >
                      <span
                        className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: project.accent }}
                      />
                      {h}
                    </motion.li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2 pt-1">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md bg-[var(--secondary)] text-xs font-mono text-[var(--secondary-foreground)] border border-[var(--border)] hover:border-[var(--primary)] transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* ✅ Fixed: added opening <a> tag and closing </a> tag */}
                <div className="flex gap-3 pt-2">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[var(--border)] text-sm text-[var(--foreground)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all duration-200"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    View on GitHub
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
