"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import {
  Play,
  Globe,
  Video,
  TrendingUp,
  Code,
  ArrowUpRight,
  Clock
} from "lucide-react";

// Import existing images
import firstImage from "../../public/images/first Imgae.png";
import secondImage from "../../public/images/second Image.png";
import aiImage1 from "../../public/images/ai image 1.png";
import shortImage1 from "../../public/images/short image 1.png";
import shortImage2 from "../../public/images/short image 2.png";
import shortImage3 from "../../public/images/short image 3.png";
import aiImage2 from "../../public/images/ai image 2.png"

// Interface definitions
interface LenisWindow {
  lenis?: {
    scrollTo: (target: HTMLElement, options?: { offset?: number; duration?: number }) => void;
  };
}

interface StatItem {
  label: string;
  val: string;
}

interface ShortFormVideoWork {
  title?: string;
  client?: string;
  platform?: string;
  duration?: string;
  videoLabel?: string;
  link: string;
  image: StaticImageData | string;
}

interface SMMWork {
  client: string;
  title: string;
  instagramGrowth: string;
  youtubeGrowth: string;
  beforeAfter: string;
  engagementIncrease: string;
  followersGained: string;
  websiteBuilt?: string;
  websiteLink?: string;
  image: StaticImageData | string;
}

interface WebDevWork {
  title: string;
  client: string;
  techStack: string[];
  liveUrl: string;
  caseStudyUrl?: string;
  desktopImage: StaticImageData | string;
  mobileImage: StaticImageData | string;
}

type WorkItem = ShortFormVideoWork | SMMWork | WebDevWork;

interface ServiceSection {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  stats: StatItem[];
  works: WorkItem[];
}

// ----------------------------------------------------
// Animated Count-Up Hook/Component
// ----------------------------------------------------
function Counter({ value, duration = 1.2 }: { value: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const match = value.match(/^(\d+(?:\.\d+)?)(.*)$/);
  const targetNumber = match ? parseFloat(match[1]) : 0;
  const suffix = match ? match[2] : "";

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = targetNumber;
    if (start === end) {
      setCount(end);
      return;
    }

    const startTime = performance.now();

    const updateCount = (currentTime: number) => {
      const elapsed = (currentTime - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);

      // cubic out easing
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const currentVal = start + (end - start) * easeOutCubic;

      setCount(currentVal);

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(updateCount);
  }, [isInView, targetNumber, duration]);

  const displayVal = targetNumber % 1 === 0
    ? Math.floor(count).toString()
    : count.toFixed(1);

  return (
    <span ref={ref}>
      {displayVal}
      {suffix}
    </span>
  );
}

// ----------------------------------------------------
// SVG Follower Growth Graph for Social Media Management
// ----------------------------------------------------
function GrowthGraph() {
  return (
    <div className="relative w-full bg-neutral-950/40 rounded-2xl border border-white/5 p-5 overflow-hidden">
      <div className="flex justify-between items-center mb-4">
        <div>
          <span className="text-[9px] font-bold text-muted-custom/75 tracking-wider uppercase block">Growth Curve</span>
          <span className="text-sm font-space font-bold text-white uppercase">6-Month Trajectory</span>
        </div>
        <span className="text-xs font-space font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
          +480% AVG
        </span>
      </div>
      <svg className="w-full h-24 overflow-visible" viewBox="0 0 300 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2F80FF" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#2F80FF" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Grid lines */}
        <line x1="0" y1="20" x2="300" y2="20" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
        <line x1="0" y1="50" x2="300" y2="50" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
        <line x1="0" y1="80" x2="300" y2="80" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />

        {/* Path line */}
        <motion.path
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.8, ease: "easeInOut" }}
          d="M 0 85 C 50 82, 80 50, 150 45 C 220 40, 250 15, 300 8"
          fill="none"
          stroke="#2F80FF"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        {/* Gradient Fill under path */}
        <motion.path
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8 }}
          d="M 0 85 C 50 82, 80 50, 150 45 C 220 40, 250 15, 300 8 L 300 100 L 0 100 Z"
          fill="url(#chartGlow)"
        />
        {/* Pulse points */}
        <motion.circle
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.5, type: "spring" }}
          cx="300"
          cy="8"
          r="4.5"
          fill="#2F80FF"
        />
        <motion.circle
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.5, type: "spring" }}
          cx="300"
          cy="8"
          r="9"
          fill="none"
          stroke="#2F80FF"
          strokeWidth="1.5"
          className="animate-ping"
          style={{ transformOrigin: '300px 8px' }}
        />
      </svg>
      <div className="flex justify-between items-center text-[9px] text-muted-custom/60 uppercase tracking-widest mt-2 border-t border-white/5 pt-2">
        <span>Month 1</span>
        <span>Month 3</span>
        <span>Month 6</span>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// Interactive Device Mockups for Web Dev
// ----------------------------------------------------
function DeviceMockup({
  desktopImg,
  mobileImg,
  title
}: {
  desktopImg: StaticImageData | string;
  mobileImg: StaticImageData | string;
  title: string;
}) {
  return (
    <div className="relative w-full h-[320px] md:h-[400px] flex items-center justify-center select-none group">
      {/* Background glow behind mockup */}
      <div className="absolute w-[60%] h-[60%] rounded-full bg-primary/5 blur-[80px] pointer-events-none" />

      {/* Desktop Browser Frame */}
      <motion.div
        className="absolute w-[78%] md:w-[75%] aspect-[1.6] rounded-2xl border border-white/10 bg-[#0c0c0c] overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] z-10 left-[4%] top-[12%]"
        whileHover={{ y: -8, rotateX: 2, rotateY: -1.5, scale: 1.01 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Browser Top bar */}
        <div className="h-6 md:h-8 border-b border-white/5 bg-neutral-950/90 px-3 md:px-4 flex items-center gap-1.5">
          <div className="w-1.5 md:w-2 h-1.5 md:h-2 rounded-full bg-rose-500/70" />
          <div className="w-1.5 md:w-2 h-1.5 md:h-2 rounded-full bg-amber-500/70" />
          <div className="w-1.5 md:w-2 h-1.5 md:h-2 rounded-full bg-emerald-500/70" />
          <div className="h-3 md:h-4 w-32 md:w-44 rounded bg-white/5 border border-white/5 mx-auto" />
        </div>
        {/* Screen Content */}
        <div className="relative w-full h-[calc(100%-1.5rem)] md:h-[calc(100%-2rem)]">
          <Image
            src={desktopImg}
            alt={`${title} Desktop Mockup`}
            fill
            className="object-cover object-top transition-transform duration-700 group-hover:scale-102"
          />
        </div>
      </motion.div>

      {/* Overlapping Mobile Phone Mockup */}
      <motion.div
        className="absolute w-[24%] md:w-[21%] aspect-[0.49] rounded-[22px] md:rounded-[32px] border border-white/15 bg-black p-1 md:p-1.5 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95)] z-20 right-[5%] bottom-[8%] overflow-hidden"
        whileHover={{ y: -12, rotateX: -2, rotateY: 3, scale: 1.03 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="w-full h-full rounded-[18px] md:rounded-[26px] overflow-hidden border border-white/5 relative bg-neutral-900">
          {/* Dynamic Island Notch */}
          <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-[35%] h-3.5 rounded-full bg-black z-30 border border-white/10 flex items-center justify-center">
            <div className="w-1 h-1 rounded-full bg-neutral-800" />
          </div>
          {/* Screen Content */}
          <Image
            src={mobileImg}
            alt={`${title} Mobile Mockup`}
            fill
            className="object-cover object-top"
          />
        </div>
      </motion.div>
    </div>
  );
}

// ----------------------------------------------------
// Reusable Video Gallery Component
// ----------------------------------------------------
interface VideoGalleryProps {
  works: ShortFormVideoWork[];
  className?: string;
}

function VideoGallery({ works, className = "grid grid-cols-1 md:grid-cols-3 gap-6" }: VideoGalleryProps) {
  return (
    <div className={className}>
      {works.map((work, wIdx) => (
        <motion.div
          key={wIdx}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: wIdx * 0.1 }}
          className="group relative flex flex-col justify-between h-[380px] rounded-3xl border border-white/5 bg-neutral-950 overflow-hidden select-none"
        >
          {/* Overlay to dim bottom area */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-10 pointer-events-none" />

          {/* Thumbnail image and zoom on hover */}
          <div className="absolute inset-0 z-0">
            {work.image && (
              <Image
                src={work.image}
                alt={work.title || "Video thumbnail"}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            )}
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
          </div>

          {/* Top controls preview metadata */}
          {(work.videoLabel || work.duration) && (
            <div className="p-5 flex justify-between items-center z-10">
              {work.videoLabel ? (
                <span className="px-2.5 py-1 rounded bg-black/60 text-[9px] font-black tracking-wider text-rose-500 flex items-center gap-1.5 border border-white/5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-pulse" />
                  {work.videoLabel}
                </span>
              ) : (
                <div />
              )}
              {work.duration && (
                <span className={`px-2 py-0.5 rounded bg-black/60 text-[9px] font-bold text-white/80 flex items-center gap-1 border border-white/5 ${!work.videoLabel ? "ml-auto" : ""}`}>
                  <Clock className="w-3 h-3 text-primary" />
                  {work.duration}
                </span>
              )}
            </div>
          )}

          {/* Play Video hover overlay */}
          <div className="absolute inset-0 flex items-center justify-center z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="w-14 h-14 rounded-full bg-primary/95 border border-white/20 flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-all duration-300">
              <Play className="w-6 h-6 text-white fill-white ml-0.5" />
            </div>
          </div>

          {/* Footer Details */}
          <div className="p-6 mt-auto z-10 flex flex-col gap-3">
            {(work.client || work.title) && (
              <div>
                {work.client && (
                  <span className="text-[9px] font-bold text-primary tracking-widest uppercase block mb-1">
                    {work.client}
                  </span>
                )}
                {work.title && (
                  <h4 className="text-base font-space font-bold uppercase tracking-tight text-white line-clamp-2 leading-tight group-hover:text-primary transition-colors duration-300">
                    {work.title}
                  </h4>
                )}
              </div>
            )}
            <div className="flex justify-between items-center pt-2 border-t border-white/5">
              {work.platform && (
                <span className="text-[10px] text-muted-custom font-medium uppercase">{work.platform}</span>
              )}
              <a
                href={work.link}
                target="_blank"
                rel="noreferrer"
                className={`text-xs text-white hover:text-primary transition-colors flex items-center gap-1 ${!work.platform ? "ml-auto" : ""}`}
              >
                <span>Watch</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// ----------------------------------------------------
// Main Redesigned Work Component
// ----------------------------------------------------
export default function Work() {
  const [activeService, setActiveService] = useState("short-form-videos");
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');
  const [lastScrollY, setLastScrollY] = useState(0);

  // Scroll direction detection to offset subnav elegantly under main navbar
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setScrollDirection('down');
      } else if (currentScrollY < lastScrollY) {
        setScrollDirection('up');
      }
      setLastScrollY(currentScrollY);

      // Scrollspy detection
      const services = [
        "short-form-videos",
        "social-media-management",
        "ai-powered-content",
        "website-development"
      ];
      for (const service of services) {
        const el = document.getElementById(service);
        if (el) {
          const rect = el.getBoundingClientRect();
          // Active if section top passes near midpoint of viewport or section contains screen midpoint
          if (rect.top <= 240 && rect.bottom >= 240) {
            setActiveService(service);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Click scrolling using Lenis if available
  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const lenis = (window as unknown as LenisWindow).lenis;
      if (lenis) {
        // Offset below sticky subnav: subnav is 64px, spacing is 24px = ~96px
        lenis.scrollTo(element, { offset: -110, duration: 1.2 });
      } else {
        const offset = 110;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    }
  };

  // Modular Data Structure
  const services: ServiceSection[] = [
    {
      id: "short-form-videos",
      title: "Short Form Videos",
      icon: Video,
      description: "Premium high-impact hooks, color grading, and dynamic retention edits engineered for virality across all short-form platforms.",
      stats: [
        { label: "Total Views Delivered", val: "15M+" },
        { label: "Videos Engineered", val: "120+" },
        { label: "Avg. Watch Time", val: "88%" },
        { label: "Engagement Increase", val: "4.5x" }
      ],
      works: [  
        {
          link: "https://res.cloudinary.com/divajtjxo/video/upload/v1785517284/short_form_3_h0bog3.mp4",
          image: shortImage1
        },
        {
          link: "https://res.cloudinary.com/divajtjxo/video/upload/v1785517279/short_form_4_vxl2bd.mp4",
          image: shortImage2
        },
        {
          link: "https://res.cloudinary.com/divajtjxo/video/upload/v1785517276/short_form_2_drzlkw.mp4",
          image: shortImage3
        }
      ] as ShortFormVideoWork[]
    },
    {
      id: "social-media-management",
      title: "Social Media Management",
      icon: TrendingUp,
      description: "Data-driven profile architecting, channel growth optimization, and multi-platform presence management that converts traffic to clients.",
      stats: [
        { label: "Client Follower Growth", val: "150K+" },
        { label: "Active Channels Managed", val: "8+" },
        { label: "Monthly Impressions", val: "4M+" },
        { label: "Client Retainer Period", val: "12mo+" }
      ],
      works: [
        {
          client: "Seraphic Dental Clinic",
          title: "100K YouTube Milestone Strategy",
          instagramGrowth: "8K → 42K followers",
          youtubeGrowth: "15K → 100K+ subscribers",
          beforeAfter: "+660% Net Reach",
          engagementIncrease: "12.8% Average",
          followersGained: "85K+ Net Growth",
          websiteBuilt: "seraphicdental.com",
          websiteLink: "https://seraphicdental.com",
          image: firstImage
        },
        {
          client: "SmileWithNeetu",
          title: "Multi-Channel Growth Ecosystem",
          instagramGrowth: "7K → 80K+ followers",
          youtubeGrowth: "5K → 50K+ subscribers",
          beforeAfter: "+10x Content Reach",
          engagementIncrease: "9.5% Average",
          followersGained: "118K+ Total Growth",
          websiteBuilt: "muskandentalcare.in",
          websiteLink: "https://muskandentalcare.in",
          image: secondImage
        }
      ] as SMMWork[]
    },
    {
      id: "ai-powered-content",
      title: "Short Form Videos",
      icon: Video,
      description: "Premium high-impact hooks, color grading, and dynamic retention edits engineered for virality across all short-form platforms.",
      stats: [
        { label: "Total Views Delivered", val: "15M+" },
        { label: "Videos Engineered", val: "120+" },
        { label: "Avg. Watch Time", val: "88%" },
        { label: "Engagement Increase", val: "4.5x" }
      ],
      works: [  
        {
          link: "https://res.cloudinary.com/divajtjxo/video/upload/v1785517272/Ai_1_lsnube.mp4",
          image: aiImage1
        },
        {
          link: "https://res.cloudinary.com/divajtjxo/video/upload/v1785517272/short_form_1_s9cdmp.mp4",
          image: aiImage2
        }
      ] as ShortFormVideoWork[]
    },
    {
      id: "website-development",
      title: "Website Development",
      icon: Code,
      description: "Next-gen custom web architectures built with React/Next.js, optimized for maximum speed, interactive animations, and lead acquisition.",
      stats: [
        { label: "Avg. Lighthouse Score", val: "98%" },
        { label: "FCP Speed Performance", val: "0.3s" },
        { label: "Average Lead Conversion", val: "3.5x" },
        { label: "Total Digital Assets", val: "10" }
      ],
      works: [
        {
          title: "Seraphic Dental Clinic Landing Suite",
          client: "Seraphic Dental Clinic",
          techStack: ["Next.js", "TypeScript", "TailwindCSS", "Framer Motion"],
          liveUrl: "https://seraphicdental.com",
          desktopImage: firstImage,
          mobileImage: secondImage
        },
        {
          title: "SmileWithNeetu Unified Growth Hub",
          client: "SmileWithNeetu",
          techStack: ["React", "Next.js", "Lenis Scroll", "PostCSS"],
          liveUrl: "https://muskandentalcare.in",
          desktopImage: secondImage,
          mobileImage: firstImage
        }
      ] as WebDevWork[]
    }
  ];

  return (
    <section id="work" className="relative py-28 bg-[#050505] z-10">

      {/* CSS style block injected for hiding scrollbars on mobile subnav */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-none {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">

        {/* Section Header */}
        <div className="flex flex-col items-start gap-4 mb-16">
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
            Explore our work across every stage of the digital growth ecosystem.
          </p>
        </div>

        {/* ================================================== */}
        {/* STICKY WORK SUB-NAVIGATION BAR                     */}
        {/* ================================================== */}
        <div
          className="sticky z-40 w-full mb-20 transition-all duration-300 ease-out"
          style={{ top: scrollDirection === 'up' ? '96px' : '24px' }}
        >
          <div className="glass-nav rounded-full p-1.5 flex items-center justify-between shadow-[0_12px_40px_-6px_rgba(0,0,0,0.85)] max-w-5xl mx-auto overflow-hidden">
            <div className="flex items-center gap-1 w-full overflow-x-auto scrollbar-none snap-x snap-mandatory px-2">
              {services.map((svc) => {
                const Icon = svc.icon;
                const isActive = activeService === svc.id;
                return (
                  <a
                    key={svc.id}
                    href={`#${svc.id}`}
                    onClick={(e) => scrollToSection(e, svc.id)}
                    className={`relative px-4 py-2 rounded-full font-space text-[10px] md:text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 select-none cursor-pointer snap-start shrink-0 ${isActive ? "text-white" : "text-muted-custom hover:text-white/90"
                      }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? "text-white" : "text-primary"}`} />
                    <span>{svc.title}</span>

                    {isActive && (
                      <motion.div
                        layoutId="activeServiceIndicator"
                        className="absolute inset-0 bg-primary rounded-full -z-10 shadow-[0_4px_16px_rgba(47,128,255,0.4)]"
                        transition={{ type: "spring", stiffness: 350, damping: 28 }}
                      />
                    )}
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* ================================================== */}
        {/* PORTFOLIO SERVICE SECTIONS                         */}
        {/* ================================================== */}
        <div className="flex flex-col gap-32">
          {services.map((service, sIdx) => {
            const SvcIcon = service.icon;

            return (
              <motion.div
                key={service.id}
                id={service.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="scroll-mt-36"
              >

                {/* Service Header Info */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12 border-b border-white/5 pb-8">
                  <div className="lg:col-span-5 flex flex-col items-start gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                        <SvcIcon className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-[10px] font-bold text-primary tracking-widest uppercase font-space">
                        SERVICE 0{sIdx + 1}
                      </span>
                    </div>
                    <h3 className="text-3xl md:text-4xl font-space font-bold uppercase tracking-tight text-white mt-2">
                      {service.title}
                    </h3>
                  </div>
                  <div className="lg:col-span-7">
                    <p className="text-sm text-muted-custom leading-relaxed max-w-2xl">
                      {service.description}
                    </p>
                  </div>
                </div>

                {/* Animated Statistics Row */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12 bg-neutral-950/20 border border-white/5 rounded-3xl p-6 md:p-8">
                  {service.stats.map((stat, statIdx) => (
                    <div key={statIdx} className="flex flex-col">
                      <span className="text-[8px] md:text-[9px] uppercase font-bold tracking-widest text-muted-custom/70 mb-1">
                        {stat.label}
                      </span>
                      <span className="text-2xl md:text-3xl font-space font-black text-white">
                        <Counter value={stat.val} />
                      </span>
                    </div>
                  ))}
                </div>

                {/* Showcase Renderers based on Service ID */}

                {/* 1. SHORT FORM VIDEOS GRID */}
                {service.id === "short-form-videos" && (
                  <VideoGallery works={service.works as ShortFormVideoWork[]} />
                )}

                {/* 2. SOCIAL MEDIA MANAGEMENT LIST */}
                {service.id === "social-media-management" && (
                  <div className="flex flex-col gap-10">
                    {(service.works as SMMWork[]).map((work: SMMWork, wIdx) => (
                      <div
                        key={wIdx}
                        className="w-full rounded-[32px] glass p-8 md:p-12 flex flex-col lg:flex-row justify-between gap-8 md:gap-12 relative overflow-hidden"
                      >
                        {/* Glow effect */}
                        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

                        {/* Left Info: Before/After & Metrics */}
                        <div className="flex flex-col justify-between lg:w-1/2 z-10">
                          <div>
                            <div className="flex justify-between items-center border-b border-white/5 pb-4 mb-6">
                              <div>
                                <span className="text-[10px] font-bold text-primary uppercase tracking-widest block mb-0.5">CLIENT</span>
                                <h4 className="text-sm font-bold text-white uppercase">{work.client}</h4>
                              </div>
                              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full uppercase tracking-wider">
                                {work.beforeAfter}
                              </span>
                            </div>

                            <h3 className="text-2xl md:text-3xl font-space font-bold uppercase tracking-tight text-white mb-4">
                              {work.title}
                            </h3>

                            {/* Detailed metrics box */}
                            <div className="grid grid-cols-2 gap-4 mt-6">
                              <div className="p-4 rounded-2xl bg-neutral-950/40 border border-white/5">
                                <span className="text-[9px] text-muted-custom/70 font-bold uppercase tracking-wider block mb-1">Instagram</span>
                                <span className="text-sm font-space font-bold text-white block">{work.instagramGrowth}</span>
                              </div>
                              <div className="p-4 rounded-2xl bg-neutral-950/40 border border-white/5">
                                <span className="text-[9px] text-muted-custom/70 font-bold uppercase tracking-wider block mb-1">YouTube</span>
                                <span className="text-sm font-space font-bold text-white block">{work.youtubeGrowth}</span>
                              </div>
                              <div className="p-4 rounded-2xl bg-neutral-950/40 border border-white/5">
                                <span className="text-[9px] text-muted-custom/70 font-bold uppercase tracking-wider block mb-1">Engagement</span>
                                <span className="text-sm font-space font-bold text-white block">{work.engagementIncrease}</span>
                              </div>
                              <div className="p-4 rounded-2xl bg-neutral-950/40 border border-white/5">
                                <span className="text-[9px] text-muted-custom/70 font-bold uppercase tracking-wider block mb-1">Net Gain</span>
                                <span className="text-sm font-space font-bold text-white block">{work.followersGained}</span>
                              </div>
                            </div>
                          </div>

                          {work.websiteBuilt && (
                            <div className="border-t border-white/5 pt-6 mt-8 flex justify-between items-center">
                              <div>
                                <span className="text-[9px] text-muted-custom/75 font-bold uppercase tracking-wider block">Unified Ecosystem</span>
                                <span className="text-xs font-semibold text-white/90">{work.websiteBuilt}</span>
                              </div>
                              {work.websiteLink && (
                                <a
                                  href={work.websiteLink}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="w-10 h-10 rounded-xl bg-white/5 hover:bg-primary/20 border border-white/10 hover:border-primary/40 flex items-center justify-center text-white hover:text-primary transition-all active:scale-95"
                                >
                                  <Globe className="w-4 h-4" />
                                </a>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Right Column: Profile Showcase feeds & graph representation */}
                        <div className="lg:w-1/2 flex flex-col gap-6 z-10">
                          {/* Live follower growth graph SVG */}
                          <GrowthGraph />

                          {/* Profile Feed Mockups */}
                          <div className="bg-neutral-950/40 rounded-2xl border border-white/5 p-4 flex flex-col gap-3">
                            <div className="flex items-center gap-3 border-b border-white/5 pb-3">
                              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-yellow-500 via-red-500 to-purple-600 p-0.5">
                                <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-[10px] font-space font-black text-primary">EG</div>
                              </div>
                              <div>
                                <div className="flex items-center gap-1.5">
                                  <span className="text-xs font-black text-white uppercase tracking-tight">@{work.client.toLowerCase().replace(/\s+/g, '')}</span>
                                  <div className="w-3 h-3 rounded-full bg-primary flex items-center justify-center text-[6px] text-white">✓</div>
                                </div>
                                <span className="text-[9px] text-muted-custom/80 font-medium">Digital Authority Engine</span>
                              </div>
                            </div>

                            {/* Quick Post Grid */}
                            <div className="grid grid-cols-3 gap-2">
                              {[1, 2, 3].map((postIdx) => (
                                <div
                                  key={postIdx}
                                  className="relative aspect-square rounded-lg overflow-hidden border border-white/5 bg-neutral-900 group select-none cursor-pointer"
                                >
                                  {work.image && (
                                    <Image
                                      src={work.image}
                                      alt="Post thumbnail"
                                      fill
                                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                  )}
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end justify-between p-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="text-[8px] font-bold text-white flex items-center gap-0.5">
                                      <Play className="w-2 h-2 fill-white text-white" />
                                      {postIdx * 4}K
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                      </div>
                    ))}
                  </div>
                )}

                {/* 3. AI POWERED CONTENT */}
                {service.id === "ai-powered-content" && (
                  <VideoGallery works={service.works as ShortFormVideoWork[]} />
                )}

                {/* 4. WEBSITE DEVELOPMENT DEVICE MOCKUPS */}
                {service.id === "website-development" && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {(service.works as WebDevWork[]).map((work: WebDevWork, wIdx) => (
                      <div
                        key={wIdx}
                        className="flex flex-col gap-6"
                      >
                        {/* Immersive Device Mockups */}
                        <DeviceMockup
                          desktopImg={work.desktopImage}
                          mobileImg={work.mobileImage}
                          title={work.title}
                        />

                        {/* Description & Links */}
                        <div className="px-4">
                          <span className="text-[10px] font-bold text-primary uppercase tracking-widest block mb-1">
                            {work.client}
                          </span>
                          <h4 className="text-xl font-space font-bold uppercase tracking-tight text-white mb-4">
                            {work.title}
                          </h4>

                          {/* Tech Stack badges */}
                          <div className="flex flex-wrap gap-2 mb-6">
                            {work.techStack.map((tech, tIdx) => (
                              <span
                                key={tIdx}
                                className="px-2.5 py-1 rounded-md bg-neutral-950 border border-white/5 text-[9px] font-bold text-muted-custom uppercase tracking-wide"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>

                          {/* Action links */}
                          <div className="flex gap-4">
                            <a
                              href={work.liveUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="px-5 py-2.5 rounded-full bg-primary hover:bg-glow text-[10px] font-bold uppercase tracking-wider text-white flex items-center gap-2 transition-all hover:scale-[1.02] shadow-[0_4px_16px_rgba(47,128,255,0.3)] active:scale-95 cursor-pointer"
                            >
                              <Globe className="w-3.5 h-3.5" />
                              <span>Live Website</span>
                            </a>
                            <a
                              href="#contact"
                              onClick={(e) => {
                                e.preventDefault();
                                const contactEl = document.getElementById("contact");
                                if (contactEl) {
                                  const lenis = (window as unknown as LenisWindow).lenis;
                                  if (lenis) lenis.scrollTo(contactEl, { duration: 1.5 });
                                  else contactEl.scrollIntoView({ behavior: "smooth" });
                                }
                              }}
                              className="px-5 py-2.5 rounded-full bg-neutral-900 border border-white/5 hover:border-white/15 text-[10px] font-bold uppercase tracking-wider text-white/90 hover:text-white flex items-center gap-2 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
                            >
                              <span>Case Study Inquiry</span>
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
