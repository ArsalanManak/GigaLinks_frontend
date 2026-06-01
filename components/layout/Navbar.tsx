"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-[var(--surface-glass)] backdrop-blur-xl border-b border-[var(--glass-border)] py-3" : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 z-50">
            <div className="w-10 h-10 rounded-lg bg-[var(--green)] flex items-center justify-center text-[var(--navy-deep)] font-bold text-xl shadow-[0_0_15px_var(--green-glow)]">
              G
            </div>
            <span className={`font-bold text-xl tracking-tight ${!scrolled ? 'text-[#ffffff]' : 'text-[var(--text-primary)]'}`}>
              GigaLink<span className="text-[var(--green)]">Pak</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.path} className={`relative group text-sm font-medium transition-colors ${!scrolled ? 'text-[#ffffff]/90 hover:text-[#ffffff]' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}>
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--green)] transition-all group-hover:w-full"></span>
              </Link>
            ))}
            {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors border ml-2 ${!scrolled ? 'bg-white/10 text-[#ffffff] border-white/20 hover:text-[var(--green)]' : 'bg-[var(--surface-card)] text-[var(--text-primary)] border-[var(--glass-border)] hover:text-[var(--green)]'}`}
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            )}
            <Link href="/get-quote" className="btn-primary ml-2">
              Get a Quote
            </Link>
          </nav>

          {/* Mobile Toggle */}
          <button
            className={`md:hidden z-50 ${!scrolled ? 'text-[#ffffff]' : 'text-[var(--text-primary)]'}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[var(--navy-deep)] flex flex-col items-center justify-center pt-20 pb-10 px-6"
          >
            <div className="flex flex-col gap-6 w-full max-w-sm">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between py-4 border-b border-[var(--glass-border)] text-xl font-medium text-[var(--text-primary)]"
                  >
                    {link.name}
                    <ChevronRight className="text-[var(--green)]" />
                  </Link>
                </motion.div>
              ))}
              {mounted && (
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.1 }}
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="flex items-center justify-between py-4 border-b border-[var(--glass-border)] text-xl font-medium text-[var(--text-primary)] w-full text-left"
                >
                  Theme
                  {theme === 'dark' ? <Sun className="text-[var(--green)]" /> : <Moon className="text-[var(--green)]" />}
                </motion.button>
              )}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (navLinks.length + 1) * 0.1 }}
                className="mt-8"
              >
                <Link
                  href="/get-quote"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn-primary w-full justify-center text-lg py-4"
                >
                  Get a Quote
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
