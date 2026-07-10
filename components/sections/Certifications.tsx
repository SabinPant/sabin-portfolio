"use client";
import { motion } from "framer-motion";

/* ─────────────────────────────────────────
   Data
───────────────────────────────────────── */
const groups = [
  {
    issuer: "AWS Academy",
    note: "Cloud & machine learning track",
    items: [
      {
        name: "Cloud Foundations",
        href: "https://www.credly.com/badges/ea1886ba-3222-4379-8242-af8fe042eec9/linked_in_profile",
        desc: "Core cloud concepts, AWS global infrastructure and core services.",
      },
      {
        name: "Data Engineering",
        href: "https://www.credly.com/badges/adbdd47a-070d-4be3-beea-580a4887e43c/linked_in_profile",
        desc: "Data lakes, ETL pipelines, and analytics services on AWS.",
      },
      {
        name: "Machine Learning Foundations",
        href: "https://www.credly.com/badges/00c8562d-16d5-41ea-936a-1b39d7855ef5/linked_in_profile",
        desc: "Machine learning concepts, SageMaker, and the model lifecycle.",
      },
      {
        name: "Machine Learning for NLP",
        href: "https://www.credly.com/badges/574b6f59-dd39-4257-a9b6-2e023f6c7336/linked_in_profile",
        desc: "Natural language processing with Comprehend and Lex.",
      },
      {
        name: "Generative AI",
        href: "https://www.credly.com/badges/63197887-792e-4a09-9f82-9d61e7713818/linked_in_profile",
        desc: "Foundations of generative AI, Bedrock, and prompt engineering.",
      },
    ],
  },
  {
    issuer: "Specialty",
    note: "Design & software fundamentals",
    items: [
      {
        name: "UI/UX Design with Figma",
        href: "https://certificate.islingtoncollege.edu.np/certificate/verify/ICKCP4A240295OIGT1",
        desc: "End-to-end product design: wireframes, prototypes and design systems.",
        meta: "Islington College",
      },
      {
        name: "Java Object-Oriented Programming",
        href: "https://www.linkedin.com/learning/",
        desc: "OOP principles: encapsulation, inheritance, polymorphism and design patterns.",
        meta: "LinkedIn Learning",
      },
    ],
  },
];

/* ─────────────────────────────────────────
   Component
───────────────────────────────────────── */
export default function Certifications() {
  return (
    <section id="certifications" className="py-24 md:py-32">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-20 md:mb-24 text-center flex flex-col items-center"
        >
          <p className="text-xs font-medium tracking-[0.14em] uppercase text-(--muted-foreground) mb-4">
            Certifications
          </p>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-(--foreground)">
            Credentials
          </h2>
          <p className="mt-4 text-(--muted-foreground) max-w-md leading-relaxed">
            Seven certifications across cloud infrastructure, machine learning,
            and product design, each verifiable at the source.
          </p>
        </motion.div>

        {/* Groups */}
        <div className="space-y-14 md:space-y-16">
          {groups.map((group) => (
            <div key={group.issuer}>
              {/* Group header */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45 }}
                className="flex items-center justify-between gap-4 mb-4"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-[13px] font-semibold tracking-[0.04em] uppercase text-(--primary)">
                    {group.issuer}
                  </span>
                  <span className="text-(--border)">·</span>
                  <span className="text-[13px] text-(--muted-foreground)">
                    {group.note}
                  </span>
                </div>
                <span className="shrink-0 text-xs tabular-nums text-(--muted-foreground)">
                  {String(group.items.length).padStart(2, "0")}
                </span>
              </motion.div>

              <div className="border-t border-(--border) mb-1" />

              {/* Rows */}
              <ul className="divide-y divide-(--border)">
                {group.items.map((item, i) => (
                  <motion.li
                    key={item.name}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.4, delay: i * 0.04 }}
                  >
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative flex items-start sm:items-center gap-4 py-5
                        pl-4 -mx-4 pr-4 rounded-lg
                        transition-colors duration-200 hover:bg-(--secondary)/60"
                    >
                      {/* Left tick — the one signature detail, replaces per-row code chips */}
                      <span
                        className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-0.5 rounded-full
                          bg-(--border) transition-colors duration-200 group-hover:bg-(--foreground)"
                      />

                      <span className="flex-1 min-w-0">
                        <span className="flex flex-col sm:flex-row sm:items-baseline sm:gap-3">
                          <span className="font-medium text-(--foreground) leading-snug">
                            {item.name}
                          </span>
                          {"meta" in item && item.meta && (
                            <span className="text-xs text-(--muted-foreground) shrink-0">
                              {item.meta}
                            </span>
                          )}
                        </span>
                        <span className="block text-sm text-(--muted-foreground) leading-relaxed mt-1 sm:mt-0.5 sm:max-w-md">
                          {item.desc}
                        </span>
                      </span>

                      {/* Arrow */}
                      <span
                        className="shrink-0 self-center text-(--muted-foreground) transition-all duration-200
                          group-hover:text-(--foreground) group-hover:translate-x-0.5"
                      >
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.75"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M7 17L17 7M17 7H7M17 7v10" />
                        </svg>
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
