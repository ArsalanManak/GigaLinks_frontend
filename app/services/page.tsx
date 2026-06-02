"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Radio, Sun, Wrench, CheckCircle, Play, Loader2, ZoomIn } from "lucide-react";
import api from "../../lib/api";
import MediaModal from "../../components/ui/MediaModal";

const iconMap: Record<string, any> = {
  Radio,
  Sun,
  Wrench,
};

const fallbackServices = [
  {
    id: "internet-tower-installation",
    slug: "internet-tower-installation",
    title: "Internet Tower Installation",
    description: "Complete site surveys, tower erection, antenna installation and commissioning. We handle everything from foundation to final testing to ensure robust network coverage.",
    image_url: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&q=80",
    icon: "Radio",
    youtube_url: null,
    sub_services: ["Site Survey & Planning", "Foundation & Civil Works", "Tower Erection", "Antenna Installation", "Testing & Commissioning"]
  },
  {
    id: "fm-radio-installation",
    slug: "fm-radio-installation",
    title: "FM Radio Installation",
    description: "Studio-to-transmitter links, antenna systems, and complete broadcast infrastructure setup for regional and national FM stations.",
    image_url: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&q=80",
    icon: "Radio",
    youtube_url: null,
    sub_services: ["STL Setup", "Antenna Arrays", "Transmitter Installation", "Coverage Testing", "Regulatory Compliance"]
  },
  {
    id: "solar-internet-solutions",
    slug: "solar-internet-solutions",
    title: "Solar Internet Solutions",
    description: "Off-grid solar power systems tailored for remote connectivity sites, ensuring your network stays online 24/7 without grid dependency.",
    image_url: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80",
    icon: "Sun",
    youtube_url: null,
    sub_services: ["Solar Panel Installation", "Battery Bank Sizing", "Inverter Setup", "Remote Monitoring", "Power Optimization"]
  },
  {
    id: "tower-maintenance",
    slug: "tower-maintenance",
    title: "Tower Maintenance",
    description: "Comprehensive painting, earthing, lightning protection, and preventive maintenance services to extend the lifespan of your infrastructure.",
    image_url: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80",
    icon: "Wrench",
    youtube_url: null,
    sub_services: ["Anti-corrosion Painting", "Earthing Systems", "Lightning Protection", "Structural Audits", "Preventive Maintenance"]
  }
];

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

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/services");
        setServices(res.data.length > 0 ? res.data : fallbackServices);
      } catch {
        setServices(fallbackServices);
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
    <div className="flex flex-col min-h-screen pt-24 pb-20">
      {/* HERO */}
      <section className="pt-8 pb-16 text-center max-w-4xl mx-auto px-6">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold mb-6"
        >
          Our <span className="gradient-text">Services</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.6 }}
          className="text-xl text-[var(--text-secondary)]"
        >
          End-to-end tower, radio, and solar solutions tailored for the telecom industry.
        </motion.p>
      </section>

      {/* SERVICES LIST */}
      <section className="max-w-7xl mx-auto px-6 space-y-24">
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-[var(--green)]" size={40} />
          </div>
        ) : (
          services.map((service, idx) => {
            const IconComponent = iconMap[service.icon || ""] || Radio;
            const img = service.image_url || service.hero_image || "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&q=80";
            const embedUrl = service.youtube_url ? getYouTubeEmbedUrl(service.youtube_url) : null;
            const features = service.sub_services || [];

            return (
              <motion.div 
                key={service.id || idx}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeUp}
                className={`flex flex-col ${idx % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 items-center glass-card p-6 lg:p-10`}
              >
                {/* Image / Video Preview */}
                <div 
                  className="w-full lg:w-1/2 relative cursor-pointer group"
                  onClick={() => embedUrl ? openModal(embedUrl, true, service.title) : openModal(img, false, service.title)}
                >
                  {embedUrl ? (
                    <div className="h-[300px] lg:h-[400px] relative rounded-[var(--radius)] overflow-hidden w-full shadow-lg">
                      <iframe src={embedUrl} title={service.title} className="w-full h-full border-0 pointer-events-none" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    </div>
                  ) : (
                    <div className="h-[300px] lg:h-[400px] relative rounded-[var(--radius)] overflow-hidden shadow-lg">
                      <img src={img} alt={service.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#060D1E]/80 to-transparent pointer-events-none"></div>
                      <div className="absolute bottom-6 left-6 w-14 h-14 rounded-full bg-[var(--green)] text-[var(--navy-deep)] flex items-center justify-center shadow-lg">
                        <IconComponent size={28} />
                      </div>
                    </div>
                  )}

                  {/* Hover Play/Zoom Icon */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                    <div className="bg-[var(--green)]/90 text-[var(--navy-deep)] p-4 rounded-full shadow-lg transform group-hover:scale-110 transition-transform">
                      {embedUrl ? <Play fill="currentColor" size={32} className="ml-1" /> : <ZoomIn size={32} />}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center">
                  <h2 className="text-3xl font-bold text-white mb-4">{service.title}</h2>
                  <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-8">
                    {service.description}
                  </p>
                  
                  {features.length > 0 && (
                    <div className="mb-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {features.map((feature: string, i: number) => (
                        <div key={i} className="flex items-center gap-3">
                          <CheckCircle size={18} className="text-[var(--green)] shrink-0" />
                          <span className="text-[var(--text-primary)] font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div>
                    <Link href={`/get-quote?service=${service.slug || service.id}`} className="btn-primary inline-flex">
                      Request Quote
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })
        )}
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
