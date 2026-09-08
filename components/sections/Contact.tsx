"use client";
import { motion, useReducedMotion } from "framer-motion";
import { useState, useRef } from "react";
import { Mail, MapPin, Send } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";

// ── Validation helpers ──────────────────────────────────────────────────────
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const DISPOSABLE_DOMAINS = [
  "mailinator.com",
  "tempmail.com",
  "guerrillamail.com",
  "10minutemail.com",
  "throwaway.email",
  "yopmail.com",
];

function sanitize(str: string) {
  return str.replace(/[<>&"'`]/g, "").trim();
}

function validateEmail(email: string): string | null {
  const trimmed = email.trim();
  if (!trimmed) return "Email is required.";
  if (!EMAIL_RE.test(trimmed)) return "Enter a valid email address.";
  const domain = trimmed.split("@")[1]?.toLowerCase();
  if (DISPOSABLE_DOMAINS.includes(domain))
    return "Disposable email addresses are not allowed.";
  return null;
}

function validateFields(
  fields: Record<string, string>,
): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!fields.name.trim() || fields.name.trim().length < 2)
    errors.name = "Name must be at least 2 characters.";
  if (fields.name.trim().length > 80) errors.name = "Name is too long.";
  const emailErr = validateEmail(fields.email);
  if (emailErr) errors.email = emailErr;
  if (!fields.subject.trim() || fields.subject.trim().length < 3)
    errors.subject = "Subject must be at least 3 characters.";
  if (fields.subject.trim().length > 150)
    errors.subject = "Subject is too long.";
  if (!fields.message.trim() || fields.message.trim().length < 10)
    errors.message = "Message must be at least 10 characters.";
  if (fields.message.trim().length > 2000)
    errors.message = "Message must be under 2000 characters.";
  return errors;
}
// ───────────────────────────────────────────────────────────────────────────

const channels = [
  {
    icon: Mail,
    label: "Email",
    value: "sabinpant100@gmail.com",
    href: "mailto:sabinpant100@gmail.com",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Kathmandu, Nepal",
    href: "#",
  },
];

export default function Contact() {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitCount, setSubmitCount] = useState(0);
  const [messageLength, setMessageLength] = useState(0);
  const lastSubmitTime = useRef<number>(0);
  const reduce = useReducedMotion();

  function handleBlur(
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const all = {
      name: "",
      email: "",
      subject: "",
      message: "",
      [name]: value,
    };
    const fieldErrors = validateFields(all);
    setErrors((prev) => ({ ...prev, [name]: fieldErrors[name] ?? "" }));
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    if (!touched[name]) return;
    const all = {
      name: "",
      email: "",
      subject: "",
      message: "",
      [name]: value,
    };
    const fieldErrors = validateFields(all);
    setErrors((prev) => ({ ...prev, [name]: fieldErrors[name] ?? "" }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const raw = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      subject: (form.elements.namedItem("subject") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement)
        .value,
    };

    setTouched({ name: true, email: true, subject: true, message: true });
    const fieldErrors = validateFields(raw);
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length > 0) return;

    // Rate limiting: max 3 submissions, min 30s between attempts
    const now = Date.now();
    if (submitCount >= 3) {
      setStatus("ratelimit");
      return;
    }
    if (now - lastSubmitTime.current < 30_000) {
      setStatus("toosoon");
      return;
    }

    setLoading(true);
    setStatus("");
    lastSubmitTime.current = now;
    setSubmitCount((c) => c + 1);

    try {
      const data = new FormData();
      data.append("access_key", process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY!);
      data.append("name", sanitize(raw.name));
      data.append("email", raw.email.trim());
      data.append("subject", sanitize(raw.subject));
      data.append("message", sanitize(raw.message));

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });
      if (!res.ok) throw new Error("Network error");
      const json = await res.json();

      if (json.success) {
        setStatus("success");
        form.reset();
        setTouched({});
        setErrors({});
        setMessageLength(0);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  }

  /* Fields sit on the page ground inside the card so they read as recessed.
     Focus uses the one accent ring the rest of the site uses. */
  const inputClass = (field: string) =>
    `w-full px-3.5 py-2.5 rounded-md bg-background border text-sm text-foreground placeholder:text-faint-foreground transition-colors focus:outline-none focus:ring-2 ${
      touched[field] && errors[field]
        ? "border-bad focus:ring-bad"
        : "border-border hover:border-border-strong focus:border-transparent focus:ring-ring"
    }`;

  const invalid = (field: string) => Boolean(touched[field] && errors[field]);

  /* The panel reports its own state on the plate, the way a device would.
     The readable message still prints under the button. */
  const plate = loading
    ? { label: "sending", dot: "bg-warn" }
    : status === "success"
      ? { label: "sent", dot: "bg-good" }
      : status === "error"
        ? { label: "failed", dot: "bg-bad" }
        : status === "ratelimit" || status === "toosoon"
          ? { label: "held", dot: "bg-warn" }
          : { label: "ready", dot: "bg-signal-lit" };

  const reveal = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 12 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-80px" },
      };

  return (
    <section
      id="contact"
      className="relative border-t border-border bg-secondary/30 py-20 sm:py-24"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Left aligned header, with the availability read-out across from it */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-12 sm:mb-14">
          <SectionHeader
            title="Contact"
            description="Have a role, a project, or a question? Send a message or email me directly."
          />
          <span className="inline-flex items-center gap-2 shrink-0 sm:pt-1">
            <span
              aria-hidden="true"
              className="w-1.5 h-1.5 rounded-full bg-signal-lit"
            />
            <span className="label-micro">Open to opportunities</span>
          </span>
        </div>

        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-10 lg:gap-14 items-start">
          {/* ── Channels ── */}
          <motion.div
            {...reveal}
            transition={{ duration: 0.5 }}
            className="lg:pt-1"
          >
            <h3 className="display text-xl">Get in touch</h3>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-[46ch]">
              If you have a role, a project, or just want to ask something,
              send it over. I read everything that comes through here.
            </p>

            <ul className="mt-7 rounded-lg border border-border bg-card divide-y divide-border overflow-hidden">
              {channels.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="group flex items-center gap-3.5 px-4 py-3.5 hover:bg-secondary transition-colors"
                  >
                    <item.icon
                      size={16}
                      aria-hidden="true"
                      className="shrink-0 text-faint-foreground group-hover:text-primary transition-colors"
                    />
                    <span className="min-w-0">
                      <span className="label-micro block group-hover:text-primary transition-colors">
                        {item.label}
                      </span>
                      <span className="block text-sm text-foreground truncate">
                        {item.value}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            {/* Closes the loop the terminal opened at the top of the page */}
            <a
              href="#hero"
              className="mt-3 block font-mono text-[11.5px] text-faint-foreground hover:text-muted-foreground transition-colors"
            >
              or just run <span className="text-primary">contact</span> in the
              terminal up top
            </a>

            <div className="mt-7 flex gap-3">
              <a
                href="https://github.com/SabinPant"
                target="_blank"
                rel="noopener noreferrer"
                data-touch-target
                className="flex-1 inline-flex items-center justify-center py-2.5 rounded-lg border border-border-strong text-sm font-medium hover:bg-secondary transition-colors"
              >
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/sabinpant"
                target="_blank"
                rel="noopener noreferrer"
                data-touch-target
                className="flex-1 inline-flex items-center justify-center py-2.5 rounded-lg border border-border-strong text-sm font-medium hover:bg-secondary transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </motion.div>

          {/* ── Form panel, built like the terminal it bookends ── */}
          <motion.div {...reveal} transition={{ duration: 0.5, delay: 0.08 }}>
            <form
              onSubmit={handleSubmit}
              noValidate
              className="rounded-lg border border-border-strong bg-card overflow-hidden shadow-lift-2"
            >
              {/* Equipment plate */}
              <div
                aria-hidden="true"
                className="flex items-center justify-between gap-3 px-4 py-2 border-b border-border bg-secondary"
              >
                <span className="font-mono text-[11px] text-muted-foreground">
                  new message
                </span>
                <span className="inline-flex items-center gap-1.5 shrink-0 font-mono text-[11px] text-muted-foreground">
                  <span className={`w-1.5 h-1.5 rounded-full ${plate.dot}`} />
                  {plate.label}
                </span>
              </div>

              <div className="p-5 sm:p-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block mb-1.5 text-xs font-medium text-secondary-foreground"
                    >
                      Name
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      required
                      maxLength={80}
                      placeholder="Your name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      aria-invalid={invalid("name")}
                      aria-describedby={
                        invalid("name") ? "contact-name-error" : undefined
                      }
                      className={inputClass("name")}
                    />
                    {touched.name && errors.name && (
                      <p
                        id="contact-name-error"
                        className="mt-1.5 text-xs text-bad"
                      >
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block mb-1.5 text-xs font-medium text-secondary-foreground"
                    >
                      Email
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      maxLength={254}
                      placeholder="sabin@example.com"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      aria-invalid={invalid("email")}
                      aria-describedby={
                        invalid("email") ? "contact-email-error" : undefined
                      }
                      className={inputClass("email")}
                    />
                    {touched.email && errors.email && (
                      <p
                        id="contact-email-error"
                        className="mt-1.5 text-xs text-bad"
                      >
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-subject"
                    className="block mb-1.5 text-xs font-medium text-secondary-foreground"
                  >
                    Subject
                  </label>
                  <input
                    id="contact-subject"
                    name="subject"
                    required
                    maxLength={150}
                    placeholder="Project inquiry / Job opportunity"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    aria-invalid={invalid("subject")}
                    aria-describedby={
                      invalid("subject") ? "contact-subject-error" : undefined
                    }
                    className={inputClass("subject")}
                  />
                  {touched.subject && errors.subject && (
                    <p
                      id="contact-subject-error"
                      className="mt-1.5 text-xs text-bad"
                    >
                      {errors.subject}
                    </p>
                  )}
                </div>

                <div>
                  <div className="flex items-baseline justify-between gap-3 mb-1.5">
                    <label
                      htmlFor="contact-message"
                      className="text-xs font-medium text-secondary-foreground"
                    >
                      Message
                    </label>
                    <span className="tnum font-mono text-[11px] text-faint-foreground">
                      {messageLength}/2000
                    </span>
                  </div>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={5}
                    maxLength={2000}
                    placeholder="Tell me about your project or opportunity..."
                    onBlur={handleBlur}
                    onChange={(e) => {
                      handleChange(e);
                      setMessageLength(e.target.value.length);
                    }}
                    aria-invalid={invalid("message")}
                    aria-describedby={
                      invalid("message") ? "contact-message-error" : undefined
                    }
                    className={`${inputClass("message")} resize-none`}
                  />
                  {touched.message && errors.message && (
                    <p
                      id="contact-message-error"
                      className="mt-1.5 text-xs text-bad"
                    >
                      {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    "Sending..."
                  ) : (
                    <>
                      <Send size={16} aria-hidden="true" /> Send Message
                    </>
                  )}
                </button>

                <div role="status" aria-live="polite">
                  {status === "success" && (
                    <p className="text-sm text-good">
                      Message sent successfully!
                    </p>
                  )}
                  {status === "error" && (
                    <p className="text-sm text-bad">
                      Something went wrong. Please try again.
                    </p>
                  )}
                  {status === "ratelimit" && (
                    <p className="text-sm text-warn">
                      Too many submissions. Please email me directly.
                    </p>
                  )}
                  {status === "toosoon" && (
                    <p className="text-sm text-warn">
                      Please wait a moment before sending again.
                    </p>
                  )}
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
