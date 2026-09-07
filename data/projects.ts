export interface ArchNode {
  label: string;
  icon: string;
  note?: string;
}

export interface Metric {
  value: string;
  label: string;
}

export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  highlights: string[];
  stack: string[];
  github?: string;
  demo?: string;
  arch: ArchNode[];
  metrics?: Metric[];
  featured?: boolean;
}

export const projects: Project[] = [
  {
    slug: "nebula-trading-platform",
    title: "Nebula",
    subtitle: "Virtual stock trading and learning platform with a real-time market engine",
    description:
      "A virtual stock trading and market-education platform built on NestJS and React, combining a custom real-time market simulation engine, broker-mediated collateral management, and full administrative oversight, all under strict layered architecture across three independently deployable processes.",
    longDescription:
      "Nebula is a virtual stock trading and market-education platform built on NestJS and React, combining a custom real-time market simulation engine, broker-mediated collateral management, and full administrative oversight under a strict layered architecture. The platform is split into three independently deployable processes with non-overlapping responsibilities: a React SPA client, a NestJS server that is the sole authority on business rules and financial state, and a standalone market simulation engine that never talks to the client directly. Every trading action, price update, and notification passes through the server. Authentication supports email/password and Google OAuth 2.0 registration, with short-lived 15-minute JWT access tokens held in memory only, 7-day refresh tokens delivered as HTTP-only cookies and rotated on every use, and refresh-token reuse detection that invalidates every active session on an account the moment a stolen token is replayed. Each device holds an independent, individually revocable refresh token, and access tokens are blacklisted on logout before any database lookup occurs. The Trader Portal covers Market and Limit order placement with idempotency-key support against duplicate submissions, a live order book depth ladder, order history with cancellation and automatic release of reserved funds, a portfolio view with cost basis and unrealized P&L, a watchlist with self-clearing one-time price alerts, a paginated wallet transaction ledger, and broker-routed collateral top-up requests. The Broker Dashboard gives brokers a list of assigned traders with balances and activity summaries, per-trader detail views, collateral top-up processing under a weekly cap enforced through database aggregation rather than a cache counter, mandatory receipt upload with duplicate-reference prevention, and suspicious-activity flagging with resolution tracking. The Admin Panel adds platform-wide statistics with a composite market index chart, user suspension that automatically cancels pending orders and releases reserved balances, broker application review and reassignment, top-up oversight with cap-override authority, suspicious-flag resolution, learning-content management, and a full audit log. At the core of the platform is a market simulation engine using Geometric Brownian Motion with sector-specific volatility and drift, a Box-Muller transform for normally distributed price movement, a circuit breaker that halts a stock once it moves beyond 10% of the previous close, and a Redis-backed order book with price-time priority and self-trade prevention. The engine is completely independent of the rest of the platform, with no Prisma, no NestJS, no PostgreSQL, and no knowledge of users or wallets. It communicates with the server only through Redis pub/sub and a polled HTTP health endpoint that gates order placement when the engine is unreachable. The server enforces a strict four-layer separation in every module: controllers handle routing only, services own all business logic, repositories own all Prisma and Redis access, and DTOs handle request validation, with a single global exception filter as the only place in the codebase that constructs an error response. All monetary values are stored as integer paise, never floating point, and any wallet read-then-write acquires a Redis distributed lock ahead of a Prisma transaction, backstopped by a PostgreSQL CHECK constraint against negative balances. Real-time updates reach the client through room-scoped Socket.IO events: stock-specific rooms for price updates, user-specific rooms for fills and portfolio changes, and platform-wide broadcasts for circuit-breaker and market-status events.",
    highlights: [
      "Dual auth: email/password and Google OAuth 2.0, 15-minute in-memory JWT access tokens paired with rotating 7-day httpOnly refresh cookies, reuse detection that invalidates every session on theft, and per-device revocation",
      "Trader Portal: Market/Limit orders with idempotency-key deduplication, live order book depth ladder, portfolio with cost basis and unrealized P&L, self-clearing watchlist price alerts, broker-routed collateral top-ups",
      "Broker Dashboard: assigned-trader oversight, weekly-capped top-up processing enforced via database aggregation (not cache), mandatory receipt upload with duplicate-reference prevention, suspicious activity flagging",
      "Admin Panel: platform-wide stats with composite market index chart, user suspension with automatic order cancellation, broker application review, top-up cap overrides, audit log, and read-only engine health status",
      "Market simulation engine: Geometric Brownian Motion price simulation with a Box-Muller transform, a 10% circuit breaker, and a Redis-backed order book with price-time priority. Fully independent of Prisma, NestJS, and PostgreSQL, communicating only via Redis pub/sub",
      "Strict four-layer server architecture (Controller, Service, Repository, DTO) with a single global exception filter, integer-paise money handling, and Redis-locked wallet transactions backstopped by a PostgreSQL CHECK constraint",
      "Three independently deployable processes (client, server, engine) with room-scoped Socket.IO events for price ticks, fills, and platform-wide circuit-breaker and market-status broadcasts",
    ],
    stack: [
      "NestJS",
      "TypeScript",
      "React",
      "PostgreSQL",
      "Redis",
      "Prisma",
      "Socket.IO",
      "Node.js",
    ],
    github: "https://github.com/SabinPant/Nebula.git",
    arch: [
      {
        label: "React Client",
        icon: "browser",
        note: "Renders the trader, broker and admin portals and holds the 15-minute access token in memory only, never talking to the engine directly.",
      },
      {
        label: "NestJS Server",
        icon: "server",
        note: "Sole authority on business rules and financial state: every trading action, price update and notification passes through it.",
      },
      {
        label: "Simulation Engine",
        icon: "layers",
        note: "Knows nothing about users, wallets or Prisma. Generates prices with Geometric Brownian Motion and speaks only Redis pub/sub.",
      },
      {
        label: "PostgreSQL & Redis",
        icon: "database",
        note: "Postgres stores money as integer paise behind a CHECK constraint against negative balances; Redis holds the order book and the wallet locks.",
      },
    ],
    metrics: [
      { value: "3", label: "deployable processes" },
      { value: "4", label: "server layers" },
      { value: "15", label: "minute access tokens" },
      { value: "10%", label: "circuit breaker band" },
    ],
    featured: true,
  },
  {
    slug: "skillswap",
    title: "SkillSwap",
    subtitle: "Peer-to-peer skill exchange platform",
    description:
      "A full-stack marketplace where people trade skills instead of money, built with Laravel 13, Next.js 16, real-time WebSockets, and a custom design system. Covers skill discovery, skill requests with a full state machine, real-time chat, reviews, notifications, and an admin portal, all under a strict Controller, Service, Repository architecture.",
    longDescription:
      "SkillSwap is a full-stack marketplace where people trade skills instead of money, built on a Laravel 13 API with a Next.js 16 client and real-time messaging over Laravel Reverb WebSockets. The platform covers the complete lifecycle of a skill exchange: browsing and searching teachers by skill, sending a skill request with a proposed time, and moving that request through a six-state state machine, with seven server-side guards enforcing valid transitions and a scheduled job auto-expiring stale requests. Once a request is accepted, participants get real-time one-to-one chat with image and file attachments via Cloudinary, cursor-paginated history with infinite scroll, read/unread tracking, and message deduplication across the HTTP POST and WebSocket echo paths. Completed exchanges feed into a review and reputation system: one review per participant per request, cached average ratings in Redis, and admin moderation for hidden reviews, with an audit log on every state change. A real-time notification system covers every major event with a bell, an unread badge, per-type navigation targets, mark-all-read (deliberately excluding message_received), soft-delete dismiss, and server-side deduplication across three listeners. The admin portal adds a dashboard with six real-time metric cards, user suspension, and review moderation, all behind Sanctum authentication and role middleware. The codebase enforces a strict three-layer architecture end-to-end: controllers route only, services own all business logic, and repositories handle all Eloquent queries, with no layer bleeding, backed by 105 automated tests and 241 assertions running CI-green via GitHub Actions. Visually, the platform uses a custom design system: a copper, verdigris, sage, and ink palette, Fraunces display serif paired with Inter body text and JetBrains Mono for numeric records, semantic Tailwind CSS v4 tokens, and a responsive mobile-first layout with a hamburger sidebar. The whole stack runs locally via Docker Compose across eight services (PostgreSQL 15, Redis 7, Mailhog, the Laravel server, the Reverb WebSocket server, the Next.js client, a queue worker, and a scheduler) with no local dependencies required.",
    highlights: [
      "Full skill-exchange lifecycle: browse and search teachers by skill, send skill requests with a proposed time, and accept, reject, cancel, or complete via a 6-state state machine with 7 server-side guards and auto-expiry of stale requests through a scheduled job",
      "Real-time one-to-one chat via Laravel Reverb WebSockets: messages, image and file attachments via Cloudinary, cursor-paginated history with infinite scroll, read/unread tracking, implicit mark-read, and message dedup across HTTP POST and WebSocket echo",
      "Review and reputation system: 1 to 5 star ratings with comments, one review per participant per request, cached average ratings in Redis, hidden-review moderation by admin, and audit logs on every state change",
      "Notification system with a real-time bell, unread badge, per-type navigation targets, mark-all-read (excluding message_received by design), soft-delete dismiss, and server-side deduplication across three listeners",
      "Admin portal: dashboard with 6 real-time metric cards, user management with suspend and unsuspend, and review moderation with hide and unhide, all behind Sanctum and role middleware",
      "Strict three-layer architecture enforced end-to-end: controllers route only, services own all business logic, repositories handle all Eloquent queries, with no layer bleeding. 105 automated tests, 241 assertions, CI-green via GitHub Actions",
      "Custom design system: copper, verdigris, sage, and ink palette, Fraunces display serif with Inter body and JetBrains Mono for numeric records, semantic Tailwind CSS v4 tokens, and a responsive mobile-first layout with hamburger sidebar",
      "Docker Compose local stack with 8 services: PostgreSQL 15, Redis 7, Mailhog, Laravel server, Reverb WebSocket server, Next.js client, queue worker, and scheduler, with no local dependencies required",
    ],
    stack: [
      "Laravel 13",
      "Next.js 16",
      "TypeScript",
      "PostgreSQL 15",
      "Redis 7",
      "Tailwind CSS v4",
      "Docker",
      "Cloudinary",
      "Zustand",
      "TanStack Query",
      "PusherJS",
      "Sanctum",
    ],
    github: "https://github.com/SabinPant/skillswap",
    arch: [
      {
        label: "Next.js UI",
        icon: "browser",
        note: "Next.js 16 client on the custom copper and verdigris design system, running cursor-paginated chat history and the real-time notification bell.",
      },
      {
        label: "Laravel API",
        icon: "server",
        note: "Controllers route and nothing else, with Sanctum authentication and role middleware standing in front of every admin path.",
      },
      {
        label: "Service Layer",
        icon: "layers",
        note: "Owns all business logic, including the six-state request machine and the seven server-side guards that police its transitions.",
      },
      {
        label: "PostgreSQL & Redis",
        icon: "database",
        note: "Repositories hold every Eloquent query here, and Redis caches average ratings so reputation reads never touch the review tables.",
      },
    ],
    metrics: [
      { value: "105", label: "automated tests" },
      { value: "241", label: "assertions" },
      { value: "6", label: "request states" },
      { value: "8", label: "Docker services" },
    ],
    featured: true,
  },
  {
    slug: "medilife-hms",
    title: "MediLife",
    subtitle: "Hospital management system",
    description:
      "A full-featured hospital management platform built on Java Jakarta EE, covering patient registration, doctor approval workflows, appointment scheduling, billing, medical records, and admin control across three roles, all under a strict MVC architecture.",
    longDescription:
      "MediLife is a full-featured hospital management platform built on Java Jakarta EE, covering patient registration, doctor approval workflows, appointment scheduling, billing, medical records, and administrative control across three distinct roles. Access is split between Admin, Doctor, and Patient accounts, secured with BCrypt password hashing, session-based authentication, and an admin approval workflow that gates new doctor registrations before they can accept patients. Booking supports two flows: a Request Appointment path where an admin assigns the best-fit doctor, and a Quick Consult path for direct booking, with admin reassignment and doctor-side rejection handling built into both. The Admin Panel centralizes platform oversight: real-time statistics, doctor approvals with license review, appointment management, user lock/unlock, department management, financial reports with CSV export, system logs, and broadcast announcements. The Doctor Portal gives physicians a dashboard of today's appointments and earnings (both total and monthly), the ability to confirm or complete appointments, add diagnoses and prescriptions, review a patient's medical history, and reject appointments with a reason. The Patient Portal covers registration with medical details and profile image upload, booking through either flow, viewing upcoming and past appointments, cancelling pending ones, and accessing full medical history. A real-time notification bell with unread counts fires on booking, confirmation, completion, billing, account actions, assignment, and rejection events, backed by a full history page. Doctors also get individual public portfolio pages (education timeline, experience, expertise, certifications, and publications) with a book-appointment call to action gated behind a login check. The system is built on a strict MVC architecture end-to-end: JSP views handle display only, Servlets handle routing only, Services own all business logic and validation, a DAO layer owns all database queries, Filters enforce authentication and role-based access control, and Utils hold shared helpers, keeping every layer's responsibility non-overlapping.",
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
      {
        label: "JSP Frontend",
        icon: "browser",
        note: "JSP and JSTL views handle display only across the admin, doctor and patient portals plus the public doctor portfolio pages.",
      },
      {
        label: "Servlet API",
        icon: "server",
        note: "Servlets route only, with filters in front of them enforcing session authentication and role-based access for all three roles.",
      },
      {
        label: "Service Layer",
        icon: "layers",
        note: "Owns all business logic and validation: the doctor approval workflow, both booking flows and every notification trigger.",
      },
      {
        label: "DAO + MySQL",
        icon: "database",
        note: "The DAO layer owns every database query, so no servlet or JSP ever issues SQL of its own.",
      },
    ],
    metrics: [
      { value: "3", label: "access roles" },
      { value: "6", label: "MVC layers" },
      { value: "2", label: "booking flows" },
      { value: "7", label: "notification events" },
    ],
    featured: true,
  },
  {
    slug: "gym-manager",
    title: "Gym Manager",
    subtitle: "Java Swing desktop application",
    description:
      "A desktop gym management system with a clean MVC architecture and full CRUD operations. Covers member management, attendance tracking, loyalty points, plan upgrades, payment processing, soft delete, and CSV persistence, with a Swing UI.",
    longDescription:
      "Gym Manager is a desktop gym management system built with Java Swing, structured around a clean MVC architecture with full CRUD operations across every entity. The Model layer owns data and validation, the Service layer owns business logic, the View layer is the Swing UI, and the Controller layer orchestrates between them, leaving no business logic in the UI and keeping every layer independently testable. Member lifecycle management covers adding Regular or Premium members, tracking attendance with loyalty points awarded per visit (+5 for a regular visit, +10 for a milestone visit), and upgrading Regular members through a Basic, Standard, Deluxe progression once they have logged 30 visits and paid in full. The payment system records partial or full payments, automatically applies a 10% discount for Premium members paying in full, and stores all currency as long paisa values to avoid floating-point rounding bugs. Removed members are not hard-deleted; a soft-delete-with-restoration model keeps their historical attendance, loyalty, and payment data intact and restorable, and CSV save/load preserves the complete member state across sessions. The UI uses the Nimbus look-and-feel, a menu bar with an Actions dropdown, a filterable member table (Active, Removed, All), and an About dialog with a built-in usage guide.",
    highlights: [
      "Full MVC architecture: Model (data and validation), Service (business logic), View (Swing UI), Controller (orchestration), with no business logic in the UI and fully testable layers",
      "Member lifecycle management: add Regular or Premium members, track attendance (+5/+10 loyalty points per visit), and upgrade Regular members from Basic to Standard to Deluxe after 30 visits and full payment",
      "Payment system: record partial or full payments, Premium members get an automatic 10% discount on full payment, all currency stored as long paisa with no floating-point bugs",
      "Soft delete with restoration: removed members keep historical data (attendance, loyalty, payment history) and can be restored; CSV save/load preserves complete member state",
      "Swing UI: Nimbus look-and-feel, menu bar with Actions dropdown, filterable member table (Active, Removed, All), and an About dialog with usage guide",
    ],
    stack: ["Java 25", "Swing", "CSV", "IntelliJ IDEA", "Git", "Java AWT"],
    github: "https://github.com/SabinPant/GymManagerJava.git",
    arch: [
      {
        label: "Swing UI",
        icon: "browser",
        note: "Nimbus-themed views with an Actions menu and a member table filterable by Active, Removed or All, holding no business logic at all.",
      },
      {
        label: "Controller",
        icon: "layout",
        note: "Orchestrates between the Swing views and the services, which is what keeps the UI from reaching into the rules directly.",
      },
      {
        label: "Service Layer",
        icon: "layers",
        note: "Owns the rules: loyalty accrual per visit, the Basic to Standard to Deluxe upgrade gate, and discounting on full payment.",
      },
      {
        label: "CSV Storage",
        icon: "database",
        note: "Saves and loads complete member state across sessions, including soft-deleted members whose history stays intact and restorable.",
      },
    ],
    metrics: [
      { value: "4", label: "MVC layers" },
      { value: "30", label: "visits to upgrade" },
      { value: "10%", label: "premium discount" },
      { value: "+5/+10", label: "loyalty per visit" },
    ],
    featured: true,
  },
  {
    slug: "nebula-chat",
    title: "Nebula Chat",
    subtitle: "Production-grade real-time chat application",
    description:
      "A full-stack, production-deployed chat platform with passwordless OTP login, Google OAuth 2.0, one-to-one and group messaging, typing indicators, online presence, and unread badges. Built end-to-end under a strict clean architecture and deployed across Vercel, Render, Neon, and Upstash.",
    longDescription:
      "Nebula Chat is a full-stack, production-deployed chat platform combining passwordless OTP login, Google OAuth 2.0, one-to-one and group messaging, typing indicators, online presence, and unread badges, built end-to-end under a strict clean architecture. Authentication supports two flows: passwordless OTP email login, and Google OAuth 2.0 with server-side audience validation. Both issue short-lived JWT access tokens (15 minutes, held in memory only) paired with httpOnly 7-day refresh cookies, with full token rotation on every refresh. Real-time messaging runs on a Socket.IO engine delivering typing indicators, online presence, unread badge counts, and read receipts, all synced across multi-device sessions through a JWT-authenticated singleton SocketManager. The data layer is a 3NF-normalized PostgreSQL schema across eight tables, with composite primary keys on junction tables, soft-delete participant tracking via a leftAt column, and Redis pub/sub for scalable event broadcasting across server instances. The backend enforces a strict three-layer clean architecture end-to-end: controllers route only, services own all business logic, and repositories handle all data access, with Zod schemas validating every API boundary and typed HttpException subclasses caught by a single global error middleware. The platform runs as a live production stack: React and Vite on Vercel, Express and Socket.IO on Render, Neon serverless PostgreSQL, Upstash serverless Redis, and Resend for transactional email, with a Docker Compose setup mirroring the same topology for local development.",
    highlights: [
      "Dual auth flows: passwordless OTP email login and Google OAuth 2.0 with server-side audience validation, JWT access tokens (15 min, in-memory) paired with httpOnly 7-day refresh cookies and full token rotation on every refresh",
      "Socket.IO real-time engine with typing indicators, online presence, unread badge counts, and read receipts, all synced across multi-device sessions via a JWT-authenticated singleton SocketManager",
      "3NF-normalized PostgreSQL schema across 8 tables with composite PKs on junction tables, soft-delete participant tracking (leftAt), and Redis pub/sub for scalable event broadcasting",
      "Three-layer clean architecture enforced end-to-end: controllers route only, services own all business logic, repositories handle all data access, with Zod schemas validating every API boundary and typed HttpException subclasses caught by a single global error middleware",
      "Deployed stack: React and Vite on Vercel, Express and Socket.IO on Render, Neon serverless PostgreSQL, Upstash serverless Redis, and Resend for transactional email, with Docker Compose for local parity",
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
      {
        label: "React UI",
        icon: "browser",
        note: "React and Vite on Vercel, driving one JWT-authenticated singleton SocketManager that keeps every signed-in device in sync.",
      },
      {
        label: "Express + Socket.IO",
        icon: "server",
        note: "Controllers route only, with Zod validating every API boundary and a single global error middleware catching typed HttpExceptions.",
      },
      {
        label: "TypeORM",
        icon: "layers",
        note: "Repositories own all data access, so services stay free of query code and no route reads the schema on its own terms.",
      },
      {
        label: "PostgreSQL & Redis",
        icon: "database",
        note: "Neon holds the 3NF schema with composite keys and soft-delete participant tracking; Upstash Redis pub/sub fans events across instances.",
      },
    ],
    metrics: [
      { value: "8", label: "schema tables" },
      { value: "15", label: "minute access tokens" },
      { value: "5", label: "deployed services" },
      { value: "2", label: "auth flows" },
    ],
    featured: true,
  },
  {
    slug: "netguard-ids",
    title: "NetGuard IDS",
    subtitle: "Network intrusion detection and data analysis",
    description:
      "An end-to-end data science pipeline applied to a real-world IDS network traffic dataset of 488K records and 80 features. Covers data preparation, statistical analysis, correlation discovery, and hypothesis-driven classification of benign vs. infiltration traffic.",
    longDescription:
      "NetGuard IDS is an end-to-end data science pipeline applied to a real-world intrusion detection dataset of 488,000 network traffic records across 80 features, aimed at distinguishing benign traffic from infiltration attempts. The pipeline starts with a full data wrangling pass: removing NaN values, detecting and handling duplicates (28.56% of the raw dataset), and narrowing the feature set down to 16 key columns most relevant to classification. Exploratory analysis includes a Pearson correlation heatmap that surfaced a 0.9951 correlation between Packet Length Mean and Average Packet Size, flagging a redundant feature before any modelling began and preventing wasted model capacity downstream. A Welch's t-test on Flow Duration returned a p-value of 0.4736, showing that no single feature could reliably separate the two traffic classes on its own and motivating a multi-feature machine learning approach rather than a naive threshold rule. The project treats statistical rigor as a prerequisite to modelling: every feature-selection and preprocessing decision is backed by an explicit test rather than intuition.",
    highlights: [
      "Full data wrangling pipeline: NaN removal, duplicate detection (28.56%), and feature selection down to 16 key columns",
      "Pearson correlation heatmap revealing 0.9951 overlap between Packet Length Mean and Average Packet Size, flagging redundant features before modelling",
      "Welch's t-test on Flow Duration (p=0.4736) showing single-feature classification is insufficient, motivating a multi-feature ML approach",
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
      {
        label: "Raw IDS CSV",
        icon: "database",
        note: "488,000 real network traffic records across 80 features, of which 28.56% arrived as duplicates.",
      },
      {
        label: "Pandas EDA",
        icon: "layers",
        note: "The wrangling pass: NaN removal, duplicate handling, and narrowing 80 columns to the 16 most relevant to classification.",
      },
      {
        label: "Stats & Viz",
        icon: "chart",
        note: "The Pearson correlation heatmap that surfaced a 0.9951 overlap between Packet Length Mean and Average Packet Size, before any modelling began.",
      },
      {
        label: "Hypothesis",
        icon: "flask",
        note: "Welch's t-test on Flow Duration returned p=0.4736, ruling out any single-feature threshold rule and forcing a multi-feature approach.",
      },
    ],
    metrics: [
      { value: "488K", label: "records analysed" },
      { value: "80", label: "raw features" },
      { value: "0.9951", label: "peak correlation" },
      { value: "28.56%", label: "duplicate rows" },
    ],
    featured: true,
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
