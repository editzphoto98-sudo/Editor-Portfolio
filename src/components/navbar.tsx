"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { m, AnimatePresence  } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Clapperboard } from "./ui/Clapperboard";
import ThemeToggle from "./theme-toggle";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Skills", href: "/skills" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <m.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-[100] flex justify-center transition-all duration-300 ${scrolled ? "pt-4 pb-0" : "pt-5 pb-0"
        }`}
    >
      <div
        className={`
          flex flex-col items-center
          px-6 sm:px-8 py-3
          transition-all duration-500 ease-[cubic-bezier(0.25,0.8,0.25,1)] border
          ${scrolled || isOpen
            ? "w-[95%] max-w-5xl rounded-3xl backdrop-blur-xl md:backdrop-blur-3xl bg-slate-100/60 dark:bg-white/5 border-black/5 dark:border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.05)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
            : "w-full max-w-7xl bg-transparent border-transparent"
          }
        `}>
        <div className="w-full flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className={`p-2 rounded-lg transition-all duration-300 ${scrolled ? "bg-black/5 dark:bg-white/5 group-hover:bg-blue-600" : "bg-black/10 dark:bg-white/10 group-hover:bg-blue-600"}`}>
              <Clapperboard />
            </div>
            <span className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-200 transition-colors">
              Yogita Singh
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 group overflow-hidden"
                  >
                    <span className={`relative z-10 ${isActive ? "text-neutral-900 dark:text-white" : "text-neutral-500 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white"}`}>
                      {item.name}
                    </span>

                    {/* Active Background Pill */}
                    {isActive && (
                      <m.div
                        layoutId="nav-pill"
                        className="absolute inset-0 bg-black/5 dark:bg-white/10 rounded-full"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}

                    {/* Hover Glow */}
                    <div className="absolute inset-0 bg-black/[0.03] dark:bg-white/5 opacity-0 group-hover:opacity-100 rounded-full transition-opacity duration-300" />
                  </Link>
                );
              })}
            </div>
            <div className="w-[1px] h-5 bg-neutral-200 dark:bg-white/10" />
            <ThemeToggle />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-3">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-neutral-600 dark:text-gray-300 hover:text-neutral-900 dark:hover:text-white p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown - Unified Container */}
        <AnimatePresence>
          {isOpen && (
            <m.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="w-full overflow-hidden md:hidden"
            >
              <div className="pt-4 pb-2 space-y-2 flex flex-col">
                {navItems.map((item, i) => (
                  <m.div
                    key={item.name}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.05 + 0.1 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`block px-4 py-3 rounded-xl text-base font-medium transition-all ${pathname === item.href
                        ? "text-blue-600 dark:text-white bg-blue-600/10 dark:bg-blue-600/20 border border-blue-500/20 dark:border-blue-500/30"
                        : "text-neutral-500 dark:text-gray-400 hover:text-neutral-900 dark:hover:text-white hover:bg-black/[0.02] dark:hover:bg-white/5"
                        }`}
                    >
                      {item.name}
                    </Link>
                  </m.div>
                ))}
              </div>
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </m.nav>
  );
}
