"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Radio, Sun, Wrench, CheckCircle } from "lucide-react";

export default function ServicesPage() {
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  const services = [
    {
      id: "internet-tower-installation",
      title: "Internet Tower Installation",
      desc: "Complete site surveys, tower erection, antenna installation and commissioning. We handle everything from foundation to final testing to ensure robust network coverage.",
      img: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&q=80",
      icon: Radio,
      features: ["Site Survey & Planning", "Foundation & Civil Works", "Tower Erection", "Antenna Installation", "Testing & Commissioning"]
    },
    {
      id: "fm-radio-installation",
      title: "FM Radio Installation",
      desc: "Studio-to-transmitter links, antenna systems, and complete broadcast infrastructure setup for regional and national FM stations.",
      img: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&q=80",
      icon: Radio,
      features: ["STL Setup", "Antenna Arrays", "Transmitter Installation", "Coverage Testing", "Regulatory Compliance"]
    },
    {
      id: "solar-internet-solutions",
      title: "Solar Internet Solutions",
      desc: "Off-grid solar power systems tailored for remote connectivity sites, ensuring your network stays online 24/7 without grid dependency.",
      img: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80",
      icon: Sun,
      features: ["Solar Panel Installation", "Battery Bank Sizing", "Inverter Setup", "Remote Monitoring", "Power Optimization"]
    },
    {
      id: "tower-maintenance",
      title: "Tower Maintenance",
      desc: "Comprehensive painting, earthing, lightning protection, and preventive maintenance services to extend the lifespan of your infrastructure.",
      img: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80",
      icon: Wrench,
      features: ["Anti-corrosion Painting", "Earthing Systems", "Lightning Protection", "Structural Audits", "Preventive Maintenance"]
    }
  ];

  return (
    <div className="flex flex-col min-h-screen pt-24 pb-20">
      {/* HERO */}
      <section className="py-20 text-center max-w-4xl mx-auto px-6">
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
        {services.map((service, idx) => (
          <motion.div 
            key={service.id}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className={`flex flex-col ${idx % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 items-center glass-card p-6 lg:p-10`}
          >
            {/* Image */}
            <div className="w-full lg:w-1/2 h-[300px] lg:h-[450px] relative rounded-[var(--radius)] overflow-hidden">
              <img src={service.img} alt={service.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060D1E]/60 to-transparent"></div>
              <div className="absolute bottom-6 left-6 w-14 h-14 rounded-full bg-[var(--green)] text-[var(--navy-deep)] flex items-center justify-center">
                <service.icon size={28} />
              </div>
            </div>

            {/* Content */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center">
              <h2 className="text-3xl font-bold text-white mb-4">{service.title}</h2>
              <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-8">
                {service.desc}
              </p>
              
              <div className="mb-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle size={18} className="text-[var(--green)] shrink-0" />
                    <span className="text-[var(--text-primary)] font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              <div>
                <Link href={`/get-quote?service=${service.id}`} className="btn-primary inline-flex">
                  Request Quote
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </section>
    </div>
  );
}
