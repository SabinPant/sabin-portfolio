"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useReducedMotion } from "framer-motion";
import { projects } from "@/data/projects";

/* ═══════════════════════════════════════════════════════════
   Line model
   ═══════════════════════════════════════════════════════════ */

type Tone = "ps" | "cmd" | "out" | "key" | "hi" | "err" | "good";
type Seg = { t: string; c?: Tone };
type Line = { id: number; segs: Seg[] };

const toneClass: Record<Tone, string> = {
  ps: "text-good",
  cmd: "text-foreground",
  out: "text-muted-foreground",
  key: "text-primary",
  hi: "text-foreground font-medium",
  err: "text-bad",
  good: "text-good",
};

/* Fixed-width first column keeps the output reading like a spec sheet */
const pad = (s: string, n = 13) => s.padEnd(n, " ");

/* Spacing is preserved, but a line that outruns the pane wraps instead of
   widening it. The pane used to size to its widest line, and that width
   propagated all the way up to the document, so phones got a page wider
   than the screen that panned sideways while typing. */
const LINE = "whitespace-pre-wrap [overflow-wrap:anywhere]";

/* Touch devices have no keyboard worth opening, and focusing an input there
   raises the on-screen keyboard and scrolls the page under it. */
const isCoarsePointer = () =>
  typeof window !== "undefined" &&
  typeof window.matchMedia === "function" &&
  window.matchMedia("(pointer: coarse)").matches;

/* ═══════════════════════════════════════════════════════════
   Sections the terminal can navigate to
   ═══════════════════════════════════════════════════════════ */

const SECTIONS = [
  "about",
  "skills",
  "experience",
  "projects",
  "certifications",
  "contact",
] as const;

/* Short handles so `open nebula` works without typing the full slug */
const ALIASES: Record<string, string> = {
  nebula: "nebula-trading-platform",
  trading: "nebula-trading-platform",
  chat: "nebula-chat",
  skillswap: "skillswap",
  medilife: "medilife-hms",
  hms: "medilife-hms",
  gym: "gym-manager",
  netguard: "netguard-ids",
  ids: "netguard-ids",
};

export default function Terminal({ className = "" }: { className?: string }) {
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const reduce = useReducedMotion();
  const inputId = useId();

  const [lines, setLines] = useState<Line[]>([]);
  const [value, setValue] = useState("");
  const [ghost, setGhost] = useState(""); // the demo's simulated typing
  const [demoDone, setDemoDone] = useState(false);
  const [focused, setFocused] = useState(false);

  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const seq = useRef(0);
  const historyRef = useRef<string[]>([]);
  const histIdx = useRef(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const nextId = () => ++seq.current;

  const emit = useCallback((batch: Seg[][]) => {
    setLines((prev) => [...prev, ...batch.map((segs) => ({ id: nextId(), segs }))]);
  }, []);

  /* Keep the newest output in view without yanking the whole page */
  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines, ghost]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  /* ═════════════ Page effects ═════════════ */

  const scrollToSection = useCallback(
    (id: string) => {
      const el = document.getElementById(id);
      if (!el) return false;
      if (isCoarsePointer()) inputRef.current?.blur();
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
      return true;
    },
    [reduce],
  );

  /* ═════════════ Commands ═════════════ */

  const runCommand = useCallback(
    (raw: string) => {
      const line = raw.trim();
      emit([[{ t: "$ ", c: "ps" }, { t: line, c: "cmd" }]]);
      if (!line) return;

      historyRef.current.push(line);
      histIdx.current = historyRef.current.length;

      const [head, ...rest] = line.split(/\s+/);
      const cmd = head.toLowerCase();
      const arg = rest.join(" ").toLowerCase();
      const out: Seg[][] = [];

      switch (cmd) {
        case "help":
          out.push(
            [{ t: "available commands", c: "out" }],
            [{ t: "" }],
            [{ t: "  " + pad("whoami"), c: "key" }, { t: "who you are talking to", c: "out" }],
            [{ t: "  " + pad("projects"), c: "key" }, { t: "list everything I have built", c: "out" }],
            [{ t: "  " + pad("open <name>"), c: "key" }, { t: "open a project write-up", c: "out" }],
            [{ t: "  " + pad("stack"), c: "key" }, { t: "core technologies", c: "out" }],
            [{ t: "  " + pad("skills"), c: "key" }, { t: "full skill sheet", c: "out" }],
            [{ t: "  " + pad("experience"), c: "key" }, { t: "where I have worked", c: "out" }],
            [{ t: "  " + pad("certs"), c: "key" }, { t: "certifications", c: "out" }],
            [{ t: "  " + pad("cv"), c: "key" }, { t: "download my CV", c: "out" }],
            [{ t: "  " + pad("contact"), c: "key" }, { t: "how to reach me", c: "out" }],
            [{ t: "  " + pad("goto <name>"), c: "key" }, { t: "jump to a section", c: "out" }],
            [{ t: "  " + pad("theme"), c: "key" }, { t: "switch light and dark", c: "out" }],
            [{ t: "  " + pad("clear"), c: "key" }, { t: "clear the screen", c: "out" }],
            [{ t: "" }],
            [{ t: "everything here is also a link or a button on the page.", c: "out" }],
          );
          break;

        case "whoami":
          out.push(
            [{ t: "sabin_pant", c: "hi" }, { t: " :: full-stack and backend developer", c: "out" }],
            [{ t: "i mostly do backend and system design.", c: "out" }],
            [{ t: "based in Kathmandu, Nepal", c: "out" }],
            [{ t: "" }],
            [{ t: "status: ", c: "out" }, { t: "open to opportunities", c: "good" }],
          );
          break;

        case "projects":
        case "ls":
          out.push(
            [{ t: `${projects.length} projects. run `, c: "out" }, { t: "open <name>", c: "key" }, { t: " for detail.", c: "out" }],
            [{ t: "" }],
          );
          projects.forEach((p) => {
            out.push([
              { t: "  " + pad(p.slug.split("-")[0], 12), c: "key" },
              { t: p.subtitle, c: "out" },
            ]);
          });
          break;

        case "open": {
          if (!arg) {
            out.push([{ t: "usage: open <name>. run ", c: "out" }, { t: "projects", c: "key" }, { t: " to list them.", c: "out" }]);
            break;
          }
          const aliased = ALIASES[arg];
          const matches = aliased
            ? projects.filter((p) => p.slug === aliased)
            : projects.filter(
                (p) =>
                  p.slug === arg ||
                  p.slug.startsWith(arg) ||
                  p.title.toLowerCase() === arg,
              );

          if (matches.length === 0) {
            out.push([{ t: `no project matching '${arg}'`, c: "err" }]);
          } else if (matches.length > 1) {
            out.push([{ t: `'${arg}' is ambiguous. did you mean:`, c: "out" }]);
            matches.forEach((p) =>
              out.push([{ t: "  " + p.slug, c: "key" }, { t: `  ${p.title}`, c: "out" }]),
            );
          } else {
            const p = matches[0];
            out.push(
              [{ t: p.title, c: "hi" }, { t: ` :: ${p.subtitle}`, c: "out" }],
              [{ t: "" }],
              [{ t: "  " + pad("stack", 11), c: "key" }, { t: p.stack.join("  "), c: "out" }],
              [{ t: "  " + pad("layers", 11), c: "key" }, { t: p.arch.map((a) => a.label).join("  ->  "), c: "out" }],
              [{ t: "" }],
              [{ t: "opening write-up...", c: "good" }],
            );
            timers.current.push(setTimeout(() => router.push(`/projects/${p.slug}`), 450));
          }
          break;
        }

        case "stack":
          out.push(
            [{ t: "core stack", c: "out" }],
            [{ t: "" }],
            [{ t: "  Java   .NET   Node.js   Laravel   TypeScript   PostgreSQL", c: "key" }],
            [{ t: "" }],
            [{ t: "run ", c: "out" }, { t: "skills", c: "key" }, { t: " for the full sheet.", c: "out" }],
          );
          break;

        case "skills":
          out.push(
            [{ t: "  " + pad("backend", 15), c: "key" }, { t: "Spring Boot, NestJS, Express, Laravel, .NET", c: "out" }],
            [{ t: "  " + pad("frontend", 15), c: "key" }, { t: "React, Next.js, Tailwind CSS", c: "out" }],
            [{ t: "  " + pad("databases", 15), c: "key" }, { t: "PostgreSQL, MySQL, MongoDB, Redis, Oracle", c: "out" }],
            [{ t: "  " + pad("cloud", 15), c: "key" }, { t: "AWS, Docker, Vercel, Render", c: "out" }],
            [{ t: "  " + pad("architecture", 15), c: "key" }, { t: "system design, REST, JWT and session auth, RBAC", c: "out" }],
            [{ t: "" }],
            [{ t: "opening the skills section...", c: "good" }],
          );
          timers.current.push(setTimeout(() => scrollToSection("skills"), 400));
          break;

        case "experience":
          out.push(
            [{ t: "  " + pad("2026-08 →", 12), c: "key" }, { t: "Developer Intern, Karmachari Sanchaya Kosh (EPF Nepal)", c: "out" }],
            [{ t: "  " + pad("2026-03/06", 12), c: "key" }, { t: "Full-Stack Developer Intern, Leaflet Digital Solutions", c: "out" }],
            [{ t: "" }],
            [{ t: "opening the experience section...", c: "good" }],
          );
          timers.current.push(setTimeout(() => scrollToSection("experience"), 400));
          break;

        case "certs":
        case "certifications":
          out.push(
            [{ t: "7 certifications. 5 from AWS Academy.", c: "out" }],
            [{ t: "" }],
            [{ t: "opening the certifications section...", c: "good" }],
          );
          timers.current.push(setTimeout(() => scrollToSection("certifications"), 400));
          break;

        case "cv":
        case "resume":
          out.push([{ t: "fetching SabinPant_CV.pdf ...", c: "out" }]);
          timers.current.push(
            setTimeout(() => {
              const a = document.createElement("a");
              a.href = "/SabinPant_CV.pdf";
              a.download = "SabinPant_CV.pdf";
              document.body.appendChild(a);
              a.click();
              a.remove();
              emit([[{ t: "download started.", c: "good" }], [{ t: "" }]]);
            }, 380),
          );
          break;

        case "contact":
          out.push(
            [{ t: "  " + pad("email", 11), c: "key" }, { t: "sabinpant100@gmail.com", c: "out" }],
            [{ t: "  " + pad("github", 11), c: "key" }, { t: "github.com/SabinPant", c: "out" }],
            [{ t: "  " + pad("linkedin", 11), c: "key" }, { t: "linkedin.com/in/sabinpant", c: "out" }],
            [{ t: "" }],
            [{ t: "opening the contact form...", c: "good" }],
          );
          timers.current.push(setTimeout(() => scrollToSection("contact"), 400));
          break;

        case "goto": {
          const target = SECTIONS.find((s) => s === arg || s.startsWith(arg));
          if (!target) {
            out.push(
              [{ t: `no section '${arg}'`, c: "err" }],
              [{ t: "sections: " + SECTIONS.join(", "), c: "out" }],
            );
          } else {
            out.push([{ t: `-> ${target}`, c: "good" }]);
            timers.current.push(setTimeout(() => scrollToSection(target), 200));
          }
          break;
        }

        case "theme": {
          const next = resolvedTheme === "dark" ? "light" : "dark";
          setTheme(next);
          out.push([{ t: `theme -> ${next}`, c: "good" }]);
          break;
        }

        case "clear":
          setLines([]);
          return;

        case "uptime":
          out.push([{ t: "6 projects. 2 internships. 7 certifications. still building.", c: "out" }]);
          break;

        case "sudo":
          out.push([{ t: "nice try.", c: "out" }]);
          break;

        default:
          out.push(
            [{ t: `command not found: ${head}`, c: "err" }],
            [{ t: "try ", c: "out" }, { t: "help", c: "key" }],
          );
      }

      out.push([{ t: "" }]);
      emit(out);
    },
    [emit, resolvedTheme, router, scrollToSection, setTheme],
  );

  /* ═════════════ Opening sequence ═════════════ */

  useEffect(() => {
    // The opening sequence is queued rather than run synchronously in the
    // effect body: everything it does (print the banner, then either print
    // or type the demo command) is a state update reacting to mount, which
    // belongs in a callback rather than the effect's own call stack.
    const boot = setTimeout(() => {
      emit([
        [
          { t: "session started", c: "out" },
          { t: " · type ", c: "out" },
          { t: "help", c: "key" },
          { t: " for commands", c: "out" },
        ],
        [{ t: "" }],
      ]);

      if (reduce) {
        runCommand("whoami");
        setDemoDone(true);
        return;
      }

      const demo = ["whoami"];
      let di = 0;

      const typeNext = () => {
        if (di >= demo.length) {
          setDemoDone(true);
          return;
        }
        const cmd = demo[di++];
        let ci = 0;
        const tick = () => {
          if (ci < cmd.length) {
            setGhost(cmd.slice(0, ++ci));
            timers.current.push(setTimeout(tick, 42));
          } else {
            timers.current.push(
              setTimeout(() => {
                setGhost("");
                runCommand(cmd);
                timers.current.push(setTimeout(typeNext, 420));
              }, 240),
            );
          }
        };
        tick();
      };

      timers.current.push(setTimeout(typeNext, 520));
    }, 0);

    timers.current.push(boot);
    // Runs once on mount. runCommand is stable enough for the opening demo.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ═════════════ Input handling ═════════════ */

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      runCommand(value);
      setValue("");
      setDemoDone(true);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (histIdx.current > 0) setValue(historyRef.current[--histIdx.current]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIdx.current < historyRef.current.length - 1) {
        setValue(historyRef.current[++histIdx.current]);
      } else {
        histIdx.current = historyRef.current.length;
        setValue("");
      }
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setLines([]);
    }
  };

  const CHIPS = ["help", "projects", "stack", "cv", "contact", "theme"];

  return (
    <div
      className={`w-full min-w-0 max-w-full rounded-lg border border-border-strong bg-card overflow-hidden shadow-lift-2 ${className}`}
    >
      {/* Equipment plate */}
      <div className="flex items-center justify-between gap-3 px-3.5 py-2 border-b border-border bg-secondary">
        <span className="font-mono text-[11px] text-muted-foreground truncate">
          sabin@portfolio: ~
        </span>
        <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-primary shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-signal-lit" />
          interactive
        </span>
      </div>

      {/* Output */}
      <div
        ref={bodyRef}
        className="px-3.5 sm:px-4 pt-3.5 pb-1 font-mono text-[12px] sm:text-[12.5px] leading-[1.7] sm:leading-[1.75] h-56 sm:h-72 [@media(max-height:520px)]:h-36 overflow-y-auto overflow-x-hidden overscroll-contain"
        role="log"
        aria-live={demoDone ? "polite" : "off"}
        aria-label="Terminal output"
      >
        <div className="min-w-0">
          {lines.map((l) => (
            <div key={l.id} className={LINE}>
              {l.segs.length === 1 && l.segs[0].t === "" ? (
                " "
              ) : (
                l.segs.map((s, i) => (
                  <span key={i} className={s.c ? toneClass[s.c] : undefined}>
                    {s.t}
                  </span>
                ))
              )}
            </div>
          ))}
          {ghost && (
            <div className={LINE} aria-hidden="true">
              <span className={toneClass.ps}>$ </span>
              <span className={toneClass.cmd}>{ghost}</span>
              <span className="caret-blink text-signal-lit">▌</span>
            </div>
          )}
        </div>
      </div>

      {/* Prompt */}
      <label htmlFor={inputId} className="sr-only">
        Run a command. Type help for the list.
      </label>
      <div
        className="flex items-center gap-2 px-3.5 sm:px-4 py-2.5 border-t border-border cursor-text focus-within:bg-signal-haze"
        onClick={() => inputRef.current?.focus()}
      >
        <span className="font-mono text-[13px] md:text-[12.5px] text-good shrink-0">$</span>
        <input
          id={inputId}
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKeyDown}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
          placeholder={demoDone ? "try: projects" : ""}
          className="flex-1 min-w-0 bg-transparent border-0 outline-none p-0 font-mono text-[16px] md:text-[12.5px] text-foreground placeholder:text-faint-foreground"
          style={{ caretColor: "var(--signal-lit)" }}
        />
        {!focused && !value && demoDone && (
          <span aria-hidden="true" className="caret-blink text-signal-lit font-mono text-[13px] md:text-[12.5px]">
            ▌
          </span>
        )}
      </div>

      {/* Tap targets: this carries the whole feature where there is no keyboard */}
      <div className="flex flex-wrap gap-1.5 px-3.5 sm:px-4 pb-3.5">
        {CHIPS.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => {
              runCommand(c);
              setDemoDone(true);
              if (!isCoarsePointer()) inputRef.current?.focus();
            }}
            className="font-mono text-[11px] px-2.5 py-1.5 rounded border border-border bg-secondary text-muted-foreground hover:text-primary hover:border-primary transition-colors"
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}
