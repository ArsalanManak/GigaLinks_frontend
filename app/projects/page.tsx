"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Play, Loader2, ZoomIn } from "lucide-react";
import api from "../../lib/api";
import MediaModal from "../../components/ui/MediaModal";

const fallbackProjects = [
  { id: "1", title: "Faisalabad Tower Upgrade", service_type: "Internet Tower", city: "Faisalabad", cloudinary_urls: ["https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&q=80"], youtube_url: null, description: null, featured: false },
  { id: "2", title: "Rural Solar Site", service_type: "Solar Internet", city: "Sialkot", cloudinary_urls: ["https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=600&q=80"], youtube_url: null, description: null, featured: false },
  { id: "3", title: "Karachi FM Link", service_type: "FM Radio", city: "Karachi", cloudinary_urls: ["https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=600&q=80"], youtube_url: null, description: null, featured: false },
];

function getYouTubeEmbedUrl(url: string): string | null {
  if (!url) return null;
  const match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]+)/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMediaUrl, setModalMediaUrl] = useState<string | null>(null);
  const [modalIsVideo, setModalIsVideo] = useState(false);
  const [modalTitle, setModalTitle] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/projects");
        setProjects(res.data.length > 0 ? res.data : fallbackProjects);
      } catch {
        setProjects(fallbackProjects);
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
    <div className="flex flex-col min-h-screen pt-24 pb-24">
      {/* HERO */}
      <section className="pt-8 pb-16 text-center max-w-4xl mx-auto px-6">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold mb-6"
        >
          Projects & <span className="gradient-text">Portfolio</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.6 }}
          className="text-xl text-[var(--text-secondary)]"
        >
          Showcasing our nationwide deployments and infrastructure excellence.
        </motion.p>
      </section>

      <section className="max-w-7xl mx-auto px-6 w-full">
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-[var(--green)]" size={40} />
          </div>
        ) : (
          <>
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence>
                {projects.map((project) => {
                  const img = project.cloudinary_urls?.[0] || "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&q=80";
                  const embedUrl = project.youtube_url ? getYouTubeEmbedUrl(project.youtube_url) : null;
                  
                  return (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      key={project.id}
                      onClick={() => embedUrl ? openModal(embedUrl, true, project.title) : openModal(img, false, project.title)}
                      className="img-overlay glass-card group overflow-hidden h-[350px] relative cursor-pointer"
                    >
                      {embedUrl ? (
                        <div className="absolute inset-0 z-0 bg-black">
                          <iframe src={embedUrl} title={project.title} className="w-full h-full border-0 pointer-events-none" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                        </div>
                      ) : (
                        <img src={img} alt={project.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      )}

                      <div className="absolute inset-0 bg-gradient-to-t from-[#060D1E] via-[#060D1E]/40 to-transparent pointer-events-none z-0"></div>

                      {/* Hover Play/Zoom Icon */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                        <div className="bg-[var(--green)]/90 text-[var(--navy-deep)] p-4 rounded-full shadow-lg transform group-hover:scale-110 transition-transform">
                          {embedUrl ? <Play fill="currentColor" size={32} className="ml-1" /> : <ZoomIn size={32} />}
                        </div>
                      </div>

                      <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col justify-end z-10 pointer-events-none">
                        <div className="inline-block px-3 py-1 bg-[var(--green)]/20 text-[var(--green)] border border-[var(--green)]/30 rounded-full text-xs font-semibold uppercase tracking-wider w-max mb-3 backdrop-blur-md">
                          {project.service_type}
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                        <p className="text-white/70 text-sm flex items-center gap-2">
                          <MapPin size={14} /> {project.city}
                        </p>
                        {project.description && (
                          <p className="text-white/60 text-sm mt-2 line-clamp-2">{project.description}</p>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
            
            {projects.length === 0 && (
              <div className="text-center py-20 text-[var(--text-muted)]">
                No projects found.
              </div>
            )}
          </>
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
