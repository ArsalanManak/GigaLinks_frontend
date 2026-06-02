"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Radio, Sun, Wrench, CheckCircle, Play, Loader2, ZoomIn, ArrowRight, Sparkles } from "lucide-react";
import api from "../../lib/api";
import MediaModal from "../../components/ui/MediaModal";

const iconMap: Record<string, any> = {
  Radio,
  Sun,
  Wrench,
};

function getYouTubeEmbedUrl(url: string): string | null {
  if (!url) return null;
  const match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]+)/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
}

export default function ServicesPage() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMediaUrl, setModalMediaUrl] = useState<string | null>(null);
  const [modalIsVideo, setModalIsVideo] = useState(false);
  const [modalTitle, setModalTitle] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/services");
        setServices(res.data || []);
      } catch {
        setServices([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const openModal = (url: string, isVideo: boolean, title: string) => {
    setModalMediaUrl(url);
    setModalIsVideo(isVideo);
    setModalTitle(title);
    setModalOpen(true);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* ═══ HERO SECTION ═══ */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden">
        {/* Animated Video Background */}
        <div className="absolute inset-0 bg-[#060D1E]"></div>
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover opacity-50 pointer-events-none mix-blend-screen"
        >
          <source src="/earth-network.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-[#060D1E]/60 via-[#060D1E]/30 to-[#060D1E] pointer-events-none"></div>
        
        {/* Floating Decorative Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-500/8 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-5 py-2 mb-8"
          >
            <Sparkles size={16} className="text-emerald-400" />
            <span className="text-emerald-400 text-sm font-semibold tracking-wide uppercase">Our Expertise</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-7xl font-extrabold mb-6 !text-white leading-tight tracking-tight"
          >
            Premium <span className="gradient-text">Services</span>
            <br className="hidden sm:block" />
            <span className="text-3xl sm:text-4xl md:text-5xl font-bold !text-gray-300">Built for Scale</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-lg sm:text-xl !text-gray-300 max-w-3xl mx-auto leading-relaxed mb-10"
          >
            End-to-end tower, radio, and solar solutions tailored for the telecom industry.
            We deliver world-class infrastructure across Pakistan.
          </motion.p>

          {/* Stats Mini Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-6 sm:gap-10"
          >
            {[
              { value: `${services.length || '—'}`, label: 'Services' },
              { value: '120+', label: 'Projects Done' },
              { value: '98%', label: 'Satisfaction' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl sm:text-3xl font-black !text-emerald-400">{stat.value}</div>
                <div className="text-xs sm:text-sm !text-gray-400 uppercase tracking-widest mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[var(--bg-main)] to-transparent pointer-events-none"></div>
      </section>

      {/* ═══ SERVICES LIST ═══ */}
      <section className="relative py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <Loader2 className="animate-spin text-[var(--green)]" size={48} />
              <p className="text-[var(--text-secondary)] text-lg">Loading services...</p>
            </div>
          ) : services.length === 0 ? (
            <div className="text-center py-24">
              <div className="w-20 h-20 mx-auto rounded-full bg-[var(--surface-card)] flex items-center justify-center mb-6">
                <Wrench size={32} className="text-[var(--text-muted)]" />
              </div>
              <p className="text-[var(--text-secondary)] text-xl">No services available right now.</p>
              <p className="text-[var(--text-muted)] mt-2">Check back soon for updates!</p>
            </div>
          ) : (
            <div className="space-y-16 sm:space-y-24">
              {services.map((service, idx) => {
                const IconComponent = iconMap[service.icon || ""] || Radio;
                const img = service.image_url || service.hero_image || "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&q=80";
                const embedUrl = service.youtube_url ? getYouTubeEmbedUrl(service.youtube_url) : null;
                const features = service.sub_services || [];
                const isReversed = idx % 2 === 1;

                return (
                  <motion.div 
                    key={service.id || idx}
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    className={`group relative flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 lg:gap-14 items-center`}
                  >
                    {/* ── Image / Video ── */}
                    <div 
                      className="w-full lg:w-[55%] relative cursor-pointer"
                      onClick={() => embedUrl ? openModal(embedUrl, true, service.title) : openModal(img, false, service.title)}
                    >
                      <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
                        {embedUrl ? (
                          <div className="h-[280px] sm:h-[340px] lg:h-[420px] relative w-full">
                            <iframe src={embedUrl} title={service.title} className="w-full h-full border-0 pointer-events-none" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                          </div>
                        ) : (
                          <div className="h-[280px] sm:h-[340px] lg:h-[420px] relative overflow-hidden">
                            <img src={img} alt={service.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none"></div>
                          </div>
                        )}

                        {/* Hover Play/Zoom Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 z-20 bg-black/20">
                          <div className="bg-[var(--green)] text-[var(--navy-deep)] p-5 rounded-full shadow-2xl shadow-emerald-500/30 transform scale-90 group-hover:scale-100 transition-transform duration-500">
                            {embedUrl ? <Play fill="currentColor" size={36} className="ml-1" /> : <ZoomIn size={36} />}
                          </div>
                        </div>

                        {/* Service Number Badge */}
                        <div className="absolute top-5 left-5 z-20">
                          <div className="w-12 h-12 rounded-xl bg-black/60 backdrop-blur-md flex items-center justify-center border border-white/10">
                            <span className="!text-white font-bold text-lg">{String(idx + 1).padStart(2, '0')}</span>
                          </div>
                        </div>

                        {/* Icon Badge */}
                        <div className="absolute bottom-5 right-5 z-20">
                          <div className="w-14 h-14 rounded-2xl bg-[var(--green)] flex items-center justify-center text-[var(--navy-deep)] shadow-xl shadow-emerald-500/20">
                            <IconComponent size={28} />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* ── Content ── */}
                    <div className="w-full lg:w-[45%] flex flex-col justify-center">
                      {/* Category Tag */}
                      <div className="inline-flex items-center gap-2 bg-[var(--green)]/10 border border-[var(--green)]/20 rounded-full px-4 py-1.5 mb-5 w-fit">
                        <div className="w-2 h-2 rounded-full bg-[var(--green)] animate-pulse"></div>
                        <span className="text-[var(--green)] text-xs font-semibold uppercase tracking-wider">Service {String(idx + 1).padStart(2, '0')}</span>
                      </div>

                      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[var(--text-primary)] mb-4 leading-tight tracking-tight">
                        {service.title}
                      </h2>

                      <p className="text-[var(--text-secondary)] text-base sm:text-lg leading-relaxed mb-8">
                        {service.description}
                      </p>
                      
                      {/* Features Grid */}
                      {features.length > 0 && (
                        <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {features.map((feature: string, i: number) => (
                            <motion.div 
                              key={i} 
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: i * 0.1, duration: 0.4 }}
                              className="flex items-center gap-3 bg-[var(--surface-card)] rounded-xl px-4 py-3 border border-[var(--glass-border)]"
                            >
                              <CheckCircle size={18} className="text-[var(--green)] shrink-0" />
                              <span className="text-[var(--text-primary)] font-medium text-sm">{feature}</span>
                            </motion.div>
                          ))}
                        </div>
                      )}

                      {/* CTA Button */}
                      <div>
                        <Link 
                          href={`/contact?service=${service.slug || service.id}`} 
                          className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 !text-white font-semibold px-8 py-4 rounded-2xl shadow-xl shadow-emerald-500/20 hover:shadow-emerald-500/40 transition-all duration-300 hover:-translate-y-0.5 text-base"
                        >
                          Contact Us
                          <ArrowRight size={20} />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ═══ CTA BOTTOM SECTION ═══ */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-[#060D1E]"></div>
        <div className="absolute inset-0 opacity-15 pointer-events-none" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1920&q=80')", backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[150px] pointer-events-none"></div>
        
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold !text-white mb-6 leading-tight">
              Ready to Start Your
              <br />
              <span className="gradient-text">Next Project?</span>
            </h2>
            <p className="!text-gray-300 text-lg sm:text-xl mb-10 leading-relaxed">
              Let&apos;s discuss how we can help you build world-class infrastructure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-primary text-lg px-10 py-4 justify-center">
                Get In Touch
              </Link>
              <Link href="/projects" className="btn-outline text-lg px-10 py-4 justify-center !text-white !border-white/20 hover:!border-emerald-400 hover:!text-emerald-400">
                View Projects
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <MediaModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        mediaUrl={modalMediaUrl}
        isVideo={modalIsVideo}
        title={modalTitle}
      />
    </div>
  );
}
