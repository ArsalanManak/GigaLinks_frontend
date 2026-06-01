"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname() || "/";

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Projects", path: "/projects" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-[var(--glass-border)] shadow-sm ${
          scrolled ? "bg-[var(--surface-glass)] backdrop-blur-xl py-3" : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-3 items-center gap-4 md:gap-6">
          <div className="col-start-1 min-w-0">
            <Link href="/" className="flex items-center gap-3 z-50">
              <div className="w-10 h-10 rounded-lg bg-[var(--green)] flex items-center justify-center text-[var(--navy-deep)] font-bold text-xl shadow-[0_0_15px_var(--green-glow)]">
                G
              </div>
              <span className={`font-bold text-xl tracking-tight ${!scrolled ? 'text-white' : 'text-[var(--text-primary)]'}`}>
                GigaLink<span className="text-[var(--green)]">Pak</span>
              </span>
            </Link>
          </div>

          <div className="col-start-2 flex justify-center">
            {/* Desktop Nav (centered) */}
            <nav role="navigation" aria-label="Main navigation" className="hidden md:flex items-center gap-6 md:gap-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.path || (link.path !== "/" && pathname.startsWith(link.path));
                return (
                  <Link key={link.name} href={link.path} className={`relative group text-sm md:text-base font-medium transition-colors px-2 whitespace-nowrap ${!scrolled ? 'text-white/90 hover:text-white' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`} aria-current={isActive ? 'page' : undefined}>
                    {link.name}
                    <span className={`absolute -bottom-1 left-0 h-0.5 bg-[var(--green)] transition-all ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="col-start-3 flex items-center justify-end gap-2">
            {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors border ${!scrolled ? 'bg-white/10 text-white border-white/20 hover:text-[var(--green)]' : 'bg-[var(--surface-card)] text-[var(--text-primary)] border-[var(--glass-border)] hover:text-[var(--green)]'}`}
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            )}

            {/* Mobile Toggle */}
            <button
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              className={`md:hidden z-50 ${!scrolled ? 'text-white' : 'text-[var(--text-primary)]'}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </header>
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              key="mobile-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.45 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-[9998] bg-black/70 backdrop-blur-sm"
            />

            <motion.aside
              key="mobile-drawer"
              initial={{ x: 280, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 280, opacity: 0 }}
              transition={{ type: 'tween', duration: 0.25 }}
              className="fixed top-0 right-0 z-[9999] w-full max-w-sm h-full bg-[var(--navy-deep)] p-6 overflow-y-auto shadow-2xl"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile menu"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-md bg-[var(--green)] flex items-center justify-center text-[var(--navy-deep)] font-bold">G</div>
                  <span className="font-semibold text-lg text-white">Menu</span>
                </div>
                <button aria-label="Close menu" onClick={() => setMobileMenuOpen(false)} className="text-[var(--text-primary)]">
                  <X size={24} />
                </button>
              </div>

              <nav className="flex flex-col gap-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block rounded-xl px-4 py-3 text-lg font-medium text-white hover:bg-white/10 transition"
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>

              {mounted && (
                <button
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="mt-6 w-full rounded-xl bg-white/10 px-4 py-3 text-white font-medium hover:bg-white/20 transition"
                >
                  Toggle Theme
                </button>
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
