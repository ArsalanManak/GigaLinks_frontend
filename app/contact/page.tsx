"use client";
import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => setMounted(true), []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    // Simulate API call
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", phone: "", service: "", message: "" });
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen pt-24 pb-24 relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-[-1] pointer-events-none">
        {mounted && theme === 'light' ? (
          <>
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1920&q=80')", backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
            <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-emerald-400/20 rounded-full blur-[120px] mix-blend-multiply animate-pulse-glow"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-400/10 rounded-full blur-[150px] mix-blend-multiply animate-pulse-glow" style={{ animationDelay: '2s' }}></div>
            <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/70 to-white backdrop-blur-[2px]"></div>
          </>
        ) : (
          <>
            <div className="absolute inset-0 opacity-15" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1920&q=80')", backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
            <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-emerald-500/15 rounded-full blur-[130px] mix-blend-screen animate-pulse-glow"></div>
            <div className="absolute bottom-[0%] left-[-10%] w-[700px] h-[700px] bg-indigo-600/15 rounded-full blur-[150px] mix-blend-screen animate-pulse-glow" style={{ animationDelay: '1.5s' }}></div>
            <div className="absolute inset-0 bg-gradient-to-b from-[#060D1E]/60 via-[#060D1E]/40 to-[#060D1E]/90"></div>
          </>
        )}
      </div>

      {/* HERO */}
      <section className="pt-8 pb-16 text-center max-w-4xl mx-auto px-6">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold mb-6"
        >
          Get in <span className="gradient-text">Touch</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.6 }}
          className="text-xl text-[var(--text-secondary)]"
        >
          Our team is ready to assist you with your connectivity infrastructure needs.
        </motion.p>
      </section>

      {/* LARGE CENTERED SOCIAL ICONS */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h3 className="mb-6 text-lg font-semibold text-[var(--text-secondary)] uppercase tracking-wider">Follow Us</h3>
          <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4 items-center justify-items-center">
            <a href="https://www.facebook.com/profile.php?id=61587694760831&sk=reels_tab" target="_blank" rel="noreferrer" className="flex flex-col items-center gap-2">
              <img src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png" alt="Facebook" className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-contain" />
              <span className="text-xs sm:text-sm font-semibold text-[var(--text-primary)]">FACEBOOK</span>
            </a>

            <a href="https://www.instagram.com/hamidali426/" target="_blank" rel="noreferrer" className="flex flex-col items-center gap-2">
              <img src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg" alt="Instagram" className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-contain" />
              <span className="text-xs sm:text-sm font-semibold text-[var(--text-primary)]">INSTAGRAM</span>
            </a>

            <a href="https://www.youtube.com/@hdrawar67" target="_blank" rel="noreferrer" className="flex flex-col items-center gap-2">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center" style={{ backgroundColor: '#FF0000' }}>
                <svg className="w-12 h-12 sm:w-16 sm:h-16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M8 5v14l11-7z" fill="white" />
                </svg>
              </div>
              <span className="text-xs sm:text-sm font-semibold text-[var(--text-primary)]">YOUTUBE</span>
            </a>

            <a href="https://www.tiktok.com/@hamidali118900" target="_blank" rel="noreferrer" className="flex flex-col items-center gap-2">
              <img src="https://img.magnific.com/premium-vector/tiktok-circle-icon_1150179-130.jpg?semt=ais_hybrid&w=740&q=80" alt="TikTok" className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover" />
              <span className="text-xs sm:text-sm font-semibold text-[var(--text-primary)]">TIKTOK</span>
            </a>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 w-full mb-20">
        {/* SOCIALS & CONTACT INFO (REPLACES FORM) - professional large card */}
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="glass-card p-8 md:p-12 lg:p-16 rounded-[32px] shadow-xl overflow-hidden">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] items-start min-w-0">
            <div className="space-y-4 min-w-0">
              <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--text-primary)] tracking-tight">Connect with GigaLinkPak</h2>
              <p className="text-sm text-[var(--text-secondary)] uppercase tracking-[0.2em]">Company</p>
              <div className="space-y-2">
                <p className="text-2xl sm:text-3xl font-semibold text-white">GigaLinkPak Pvt Ltd</p>
                <p className="text-sm sm:text-base text-[var(--text-secondary)]">Attention: Hamid Ali — Faisalabad</p>
              </div>
              <p className="text-sm text-[var(--text-secondary)] max-w-xl break-words">Reach us by phone, WhatsApp, or email. We respond quickly and are happy to discuss your connectivity infrastructure needs.</p>
            </div>

            <div className="grid gap-4 grid-cols-1">
              <a href="tel:+923005568086" className="group w-full p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 rounded-[28px] bg-white/5 hover:bg-white/10 transition-all min-h-[130px] min-w-0">
                <div className="w-14 h-14 rounded-full flex items-center justify-center bg-white/10 text-[var(--green)] flex-shrink-0">
                  <Phone size={24} />
                </div>
                <div className="min-w-0">
                  <div className="font-semibold text-white text-base truncate">Call</div>
                  <div className="text-[var(--text-secondary)] text-sm break-words">+92 300 5568086</div>
                </div>
              </a>

              <a href="https://wa.me/923469595593" target="_blank" rel="noreferrer" className="group w-full p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 rounded-[28px] bg-white/5 hover:bg-white/10 transition-all min-h-[130px] min-w-0">
                <div className="w-14 h-14 rounded-full flex items-center justify-center bg-[#25D366] text-white flex-shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.52 3.48A11.94 11.94 0 0 0 12 0C5.373 0 .02 5.354.02 12c0 2.116.553 4.154 1.6 5.963L0 24l6.247-1.618A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12 0-1.96-.44-3.82-1.48-5.52zM17.21 15.56c-.27.76-1.56 1.46-2.15 1.55-.56.07-1.24.11-2.09-.27-1.66-.68-3.73-2.68-4.31-3.58-.38-.57-.78-1.2-.44-1.83.34-.63 1.2-1.01 1.9-1.06.25-.01.52-.01.76-.01.26 0 .57 0 .82.01.34.02.64.04.95.21.22.12.39.29.54.48.15.19.24.41.38.61.15.21.3.39.49.57.21.19.41.35.64.51.14.09.28.17.45.23.18.07.36.12.55.14.33.03.64.03.97.03.49 0 .99-.03 1.47-.12.58-.11 1.33-.44 1.72-.88.07-.08.11-.18.19-.26.09-.1.21-.16.34-.18.3-.06.6.02.86.2.23.16.43.37.62.57.19.2.37.42.53.65.16.22.28.46.44.68.27.39.4.73.29 1.15-.04.15-.12.3-.22.43z"/></svg>
                </div>
                <div className="min-w-0">
                  <div className="font-semibold text-white text-base truncate">WhatsApp</div>
                  <div className="text-[var(--text-secondary)] text-sm break-words">+92 346 9595593</div>
                </div>
              </a>

              <a href="mailto:gigalink00@gmail.com" className="group w-full p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 rounded-[28px] bg-white/5 hover:bg-white/10 transition-all min-h-[130px] min-w-0">
                <div className="w-14 h-14 rounded-full flex items-center justify-center bg-white/10 text-[var(--green)] flex-shrink-0">
                  <Mail size={24} />
                </div>
                <div className="min-w-0">
                  <div className="font-semibold text-white text-base truncate">Email</div>
                  <div className="text-[var(--text-secondary)] text-sm break-words">gigalink00@gmail.com</div>
                </div>
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* MAP */}
      <section className="max-w-7xl mx-auto px-6 w-full">
        <div className="glass-card p-2">
          <div className="video-wrapper !pb-[40%] rounded-[var(--radius)] min-h-[300px]">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d217858.26986949095!2d73.02261395!3d31.41554985!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x392269d2614ff681%3A0xaf28e613e15e041d!2sFaisalabad%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1234567890" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
}
