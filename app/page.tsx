"use client";
import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronLeft, ChevronRight, Radio, Sun, Wrench, Star, Shield, Headphones, MapPin, Award } from "lucide-react";
import api from "../lib/api";

// Counter Hook
function useCounter(end: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const nodeRef = useRef(null);
  const inView = useInView(nodeRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!inView) return;
    let startTimestamp: number;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration, inView]);

  return { count, nodeRef };
}

export default function Home() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // Dynamic Data State
  const [services, setServices] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Carousel State (page-based, 4 items per page)
  const [servicePage, setServicePage] = useState(0);
  const [projectPage, setProjectPage] = useState(0);

  useEffect(() => {
    setMounted(true);
    // Fetch data
    const fetchData = async () => {
      try {
        const [sRes, pRes] = await Promise.all([
          api.get("/services").catch(() => ({ data: [] })),
          api.get("/projects").catch(() => ({ data: [] }))
        ]);
        setServices(sRes.data); // Get all services
        setProjects(pRes.data); // Get all projects
      } catch (err) {
        console.error("Error fetching homepage data:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);
  const projectsRef = useCounter(120);
  const citiesRef = useCounter(25);
  const yearsRef = useCounter(15);
  const satisfactionRef = useCounter(98);

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemFadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. HERO SECTION */}
      <section className={`relative min-h-[75vh] flex items-center justify-center overflow-hidden pb-16 sm:pb-20 lg:pb-24 ${mounted && theme === 'light' ? 'bg-white' : 'bg-[#060D1E]'}`}>
        
        {/* Backgrounds */}
        {(!mounted || theme !== 'light') ? (
          <>
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1920&q=80')", backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
            
            {/* Dynamic Glowing Orbs for Dark Mode */}
            <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-emerald-500/15 rounded-full blur-[130px] mix-blend-screen animate-pulse-glow pointer-events-none"></div>
            <div className="absolute bottom-[0%] right-[-10%] w-[700px] h-[700px] bg-indigo-600/15 rounded-full blur-[150px] mix-blend-screen animate-pulse-glow pointer-events-none" style={{ animationDelay: '1.5s' }}></div>
            
            <div className="absolute inset-0 bg-gradient-to-b from-[#060D1E]/50 via-[#060D1E]/30 to-[#060D1E]"></div>
          </>
        ) : (
          <>
            <div className="absolute inset-0 opacity-15" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1920&q=80')", backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-emerald-400/20 rounded-full blur-[120px] mix-blend-multiply animate-pulse-glow pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-400/10 rounded-full blur-[150px] mix-blend-multiply animate-pulse-glow pointer-events-none" style={{ animationDelay: '2s' }}></div>
            <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/60 to-white backdrop-blur-[2px]"></div>
          </>
        )}
        
        {/* Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[
            { left: "15%", top: "20%", delay: "0.5s", tx: "50px", ty: "-150px" },
            { left: "85%", top: "10%", delay: "1.2s", tx: "-80px", ty: "-200px" },
            { left: "45%", top: "70%", delay: "2.1s", tx: "120px", ty: "-100px" },
            { left: "75%", top: "40%", delay: "0.8s", tx: "-40px", ty: "-250px" },
            { left: "25%", top: "80%", delay: "3.5s", tx: "90px", ty: "-180px" },
            { left: "5%", top: "50%", delay: "2.8s", tx: "-60px", ty: "-120px" },
            { left: "60%", top: "85%", delay: "1.5s", tx: "30px", ty: "-220px" },
            { left: "90%", top: "60%", delay: "4.2s", tx: "-100px", ty: "-140px" }
          ].map((p, i) => (
            <div 
              key={i} 
              className="particle" 
              style={{
                left: p.left,
                top: p.top,
                animationDelay: p.delay,
                '--tx': p.tx,
                '--ty': p.ty
              } as React.CSSProperties}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-[100rem] mx-auto w-full px-4 sm:px-6 pt-10 sm:pt-16 flex flex-col justify-center items-center min-h-[600px] lg:min-h-[700px]">
          
          {/* LEFT SIDE (2 Services) */}
          <div className="hidden xl:block absolute left-4 xl:left-12 w-64 xl:w-80 h-full pointer-events-none z-0">
            {/* Service 1: Internet Tower */}
            <motion.div 
              initial={{ opacity: 0, x: -50, y: -20, rotate: -12 }}
              animate={{ opacity: 1, x: 0, rotate: -8, y: [0, -10, 0] }}
              transition={{ opacity: { duration: 0.8 }, x: { duration: 0.8 }, rotate: { duration: 0.8 }, y: { duration: 6, repeat: Infinity, ease: "easeInOut" } }}
              className="absolute top-[10%] left-[5%] w-48 xl:w-56 h-64 xl:h-72 rounded-[1.5rem] overflow-hidden shadow-2xl shadow-[var(--green)]/10 border-[4px] border-white/10"
            >
              <div className="absolute inset-0 bg-black/10 z-10"></div>
              <img src="https://thumbs.dreamstime.com/b/cell-tower-antenna-close-up-showing-g-mobile-internet-towers-offering-fast-to-rural-areas-asia-453355511.jpg" alt="Internet Towers" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060D1E] via-[#060D1E]/20 to-transparent flex items-end p-4 z-20">
                 <span className="text-white font-black tracking-widest text-xs drop-shadow-lg uppercase">Tower Installs</span>
              </div>
            </motion.div>

            {/* Service 2: FM Radio */}
            <motion.div 
              initial={{ opacity: 0, x: -30, y: 50, rotate: -4 }}
              animate={{ opacity: 1, x: 0, rotate: -2, y: [0, -12, 0] }}
              transition={{ opacity: { duration: 0.8, delay: 0.2 }, x: { duration: 0.8, delay: 0.2 }, rotate: { duration: 0.8, delay: 0.2 }, y: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 } }}
              className="absolute bottom-[15%] right-[-10%] xl:right-[0%] w-40 xl:w-48 h-56 xl:h-64 rounded-[1.5rem] overflow-hidden shadow-2xl border-[4px] border-white/10 z-10"
            >
              <div className="absolute inset-0 bg-black/10 z-10"></div>
              <img src="https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=600&q=80" alt="FM Radio" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060D1E] via-[#060D1E]/20 to-transparent flex items-end p-4 z-20">
                 <span className="text-white font-black tracking-widest text-xs drop-shadow-lg uppercase">FM Radio</span>
              </div>
            </motion.div>
          </div>

          {/* RIGHT SIDE (2 Services) */}
          <div className="hidden xl:block absolute right-4 xl:right-12 w-64 xl:w-80 h-full pointer-events-none z-0">
            {/* Service 3: Solar Solutions */}
            <motion.div 
              initial={{ opacity: 0, x: 50, y: -20, rotate: 12 }}
              animate={{ opacity: 1, x: 0, rotate: 8, y: [0, -10, 0] }}
              transition={{ opacity: { duration: 0.8 }, x: { duration: 0.8 }, rotate: { duration: 0.8 }, y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 } }}
              className="absolute top-[10%] right-[5%] w-48 xl:w-56 h-64 xl:h-72 rounded-[1.5rem] overflow-hidden shadow-2xl shadow-blue-500/10 border-[4px] border-white/10"
            >
              <div className="absolute inset-0 bg-black/10 z-10"></div>
              <img src="https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&q=80" alt="Solar Solutions" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060D1E] via-[#060D1E]/20 to-transparent flex items-end p-4 z-20">
                 <span className="text-white font-black tracking-widest text-xs drop-shadow-lg uppercase">Solar Internet</span>
              </div>
            </motion.div>

            {/* Service 4: Maintenance */}
            <motion.div 
              initial={{ opacity: 0, x: 30, y: 50, rotate: 4 }}
              animate={{ opacity: 1, x: 0, rotate: 2, y: [0, -12, 0] }}
              transition={{ opacity: { duration: 0.8, delay: 0.2 }, x: { duration: 0.8, delay: 0.2 }, rotate: { duration: 0.8, delay: 0.2 }, y: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1.5 } }}
              className="absolute bottom-[15%] left-[-10%] xl:left-[0%] w-40 xl:w-48 h-56 xl:h-64 rounded-[1.5rem] overflow-hidden shadow-2xl border-[4px] border-white/10 z-10"
            >
              <div className="absolute inset-0 bg-black/10 z-10"></div>
              <img src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=80" alt="Tower Maintenance" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060D1E] via-[#060D1E]/20 to-transparent flex items-end p-4 z-20">
                 <span className="text-white font-black tracking-widest text-xs drop-shadow-lg uppercase">Maintenance</span>
              </div>
            </motion.div>
          </div>

          {/* Center Text Block */}
          <div className="relative z-10 text-center max-w-full lg:max-w-3xl flex flex-col items-center px-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className={`mb-6 sm:mb-10 w-full flex flex-col items-center ${mounted && theme === 'light' ? 'text-[var(--text-primary)]' : 'text-white'}`}
            >
              <div className="font-bold mb-0 sm:mb-4 text-[#00E676] drop-shadow-sm flex justify-center w-full" style={{ fontFamily: "var(--font-amiri)" }}>
                <span className="text-6xl sm:text-7xl whitespace-nowrap inline-block scale-[0.55] sm:scale-100 origin-center transform-gpu">
                  ﷽
                </span>
              </div>
              <div className="text-base sm:text-xl md:text-3xl leading-[2.5] sm:leading-[3] text-center px-2 pb-4 pt-2" style={{ fontFamily: "var(--font-noto-nastaliq)" }}>
                خدا نے آج تک اس قوم کی حالت نہیں بدلی<br />
                نہ ہو جس کو خیال آپ اپنی حالت کے بدلنے کا
              </div>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className={`text-[2rem] leading-tight sm:text-5xl md:text-7xl font-bold tracking-tight mb-4 sm:mb-6 ${mounted && theme === 'light' ? 'text-[var(--text-primary)]' : 'text-white'}`}
            >
              Connecting Today,<br />
              <span className="gradient-text">Powering Tomorrow</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className={`text-sm sm:text-lg md:text-2xl max-w-full sm:max-w-3xl mx-auto mb-8 sm:mb-10 ${mounted && theme === 'light' ? 'text-[var(--text-secondary)]' : 'text-[#CBD5E1]'}`}
            >
              GigaLinkPak delivers reliable tower, radio and solar internet solutions across Pakistan — international standards at local scale.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex items-center justify-center w-full"
            >
              <Link href="/services" className="btn-primary w-full sm:w-auto justify-center px-12 py-3 sm:py-4 text-base sm:text-lg">
                Our Services
              </Link>
            </motion.div>
          </div>

          {/* MOBILE SERVICES GRID (Shows only on mobile/tablet below text) */}
          <div className="xl:hidden w-full max-w-2xl mx-auto grid grid-cols-2 gap-3 mt-10 relative z-10">
            {/* Card 1 */}
            <div className="rounded-xl overflow-hidden shadow-lg border-2 border-white/10 relative h-32 sm:h-40">
              <div className="absolute inset-0 bg-black/20 z-10"></div>
              <img src="https://thumbs.dreamstime.com/b/cell-tower-antenna-close-up-showing-g-mobile-internet-towers-offering-fast-to-rural-areas-asia-453355511.jpg" alt="Tower Installs" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060D1E] to-transparent flex items-end p-3 z-20">
                 <span className="text-white font-bold tracking-wider text-[10px] sm:text-xs drop-shadow-md uppercase">Tower Installs</span>
              </div>
            </div>
            {/* Card 2 */}
            <div className="rounded-xl overflow-hidden shadow-lg border-2 border-white/10 relative h-32 sm:h-40">
              <div className="absolute inset-0 bg-black/20 z-10"></div>
              <img src="https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=600&q=80" alt="FM Radio" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060D1E] to-transparent flex items-end p-3 z-20">
                 <span className="text-white font-bold tracking-wider text-[10px] sm:text-xs drop-shadow-md uppercase">FM Radio</span>
              </div>
            </div>
            {/* Card 3 */}
            <div className="rounded-xl overflow-hidden shadow-lg border-2 border-white/10 relative h-32 sm:h-40">
              <div className="absolute inset-0 bg-black/20 z-10"></div>
              <img src="https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&q=80" alt="Solar Solutions" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060D1E] to-transparent flex items-end p-3 z-20">
                 <span className="text-white font-bold tracking-wider text-[10px] sm:text-xs drop-shadow-md uppercase">Solar Internet</span>
              </div>
            </div>
            {/* Card 4 */}
            <div className="rounded-xl overflow-hidden shadow-lg border-2 border-white/10 relative h-32 sm:h-40">
              <div className="absolute inset-0 bg-black/20 z-10"></div>
              <img src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=80" alt="Maintenance" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060D1E] to-transparent flex items-end p-3 z-20">
                 <span className="text-white font-bold tracking-wider text-[10px] sm:text-xs drop-shadow-md uppercase">Maintenance</span>
              </div>
            </div>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce text-[var(--green)]"
        >
          <ChevronDown size={32} />
        </motion.div>
      </section>

      {/* 2. STATS BAR */}
      <section className="relative py-16 sm:py-20 mt-10 bg-fixed bg-center bg-cover" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1920&q=80')" }}>
        <div className="absolute inset-0 bg-[#060D1E]/85"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full">
          <div className="p-6 md:p-10 border border-white/10 bg-[#0A1F44]/60 backdrop-blur-xl rounded-2xl shadow-2xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div ref={projectsRef.nodeRef} className="min-w-0">
                <div className="stat-number text-5xl md:text-6xl !text-white font-black mb-2 drop-shadow-lg">{projectsRef.count}+</div>
                <div className="stat-label break-words !text-emerald-400 font-bold tracking-widest text-sm">Projects Completed</div>
              </div>
              <div ref={citiesRef.nodeRef} className="min-w-0">
                <div className="stat-number text-5xl md:text-6xl !text-white font-black mb-2 drop-shadow-lg">{citiesRef.count}+</div>
                <div className="stat-label break-words !text-emerald-400 font-bold tracking-widest text-sm">Cities Covered</div>
              </div>
              <div ref={yearsRef.nodeRef} className="min-w-0">
                <div className="stat-number text-5xl md:text-6xl !text-white font-black mb-2 drop-shadow-lg">{yearsRef.count}</div>
                <div className="stat-label break-words !text-emerald-400 font-bold tracking-widest text-sm">Years Experience</div>
              </div>
              <div ref={satisfactionRef.nodeRef} className="min-w-0">
                <div className="stat-number text-5xl md:text-6xl !text-white font-black mb-2 drop-shadow-lg">{satisfactionRef.count}%</div>
                <div className="stat-label break-words !text-emerald-400 font-bold tracking-widest text-sm">Client Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SERVICES OVERVIEW (Dynamic Carousel) */}
      <section className="relative py-20 sm:py-28 overflow-hidden bg-[#060D1E]">
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=1920&q=80')", backgroundSize: 'cover', backgroundAttachment: 'fixed', backgroundPosition: 'center' }}></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#060D1E] via-transparent to-[#060D1E] pointer-events-none"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 relative z-20">
            <h2 className="section-title mb-3 !text-white drop-shadow-lg text-3xl sm:text-4xl md:text-5xl">What We Do</h2>
            <p className="section-subtitle !text-gray-300 drop-shadow-md mx-auto">End-to-end services for connectivity infrastructure.</p>
          </div>

          {isLoading ? (
             <div className="text-center py-10 text-gray-400">Loading services...</div>
          ) : services.length === 0 ? (
             <div className="text-center py-10 text-gray-400">No services found.</div>
          ) : (() => {
            const perPage = 4;
            const totalServicePages = Math.ceil(services.length / perPage);
            const currentServices = services.slice(servicePage * perPage, servicePage * perPage + perPage);
            const canGoPrev = servicePage > 0;
            const canGoNext = servicePage < totalServicePages - 1;
            return (
              <>
                {/* Mobile: Top arrows */}
                <div className="flex md:hidden justify-center gap-4 mb-6">
                  <button 
                    type="button"
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); if (canGoPrev) setServicePage(p => p - 1); }}
                    disabled={!canGoPrev}
                    className={`z-50 w-14 h-14 rounded-full flex items-center justify-center !text-white transition-all duration-300 shadow-xl ${canGoPrev ? '!bg-black hover:!bg-gray-800 cursor-pointer' : '!bg-black/40 !opacity-30 cursor-not-allowed'}`}
                  >
                    <ChevronLeft size={28} />
                  </button>
                  <button 
                    type="button"
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); if (canGoNext) setServicePage(p => p + 1); }}
                    disabled={!canGoNext}
                    className={`z-50 w-14 h-14 rounded-full flex items-center justify-center !text-white transition-all duration-300 shadow-xl ${canGoNext ? '!bg-black hover:!bg-gray-800 cursor-pointer' : '!bg-black/40 !opacity-30 cursor-not-allowed'}`}
                  >
                    <ChevronRight size={28} />
                  </button>
                </div>

                {/* Desktop: Arrows on sides + Cards */}
                <div className="flex items-center gap-4 md:gap-6">
                  {/* Left Arrow - Desktop */}
                  <button 
                    type="button"
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); if (canGoPrev) setServicePage(p => p - 1); }}
                    disabled={!canGoPrev}
                    className={`hidden md:flex z-50 shrink-0 w-16 h-16 rounded-full items-center justify-center !text-white transition-all duration-300 shadow-2xl ${canGoPrev ? '!bg-black hover:!bg-gray-800 cursor-pointer' : '!bg-black/40 !opacity-30 cursor-not-allowed'}`}
                  >
                    <ChevronLeft size={32} />
                  </button>

                  {/* Cards Grid */}
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    {currentServices.map((service: any, i: number) => (
                      <Link href="/services" key={`svc-${servicePage}-${i}`}>
                        <motion.div
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: i * 0.1 }}
                          className="bg-[#0A1F44]/70 border border-white/10 hover:border-emerald-500/30 backdrop-blur-xl overflow-hidden group cursor-pointer rounded-2xl transition-all duration-500 shadow-xl hover:shadow-emerald-500/10 hover:-translate-y-2"
                        >
                          <div className="h-40 md:h-48 overflow-hidden relative">
                            <img src={service.image_url || "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&q=80"} alt={service.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#060D1E]/60 to-transparent"></div>
                            <div className="absolute bottom-4 left-4 w-10 h-10 rounded-full bg-[var(--green)] flex items-center justify-center text-[var(--navy-deep)] shadow-lg shadow-emerald-500/30">
                              <Wrench size={20} />
                            </div>
                          </div>
                          <div className="p-5 sm:p-6">
                            <h3 className="text-lg sm:text-xl font-bold mb-2 !text-white truncate">{service.title}</h3>
                            <p className="!text-gray-300 text-sm mb-4 line-clamp-2">{service.description}</p>
                            <div className="text-[var(--green)] font-semibold text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                              Learn More <span className="text-lg">→</span>
                            </div>
                          </div>
                        </motion.div>
                      </Link>
                    ))}
                  </div>

                  {/* Right Arrow - Desktop */}
                  <button 
                    type="button"
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); if (canGoNext) setServicePage(p => p + 1); }}
                    disabled={!canGoNext}
                    className={`hidden md:flex z-50 shrink-0 w-16 h-16 rounded-full items-center justify-center !text-white transition-all duration-300 shadow-2xl ${canGoNext ? '!bg-black hover:!bg-gray-800 cursor-pointer' : '!bg-black/40 !opacity-30 cursor-not-allowed'}`}
                  >
                    <ChevronRight size={32} />
                  </button>
                </div>
              </>
            );
          })()}

          {/* Page Dots */}
          {services.length > 4 && (
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: Math.ceil(services.length / 4) }).map((_, i) => (
                <button
                  type="button"
                  key={i}
                  onClick={() => setServicePage(i)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    i === servicePage ? 'bg-emerald-400 w-8 shadow-lg shadow-emerald-500/30' : 'bg-white/20 hover:bg-white/40 w-2.5'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 4. YOUTUBE VIDEO SECTION */}
      <section className="py-24 bg-[var(--surface-dark)] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--green)] opacity-[0.03] blur-[100px] rounded-full pointer-events-none"></div>
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="text-center mb-12">
            <h2 className="section-title">See Our Work in Action</h2>
          </div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="video-wrapper animate-pulse-glow"
          >
            <iframe 
              src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
              title="GigaLinkPak Video" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </motion.div>
        </div>
      </section>

      {/* 5. FEATURED PROJECTS (Dynamic Carousel) */}
      <section className="py-16 sm:py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="mb-3 font-extrabold tracking-tight text-3xl sm:text-4xl md:text-5xl leading-tight text-[var(--text-primary)]">Featured Projects</h2>
            <p className="text-[var(--text-secondary)] text-sm sm:text-base md:text-lg max-w-2xl mx-auto">A glimpse into our nationwide infrastructure rollouts.</p>
          </div>

          {isLoading ? (
             <div className="text-center py-10 text-[var(--text-secondary)]">Loading projects...</div>
          ) : projects.length === 0 ? (
             <div className="text-center py-10 text-[var(--text-secondary)]">No projects found.</div>
          ) : (() => {
            const perPage = 4;
            const totalProjectPages = Math.ceil(projects.length / perPage);
            const currentProjects = projects.slice(projectPage * perPage, projectPage * perPage + perPage);
            const canGoPrev = projectPage > 0;
            const canGoNext = projectPage < totalProjectPages - 1;
            return (
              <>
                {/* Mobile: Top arrows */}
                <div className="flex md:hidden justify-center gap-4 mb-6">
                  <button 
                    type="button"
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); if (canGoPrev) setProjectPage(p => p - 1); }}
                    disabled={!canGoPrev}
                    className={`z-50 w-14 h-14 rounded-full flex items-center justify-center !text-white transition-all duration-300 shadow-xl ${canGoPrev ? '!bg-black hover:!bg-gray-800 cursor-pointer' : '!bg-black/40 !opacity-30 cursor-not-allowed'}`}
                  >
                    <ChevronLeft size={28} />
                  </button>
                  <button 
                    type="button"
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); if (canGoNext) setProjectPage(p => p + 1); }}
                    disabled={!canGoNext}
                    className={`z-50 w-14 h-14 rounded-full flex items-center justify-center !text-white transition-all duration-300 shadow-xl ${canGoNext ? '!bg-black hover:!bg-gray-800 cursor-pointer' : '!bg-black/40 !opacity-30 cursor-not-allowed'}`}
                  >
                    <ChevronRight size={28} />
                  </button>
                </div>

                {/* Desktop: Arrows on sides + Cards */}
                <div className="flex items-center gap-4 md:gap-6">
                  {/* Left Arrow - Desktop */}
                  <button 
                    type="button"
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); if (canGoPrev) setProjectPage(p => p - 1); }}
                    disabled={!canGoPrev}
                    className={`hidden md:flex z-50 shrink-0 w-16 h-16 rounded-full items-center justify-center !text-white transition-all duration-300 shadow-2xl ${canGoPrev ? '!bg-black hover:!bg-gray-800 cursor-pointer' : '!bg-black/40 !opacity-30 cursor-not-allowed'}`}
                  >
                    <ChevronLeft size={32} />
                  </button>

                  {/* Cards Grid */}
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    {currentProjects.map((project: any, i: number) => (
                      <Link href="/projects" key={`prj-${projectPage}-${i}`}>
                        <motion.div
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: i * 0.1 }}
                          className="bg-[var(--surface-card)] border border-[var(--glass-border)] hover:border-[var(--green)]/30 overflow-hidden group cursor-pointer rounded-[20px] transition-all duration-500 shadow-[0_10px_40px_rgba(0,0,0,0.12)] hover:shadow-[0_20px_60px_rgba(0,230,118,0.08)] hover:-translate-y-2"
                        >
                          <div className="relative h-48 sm:h-52 md:h-56 overflow-hidden">
                            <img src={project.hero_image || project.image_url || "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&q=80"} alt={project.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                          </div>
                          <div className="p-5 sm:p-6">
                            <span className="inline-flex items-center rounded-full bg-[var(--green)]/15 text-[var(--green)] text-[0.65rem] sm:text-xs uppercase tracking-[0.2em] font-semibold px-3 py-1 mb-3">{project.service_category || "Project"}</span>
                            <h3 className="text-lg sm:text-xl font-semibold text-[var(--text-primary)] mb-2 leading-snug truncate">{project.title}</h3>
                            <p className="text-[var(--text-secondary)] text-sm flex items-center gap-2"><MapPin size={14} />{project.city || "Pakistan"} • {new Date(project.created_at || Date.now()).getFullYear()}</p>
                          </div>
                        </motion.div>
                      </Link>
                    ))}
                  </div>

                  {/* Right Arrow - Desktop */}
                  <button 
                    type="button"
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); if (canGoNext) setProjectPage(p => p + 1); }}
                    disabled={!canGoNext}
                    className={`hidden md:flex z-50 shrink-0 w-16 h-16 rounded-full items-center justify-center !text-white transition-all duration-300 shadow-2xl ${canGoNext ? '!bg-black hover:!bg-gray-800 cursor-pointer' : '!bg-black/40 !opacity-30 cursor-not-allowed'}`}
                  >
                    <ChevronRight size={32} />
                  </button>
                </div>
              </>
            );
          })()}

          {/* Page Dots + View All */}
          <div className="flex flex-col items-center gap-4 mt-8">
            {projects.length > 4 && (
              <div className="flex justify-center gap-2">
                {Array.from({ length: Math.ceil(projects.length / 4) }).map((_, i) => (
                  <button
                    type="button"
                    key={i}
                    onClick={() => setProjectPage(i)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      i === projectPage ? 'bg-[var(--green)] w-8 shadow-lg shadow-emerald-500/30' : 'bg-[var(--text-muted)]/40 hover:bg-[var(--text-muted)] w-2.5'
                    }`}
                  />
                ))}
              </div>
            )}
            <Link href="/projects" className="bg-[var(--green)] !text-white px-8 py-3 rounded-xl shadow-lg hover:brightness-95 transition text-center text-sm sm:text-base font-semibold">View All Projects</Link>
          </div>
        </div>
      </section>

      {/* Testimonials removed per request */}

      {/* 7. WHY CHOOSE US */}
      <section className="relative py-20 sm:py-28 bg-fixed bg-center bg-cover" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1920&q=80')" }}>
        <div className="absolute inset-0 bg-[#060D1E]/90"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16 relative z-20">
            <h2 className="section-title mb-4 !text-white drop-shadow-lg">Why Choose GigaLinkPak</h2>
            <p className="section-subtitle mx-auto !text-gray-200 drop-shadow-md">Industry leaders in building robust telecom and power infrastructure.</p>
          </div>
          <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {[
            { icon: Award, title: "Certified Team", desc: "Rigorous safety and vendor certifications." },
            { icon: Headphones, title: "24/7 Support", desc: "Always online to keep you connected." },
            { icon: MapPin, title: "Nationwide Coverage", desc: "Deployments across all regions of Pakistan." },
            { icon: Shield, title: "Quality Guaranteed", desc: "ISO-aligned processes for reliability." }
          ].map((feature, i) => (
            <motion.div key={i} variants={itemFadeUp} className="p-8 text-center flex flex-col items-center bg-[#060D1E]/60 border border-white/10 hover:bg-[#060D1E]/80 transition backdrop-blur-xl rounded-2xl shadow-xl relative z-10">
              <div className="w-16 h-16 rounded-full bg-[#0A1F44]/80 flex items-center justify-center text-[var(--green)] mb-6 shadow-[0_0_25px_var(--green-glow)] border border-emerald-500/30">
                <feature.icon size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3 !text-white drop-shadow-md">{feature.title}</h3>
              <p className="!text-gray-300 text-sm drop-shadow-md">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
        </div>
      </section>

      {/* CTA banner removed per request */}
    </div>
  );
}
