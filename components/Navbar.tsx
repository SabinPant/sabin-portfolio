"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];

/* The terminal scrolls with the same 80px offset. Keep the two in step. */
const SCROLL_OFFSET = 80;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeId, setActiveId] = useState("");
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ── Active section readout ──
     A narrow observation band sits just under the header. The section that
     owns the top of the content area is the one the reader is actually in,
     so the first intersecting section in document order wins. */
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    const ids = navLinks.map((l) => l.href.slice(1));
    const targets = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (targets.length === 0) return;

    const inBand = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) inBand.add(entry.target.id);
          else inBand.delete(entry.target.id);
        }
        setActiveId(ids.find((id) => inBand.has(id)) ?? "");
      },
      { rootMargin: `-${SCROLL_OFFSET}px 0px -60% 0px`, threshold: 0 },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      // Don't close if clicking the menu button
      if (
        buttonRef.current &&
        buttonRef.current.contains(event.target as Node)
      ) {
        return;
      }
      // Close if clicking outside the menu
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMobileOpen(false);
      }
    };

    if (mobileOpen) {
      // Small delay to prevent immediate closing on open
      const listenerTimeout = setTimeout(() => {
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("touchstart", handleClickOutside);
      }, 100);

      // Prevent body scroll while the menu is open. Plain overflow:hidden
      // (rather than the position:fixed + top-offset trick) means the
      // page never actually moves, so there is nothing to restore and no
      // flash back to the top when the menu closes.
      const scrollBarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      // Compensate for the scrollbar disappearing so content doesn't
      // shift sideways when the lock engages (desktop browsers only,
      // scrollBarWidth is 0 on mobile where scrollbars are overlaid).
      if (scrollBarWidth > 0) {
        document.body.style.paddingRight = `${scrollBarWidth}px`;
      }

      return () => {
        clearTimeout(listenerTimeout);
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("touchstart", handleClickOutside);
        document.documentElement.style.overflow = "";
        document.body.style.overflow = "";
        document.body.style.paddingRight = "";
      };
    }
  }, [mobileOpen]);

  // Close menu on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && mobileOpen) {
        setMobileOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mobileOpen]);

  // Handle escape key (accessibility)
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileOpen) {
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [mobileOpen]);

  const handleLinkClick = (href: string) => {
    setMobileOpen(false);
    // Move the marker straight away so the click reads as acknowledged.
    // The observer confirms it a moment later.
    setActiveId(href.slice(1));
    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        const offset = SCROLL_OFFSET;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: reduce ? "auto" : "smooth",
        });
      }
    }, 100); // Small delay to ensure menu closes first
  };

  const activeIndex = navLinks.findIndex((l) => l.href.slice(1) === activeId);
  const markerTransition = reduce
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 420, damping: 34, mass: 0.6 };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          scrolled
            ? "bg-background border-b border-border shadow-lift-1"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <nav
          aria-label="Primary"
          className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between"
        >
          <motion.a
            href="#"
            initial={reduce ? undefined : { opacity: 0, x: -12 }}
            animate={reduce ? undefined : { opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2.5 z-50 cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              setActiveId("");
              window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
            }}
          >
            <span className="w-7 h-7 rounded-sm bg-primary flex items-center justify-center">
              <span className="font-mono text-[11px] font-medium text-primary-foreground">
                SP
              </span>
            </span>
            <span className="display text-lg text-foreground">Sabin Pant</span>
          </motion.a>

          <div className="hidden md:flex items-center gap-6">
            <motion.ul
              initial={reduce ? undefined : { opacity: 0, y: -6 }}
              animate={reduce ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="flex items-center gap-7"
            >
              {navLinks.map((link) => {
                const isActive = link.href.slice(1) === activeId;
                return (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      aria-current={isActive ? "true" : undefined}
                      onClick={(e) => {
                        e.preventDefault();
                        handleLinkClick(link.href);
                      }}
                      className={`relative flex h-16 items-center text-sm transition-colors duration-200 cursor-pointer ${
                        isActive
                          ? "text-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {link.label}
                      {isActive && (
                        <motion.span
                          layoutId="nav-active-marker"
                          transition={markerTransition}
                          aria-hidden="true"
                          className="absolute inset-x-0 bottom-0 h-0.5 bg-primary"
                        />
                      )}
                    </a>
                  </li>
                );
              })}
            </motion.ul>

            <span className="h-4 w-px bg-border" aria-hidden="true" />
            <ThemeToggle />
          </div>

          <div className="flex items-center gap-1 md:hidden">
            <ThemeToggle />
            <button
              ref={buttonRef}
              className="text-foreground z-50 p-2 rounded-md hover:bg-secondary transition-colors active:scale-95"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop overlay for better UX */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/55 z-40 md:hidden touch-none"
              onClick={() => setMobileOpen(false)}
            />

            <motion.div
              ref={menuRef}
              role="dialog"
              aria-modal="true"
              aria-label="Site navigation"
              initial={reduce ? { opacity: 0 } : { opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, x: "100%" }}
              transition={{ type: "tween", duration: reduce ? 0.12 : 0.3 }}
              className="fixed md:hidden top-0 right-0 bottom-0 w-full max-w-sm bg-background border-l border-border-strong z-40 shadow-lift-2 overscroll-contain"
              style={{ top: 0 }}
            >
              <div className="flex flex-col h-full pt-20 px-6 pb-[env(safe-area-inset-bottom)]">
                <p className="label-micro pb-4 border-b border-border">
                  Sections
                </p>

                {/* Scrolls on short viewports so the position readout below
                    is never pushed off the bottom of the panel. overflow-x is
                    pinned because CSS would otherwise compute it to `auto` to
                    match the y axis, and the items enter from translateX(16px):
                    that briefly overflows sideways and flashes a horizontal
                    scrollbar under the last row. */}
                <ul className="flex flex-col pt-2 min-h-0 overflow-y-auto overflow-x-hidden overscroll-contain">
                  {navLinks.map((link, index) => {
                    const isActive = link.href.slice(1) === activeId;
                    return (
                      <motion.li
                        key={link.label}
                        initial={reduce ? undefined : { opacity: 0, x: 16 }}
                        animate={reduce ? undefined : { opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.04 }}
                      >
                        <a
                          href={link.href}
                          data-touch-target
                          aria-current={isActive ? "true" : undefined}
                          onClick={(e) => {
                            e.preventDefault();
                            handleLinkClick(link.href);
                          }}
                          className={`flex items-baseline gap-4 py-3 text-lg transition-colors cursor-pointer ${
                            isActive
                              ? "text-foreground"
                              : "text-secondary-foreground hover:text-foreground"
                          }`}
                        >
                          {/* Built from utilities rather than .label-micro:
                              that class sets its own color, which would win
                              over the accent on the active row. */}
                          <span
                            aria-hidden="true"
                            className={`font-mono text-[0.66rem] uppercase tracking-[0.13em] tnum ${
                              isActive ? "text-primary" : "text-faint-foreground"
                            }`}
                          >
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          {link.label}
                        </a>
                      </motion.li>
                    );
                  })}
                </ul>

                {/* Says how far in the reader is, and that there is more below */}
                <div className="mt-auto border-t border-border py-6">
                  <p className="label-micro">Position</p>
                  <div className="mt-2 flex items-baseline justify-between gap-4">
                    <span className="text-sm text-secondary-foreground">
                      {activeIndex >= 0
                        ? navLinks[activeIndex].label
                        : "Top of page"}
                    </span>
                    <span className="font-mono text-xs text-faint-foreground tnum">
                      {String(activeIndex + 1).padStart(2, "0")} /{" "}
                      {String(navLinks.length).padStart(2, "0")}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
