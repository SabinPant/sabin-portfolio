"use client";
import { motion } from "framer-motion";

/* ─────────────────────────────────────────
   Data
───────────────────────────────────────── */
const awsCerts = [
  {
    name: "AWS Cloud Foundations",
    issuer: "AWS Academy",
    code: "CLF",
    accent: "#FF9900",
    glow: "#FF990033",
    href: "https://www.credly.com/badges/ea1886ba-3222-4379-8242-af8fe042eec9/linked_in_profile",
    desc: "Core cloud concepts, AWS global infrastructure & core services.",
  },
  {
    name: "AWS Data Engineering",
    issuer: "AWS Academy",
    code: "DEA",
    accent: "#FF9900",
    glow: "#FF990033",
    href: "https://www.credly.com/badges/adbdd47a-070d-4be3-beea-580a4887e43c/linked_in_profile",
    desc: "Data lakes, ETL pipelines, and analytics services on AWS.",
  },
  {
    name: "AWS ML Foundations",
    issuer: "AWS Academy",
    code: "MLA",
    accent: "#FF9900",
    glow: "#FF990033",
    href: "https://www.credly.com/badges/00c8562d-16d5-41ea-936a-1b39d7855ef5/linked_in_profile",
    desc: "Machine learning concepts, SageMaker, and model lifecycle.",
  },
  {
    name: "AWS ML for NLP",
    issuer: "AWS Academy",
    code: "NLP",
    accent: "#FF9900",
    glow: "#FF990033",
    href: "https://www.credly.com/badges/574b6f59-dd39-4257-a9b6-2e023f6c7336/linked_in_profile",
    desc: "Natural language processing with Comprehend & Lex.",
  },
  {
    name: "AWS Generative AI",
    issuer: "AWS Academy",
    code: "GEN",
    accent: "#FF9900",
    glow: "#FF990033",
    href: "https://www.credly.com/badges/63197887-792e-4a09-9f82-9d61e7713818/linked_in_profile",
    desc: "Foundations of GenAI, Bedrock, and prompt engineering.",
  },
];

const otherCerts = [
  {
    name: "UI/UX Design with Figma",
    issuer: "Islington College",
    code: "UX",
    accent: "#a855f7",
    glow: "#a855f726",
    href: "https://certificate.islingtoncollege.edu.np/certificate/verify/ICKCP4A240295OIGT1",
    desc: "End-to-end product design: wireframes, prototypes & design systems.",
  },
  {
    name: "Java Object-Oriented Programming",
    issuer: "LinkedIn Learning",
    code: "OOP",
    accent: "#0a66c2",
    glow: "#0a66c226",
    href: "https://www.linkedin.com/learning/",
    desc: "OOP principles: encapsulation, inheritance, polymorphism & design patterns.",
  },
];

/* ─────────────────────────────────────────
   Icons
───────────────────────────────────────── */

/**
 * AWS wordmark icon — fixed version.
 * Uses a wider SVG viewBox (56×22) that matches the actual path bounds,
 * so the trailing 's' is never clipped regardless of container size.
 */
function AwsIcon({ size = 28 }: { size?: number }) {
  // width:height ratio of viewBox 56:22 ≈ 2.545
  const height = Math.round(size / 2.545);
  return (
    <svg
      viewBox="0 0 56 22"
      width={size}
      height={height}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="AWS"
      style={{ flexShrink: 0, overflow: "visible" }}
    >
      {/* 'a' */}
      <path
        d="M8.5 13.4c0 .45.05.82.14 1.1.1.27.24.57.44.88.07.12.1.24.1.35 0 .15-.1.3-.28.45l-.93.62c-.13.08-.26.12-.38.12-.15 0-.3-.07-.44-.22-.2-.2-.38-.42-.52-.65-.15-.24-.3-.52-.46-.85C4.8 16.6 3.5 17.2 1.84 17.2c-1.14 0-2.05-.33-2.72-.98-.67-.65-1-.15-1-2.64 0-1.17.4-2.13 1.2-2.88.8-.74 1.87-1.12 3.22-1.12.45 0 .91.04 1.4.12.48.08.97.2 1.5.36V9.5c0-1-.2-1.7-.6-2.12-.4-.43-1.1-.64-2.1-.64-.46 0-.93.06-1.4.18-.48.12-.95.28-1.4.48-.2.1-.35.15-.44.18-.08.03-.15.04-.2.04-.18 0-.27-.13-.27-.4v-.57c0-.2.02-.36.08-.44.05-.08.15-.17.3-.26.44-.22.98-.4 1.62-.54C1.07 5.7 1.75 5.63 2.47 5.63c1.54 0 2.67.35 3.4 1.06.72.7 1.08 1.77 1.08 3.2v4.5l.55.01zm-5.56 2.07c.43 0 .87-.08 1.34-.24.47-.17.9-.47 1.26-.9.2-.26.35-.55.43-.88.08-.33.12-.73.12-1.2V11.7c-.4-.1-.84-.18-1.3-.24-.45-.06-.88-.09-1.3-.09-.93 0-1.62.18-2.08.55-.46.37-.7.9-.7 1.6 0 .66.17 1.16.5 1.5.33.5.85.74 1.73.74zm11.22 1.5c-.22 0-.36-.04-.47-.13-.1-.09-.2-.27-.28-.52L10.6 6.04c-.08-.26-.12-.43-.12-.5 0-.2.1-.3.3-.3h1.22c.23 0 .38.04.48.13.1.09.17.27.25.52l2.35 9.27 2.18-9.27c.07-.26.13-.43.23-.52.1-.09.25-.13.48-.13h1c.23 0 .38.04.48.13.1.09.18.27.25.52l2.2 9.4 2.44-9.4c.08-.25.15-.43.25-.52.1-.09.26-.13.48-.13h1.15c.2 0 .3.1.3.3 0 .06-.01.13-.03.2L21.7 16.36c-.08.26-.15.43-.25.52-.1.09-.26.13-.47.13h-1.08c-.22 0-.37-.04-.47-.13-.1-.09-.18-.27-.25-.52l-2.17-9.06L14.84 16.36c-.07.25-.15.43-.25.52-.1.09-.26.13-.47.13h-1.06zm18.36.37c-.72 0-1.43-.08-2.1-.25-.66-.17-1.18-.37-1.52-.6-.2-.13-.33-.27-.37-.4-.04-.13-.06-.27-.06-.4v-.58c0-.27.1-.4.28-.4.08 0 .15.01.22.04.07.03.17.07.28.13.4.18.84.32 1.3.42.48.1.95.15 1.43.15.76 0 1.35-.13 1.76-.4.41-.27.63-.65.63-1.17 0-.35-.1-.64-.32-.87-.22-.23-.63-.44-1.22-.63l-1.75-.55c-.88-.27-1.54-.68-1.95-1.22-.42-.54-.63-1.13-.63-1.77 0-.5.1-1 .32-1.4.22-.4.5-.76.88-1.04.37-.3.8-.5 1.3-.66.5-.16 1.03-.23 1.6-.23.28 0 .58.02.88.06.3.04.6.1.87.17.28.07.54.16.78.26.24.1.43.2.56.3.18.1.3.22.38.34.08.12.12.28.12.48v.53c0 .27-.1.4-.28.4-.1 0-.25-.04-.45-.12-.62-.26-1.32-.38-2.1-.38-.68 0-1.22.1-1.6.32-.37.22-.56.56-.56 1.04 0 .35.12.65.36.88.24.23.68.46 1.33.66l1.72.55c.87.27 1.5.65 1.88 1.13.38.48.57 1.03.57 1.64 0 .5-.1 1-.3 1.42-.2.42-.49.79-1.18 1.1-.46.3-.99.5-1.58.64-.62.14-1.28.21-2 .21z"
        fill="#FF9900"
      />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="#0a66c2"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function FigmaIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.02 3.019 3.02h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V8.981H8.148zM8.172 24c-2.489 0-4.515-2.014-4.515-4.49s2.026-4.49 4.515-4.49c2.489 0 4.515 2.014 4.515 4.49S10.661 24 8.172 24zm0-7.509c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019 3.019-1.355 3.019-3.019-1.354-3.019-3.019-3.019zm7.705 7.509h-.194C13.222 24 11.2 21.986 11.2 19.51s2.022-4.49 4.483-4.49h.194c2.476 0 4.49 2.014 4.49 4.49S18.353 24 15.877 24zm-.194-7.509c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h.194c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-.194z"
        fill="#a855f7"
      />
    </svg>
  );
}

/* ─────────────────────────────────────────
   Sub-components
───────────────────────────────────────── */

/** Right-column AWS tile — now shows description too */
function AwsTile({
  cert,
  index,
}: {
  cert: (typeof awsCerts)[0];
  index: number;
}) {
  return (
    <motion.a
      href={cert.href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, x: 24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.07 }}
      whileHover="hover"
      className="group relative flex items-center gap-4 rounded-xl
        bg-[var(--card)] border border-[var(--border)]
        px-4 py-4 overflow-hidden cursor-pointer
        transition-colors duration-300 hover:border-[#FF990066] flex-1"
    >
      {/* glow backdrop */}
      <motion.div
        variants={{ hover: { opacity: 1 } }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at left center, #FF990018 0%, transparent 70%)",
        }}
      />

      {/* Code badge */}
      <div
        className="relative z-10 w-12 h-12 rounded-lg flex items-center justify-center
          text-[10px] font-black tracking-wider flex-shrink-0 border"
        style={{
          background: "#FF990014",
          borderColor: "#FF990040",
          color: "#FF9900",
        }}
      >
        {cert.code}
      </div>

      <div className="relative z-10 flex-1 min-w-0">
        <p
          className="text-sm font-semibold text-[var(--foreground)] leading-tight
          group-hover:text-[#FF9900] transition-colors duration-200 truncate"
        >
          {cert.name}
        </p>
        {/* Description — was missing from tiles before */}
        <p className="text-xs text-[var(--muted-foreground)] mt-0.5 leading-snug line-clamp-1">
          {cert.desc}
        </p>
        <p className="text-xs text-[var(--muted-foreground)] mt-1.5 flex items-center gap-1.5">
          <AwsIcon size={24} />
          <span>{cert.issuer}</span>
        </p>
      </div>

      {/* Arrow */}
      <motion.div
        variants={{ hover: { x: 2, opacity: 1 } }}
        initial={{ opacity: 0 }}
        className="relative z-10 flex-shrink-0 text-[#FF9900]"
      >
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
          <path d="M7 17L17 7M17 7H7M17 7v10" />
        </svg>
      </motion.div>
    </motion.a>
  );
}

/** Featured large card (first AWS cert) */
function FeaturedAwsCard({ cert }: { cert: (typeof awsCerts)[0] }) {
  return (
    <motion.a
      href={cert.href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      whileHover="hover"
      className="group relative rounded-2xl bg-[var(--card)] border border-[var(--border)]
        p-8 overflow-hidden flex flex-col justify-between cursor-pointer
        hover:border-[#FF990066] transition-colors duration-300"
    >
      {/* radial glow */}
      <motion.div
        variants={{ hover: { opacity: 1, scale: 1.1 } }}
        initial={{ opacity: 0, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="absolute -top-16 -right-16 w-64 h-64 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, #FF990028 0%, transparent 70%)",
        }}
      />

      {/* Top accent stripe */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ background: "linear-gradient(90deg, #FF9900, transparent)" }}
      />

      {/* Body */}
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-6">
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center
              text-xs font-black tracking-wider border"
            style={{
              background: "#FF990018",
              borderColor: "#FF990040",
              color: "#FF9900",
              fontSize: "11px",
            }}
          >
            {cert.code}
          </div>
          <div
            className="flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1
              rounded-full border"
            style={{
              background: "#FF990014",
              borderColor: "#FF990040",
              color: "#FF9900",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "#FF9900" }}
            />
            Verified
          </div>
        </div>

        <h3
          className="text-xl font-bold text-[var(--foreground)] leading-tight mb-2
          group-hover:text-[#FF9900] transition-colors duration-300"
        >
          {cert.name}
        </h3>
        <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
          {cert.desc}
        </p>
      </div>

      {/* Footer */}
      <div
        className="relative z-10 flex items-center justify-between mt-8 pt-5
        border-t border-[var(--border)]"
      >
        <div className="flex items-center gap-2">
          {/* Fixed: use AwsIcon with a proper size so the 's' never clips */}
          <AwsIcon size={32} />
          <span className="text-xs font-semibold text-[var(--muted-foreground)]">
            {cert.issuer}
          </span>
        </div>
        <motion.div
          variants={{ hover: { x: 3 } }}
          className="flex items-center gap-1 text-xs font-medium"
          style={{ color: "#FF9900" }}
        >
          View credential
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
        </motion.div>
      </div>
    </motion.a>
  );
}

/** Non-AWS specialty cert card */
function SpecialtyCertCard({
  cert,
  index,
}: {
  cert: (typeof otherCerts)[0];
  index: number;
}) {
  const icon =
    cert.issuer === "Islington College" ? <FigmaIcon /> : <LinkedInIcon />;

  return (
    <motion.a
      href={cert.href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      whileHover="hover"
      className="group relative rounded-2xl bg-[var(--card)] border border-[var(--border)]
        p-6 overflow-hidden cursor-pointer transition-colors duration-300 flex flex-col gap-4"
      style={
        {
          "--cert-accent": cert.accent,
          "--cert-glow": cert.glow,
        } as React.CSSProperties
      }
    >
      {/* glow backdrop */}
      <motion.div
        variants={{ hover: { opacity: 1 } }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at top left, ${cert.glow} 0%, transparent 65%)`,
          borderColor: cert.accent + "55",
        }}
      />
      {/* top stripe */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] transition-opacity duration-300 opacity-0 group-hover:opacity-100"
        style={{
          background: `linear-gradient(90deg, ${cert.accent}, transparent)`,
        }}
      />

      <div className="relative z-10 flex items-start justify-between">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center border text-[11px] font-black tracking-wide flex-shrink-0"
          style={{
            background: cert.glow,
            borderColor: cert.accent + "40",
            color: cert.accent,
          }}
        >
          {cert.code}
        </div>
        <div
          className="flex items-center gap-1.5 text-[10px] font-semibold px-2.5 py-1
            rounded-full border"
          style={{
            background: cert.glow,
            borderColor: cert.accent + "40",
            color: cert.accent,
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: cert.accent }}
          />
          Verified
        </div>
      </div>

      <div className="relative z-10">
        <h3
          className="font-bold text-[var(--foreground)] leading-tight mb-1.5
            group-hover:transition-colors duration-200"
          style={{ "--hover-color": cert.accent } as React.CSSProperties}
        >
          {cert.name}
        </h3>
        <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
          {cert.desc}
        </p>
      </div>

      <div
        className="relative z-10 flex items-center justify-between pt-4 mt-auto
          border-t border-[var(--border)]"
      >
        <div className="flex items-center gap-2">
          {icon}
          <span className="text-xs font-semibold text-[var(--muted-foreground)]">
            {cert.issuer}
          </span>
        </div>
        <motion.div
          variants={{ hover: { x: 3 } }}
          className="flex items-center gap-1 text-xs font-medium"
          style={{ color: cert.accent }}
        >
          View credential
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
            <path d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
        </motion.div>
      </div>
    </motion.a>
  );
}

/* ─────────────────────────────────────────
   Main Section
───────────────────────────────────────── */
export default function Certifications() {
  const [featuredCert, ...restAwsCerts] = awsCerts;

  return (
    <section id="certifications" className="py-32 relative overflow-hidden">
      {/* Ambient background glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/3 left-0 w-[500px] h-[500px] rounded-full blur-[140px] opacity-[0.04]"
        style={{ background: "#FF9900" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-1/4 right-0 w-[400px] h-[400px] rounded-full blur-[120px] opacity-[0.04]"
        style={{ background: "#a855f7" }}
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
          <span
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full
              border border-[var(--border)] bg-[var(--secondary)]
              text-[10px] text-[var(--primary)] mb-4 font-semibold tracking-[0.18em] uppercase"
          >
            Certifications
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight">
            Credentials I have{" "}
            <span className="text-[var(--primary)]">earned.</span>
          </h2>
          <p className="mt-4 text-[var(--muted-foreground)] max-w-xl">
            Industry-recognised certifications across cloud architecture,
            machine learning, and product design — each linked to its verified
            credential.
          </p>
        </motion.div>

        {/* ── AWS Track ── */}
        <div className="mb-5">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-4"
          >
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border text-[10px] font-bold tracking-[0.15em] uppercase"
              style={{
                background: "#FF990012",
                borderColor: "#FF990040",
                color: "#FF9900",
              }}
            >
              {/* Fixed: AwsIcon at a size that gives the 's' room to breathe */}
              <AwsIcon size={30} />
              Academy Track · 5 Badges
            </div>
            <div className="flex-1 h-px bg-[var(--border)]" />
          </motion.div>

          {/* Featured + tiles layout */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-4">
            {/* Left: featured card */}
            <FeaturedAwsCard cert={featuredCert} />

            {/* Right: vertical tile stack — tiles stretch to fill the same height */}
            <div className="flex flex-col gap-3">
              {restAwsCerts.map((cert, i) => (
                <AwsTile key={cert.name} cert={cert} index={i} />
              ))}
            </div>
          </div>
        </div>

        {/* ── Specialty Track ── */}
        <div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-3 mb-4 mt-10"
          >
            <div
              className="flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] font-bold tracking-[0.15em] uppercase"
              style={{
                background: "var(--secondary)",
                borderColor: "var(--border)",
                color: "var(--muted-foreground)",
              }}
            >
              Specialty
            </div>
            <div className="flex-1 h-px bg-[var(--border)]" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {otherCerts.map((cert, i) => (
              <SpecialtyCertCard key={cert.name} cert={cert} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
