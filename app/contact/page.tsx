"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    // Simulate API call
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", phone: "", service: "", message: "" });
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen pt-24 pb-24">
      {/* HERO */}
      <section className="py-20 text-center max-w-4xl mx-auto px-6">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold mb-6"
        >
          Get in <span className="gradient-text">Touch</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.6 }}
          className="text-xl text-[var(--text-secondary)]"
        >
          Our team is ready to assist you with your connectivity infrastructure needs.
        </motion.p>
      </section>

      <section className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
        {/* FORM */}
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="glass-card p-8 md:p-10">
          <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
          
          {status === "success" ? (
            <div className="bg-[var(--green)]/10 border border-[var(--green)]/30 rounded-[var(--radius-sm)] p-6 text-center">
              <div className="w-16 h-16 bg-[var(--green)] text-[var(--navy-deep)] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Message Sent Successfully!</h3>
              <p className="text-[var(--text-secondary)]">We will get back to you shortly.</p>
              <button type="button" onClick={() => setStatus("idle")} className="mt-6 text-[var(--green)] hover:underline">Send another message</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="form-label">Full Name</label>
                <input required type="text" className="form-input" placeholder="John Doe" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="form-label">Email Address</label>
                  <input required type="email" className="form-input" placeholder="john@example.com" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                </div>
                <div>
                  <label className="form-label">Phone Number</label>
                  <input required type="tel" className="form-input" placeholder="+92 300 0000000" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                </div>
              </div>
              <div>
                <label className="form-label">Service of Interest</label>
                <select className="form-input appearance-none bg-[var(--surface-dark)]" value={formData.service} onChange={e => setFormData({...formData, service: e.target.value})}>
                  <option value="">General Inquiry</option>
                  <option value="Internet Tower">Internet Tower Installation</option>
                  <option value="FM Radio">FM Radio Installation</option>
                  <option value="Solar Internet">Solar Internet Solutions</option>
                  <option value="Tower Maintenance">Tower Maintenance</option>
                </select>
              </div>
              <div>
                <label className="form-label">Message</label>
                <textarea required rows={4} className="form-input resize-none" placeholder="How can we help you?" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}></textarea>
              </div>
              <button type="submit" disabled={status === "submitting"} className="btn-primary w-full justify-center mt-2">
                {status === "submitting" ? "Sending..." : "Send Message"}
              </button>
            </form>
          )}
        </motion.div>

        {/* INFO */}
        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }} className="space-y-6">
          <div className="glass-card p-6 flex items-start gap-5 group">
            <div className="w-14 h-14 rounded-full bg-[var(--surface-dark)] flex items-center justify-center text-[var(--green)] group-hover:bg-[var(--green)] group-hover:text-[var(--navy-deep)] transition-colors shrink-0">
              <MapPin size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-1">Head Office</h3>
              <p className="text-[var(--text-secondary)] leading-relaxed">Office No. 5, Tech Plaza,<br />Faisalabad, Pakistan</p>
            </div>
          </div>

          <div className="glass-card p-6 flex items-start gap-5 group">
            <div className="w-14 h-14 rounded-full bg-[var(--surface-dark)] flex items-center justify-center text-[var(--green)] group-hover:bg-[var(--green)] group-hover:text-[var(--navy-deep)] transition-colors shrink-0">
              <Phone size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-1">Phone</h3>
              <p className="text-[var(--text-secondary)]">+92 300 0000000</p>
            </div>
          </div>

          <div className="glass-card p-6 flex items-start gap-5 group">
            <div className="w-14 h-14 rounded-full bg-[var(--surface-dark)] flex items-center justify-center text-[var(--green)] group-hover:bg-[var(--green)] group-hover:text-[var(--navy-deep)] transition-colors shrink-0">
              <Mail size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-1">Email</h3>
              <p className="text-[var(--text-secondary)]">info@gigalinks.pk</p>
            </div>
          </div>

          <a href="#" className="glass-card p-6 flex items-start gap-5 group hover:border-[#25D366]/50 hover:shadow-[0_0_30px_rgba(37,211,102,0.15)] block">
            <div className="w-14 h-14 rounded-full bg-[#25D366]/10 flex items-center justify-center text-[#25D366] group-hover:bg-[#25D366] group-hover:text-white transition-colors shrink-0">
              <MessageCircle size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-1">WhatsApp</h3>
              <p className="text-[var(--text-secondary)]">Message us instantly</p>
            </div>
          </a>

          <div className="pt-6">
            <h3 className="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-4">Follow Us</h3>
            <div className="flex gap-4">
                <a href="#" className="w-12 h-12 rounded-full glass flex items-center justify-center text-white hover:bg-[var(--green)] hover:text-[var(--navy-deep)] hover:border-transparent transition-all">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                </a>
                <a href="#" className="w-12 h-12 rounded-full glass flex items-center justify-center text-white hover:bg-[var(--green)] hover:text-[var(--navy-deep)] hover:border-transparent transition-all">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </a>
                <a href="#" className="w-12 h-12 rounded-full glass flex items-center justify-center text-white hover:bg-[var(--green)] hover:text-[var(--navy-deep)] hover:border-transparent transition-all">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* MAP */}
      <section className="max-w-7xl mx-auto px-6 w-full">
        <div className="glass-card p-2">
          <div className="video-wrapper !pb-[40%] rounded-[var(--radius)] min-h-[300px]">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d217858.26986949095!2d73.02261395!3d31.41554985!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x392269d2614ff681%3A0xaf28e613e15e041d!2sFaisalabad%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1234567890" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
}
