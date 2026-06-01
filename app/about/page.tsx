"use client";
import React from "react";
import { motion } from "framer-motion";
import { Target, Eye, Shield, HardHat, Award, FileCheck } from "lucide-react";

export default function AboutPage() {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const stagger = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  return (
    <div className="flex flex-col min-h-screen pt-24">
      {/* 1. HERO */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center">
        <img 
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80" 
          alt="Team Collaboration" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--navy-deep)] via-[#060D1E]/60 to-[#060D1E]/40"></div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <motion.h1 
            initial="hidden" animate="show" variants={fadeUp}
            className="text-4xl md:text-6xl font-bold mb-4"
          >
            About <span className="gradient-text">GigaLinkPak</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.8 }}
            className="text-lg md:text-xl text-[var(--text-secondary)]"
          >
            Pioneering connectivity infrastructure across Pakistan with international standards.
          </motion.p>
        </div>
      </section>

      {/* 2. MISSION & VISION */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid md:grid-cols-2 gap-8">
          <motion.div variants={fadeUp} className="glass-card p-10 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-[var(--green)]/10 text-[var(--green)] flex items-center justify-center mb-6">
              <Target size={32} />
            </div>
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              To enable communities and businesses with reliable, scalable connectivity by delivering world-class tower, radio, and solar infrastructure.
            </p>
          </motion.div>
          
          <motion.div variants={fadeUp} className="glass-card p-10 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-[var(--blue-accent)]/10 text-[var(--blue-accent)] flex items-center justify-center mb-6">
              <Eye size={32} />
            </div>
            <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Connecting every corner of Pakistan with sustainable and state-of-the-art telecommunications infrastructure for a brighter, connected future.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* 3. TIMELINE */}
      <section className="py-20 bg-[var(--surface-dark)]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="section-title">Our Journey</h2>
          </div>
          
          <div className="relative border-l-2 border-[var(--glass-border)] ml-4 md:mx-auto md:w-full md:flex md:flex-col md:items-center md:border-none">
            <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-0.5 bg-[var(--glass-border)] -translate-x-1/2"></div>
            
            {[
              { year: "2010", title: "Company Founded", desc: "Started operations in Faisalabad focusing on local tower installations." },
              { year: "2015", title: "Regional Expansion", desc: "Expanded footprint to over 10 cities across Punjab and Sindh." },
              { year: "2020", title: "Solar Division Launch", desc: "Introduced off-grid solar internet solutions for remote areas." },
              { year: "2025", title: "Nationwide Leader", desc: "Over 120 major projects completed across Pakistan." }
            ].map((item, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className={`relative pl-8 md:pl-0 mb-12 md:w-1/2 ${i % 2 === 0 ? "md:pr-12 md:mr-auto md:text-right" : "md:pl-12 md:ml-auto"}`}
              >
                <div className={`absolute top-1 left-[-9px] md:top-6 ${i % 2 === 0 ? "md:-right-3 md:left-auto" : "md:-left-3"} w-4 h-4 rounded-full bg-[var(--green)] shadow-[0_0_10px_var(--green-glow)]`}></div>
                <div className="glass p-6">
                  <div className="text-[var(--green)] font-bold text-xl mb-2">{item.year}</div>
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-[var(--text-secondary)]">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. TEAM */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="section-title">Meet Our Leadership</h2>
        </div>
        
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid md:grid-cols-3 gap-8">
          {[
            { name: "Hamid Ali", role: "Founder & CEO", desc: "15+ years in telecom infrastructure.", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80" },
            { name: "Ahmed Khan", role: "CTO", desc: "Technical operations and network architecture.", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80" },
            { name: "Fatima Shah", role: "Project Manager", desc: "Ensuring delivery excellence and safety.", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80" }
          ].map((member, i) => (
            <motion.div key={i} variants={fadeUp} className="glass-card p-8 text-center group">
              <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-6 border-4 border-[var(--surface-dark)] group-hover:border-[var(--green)] transition-colors duration-300">
                <img src={member.img} alt={member.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
              <div className="text-[var(--green)] font-medium mb-4">{member.role}</div>
              <p className="text-[var(--text-secondary)]">{member.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 5. VIDEO */}
      <section className="py-24 bg-[var(--surface-dark)]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="section-title">Our Story</h2>
          </div>
          <div className="video-wrapper">
            <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="Company Story" allowFullScreen></iframe>
          </div>
        </div>
      </section>

      {/* 6. CERTIFICATIONS */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="section-title">Certifications & Standards</h2>
        </div>
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: Shield, title: "ISO Quality" },
            { icon: HardHat, title: "Safety Training" },
            { icon: Award, title: "Vendor Certified" },
            { icon: FileCheck, title: "PTA Compliant" }
          ].map((cert, i) => (
            <motion.div key={i} variants={fadeUp} className="glass p-6 text-center flex flex-col items-center justify-center gap-4">
              <cert.icon size={36} className="text-[var(--green)]" />
              <div className="font-semibold text-white">{cert.title}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
}
