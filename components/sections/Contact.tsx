"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function Contact() {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const data = new FormData(form);
    data.append("access_key", "5376f545-c67e-4cac-8c11-8414d72ba17b");
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: data,
    });
    const json = await res.json();
    setLoading(false);
    if (json.success) {
      setStatus("success");
      form.reset();
    } else {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="py-32 relative bg-[var(--secondary)]/20">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--border)] bg-[var(--secondary)] text-xs text-[var(--primary)] mb-4 font-medium tracking-widest uppercase">
            Contact
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold">
            Let us <span className="text-[var(--primary)]">connect.</span>
          </h2>
          <p className="text-[var(--muted-foreground)] mt-4 max-w-lg mx-auto">
            Whether you have a project in mind, a job opportunity, or just want
            to say hi — my inbox is always open.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Left — Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-xl font-semibold mb-2">Get in touch</h3>
              <p className="text-[var(--muted-foreground)] leading-relaxed">
                I am currently open to internship and full-time opportunities.
                If you have a role that matches my profile or want to
                collaborate on something exciting, reach out!
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  icon: Mail,
                  label: "Email",
                  value: "sabinpant100@gmail.com",
                  href: "mailto:sabinpant100@gmail.com",
                },
                {
                  icon: Phone,
                  label: "Phone",
                  value: "+977 9845943810",
                  href: "tel:+9779845943810",
                },
                {
                  icon: MapPin,
                  label: "Location",
                  value: "Kathmandu, Nepal",
                  href: "#",
                },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-4 p-4 rounded-xl bg-[var(--card)] border border-[var(--border)] hover:border-[var(--primary)] transition-all group"
                >
                  <div className="w-10 h-10 rounded-lg bg-[var(--secondary)] flex items-center justify-center text-[var(--primary)] group-hover:bg-[var(--primary)] group-hover:text-white transition-all">
                    <item.icon size={18} />
                  </div>
                  <div>
                    <div className="text-xs text-[var(--muted-foreground)]">
                      {item.label}
                    </div>
                    <div className="text-sm font-medium text-[var(--foreground)]">
                      {item.value}
                    </div>
                  </div>
                </a>
              ))}
            </div>

            <div className="flex gap-3">
              <a
                href="https://github.com/Sabinpabt23"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 rounded-xl border border-[var(--border)] text-center text-sm text-[var(--secondary-foreground)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all"
              >
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/sabinpant"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 rounded-xl border border-[var(--border)] text-center text-sm text-[var(--secondary-foreground)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all"
              >
                LinkedIn
              </a>
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form
              onSubmit={handleSubmit}
              className="space-y-4 bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6"
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-[var(--muted-foreground)] mb-1.5 block">
                    Name
                  </label>
                  <input
                    name="name"
                    required
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-lg bg-[var(--secondary)] border border-[var(--border)] text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:border-[var(--primary)] transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs text-[var(--muted-foreground)] mb-1.5 block">
                    Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 rounded-lg bg-[var(--secondary)] border border-[var(--border)] text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:border-[var(--primary)] transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs text-[var(--muted-foreground)] mb-1.5 block">
                  Subject
                </label>
                <input
                  name="subject"
                  required
                  placeholder="Project inquiry / Job opportunity"
                  className="w-full px-4 py-3 rounded-lg bg-[var(--secondary)] border border-[var(--border)] text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:border-[var(--primary)] transition-colors"
                />
              </div>
              <div>
                <label className="text-xs text-[var(--muted-foreground)] mb-1.5 block">
                  Message
                </label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell me about your project or opportunity..."
                  className="w-full px-4 py-3 rounded-lg bg-[var(--secondary)] border border-[var(--border)] text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:border-[var(--primary)] transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-lg bg-[var(--primary)] text-white font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {loading ? (
                  "Sending..."
                ) : (
                  <>
                    <Send size={16} /> Send Message
                  </>
                )}
              </button>
              {status === "success" && (
                <p className="text-center text-sm text-green-400">
                  Message sent successfully!
                </p>
              )}
              {status === "error" && (
                <p className="text-center text-sm text-red-400">
                  Something went wrong. Try again.
                </p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
