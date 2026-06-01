"use client";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
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
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="flex flex-col min-h-screen pt-24 relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-[-1] pointer-events-none">
        {mounted && theme === 'light' ? (
          <>
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1920&q=80')", backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-400/20 rounded-full blur-[120px] mix-blend-multiply animate-pulse-glow"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-400/10 rounded-full blur-[150px] mix-blend-multiply animate-pulse-glow" style={{ animationDelay: '2s' }}></div>
            <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/70 to-white backdrop-blur-[2px]"></div>
          </>
        ) : (
          <>
            <div className="absolute inset-0 opacity-15" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1920&q=80')", backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
            <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-emerald-500/15 rounded-full blur-[130px] mix-blend-screen animate-pulse-glow"></div>
            <div className="absolute bottom-[0%] right-[-10%] w-[700px] h-[700px] bg-indigo-600/15 rounded-full blur-[150px] mix-blend-screen animate-pulse-glow" style={{ animationDelay: '1.5s' }}></div>
            <div className="absolute inset-0 bg-gradient-to-b from-[#060D1E]/60 via-[#060D1E]/40 to-[#060D1E]/90"></div>
          </>
        )}
      </div>
      
      {/* 1. MEET OUR LEADERSHIP (moved to top) */}
      <section className="pt-8 pb-16 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="section-title">Meet Our Leadership</h2>
        </div>
        
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid md:grid-cols-3 gap-8">
          {[
            { 
              name: "Ch. Afzal Ahmad Drawar", 
              role: "Director", 
              desc: "Director of GigaLinkPak Pvt. Ltd.",
              whatsapp: "+92 345 4910602",
              email: "afzaalahmad031@gmail.com",
              img: "https://res.cloudinary.com/dz0nrto5b/image/upload/v1780325748/Untitled_design_80_u4c0hz.png" 
            },
            { 
              name: "Hamid Ali", 
              role: "Founder & CEO", 
              desc: "Founder & CEO of GigaLinkPak Pvt. Ltd.",
              whatsapp: "+92 346 9595593",
              email: "Gigalink00@gmail.com",
              img: "https://res.cloudinary.com/dz0nrto5b/image/upload/v1780326073/Untitled_design_81_npugoc.png" 
            },
            { 
              name: "Raees Abbas", 
              role: "Network Technician", 
              desc: "Engineering experience at Huawei, Nokia, Axon",
              whatsapp: "+92 342 2252206",
              email: "raeeshusnain2@gmail.com",
              img: "https://res.cloudinary.com/dz0nrto5b/image/upload/v1780328238/Untitled_design_82_iqttug.png" 
            }
          ].map((member, i) => (
            <motion.div key={i} variants={fadeUp} className="glass-card p-8 text-center group flex flex-col h-full">
              <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-6 border-4 border-[var(--surface-dark)] group-hover:border-[var(--green)] transition-colors duration-300 shrink-0">
                <img src={member.img} alt={member.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
              <div className="text-[var(--green)] font-medium mb-3">{member.role}</div>
              <p className="text-[var(--text-secondary)] text-sm mb-6 flex-grow">{member.desc}</p>
              
              <div className="flex flex-col gap-2 text-sm text-[var(--text-secondary)] pt-4 border-t border-[var(--glass-border)] mt-auto">
                <a href={`https://wa.me/${member.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="hover:text-[var(--green)] transition-colors flex items-center justify-center gap-2">
                  <span className="font-semibold text-white">WA:</span> {member.whatsapp}
                </a>
                <a href={`mailto:${member.email}`} className="hover:text-[var(--green)] transition-colors truncate flex items-center justify-center gap-2">
                  <span className="font-semibold text-white">Email:</span> {member.email}
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
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
