"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function SectionHeader({
  title,
  description,
  align = "left",
}: {
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  const reduce = useReducedMotion();
  const centered = align === "center";

  /* Same reveal as before, dropped entirely when the user asks for less motion */
  const reveal = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 12 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-80px" },
        transition: { duration: 0.45 },
      };

  return (
    <motion.div {...reveal} className={centered ? "text-center" : ""}>
      {/* Instrument plate designation. Derived from the title, so every
          section carries the same marker without taking a new prop.
          Hidden from screen readers: the h2 below already says it. */}
      <p aria-hidden="true" className="label-micro mb-3">
        {title}
      </p>

      <h2 className="display text-4xl sm:text-5xl">{title}</h2>

      {description && (
        <p
          className={`mt-3 text-muted-foreground leading-relaxed ${
            centered ? "max-w-xl mx-auto" : "max-w-xl"
          }`}
        >
          {description}
        </p>
      )}

      {/* Hairline closes the plate. Held to the text column so it reads as
          a rule under the header, not a divider across the section. */}
      <div
        aria-hidden="true"
        className={`mt-6 h-px bg-border max-w-xl ${centered ? "mx-auto" : ""}`}
      />
    </motion.div>
  );
}
