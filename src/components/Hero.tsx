"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Film, TrendingUp, Presentation, Play, Calendar } from "lucide-react";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Coordinates relative to center
    const x = e.clientX - rect.left - width / 2;
    const y = e.clientY - rect.top - height / 2;

    // Max tilt is 12 degrees
    const rX = -(y / (height / 2)) * 12;
    const rY = (x / (width / 2)) * 12;

    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const handleScrollTo = (
    e:
      | React.MouseEvent<HTMLAnchorElement>
      | React.MouseEvent<HTMLButtonElement>,
    targetId: string,
  ) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    const lenis = (window as any).lenis;
    if (element) {
      if (lenis) {
        lenis.scrollTo(element, { offset: -60, duration: 1.5 });
      } else {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section
      id="home"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen w-full flex items-center justify-center pt-24 pb-16 px-6 md:px-12 lg:px-24 overflow-hidden z-10"
    >
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center z-10">
        {/* Left: Huge typography headings */}
        <div className="lg:col-span-7 flex flex-col items-start justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mb-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-white/5"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#B8B8B8]">
              Intelligent Operations
            </span>
          </motion.div>

          <h1 className="font-space text-4xl sm:text-5xl md:text-6xl lg:text-[4.8rem] xl:text-[5.6rem] font-bold leading-[0.95] tracking-[-0.04em] text-white select-none">
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="block"
            >
              We Build
            </motion.span>

            <motion.span
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="font-serif italic font-normal text-white/60 block text-[0.8em] leading-none mt-1"
            >
              brands that
            </motion.span>

            <motion.span
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="block mt-2"
            >
              <span className="text-[#2F80FF]">Scale.</span>
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mt-8 text-sm md:text-base text-muted-custom max-w-md font-sans font-medium"
          >
            We combine strategic content, social media management, and
            AI-powered automation to help businesses grow faster, work smarter,
            and stand out online.{" "}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <a
              onClick={(e) => handleScrollTo(e, "work")}
              href="#work"
              data-cursor-label="View"
              className="px-8 py-4 bg-white text-black font-bold text-xs uppercase tracking-wider rounded-full hover:bg-neutral-200 transition-all duration-300 shadow-lg hover:shadow-white/10 active:scale-95 cursor-pointer"
            >
              See Our Work
            </a>
            <button
              onClick={(e) => handleScrollTo(e, "contact")}
              data-cursor-label="Book"
              className="px-8 py-4 bg-black border border-white/10 text-white font-bold text-xs uppercase tracking-wider rounded-full hover:bg-white/5 transition-all duration-300 active:scale-95 relative overflow-hidden group cursor-pointer"
            >
              <span className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              Book a Call
            </button>
          </motion.div>
        </div>

        {/* Right: Stack of 3D rotating reels */}
        <div className="lg:col-span-5 flex items-center justify-center lg:pl-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.0, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{
              transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
              transformStyle: "preserve-3d",
              transition: "transform 0.15s ease-out",
            }}
            className="relative w-full max-w-[380px] h-[480px] flex items-center justify-center"
          >
            {/* Glowing backdrop shadow */}
            <div className="absolute inset-0 bg-primary/20 rounded-3xl blur-[80px] -z-10 mix-blend-screen animate-pulse-slow" />

            {/* Card 1: Main Instagram Reel Card */}
            <div
              style={{ transform: "translateZ(50px)" }}
              className="absolute w-[240px] h-[420px] rounded-3xl glass backdrop-blur-md p-5 flex flex-col justify-between border border-white/12 z-20 blue-glow"
            >
              <div className="flex justify-between items-center bg-white/5 rounded-full p-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                    <Film className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <span className="text-[10px] font-bold text-white uppercase tracking-wider">
                    SYSTEM_FLOW
                  </span>
                </div>
                <div className="px-2 py-0.5 rounded-full bg-primary/20 text-[8px] font-bold text-primary">
                  ACTIVE
                </div>
              </div>

              {/* Media preview visual: editing timeline */}
              <div className="my-4 flex-grow rounded-2xl bg-neutral-900 border border-white/5 flex flex-col items-center justify-center overflow-hidden relative group">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                <div className="absolute top-3 left-3 z-10 px-2 py-0.5 rounded bg-black/60 text-[9px] font-black text-rose-500 flex items-center gap-1 select-none">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-ping" />
                  RUNNING
                </div>

                {/* Waveform graphic bars */}
                <div className="absolute bottom-5 left-4 right-4 z-10 flex items-end gap-0.5 h-8">
                  <div className="w-1 bg-primary/70 h-4 rounded-full animate-[pulse_1.2s_infinite]" />
                  <div className="w-1 bg-primary/70 h-6 rounded-full animate-[pulse_0.8s_infinite] delay-100" />
                  <div className="w-1 bg-glow h-5 rounded-full animate-[pulse_1.0s_infinite]" />
                  <div className="w-1 bg-primary h-8 rounded-full animate-[pulse_1.4s_infinite] delay-300" />
                  <div className="w-1 bg-primary/70 h-4 rounded-full animate-[pulse_0.9s_infinite] delay-200" />
                  <div className="w-1 bg-white/70 h-2 rounded-full" />
                  <div className="w-1 bg-primary/70 h-6 rounded-full animate-[pulse_1.1s_infinite] delay-75" />
                  <div className="w-1 bg-glow h-7 rounded-full animate-[pulse_1.3s_infinite]" />
                  <div className="w-1 bg-primary/60 h-4 rounded-full animate-[pulse_0.7s_infinite] delay-150" />
                  <div className="w-1 bg-primary h-5 rounded-full" />
                </div>

                <div className="w-12 h-12 rounded-full bg-primary/95 flex items-center justify-center z-10 shadow-lg cursor-pointer hover:scale-115 transition-transform duration-200">
                  <Play className="w-5 h-5 fill-white text-white ml-0.5" />
                </div>
              </div>

              <div className="flex justify-between items-center text-white">
                <div>
                  <span className="text-[8px] text-muted-custom uppercase font-bold tracking-wider">
                    SPEED
                  </span>
                  <div className="text-sm font-black">+42% Efficiency</div>
                </div>
                <div className="text-right">
                  <span className="text-[8px] text-muted-custom uppercase font-bold tracking-wider">
                    REACH
                  </span>
                  <div className="text-sm font-black text-primary">1.2M</div>
                </div>
              </div>
            </div>

            {/* Card 2: Backwards YouTube Stats Card */}
            <div
              style={{
                transform:
                  "translateZ(10px) rotate(-8deg) translateX(-110px) translateY(-50px)",
              }}
              className="absolute w-[210px] h-[280px] rounded-2xl glass p-4 flex flex-col justify-between border border-white/5 opacity-80 hover:opacity-100 transition-opacity duration-300"
            >
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-accent-gold/20 flex items-center justify-center">
                  <TrendingUp className="w-3 h-3 text-accent-gold" />
                </div>
                <span className="text-[9px] font-bold text-white uppercase tracking-wider">
                  Growth Analytics
                </span>
              </div>

              {/* Progress bar visual */}
              <div className="my-2 bg-neutral-900 border border-white/5 p-3 rounded-xl flex flex-col gap-2">
                <span className="text-[8px] text-muted-custom uppercase font-bold">
                  Conversion Rate
                </span>
                <div className="h-2 w-full bg-neutral-800 rounded-full overflow-hidden">
                  <div className="h-full bg-accent-gold rounded-full w-[84%]" />
                </div>
                <span className="text-right text-[10px] font-black text-accent-gold">
                  14.2%
                </span>
              </div>

              <div>
                <span className="text-[8px] text-[#B8B8B8] uppercase font-bold">
                  Presence
                </span>
                <h4 className="text-xs font-bold text-white mt-1">
                  New Contacts
                </h4>
                <div className="text-lg font-black text-[#D8A84D]">+124K</div>
              </div>
            </div>

            {/* Card 3: Forward Brand Identity / Thumbnail Card */}
            <div
              style={{
                transform:
                  "translateZ(80px) rotate(6deg) translateX(110px) translateY(70px)",
              }}
              className="absolute w-[180px] h-[240px] rounded-2xl glass p-4 flex flex-col justify-between border border-white/8 z-30"
            >
              <div className="flex items-center gap-1.5">
                <Presentation className="w-4 h-4 text-primary" />
                <span className="text-[9px] font-bold text-white uppercase tracking-wider">
                  SYSTEM LOAD
                </span>
              </div>

              <div className="my-2 w-full h-24 rounded-lg bg-neutral-900 border border-white/5 overflow-hidden flex flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-800 via-neutral-900 to-black p-2">
                <div className="text-[80px] leading-none select-none font-bold text-white opacity-2 animate-pulse">
                  SYS
                </div>
                <div className="text-[7.5px] font-black tracking-widest text-[#B8B8B8] uppercase mt-1">
                  INTELLIGENT SYSTEMS
                </div>
              </div>

              <div className="flex justify-between items-center text-white">
                <div>
                  <span className="text-[7px] text-[#B8B8B8] uppercase font-bold">
                    uptime
                  </span>
                  <div className="text-xs font-black text-rose-500">99.9%</div>
                </div>
                <div className="text-right">
                  <span className="text-[7px] text-[#B8B8B8] uppercase font-bold">
                    Leads
                  </span>
                  <div className="text-xs font-black text-green-400">12.5k</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
