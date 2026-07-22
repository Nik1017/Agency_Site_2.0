"use client";

import { motion } from "framer-motion";
import { Play, Eye } from "lucide-react";
import { Youtube, Instagram, Globe, ExternalLink } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import firstImage from "../../public/images/first Imgae.png";
import secondImage from "../../public/images/second Image.png";
const projects = [
  {
    title: "Digital Growth for Seraphic Dental",
    client: "Seraphic Dental Clinic",
    industry: "Healthcare / Dental",
    image: firstImage,
    stats: [
      { label: "YouTube Subscribers", val: "100K+" },
      { label: "Growth Achieved", val: "+85K" },
      { label: "Website Launch", val: "Complete" },
    ],
    summary:
      "Delivered a complete digital growth strategy combining content production, social media management, and web development. We scaled Seraphic Dental’s YouTube community from 15K to 100K+ subscribers, expanded their Instagram reach, and launched a professional website that reinforces credibility and supports patient acquisition.",
    color: "from-sky-600/30 to-cyan-500/20",
    videoLabel: "Dental_Growth",
    links: {
      youtube: "https://www.youtube.com/@thebestdentalclinicinindia",
      website: "https://seraphicdental.com",
      instagram: "https://www.instagram.com/seraphic.dental/",
    },
  },
  {
    title: "Scaling SmileWithNeetu",
    client: "SmileWithNeetu",
    industry: "Healthcare / Dental",
    image: secondImage,

    stats: [
      { label: "YouTube Growth", val: "5K → 50K+" },
      { label: "Instagram Growth", val: "7K → 80K+" },
      { label: "Website Launch", val: "Complete" },
    ],
    summary:
      "We built a complete digital growth ecosystem for SmileWithNeetu by combining content strategy, social media management, and web development. Our team grew the YouTube channel from 5K to over 50K subscribers, expanded Instagram from 7K to 80K+ followers, and developed a modern website that unified the brand across every digital touchpoint. The result was a significantly stronger online presence, higher audience engagement, and increased patient trust.",
    color: "from-yellow-500/30 to-orange-500/20",
    videoLabel: "Dental_Growth",
    links: {
      youtube: "https://www.youtube.com/@drneetuagarwal",
      instagram:
        "https://www.instagram.com/drneetuagarwal18?igsh=NTJuZXZlMGpqdmQ5",
      website: "https://muskandentalcare.in",
    },
  },
];

interface Project {
  title: string;
  client: string;
  industry: string;
  image: string | StaticImageData;
  summary: string;
  color: string;
  videoLabel: string;

  stats: {
    label: string;
    val: string;
  }[];

  links: {
    youtube: string;
    instagram: string;
    website: string;
  };
}

export default function Work() {
  return (
    <section id="work" className="relative py-24 bg-background z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        {/* Section Header */}
        <div className="flex flex-col items-start gap-4 mb-20">
          <span className="text-xs uppercase font-space font-bold tracking-widest text-primary">
            Case Studies
          </span>
          <h2 className="text-4xl md:text-6xl font-space font-bold tracking-tighter uppercase text-white leading-none">
            Systems built <br />
            for{" "}
            <span className="font-serif-italic italic font-normal text-primary lowercase">
              impact.
            </span>
          </h2>
          <p className="mt-4 text-sm md:text-base text-muted-custom max-w-lg font-medium">
            Real transformations for businesses scaling their digital
            operations.
          </p>
        </div>

        {/* Vertical Stack of Projects */}
        <div className="flex flex-col gap-12">
          {projects.map((proj, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="w-full rounded-[32px] glass border border-white/5 p-8 md:p-12 flex flex-col lg:flex-row justify-between gap-8 md:gap-12 relative overflow-hidden backdrop-blur-md"
            >
              {/* Card visual background glow */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

              {/* Left Column: Metrics & Info */}
              <div className="flex flex-col justify-between lg:w-1/2 z-10">
                <div>
                  {/* Category Tracker */}
                  <div className="flex justify-between items-center border-b border-white/5 pb-4 mb-6">
                    <div>
                      <span className="text-[10px] font-bold text-primary uppercase tracking-widest block mb-0.5">
                        CLIENT
                      </span>
                      <h4 className="text-sm font-bold text-white uppercase">
                        {proj.client}
                      </h4>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-bold text-[#B8B8B8] uppercase tracking-widest block mb-0.5">
                        INDUSTRY
                      </span>
                      <span className="text-[11px] text-muted-custom font-medium uppercase">
                        {proj.industry}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-space font-bold uppercase tracking-tight text-white mb-4">
                    {proj.title}
                  </h3>
                  <p className="text-xs text-muted-custom leading-relaxed">
                    {proj.summary}
                  </p>
                </div>

                {/* Metrics Stats Grid */}
                <div className="grid grid-cols-3 gap-4 border-t border-white/5 pt-6 mt-6">
                  {proj.stats.map((stat, sIdx) => (
                    <div key={sIdx}>
                      <span className="text-[8px] uppercase font-bold tracking-widest text-muted-custom/70 block mb-1">
                        {stat.label}
                      </span>
                      <span className="text-base md:text-xl font-space font-black text-white">
                        {stat.val}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Visual Frame */}
              <div className="lg:w-1/2 h-[340px] md:h-[420px] rounded-2xl bg-neutral-950 border border-white/5 overflow-hidden flex flex-col p-6 relative group select-none">
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/60 group-hover:to-black/30 transition-all duration-300 pointer-events-none z-10" />

                {/* Status Bar */}
                <div className="flex justify-between items-center z-10">
                  <div className="px-2.5 py-1 rounded bg-black/65 text-[9px] font-black tracking-wider text-rose-500 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-pulse" />
                    {proj.videoLabel}
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:text-primary transition-colors">
                    <Eye className="w-4 h-4" />
                  </div>
                </div>

                {/* Metric Graph Graphic representation */}

                {/* Project Preview Image */}
                <div className="relative my-6 flex-1 rounded-xl overflow-hidden border border-white/10 z-10">
                  <Image
                    src={proj.image}
                    alt={proj.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                </div>
                {/* Video Play action indicator */}
                <div className="flex gap-3 mt-2 z-10">
                  <a href={proj.links.youtube} target="_blank">
                    <Youtube className="w-5 h-5 text-white hover:text-red-500 transition" />
                  </a>

                  <a href={proj.links.instagram} target="_blank">
                    <Instagram className="w-5 h-5 text-white hover:text-pink-500 transition" />
                  </a>

                  <a href={proj.links.website} target="_blank">
                    <Globe className="w-5 h-5 text-white hover:text-primary transition" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
