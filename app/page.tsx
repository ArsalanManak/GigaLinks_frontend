"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ChevronDown, Radio, Sun, Wrench, Star, Shield, Headphones, MapPin, Award } from "lucide-react";

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
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#060D1E]">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-screen"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-global-world-map-animation-with-digital-network-connections-31804-large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#060D1E]/40 to-[var(--navy-deep)]"></div>
        
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

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-6"
            style={{ color: '#F8FAFC' }}
          >
            Connecting Today,<br />
            <span className="gradient-text">Powering Tomorrow</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl max-w-3xl mx-auto mb-10"
            style={{ color: '#CBD5E1' }}
          >
            GigaLinkPak delivers reliable tower, radio and solar internet solutions across Pakistan — international standards at local scale.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/get-quote" className="btn-primary w-full sm:w-auto justify-center">
              Get a Quote
            </Link>
            <Link href="/services" className="btn-outline w-full sm:w-auto justify-center" style={{ color: '#F8FAFC', borderColor: 'rgba(255,255,255,0.3)' }}>
              Our Services
            </Link>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-[var(--green)]"
        >
          <ChevronDown size={32} />
        </motion.div>
      </section>

      {/* 2. STATS BAR */}
      <section className="relative z-20 -mt-20 max-w-7xl mx-auto px-6 w-full">
        <div className="glass p-8 md:p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div ref={projectsRef.nodeRef}>
              <div className="stat-number">{projectsRef.count}+</div>
              <div className="stat-label">Projects Completed</div>
            </div>
            <div ref={citiesRef.nodeRef}>
              <div className="stat-number">{citiesRef.count}+</div>
              <div className="stat-label">Cities Covered</div>
            </div>
            <div ref={yearsRef.nodeRef}>
              <div className="stat-number">{yearsRef.count}</div>
              <div className="stat-label">Years Experience</div>
            </div>
            <div ref={satisfactionRef.nodeRef}>
              <div className="stat-number">{satisfactionRef.count}%</div>
              <div className="stat-label">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SERVICES OVERVIEW */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="section-title mb-4">What We Do</h2>
          <p className="section-subtitle mx-auto">End-to-end services for connectivity infrastructure.</p>
        </div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {[
            { icon: Radio, title: "Internet Towers", img: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&q=80", desc: "Complete site surveys, erection & commissioning." },
            { icon: Radio, title: "FM Radio", img: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=600&q=80", desc: "Studio-to-transmitter links and broadcast setup." },
            { icon: Sun, title: "Solar Solutions", img: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&q=80", desc: "Off-grid power systems for remote sites." },
            { icon: Wrench, title: "Maintenance", img: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=80", desc: "Painting, earthing, & preventive maintenance." }
          ].map((service, i) => (
            <motion.div key={i} variants={itemFadeUp} className="glass-card overflow-hidden group">
              <div className="h-48 overflow-hidden relative">
                <img src={service.img} alt={service.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />

                <div className="absolute bottom-4 left-4 w-10 h-10 rounded-full bg-[var(--green)] flex items-center justify-center text-[var(--navy-deep)]">
                  <service.icon size={20} />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-[var(--text-secondary)] text-sm mb-6">{service.desc}</p>
                <Link href="/services" className="text-[var(--green)] font-medium text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                  Learn More <span>→</span>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
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

      {/* 5. FEATURED PROJECTS */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="section-title mb-4">Featured Projects</h2>
            <p className="section-subtitle">A glimpse into our nationwide infrastructure rollouts.</p>
          </div>
          <Link href="/projects" className="btn-outline">View All Projects</Link>
        </div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            { title: "Faisalabad Tower Upgrade", img: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&q=80", type: "Internet Tower", city: "Faisalabad", year: "2025" },
            { title: "Rural Solar Connectivity", img: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=600&q=80", type: "Solar Internet", city: "Sialkot", year: "2024" },
            { title: "Karachi FM Link", img: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=600&q=80", type: "FM Radio", city: "Karachi", year: "2023" }
          ].map((project, i) => (
            <motion.div key={i} variants={itemFadeUp} className="img-overlay glass-card group cursor-pointer overflow-hidden h-[400px]">
              <img src={project.img} alt={project.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              
              <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col justify-end z-10">
                <div className="inline-block px-3 py-1 bg-[var(--green)]/20 text-[var(--green)] border border-[var(--green)]/30 rounded-full text-xs font-semibold uppercase tracking-wider w-max mb-4 backdrop-blur-md">
                  {project.type}
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-white/70 text-sm flex items-center gap-2">
                  <MapPin size={14} /> {project.city} • {project.year}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 6. TESTIMONIALS */}
      <section className="py-24 bg-[var(--surface-dark)] border-y border-[var(--glass-border)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="section-title">What Our Clients Say</h2>
          </div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              { text: "Professional team, completed the tower erection project ahead of schedule. Outstanding safety standards.", author: "Ali R.", role: "ISP Director, Faisalabad" },
              { text: "The solar internet solution they deployed for our rural site has been running flawlessly for over a year.", author: "Sara K.", role: "Operations Manager, Lahore" },
              { text: "Reliable, responsive, and technically proficient. Highly recommended for any broadcast infrastructure.", author: "Hamid A.", role: "Station Manager, Karachi" }
            ].map((testimonial, i) => (
              <motion.div key={i} variants={itemFadeUp} className="glass-card p-8 relative">
                <div className="quote-mark absolute top-4 left-6">"</div>
                <div className="flex text-[var(--green)] mb-6 relative z-10 pl-2">
                  {[...Array(5)].map((_, j) => <Star key={j} size={16} fill="currentColor" />)}
                </div>
                <p className="text-[var(--text-secondary)] italic mb-8 relative z-10 text-lg leading-relaxed">
                  "{testimonial.text}"
                </p>
                <div className="mt-auto border-t border-[var(--glass-border)] pt-4">
                  <div className="font-bold text-white">{testimonial.author}</div>
                  <div className="text-sm text-[var(--text-muted)]">{testimonial.role}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 7. WHY CHOOSE US */}
      <section className="py-24 max-w-7xl mx-auto px-6">
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
            <motion.div key={i} variants={itemFadeUp} className="glass p-8 text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-[var(--surface-card)] flex items-center justify-center text-[var(--green)] mb-6 shadow-[0_0_15px_var(--green-glow)]">
                <feature.icon size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-[var(--text-secondary)] text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 8. CTA BANNER */}
      <section className="py-24 max-w-7xl mx-auto px-6 mb-12">
        <div className="animate-gradient bg-gradient-to-r from-[var(--navy-light)] via-[var(--green-dark)] to-[var(--navy-light)] rounded-[2rem] p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Start Your Project?</h2>
            <p className="text-white/90 text-lg mb-10 max-w-2xl mx-auto">
              Contact our engineering team for a free consultation and customized quote for your infrastructure needs.
            </p>
            <Link href="/get-quote" className="btn-primary bg-white text-[var(--navy-deep)] hover:bg-gray-100 border-none before:hidden hover:shadow-2xl hover:-translate-y-1">
              Request a Quote
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
