"use client";
import { motion } from "framer-motion";
import {
  Cloud,
  Database,
  Brain,
  MessageSquare,
  Sparkles,
  Paintbrush,
} from "lucide-react";

const certs = [
  { name: "AWS Cloud Foundations", issuer: "AWS Academy", icon: Cloud },
  { name: "AWS Data Engineering", issuer: "AWS Academy", icon: Database },
  { name: "AWS ML Foundations", issuer: "AWS Academy", icon: Brain },
  { name: "AWS ML for NLP", issuer: "AWS Academy", icon: MessageSquare },
  { name: "AWS Generative AI", issuer: "AWS Academy", icon: Sparkles },
  { name: "UI/UX with Figma", issuer: "Islington College", icon: Paintbrush },
];

export default function Certifications() {
  return (
    <section id="certifications" className="py-32 relative">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--border)] bg-[var(--secondary)] text-xs text-[var(--primary)] mb-4 font-medium tracking-widest uppercase">
            Certifications
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold">
            Credentials I have{" "}
            <span className="text-[var(--primary)]">earned.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {certs.map((cert, i) => (
            <motion.div
              key={cert.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 hover:border-[var(--primary)] transition-all duration-300 group"
            >
              <div className="w-10 h-10 rounded-lg bg-[var(--secondary)] border border-[var(--border)] flex items-center justify-center text-[var(--primary)] mb-3">
                <cert.icon size={20} />
              </div>
              <h3 className="font-semibold text-[var(--foreground)] mb-1 group-hover:text-[var(--primary)] transition-colors">
                {cert.name}
              </h3>
              <p className="text-sm text-[var(--muted-foreground)]">
                {cert.issuer}
              </p>
              <div className="mt-3 inline-flex items-center gap-1 text-xs text-green-400">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                Verified
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
