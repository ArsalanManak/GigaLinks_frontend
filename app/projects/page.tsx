"use client";
import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin } from "lucide-react";

const allProjects = [
  { id: 1, title: "Faisalabad Tower Upgrade", type: "Internet Tower", city: "Faisalabad", year: "2025", img: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&q=80" },
  { id: 2, title: "Rural Solar Site", type: "Solar Internet", city: "Sialkot", year: "2024", img: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=600&q=80" },
  { id: 3, title: "Karachi FM Link", type: "FM Radio", city: "Karachi", year: "2023", img: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=600&q=80" },
  { id: 4, title: "Lahore Network Expansion", type: "Internet Tower", city: "Lahore", year: "2024", img: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&q=80" },
  { id: 5, title: "Islamabad Solar Hub", type: "Solar Internet", city: "Islamabad", year: "2025", img: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&q=80" },
  { id: 6, title: "Faisalabad FM Station", type: "FM Radio", city: "Faisalabad", year: "2024", img: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&q=80" },
];

export default function ProjectsPage() {
  const [serviceFilter, setServiceFilter] = useState("All");
  const [cityFilter, setCityFilter] = useState("All");

  const services = ["All", "Internet Tower", "FM Radio", "Solar Internet", "Tower Maintenance"];
  const cities = ["All", "Faisalabad", "Sialkot", "Karachi", "Lahore", "Islamabad"];

  const filtered = useMemo(() => {
    return allProjects.filter(p => {
      const matchService = serviceFilter === "All" || p.type === serviceFilter;
      const matchCity = cityFilter === "All" || p.city === cityFilter;
      return matchService && matchCity;
    });
  }, [serviceFilter, cityFilter]);

  return (
    <div className="flex flex-col min-h-screen pt-24 pb-24">
      {/* HERO */}
      <section className="py-20 text-center max-w-4xl mx-auto px-6">
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
        {/* FILTERS */}
        <div className="glass p-6 mb-12 flex flex-col md:flex-row gap-8">
          <div>
            <div className="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-3">Filter by Service</div>
            <div className="flex flex-wrap gap-2">
              {services.map(s => (
                <button
                  key={s}
                  onClick={() => setServiceFilter(s)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    serviceFilter === s ? "bg-[var(--green)] text-[var(--navy-deep)] shadow-[0_0_15px_var(--green-glow)]" : "bg-[var(--surface-card)] text-[var(--text-secondary)] hover:text-white border border-[var(--glass-border)]"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div>
            <div className="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-3">Filter by City</div>
            <div className="flex flex-wrap gap-2">
              {cities.map(c => (
                <button
                  key={c}
                  onClick={() => setCityFilter(c)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    cityFilter === c ? "bg-[var(--green)] text-[var(--navy-deep)] shadow-[0_0_15px_var(--green-glow)]" : "bg-[var(--surface-card)] text-[var(--text-secondary)] hover:text-white border border-[var(--glass-border)]"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* GRID */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filtered.map(project => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={project.id}
                className="img-overlay glass-card group overflow-hidden h-[350px]"
              >
                <img src={project.img} alt={project.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                
                <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col justify-end z-10">
                  <div className="inline-block px-3 py-1 bg-[var(--green)]/20 text-[var(--green)] border border-[var(--green)]/30 rounded-full text-xs font-semibold uppercase tracking-wider w-max mb-3 backdrop-blur-md">
                    {project.type}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-white/70 text-sm flex items-center gap-2">
                    <MapPin size={14} /> {project.city} • {project.year}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
        {filtered.length === 0 && (
          <div className="text-center py-20 text-[var(--text-muted)]">
            No projects found matching the selected filters.
          </div>
        )}
      </section>
    </div>
  );
}
