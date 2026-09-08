"use client";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";

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
   A compact ledger: narrow measure, tight rows, plain ground.
   The only accent is the tick on the hovered row, which reads
   like a live selection in an instrument list.
───────────────────────────────────────── */
export default function Certifications() {
  const reduce = useReducedMotion();

  const row = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 6 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-40px" as const },
          transition: { duration: 0.35, delay },
        };

  return (
    <section id="certifications" className="py-16 md:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="mb-9 md:mb-11">
          <SectionHeader
            title="Certifications"
            description="Seven certifications across cloud infrastructure, machine learning, and product design. Each links to the verification source."
          />
        </div>

        {/* Groups */}
        <div className="space-y-9 md:space-y-11">
          {groups.map((group) => (
            <div key={group.issuer}>
              {/* Group head: the column heading of the ledger */}
              <motion.div
                {...row(0)}
                className="flex items-baseline justify-between gap-4 pb-2 border-b border-border-strong"
              >
                <div className="flex items-baseline gap-3 min-w-0">
                  <h3 className="display text-base sm:text-lg text-foreground">
                    {group.issuer}
                  </h3>
                  <span className="text-[13px] text-muted-foreground truncate">
                    {group.note}
                  </span>
                </div>
                <span className="tnum shrink-0 font-mono text-xs text-faint-foreground">
                  {String(group.items.length).padStart(2, "0")}
                </span>
              </motion.div>

              {/* Rows */}
              <ul className="divide-y divide-border">
                {group.items.map((item, i) => (
                  <motion.li key={item.name} {...row(i * 0.03)}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative flex items-start sm:items-center gap-4 py-3.5
                        pl-4 -mx-4 pr-4 rounded-md
                        transition-colors duration-200 hover:bg-secondary/60"
                    >
                      {/* The tick: amber only while this row is the live one */}
                      <span
                        className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-0.5 rounded-full
                          bg-border transition-colors duration-200 group-hover:bg-primary"
                      />

                      <span className="flex-1 min-w-0">
                        <span className="flex flex-col sm:flex-row sm:items-baseline sm:gap-3">
                          <span className="text-[15px] font-medium text-foreground leading-snug">
                            {item.name}
                          </span>
                          {"meta" in item && item.meta && (
                            <span className="label-micro shrink-0 mt-1 sm:mt-0">
                              {item.meta}
                            </span>
                          )}
                        </span>
                        <span className="block text-[13px] text-muted-foreground leading-relaxed mt-1 sm:mt-0.5 sm:max-w-lg">
                          {item.desc}
                        </span>
                      </span>

                      {/* Arrow */}
                      <span
                        className="shrink-0 self-center text-faint-foreground transition-all duration-200
                          group-hover:text-foreground group-hover:translate-x-0.5"
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
                          aria-hidden="true"
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

        {/* Hands the reader to the next section instead of ending flat */}
        <motion.a
          {...row(0.06)}
          href="#contact"
          data-touch-target
          className="mt-10 md:mt-12 flex items-center gap-3 group w-fit"
        >
          <span className="label-micro group-hover:text-primary transition-colors">
            Next: start a conversation
          </span>
          <ArrowDown
            size={13}
            aria-hidden="true"
            className="text-faint-foreground group-hover:text-primary group-hover:translate-y-0.5 transition-all"
          />
        </motion.a>
      </div>
    </section>
  );
}
