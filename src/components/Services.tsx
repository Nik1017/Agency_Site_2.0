"use client";

import { motion } from "framer-motion";
import {
  Video,
  Zap,
  Share2,
  Youtube,
  Palette,
  Sliders,
  TrendingUp,
  Image,
  MessageSquare,
} from "lucide-react";

const servicesList = [
  {
    title: "AI Content Creation",
    description:
      "Create high-performing AI videos, images, ads, and branded content at scale.",
    details: ["AI Videos", "AI Images", "Ad Creatives"],
    icon: Video,
    color: "from-blue-500/20 to-cyan-500/20",
    glow: "rgba(59, 130, 246, 0.15)",
  },
  {
    title: "Social Media Management",
    description:
      "Grow your brand with consistent content, community management, and platform strategy.",
    details: ["Instagram", "LinkedIn", "Content Calendar"],
    icon: Share2,
    color: "from-amber-500/20 to-orange-500/20",
    glow: "rgba(245, 158, 11, 0.15)",
  },
  {
    title: "Short-Form Video Editing",
    description:
      "Engaging Reels, Shorts, and vertical videos designed to capture attention.",
    details: ["Reels", "Motion Graphics", "Captions"],
    icon: Image,
    color: "from-indigo-500/20 to-purple-500/20",
    glow: "rgba(99, 102, 241, 0.15)",
  },
  {
    title: "Performance Marketing",
    description:
      "Launch and optimize campaigns that generate qualified leads and measurable ROI.",
    details: ["Meta Ads", "Google Ads", "Lead Generation"],
    icon: TrendingUp,
    color: "from-rose-500/20 to-red-500/20",
    glow: "rgba(244, 63, 94, 0.15)",
  },
  {
    title: "Website Development",
    description:
      "Modern, fast, and conversion-focused websites built to grow your business.",
    details: ["Business Sites", "Landing Pages", "SEO Ready"],
    icon: Youtube,
    color: "from-emerald-500/20 to-teal-500/20",
    glow: "rgba(16, 185, 129, 0.15)",
  },
  {
    title: "Branding & Design",
    description:
      "Build a memorable brand identity that stands out across every platform.",
    details: ["Logo Design", "Brand Identity", "Social Creatives"],
    icon: Palette,
    color: "from-violet-500/20 to-fuchsia-500/20",
    glow: "rgba(139, 92, 246, 0.15)",
  },
  {
    title: "AI Automation",
    description:
      "Automate repetitive workflows with AI-powered systems that save time and increase efficiency.",
    details: ["AI Chatbots", "WhatsApp Automation", "CRM Workflows"],
    icon: Sliders,
    color: "from-blue-600/20 to-sky-500/20",
    glow: "rgba(30, 111, 255, 0.15)",
  },
  {
    title: "Business Growth Strategy",
    description:
      "Data-driven strategies that help you attract, convert, and retain more customers.",
    details: ["Sales Funnels", "Growth Roadmap", "Competitor Analysis"],
    icon: Zap,
    color: "from-yellow-500/20 to-amber-500/20",
    glow: "rgba(234, 179, 8, 0.15)",
  },
  {
    title: "SEO & Local Growth",
    description:
      "Increase your visibility on Google and attract customers actively searching for your services.",
    details: ["Local SEO", "Google Business", "Keyword Strategy"],
    icon: MessageSquare,
    color: "from-pink-500/20 to-rose-500/20",
    glow: "rgba(236, 72, 153, 0.15)",
  },
];

export default function Services() {
  return (
    <section id="services" className="relative py-24 bg-background z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        {/* Section Header */}
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.12,
              },
            },
          }}
          className="mb-16 max-w-2xl"
        >
          <motion.span
            variants={{
              hidden: { opacity: 0, y: 15 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.35em] font-semibold text-primary"
          >
            <span className="w-8 h-px bg-primary" />
            What We Do
          </motion.span>

          <motion.h2
            variants={{
              hidden: { opacity: 0, y: 25 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.7 }}
            className="mt-5 text-3xl sm:text-4xl md:text-5xl lg:text-[3.6rem] leading-[0.92] tracking-[-0.04em] font-space font-bold text-white"
          >
            Services designed
            <br />
            <span className="text-white">for modern</span>{" "}
            <span className="font-serif italic font-normal text-primary">
              business growth.
            </span>
          </motion.h2>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6 }}
            className="mt-6 max-w-xl text-sm md:text-[15px] leading-7 text-muted-custom"
          >
            We combine AI, content, automation and performance marketing into
            one integrated growth system—helping businesses attract more
            customers, automate operations and scale with confidence.
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesList.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ y: -8 }}
                className="relative group rounded-3xl glass backdrop-blur-sm p-8 flex flex-col justify-between h-[340px] border border-white/5 overflow-hidden transition-all duration-300 hover:border-white/15"
                style={
                  {
                    "--glow-color": service.glow,
                  } as React.CSSProperties
                }
              >
                {/* Background glow overlay */}
                <div
                  className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
                  style={{
                    background: `radial-gradient(circle at top right, ${service.glow}, transparent 60%)`,
                  }}
                />

                <div>
                  {/* Icon & Glow */}
                  <div className="w-12 h-12 rounded-2xl bg-neutral-900 border border-white/10 flex items-center justify-center mb-6 group-hover:border-primary/50 transition-colors duration-300">
                    <Icon className="w-6 h-6 text-white group-hover:text-primary transition-colors duration-300" />
                  </div>

                  {/* Title & Desc */}
                  <h3 className="text-xl font-space font-bold tracking-tight text-white mb-3">
                    {service.title}
                  </h3>
                  <p className="text-xs text-muted-custom leading-relaxed line-clamp-3">
                    {service.description}
                  </p>
                </div>

                {/* Tags Details */}
                <div className="flex flex-wrap gap-2 mt-6">
                  {service.details.map((detail, dIdx) => (
                    <span
                      key={dIdx}
                      className="px-2.5 py-1 rounded-full bg-white/5 border border-white/5 text-[9px] font-bold uppercase tracking-wider text-muted-custom hover:text-white hover:bg-white/10 transition-colors duration-200"
                    >
                      {detail}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
