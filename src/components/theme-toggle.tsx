"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { m, AnimatePresence } from "framer-motion";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-full border border-neutral-200/10 dark:border-white/10 bg-neutral-200/5 dark:bg-white/5" />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative flex items-center justify-center w-10 h-10 rounded-full border border-neutral-200/10 dark:border-white/10 bg-black/[0.03] dark:bg-white/[0.03] hover:bg-black/[0.08] dark:hover:bg-white/[0.08] backdrop-blur-xl transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.03)] dark:shadow-[0_0_15px_rgba(255,255,255,0.03)] cursor-pointer overflow-hidden group"
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <m.div
            key="moon"
            initial={{ y: 20, opacity: 0, rotate: 45 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: -20, opacity: 0, rotate: -45 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="text-blue-400 group-hover:text-blue-300"
          >
            <Moon size={18} strokeWidth={2} />
          </m.div>
        ) : (
          <m.div
            key="sun"
            initial={{ y: 20, opacity: 0, rotate: -45 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: -20, opacity: 0, rotate: 45 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="text-amber-500 group-hover:text-amber-600"
          >
            <Sun size={18} strokeWidth={2} />
          </m.div>
        )}
      </AnimatePresence>
    </button>
  );
}
