"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

const subscribeNoop = () => () => {};

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false,
  );

  const isDark = resolvedTheme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      // Server and first client render both fall back to the generic label,
      // so the state-aware wording cannot cause a hydration mismatch.
      aria-label={
        !mounted
          ? "Toggle theme"
          : isDark
            ? "Switch to light theme"
            : "Switch to dark theme"
      }
      // The global :focus-visible ring is amber, which reads clearly against
      // both the light and the dark ground, so it is left to do the work.
      className="relative p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors duration-200 cursor-pointer"
    >
      {!mounted ? (
        <span className="block w-4.5 h-4.5" />
      ) : isDark ? (
        <Sun size={18} />
      ) : (
        <Moon size={18} />
      )}
    </button>
  );
}
