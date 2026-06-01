"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Play, Loader2 } from "lucide-react";
import api from "../../lib/api";

const fallbackProjects = [
  { id: "1", title: "Faisalabad Tower Upgrade", service_type: "Internet Tower", city: "Faisalabad", cloudinary_urls: ["https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&q=80"], youtube_url: null, description: null, featured: false },
  { id: "2", title: "Rural Solar Site", service_type: "Solar Internet", city: "Sialkot", cloudinary_urls: ["https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=600&q=80"], youtube_url: null, description: null, featured: false },
  { id: "3", title: "Karachi FM Link", service_type: "FM Radio", city: "Karachi", cloudinary_urls: ["https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=600&q=80"], youtube_url: null, description: null, featured: false },
];

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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
                  return (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      key={project.id}
                      className="img-overlay glass-card group overflow-hidden h-[350px]"
                    >
                      <img src={img} alt={project.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      
                      {project.youtube_url && (
                        <a href={project.youtube_url} target="_blank" rel="noreferrer" className="absolute top-4 right-4 z-20 w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg">
                          <Play size={18} fill="white" />
                        </a>
                      )}

                      <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col justify-end z-10">
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
    </div>
  );
}
