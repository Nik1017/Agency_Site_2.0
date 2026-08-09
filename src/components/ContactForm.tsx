"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BRAND_EMAIL } from "@/config/branding";
import {
  Send,
  CheckCircle,
  Mail,
  Phone,
  Calendar,
  ArrowRight,
} from "lucide-react";


const services = [
  "Operations Engine",
  "Audience Discovery",
  "Structured Growth",
  "Digital Presence",
  "Design Systems",
  "Process Automation",
];

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    budget: "$5k - $10k",
    message: "",
  });

  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "submitting" | "success">(
    "idle",
  );

  const handleToggle = (svc: string) => {
    setSelectedServices((prev) =>
      prev.includes(svc) ? prev.filter((s) => s !== svc) : [...prev, svc],
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email) return;

    try {
      setStatus("submitting");

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          services: selectedServices,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setStatus("success");

      setFormData({
        name: "",
        email: "",
        company: "",
        budget: "$5k - $10k",
        message: "",
      });

      setSelectedServices([]);
    } catch (err) {
      console.error(err);
      alert("Failed to send message.");
      setStatus("idle");
    }
  };

  return (
    <section
      id="contact"
      className="relative py-28 bg-[#050505] z-10 border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left Column: Direct Info */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full gap-10">
            <div>
              <span className="text-xs uppercase font-space font-bold tracking-widest text-[#2F80FF] mb-4 block">
                Connect
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-space font-bold tracking-tighter uppercase text-white leading-none mb-6">
                Let's build <br />
                your{" "}
                <span className="font-serif-italic italic font-normal text-muted-custom/75 lowercase">
                  systems.
                </span>
              </h2>
              <p className="text-xs md:text-sm text-muted-custom leading-relaxed max-w-sm mb-6">
                Tell us about your operational bottlenecks and growth goals.
              </p>
            </div>

            {/* Direct Connect channels */}
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center text-primary">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[9px] uppercase font-bold tracking-widest text-muted-custom/60 block mb-0.5">
                    DIRECT EMAIL
                  </span>
                  <a
                    href={`mailto:${BRAND_EMAIL}`}
                    className="text-sm font-bold text-white hover:text-primary transition-colors"
                  >
                    {BRAND_EMAIL}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center text-primary">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[9px] uppercase font-bold tracking-widest text-muted-custom/60 block mb-0.5">
                    RESPONSE TIME
                  </span>
                  <span className="text-sm font-bold text-white">
                    Under 24 hours, Monday to Friday.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interaction Form */}
          <div className="lg:col-span-7 glass rounded-[32px] p-8 md:p-12 border border-white/5 relative">
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success-state"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex flex-col items-center justify-center text-center py-16"
                >
                  <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center text-primary mb-6">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-space font-bold uppercase text-white tracking-tight mb-2">
                    Message Received
                  </h3>
                  <p className="text-xs text-muted-custom leading-relaxed max-w-sm mb-8">
                    We will review your inquiry and get back to you within 24
                    hours.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="px-6 py-3 bg-white/5 border border-white/10 hover:bg-white/10 text-xs font-bold uppercase tracking-wider text-white rounded-full transition-all duration-300 active:scale-95"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form-state"
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-6"
                >
                  {/* Row 1: Name & Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-[9px] font-bold uppercase tracking-widest text-[#B8B8B8]">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="Niels Bohr"
                        className="h-12 px-4 rounded-xl bg-neutral-950 border border-white/5 text-sm text-white placeholder-neutral-700 focus:border-primary/55 outline-none transition-colors duration-200"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[9px] font-bold uppercase tracking-widest text-[#B8B8B8]">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="niels@quantum.io"
                        className="h-12 px-4 rounded-xl bg-neutral-950 border border-white/5 text-sm text-white placeholder-neutral-700 focus:border-primary/55 outline-none transition-colors duration-200"
                      />
                    </div>
                  </div>

                  {/* Row 2: Company & Budget */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-[9px] font-bold uppercase tracking-widest text-[#B8B8B8]">
                        Brand / Org
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) =>
                          setFormData({ ...formData, company: e.target.value })
                        }
                        placeholder="Quantum Labs LLC"
                        className="h-12 px-4 rounded-xl bg-neutral-950 border border-white/5 text-sm text-white placeholder-neutral-700 focus:border-primary/55 outline-none transition-colors duration-200"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[9px] font-bold uppercase tracking-widest text-[#B8B8B8]">
                        Monthly Budget
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) =>
                          setFormData({ ...formData, budget: e.target.value })
                        }
                        className="h-12 px-4 rounded-xl bg-neutral-950 border border-white/5 text-sm text-white focus:border-primary/55 outline-none transition-colors duration-200"
                      >
                        <option value="$3k - $5k">$3k - $5k / mo</option>
                        <option value="$5k - $10k">$5k - $10k / mo</option>
                        <option value="$10k - $20k">$10k - $20k / mo</option>
                        <option value="$20k+">$20k+ / mo</option>
                      </select>
                    </div>
                  </div>

                  {/* Core Specialization Checkboxes */}
                  <div className="flex flex-col gap-3">
                    <label className="text-[9px] font-bold uppercase tracking-widest text-[#B8B8B8]">
                      Requested Services
                    </label>
                    <div className="flex flex-wrap gap-2.5">
                      {services.map((svc, sIdx) => {
                        const isSelected = selectedServices.includes(svc);
                        return (
                          <button
                            key={sIdx}
                            type="button"
                            onClick={() => handleToggle(svc)}
                            className={`px-4 py-2 border rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 hover:scale-102 active:scale-98 ${
                              isSelected
                                ? "bg-primary/20 border-primary text-white"
                                : "bg-neutral-950 border-white/5 text-muted-custom hover:text-white hover:border-white/10"
                            }`}
                          >
                            {svc}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Message Input */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[9px] font-bold uppercase tracking-widest text-[#B8B8B8]">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder="Describe your operational challenges and goals..."
                      className="p-4 rounded-xl bg-neutral-950 border border-white/5 text-sm text-white placeholder-neutral-700 focus:border-primary/55 outline-none transition-colors duration-200 resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className={`mt-4 w-full h-14 bg-white text-black font-bold uppercase tracking-widest text-xs rounded-full flex items-center justify-center gap-2 hover:bg-neutral-200 transition-colors duration-300 cursor-pointer active:scale-98 ${
                      status === "submitting"
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    {status === "submitting" ? (
                      <span>Sending...</span>
                    ) : (
                      <>
                        <span>Start a Project</span>
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
