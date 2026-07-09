"use client";
import { motion } from "framer-motion";

const projects = [
  {
    title: "MediLife",
    subtitle: "Hospital Management System",
    description:
      "A full-featured hospital management platform built on Java Jakarta EE covering patient registration, doctor approval workflows, appointment scheduling, billing, medical records, and admin control across three roles, all under strict MVC architecture.",
    highlights: [
      "Three-role access control: Admin, Doctor, Patient with BCrypt password hashing, session-based auth, and admin approval workflow for doctor registrations",
      "Dual booking flow: Request Appointment (admin-assigned, best-fit doctor) and Quick Consult (direct booking) with admin reassignment and doctor rejection handling",
      "Admin Panel: real-time statistics, doctor approvals with license review, appointment management, user lock/unlock, department management, financial reports with CSV export, system logs, and broadcast announcements",
      "Doctor Portal: dashboard with today's appointments and earnings (total + monthly), confirm/complete appointments, add diagnoses and prescriptions, view patient medical history, reject appointments with reason",
      "Patient Portal: registration with medical details, profile image upload, request appointments, quick consult, view upcoming/past appointments, cancel pending appointments, and access full medical history",
      "Notifications: real-time notification bell with unread counts triggered by booking, confirmation, completion, billing, account actions, assignment, and rejection, with full history page",
      "Doctor Portfolios: individual public profile pages with education timeline, experience, expertise, certifications, publications, and book appointment CTA with login check",
      "Strict MVC architecture enforced end-to-end: JSP views (display only), Servlets (routing only), Services (all business logic and validation), DAO layer (all database queries), Filters (auth and role-based access control), Utils (shared helpers)",
    ],
    stack: [
      "Java 21",
      "Jakarta EE",
      "Apache Tomcat 10",
      "MySQL",
      "Maven",
      "JSP/JSTL",
      "BCrypt",
      "Gson",
    ],
    github: "https://github.com/SabinPant/Hospital-Management-System.git",
    arch: [
      { label: "JSP Frontend", icon: "browser" },
      { label: "Servlet API", icon: "server" },
      { label: "Service Layer", icon: "layers" },
      { label: "DAO + MySQL", icon: "database" },
    ],
  },
  {
    title: "Gym Manager",
    subtitle: "Java Swing Desktop Application",
    description:
      "A complete desktop gym management system with a clean MVC architecture and full CRUD operations. Features member management, attendance tracking, loyalty points, plan upgrades, payment processing, soft delete, and CSV persistence delivered with a professional Swing UI.",
    highlights: [
      "Full MVC architecture: Model (data + validation), Service (business logic), View (Swing UI), Controller (orchestration) zero business logic in UI, fully testable layers",
      "Member lifecycle management: add Regular/Premium members, track attendance (+5/+10 loyalty points per visit), upgrade Regular members from Basic → Standard → Deluxe after 30 visits + full payment",
      "Payment system: record partial/full payments, Premium members auto-get 10% discount on full payment all currency stored as long paisa, no floating-point bugs",
      "Soft delete with restoration: removed members keep historical data (attendance, loyalty, payment history) and can be restored CSV save/load preserves complete member state",
      "Professional Swing UI: Nimbus L&F, menu bar with Actions dropdown, filterable member table (Active/Removed/All), comprehensive About dialog with usage guide",
    ],
    stack: ["Java 25", "Swing", "CSV", "IntelliJ IDEA", "Git", "Java AWT"],
    github: "https://github.com/SabinPant/GymManagerJava.git",
    arch: [
      { label: "Swing UI", icon: "browser" },
      { label: "Controller", icon: "layout" },
      { label: "Service Layer", icon: "layers" },
      { label: "CSV Storage", icon: "database" },
    ],
  },
  {
    title: "Nebula Chat",
    subtitle: "Production-Grade Real-Time Chat Application",
    description:
      "A full-stack, production-deployed chat platform with passwordless OTP login, Google OAuth 2.0, one-to-one and group messaging, typing indicators, online presence, and unread badges built end-to-end under strict clean architecture with zero layer bleeding, deployed across Vercel, Render, Neon, and Upstash.",
    highlights: [
      "Dual auth flows: passwordless OTP email login and Google OAuth 2.0 with server-side audience validation JWT access tokens (15 min, in-memory) paired with httpOnly 7-day refresh cookies and full token rotation on every refresh",
      "Socket.IO real-time engine with typing indicators, online presence, unread badge counts, and read receipts all synced across multi-device sessions via a JWT-authenticated singleton SocketManager",
      "3NF-normalized PostgreSQL schema across 8 tables with composite PKs on junction tables, soft-delete participant tracking (leftAt), and Redis pub/sub for scalable event broadcasting",
      "Three-layer clean architecture enforced end-to-end: controllers route only, services own all business logic, repositories handle all data access with Zod schemas validating every API boundary and typed HttpException subclasses caught by a single global error middleware",
      "Deployed stack: React + Vite on Vercel, Express + Socket.IO on Render, Neon serverless PostgreSQL, Upstash serverless Redis, and Resend for transactional email with Docker Compose for local parity",
    ],
    stack: [
      "TypeScript",
      "Node.js",
      "Express",
      "Socket.IO",
      "TypeORM",
      "PostgreSQL",
      "Redis",
      "React",
      "Zustand",
      "Tailwind CSS",
      "Docker",
      "Zod",
    ],
    github: "https://github.com/SabinPant/nebula-chat",
    demo: "https://nebula-chat-seven.vercel.app",
    arch: [
      { label: "React UI", icon: "browser" },
      { label: "Express + Socket.IO", icon: "server" },
      { label: "TypeORM", icon: "layers" },
      { label: "PostgreSQL & Redis", icon: "database" },
    ],
  },
  {
    title: "NetGuard IDS",
    subtitle: "Network Intrusion Detection & Smart Data Analysis",
    description:
      "An end-to-end data science pipeline applied to a real-world IDS network traffic dataset of 488K records and 80 features. Covers full data preparation, statistical analysis, correlation discovery, and hypothesis-driven classification of BENIGN vs. Infiltration traffic.",
    highlights: [
      "Full data wrangling pipeline: NaN removal, duplicate detection (28.56%), feature selection down to 16 key columns",
      "Pearson correlation heatmap revealing 0.9951 overlap between Packet Length Mean & Average Packet Size flagging redundant features before modelling",
      "Welch's t-test on Flow Duration (p=0.4736) proving single-feature classification is insufficient, motivating multi-feature ML approach",
    ],
    stack: [
      "Python",
      "Pandas",
      "NumPy",
      "Matplotlib",
      "Seaborn",
      "SciPy",
      "Jupyter",
    ],
    github:
      "https://github.com/SabinPant/Smart-Data---Network-Intrusion-Analysis-Python-.git",
    arch: [
      { label: "Raw IDS CSV", icon: "database" },
      { label: "Pandas EDA", icon: "layers" },
      { label: "Stats & Viz", icon: "chart" },
      { label: "Hypothesis", icon: "flask" },
    ],
  },
];

type ArchNode = { label: string; icon: string };

function ArchDiagram({ nodes }: { nodes: ArchNode[] }) {
  return (
    <div className="w-full h-full flex items-center justify-center p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-2 gap-0">
        {nodes.map((node, i) => (
          <div
            key={node.label}
            className="flex flex-col sm:flex-row items-center gap-2"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -2 }}
              className="flex flex-col items-center gap-2 cursor-default"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center border border-(--border) bg-(--primary)/8 hover:bg-(--primary)/12 transition-colors duration-300 text-(--primary)">
                {node.icon === "browser" && (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="sm:w-[22px] sm:h-[22px]"
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
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="sm:w-[22px] sm:h-[22px]"
                  >
                    <rect x="2" y="2" width="20" height="8" rx="2" />
                    <rect x="2" y="14" width="20" height="8" rx="2" />
                    <line x1="6" y1="6" x2="6.01" y2="6" />
                    <line x1="6" y1="18" x2="6.01" y2="18" />
                  </svg>
                )}
                {node.icon === "layers" && (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="sm:w-[22px] sm:h-[22px]"
                  >
                    <polygon points="12 2 2 7 12 12 22 7 12 2" />
                    <polyline points="2 17 12 22 22 17" />
                    <polyline points="2 12 12 17 22 12" />
                  </svg>
                )}
                {node.icon === "database" && (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="sm:w-[22px] sm:h-[22px]"
                  >
                    <ellipse cx="12" cy="5" rx="9" ry="3" />
                    <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
                    <path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3" />
                  </svg>
                )}
                {node.icon === "layout" && (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="sm:w-[22px] sm:h-[22px]"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <line x1="3" y1="9" x2="21" y2="9" />
                    <line x1="9" y1="21" x2="9" y2="9" />
                  </svg>
                )}
                {node.icon === "chart" && (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="sm:w-[22px] sm:h-[22px]"
                  >
                    <line x1="18" y1="20" x2="18" y2="10" />
                    <line x1="12" y1="20" x2="12" y2="4" />
                    <line x1="6" y1="20" x2="6" y2="14" />
                    <line x1="2" y1="20" x2="22" y2="20" />
                  </svg>
                )}
                {node.icon === "flask" && (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="sm:w-[22px] sm:h-[22px]"
                  >
                    <path d="M9 3h6M9 3v7l-4 8a1 1 0 0 0 .9 1.5h12.2A1 1 0 0 0 19 18l-4-8V3" />
                    <line x1="7.5" y1="15" x2="16.5" y2="15" />
                  </svg>
                )}
              </div>
              <span className="text-[11px] sm:text-xs text-(--muted-foreground) font-medium text-center leading-tight max-w-[80px] sm:max-w-none">
                {node.label}
              </span>
            </motion.div>

            {/* Arrow between nodes */}
            {i < nodes.length - 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 + 0.05 }}
                className="flex items-center justify-center"
              >
                {/* Desktop: horizontal arrow */}
                <div className="hidden sm:flex items-center gap-1 mb-4">
                  <div className="w-6 h-px bg-(--border)" />
                  <svg
                    width="6"
                    height="10"
                    viewBox="0 0 6 10"
                    className="text-(--border)"
                    fill="currentColor"
                  >
                    <path d="M0 0L6 5L0 10z" />
                  </svg>
                </div>
                {/* Mobile: vertical arrow */}
                <div className="flex sm:hidden items-center justify-center py-1">
                  <svg
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    className="text-(--muted-foreground)/40"
                    fill="currentColor"
                  >
                    <path d="M0 0L5 6L10 0z" />
                  </svg>
                </div>
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
    <section
      id="projects"
      className="py-20 sm:py-28 lg:py-32 relative bg-(--secondary)/20"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14 sm:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-(--border) bg-(--secondary) text-xs text-(--primary) mb-4 font-medium tracking-widest uppercase">
            Projects
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            Things I have <span className="text-(--primary)">built.</span>
          </h2>
          <p className="text-(--muted-foreground) mt-4 max-w-lg mx-auto text-sm sm:text-base px-2">
            Every project starts with architecture. Here is what that looks like
            in practice.
          </p>
        </motion.div>

        <div className="space-y-20 sm:space-y-28 lg:space-y-32">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={`flex flex-col ${i % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"} gap-8 lg:gap-12 items-center`}
            >
              {/* Architecture visual */}
              <div className="flex-1 w-full">
                <div className="relative rounded-2xl border border-(--border) bg-(--secondary)/30 hover:border-(--primary)/40 transition-colors duration-300 overflow-hidden min-h-[220px] sm:min-h-[280px]">
                  {/* Top bar */}
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-(--border)/50">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                    <span className="ml-2 text-xs text-(--muted-foreground) font-mono truncate">
                      {project.title.toLowerCase()}/architecture
                    </span>
                  </div>

                  {/* Arch diagram */}
                  <ArchDiagram nodes={project.arch} />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 space-y-5 w-full">
                <div>
                  <p className="text-xs font-medium tracking-widest uppercase mb-2 text-(--primary)">
                    {project.subtitle}
                  </p>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-(--foreground)">
                    {project.title}
                  </h3>
                </div>

                <p className="text-(--muted-foreground) leading-relaxed text-sm sm:text-base">
                  {project.description}
                </p>

                <ul className="space-y-2.5">
                  {project.highlights.map((h, j) => (
                    <motion.li
                      key={j}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: j * 0.08 }}
                      className="flex gap-3 text-sm text-(--secondary-foreground)"
                    >
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 bg-(--primary)" />
                      <span>{h}</span>
                    </motion.li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2 pt-1">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md bg-(--secondary) text-xs font-mono text-(--secondary-foreground) border border-(--border) hover:border-(--primary) transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3 pt-2 flex-wrap">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-lg border border-(--border) text-sm text-(--foreground) hover:border-(--primary) hover:text-(--primary) transition-colors duration-200"
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
                  {"demo" in project && project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-lg text-sm font-medium bg-(--primary)/10 border border-(--primary)/30 text-(--primary) hover:bg-(--primary)/15 hover:border-(--primary)/60 transition-colors duration-200"
                    >
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <line x1="2" y1="12" x2="22" y2="12" />
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                      </svg>
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
