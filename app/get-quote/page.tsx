"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Radio, Sun, Wrench, CheckCircle, ArrowRight, ArrowLeft } from "lucide-react";

const services = [
  { id: "Internet Tower Installation", title: "Internet Tower", desc: "Site survey, erection & commissioning", icon: Radio },
  { id: "FM Radio Installation", title: "FM Radio", desc: "Studio links & broadcast setup", icon: Radio },
  { id: "Solar Internet Solutions", title: "Solar Internet", desc: "Off-grid power systems", icon: Sun },
  { id: "Tower Paint, Earthing & Lightning", title: "Tower Maintenance", desc: "Painting, earthing & lightning", icon: Wrench },
];

function GetQuoteContent() {
  const params = useSearchParams();
  const presetService = params.get("service") || "";

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ service: "", city: "", details: "", name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  useEffect(() => {
    if (presetService) {
      const match = services.find(s => presetService.includes(s.title.split(" ")[0].toLowerCase()));
      if (match) setFormData(prev => ({ ...prev, service: match.id }));
    }
  }, [presetService]);

  const nextStep = () => setStep(s => Math.min(s + 1, 3));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setTimeout(() => {
      setStatus("success");
    }, 1500);
  };

  const variants = {
    enter: (direction: number) => ({ x: direction > 0 ? 50 : -50, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (direction: number) => ({ x: direction < 0 ? 50 : -50, opacity: 0 })
  };

  if (status === "success") {
    return (
      <div className="min-h-screen pt-32 pb-24 flex items-center justify-center px-6">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="glass-card p-12 text-center max-w-lg w-full">
          <div className="w-24 h-24 rounded-full bg-[var(--green)]/20 text-[var(--green)] border-2 border-[var(--green)] flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={48} />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Thank You!</h2>
          <p className="text-[var(--text-secondary)] text-lg mb-8">Your quote request has been received. Our engineering team will review your details and contact you shortly.</p>
          <a href="/" className="btn-primary w-full justify-center">Return to Home</a>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 flex flex-col items-center">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Request a <span className="gradient-text">Quote</span></h1>
        <p className="text-[var(--text-secondary)]">Let us know what you need, and we'll provide a customized plan.</p>
      </div>

      <div className="w-full max-w-3xl glass p-8 md:p-12">
        {/* Progress Indicator */}
        <div className="flex items-center justify-between mb-12 relative z-10">
          {[1, 2, 3].map((s, i) => (
            <React.Fragment key={s}>
              <div className={`step-dot ${step === s ? "active" : step > s ? "completed" : "pending"}`}>
                {step > s ? <CheckCircle size={20} /> : s}
              </div>
              {i < 2 && <div className={`step-line ${step > s ? "completed" : ""}`}></div>}
            </React.Fragment>
          ))}
        </div>

        <form onSubmit={step === 3 ? handleSubmit : (e) => { e.preventDefault(); nextStep(); }}>
          <AnimatePresence mode="wait" custom={1}>
            <motion.div
              key={step}
              custom={1}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              {/* STEP 1 */}
              {step === 1 && (
                <div>
                  <h3 className="text-2xl font-bold mb-6">Select a Service</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {services.map(s => (
                      <div 
                        key={s.id} 
                        onClick={() => setFormData({...formData, service: s.id})}
                        className={`glass-card p-6 cursor-pointer border-2 transition-all ${formData.service === s.id ? "border-[var(--green)] bg-[var(--green)]/5" : "border-transparent hover:border-white/20"}`}
                      >
                        <s.icon size={28} className={formData.service === s.id ? "text-[var(--green)]" : "text-[var(--text-muted)]"} />
                        <h4 className="font-bold text-white mt-4 mb-1">{s.title}</h4>
                        <p className="text-sm text-[var(--text-secondary)]">{s.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold mb-6">Project Location</h3>
                  <div>
                    <label className="form-label">City</label>
                    <input required type="text" className="form-input" placeholder="e.g. Faisalabad" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} />
                  </div>
                  <div>
                    <label className="form-label">Location Details (Optional)</label>
                    <textarea rows={4} className="form-input resize-none" placeholder="Provide any specific location details, site conditions, or remote access info." value={formData.details} onChange={e => setFormData({...formData, details: e.target.value})}></textarea>
                  </div>
                </div>
              )}

              {/* STEP 3 */}
              {step === 3 && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold mb-6">Contact Details</h3>
                  <div>
                    <label className="form-label">Full Name</label>
                    <input required type="text" className="form-input" placeholder="John Doe" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="form-label">Email</label>
                      <input required type="email" className="form-input" placeholder="john@example.com" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                    </div>
                    <div>
                      <label className="form-label">Phone</label>
                      <input required type="tel" className="form-input" placeholder="+92 300 0000000" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                    </div>
                  </div>
                  <div>
                    <label className="form-label">Additional Message</label>
                    <textarea required rows={4} className="form-input resize-none" placeholder="Tell us more about your project requirements..." value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}></textarea>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="mt-10 pt-6 border-t border-[var(--glass-border)] flex items-center justify-between">
            {step > 1 ? (
              <button type="button" onClick={prevStep} className="btn-outline">
                <ArrowLeft size={18} /> Back
              </button>
            ) : <div></div>}
            
            {step < 3 ? (
              <button type="submit" disabled={step === 1 && !formData.service} className="btn-primary">
                Next <ArrowRight size={18} />
              </button>
            ) : (
              <button type="submit" disabled={status === "submitting"} className="btn-primary">
                {status === "submitting" ? "Submitting..." : "Submit Quote Request"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default function GetQuotePage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center pt-32"><div className="w-12 h-12 border-4 border-[var(--green)] border-t-transparent rounded-full animate-spin"></div></div>}>
      <GetQuoteContent />
    </Suspense>
  );
}
