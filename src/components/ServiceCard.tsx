'use client';

import { motion, MotionValue, useTransform } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import React, { useState } from 'react';

// Interfaces
interface ServiceItem {
  title: string;
  description: string;
  details: string[];
  icon: LucideIcon;
  color: string;
  glow: string;
}

interface ServiceCardProps {
  service: ServiceItem;
  index: number; // Index in servicesList (0-8)
  vIndex: number; // Virtual index in the carousel
  offset: MotionValue<number>;
  isActive: boolean;
  onClick: () => void;
}

export default function ServiceCard({
  service,
  index,
  vIndex,
  offset,
  isActive,
  onClick,
}: ServiceCardProps) {
  const Icon = service.icon;
  const [isHovered, setIsHovered] = useState(false);

  // transform mappings based on offset
  // Offset ranges:
  // -2: far left
  // -1: left
  //  0: active (center)
  //  1: right
  //  2: far right
  const scale = useTransform(offset, [-2, -1, 0, 1, 2], [0.72, 0.82, 1.0, 0.82, 0.72]);
  const rotateY = useTransform(offset, [-2, -1, 0, 1, 2], [30, 25, 0, -25, -30]);
  const translateZ = useTransform(offset, [-2, -1, 0, 1, 2], [-240, -180, 0, -180, -240]);
  
  // Custom horizontal spread: push side cards outwards to expose the center card clearly
  const translateX = useTransform(offset, [-2, -1, 0, 1, 2], [-480, -260, 0, 260, 480]);
  const opacity = useTransform(offset, [-2, -1, 0, 1, 2], [0.15, 0.45, 1.0, 0.45, 0.15]);
  
  // Dynamic filters
  const blurVal = useTransform(offset, (o) => {
    const abs = Math.abs(o);
    if (abs <= 0.05) return '0px';
    if (abs <= 1) return `${abs * 6}px`;
    return `${6 + (abs - 1) * 6}px`;
  });
  
  const brightnessVal = useTransform(offset, (o) => {
    const abs = Math.abs(o);
    if (abs <= 0.05) return 1;
    return Math.max(0.3, 1 - abs * 0.4);
  });

  const zIndexVal = useTransform(offset, (o) => {
    return Math.round(15 - Math.abs(o) * 4);
  });

  // Render unique SVG interactive previews per service
  const renderVisualPreview = () => {
    switch (index) {
      case 0: // Video Editing
        return (
          <div className="w-full h-full bg-neutral-950 flex flex-col justify-end p-4 font-mono text-[9px] relative overflow-hidden group/viz">
            {/* Audio waveform */}
            <div className="absolute inset-x-0 bottom-12 top-6 opacity-25 flex items-center justify-around px-6">
              {Array.from({ length: 24 }).map((_, i) => (
                <div 
                  key={i} 
                  className="w-1 bg-primary rounded-full transition-all duration-300"
                  style={{ 
                    height: `${15 + Math.sin(i * 0.5) * 20 + Math.random() * 10}%`,
                    animation: `pulse 1.5s ease-in-out infinite alternate`,
                    animationDelay: `${i * 0.05}s`
                  }} 
                />
              ))}
            </div>
            {/* Edit Tracks Mockup */}
            <div className="space-y-1.5 relative z-10">
              <div className="h-4 rounded bg-white/5 border border-white/5 flex items-center px-2 justify-between">
                <span className="text-white/40">V1_RAW_FOOTAGE.mp4</span>
                <span className="text-emerald-400">4K H.264</span>
              </div>
              <div className="h-4 rounded bg-primary/20 border border-primary/20 flex items-center px-2 justify-between">
                <span className="text-primary-foreground/80">A1_VOICE_DENOISE.wav</span>
                <span className="text-primary-foreground/60">-12db</span>
              </div>
              <div className="h-4 rounded bg-amber-500/20 border border-amber-500/10 flex items-center px-2">
                <span className="text-amber-400">SFX_WOOSH_HIT.wav</span>
              </div>
            </div>
            {/* Timeline playhead */}
            <div 
              className="absolute top-0 bottom-0 w-0.5 bg-rose-500 z-20 pointer-events-none"
              style={{
                left: '20%',
                animation: 'timeline-play 4s linear infinite',
                boxShadow: '0 0 8px 1px rgba(244, 63, 94, 0.5)'
              }}
            />
          </div>
        );
      case 1: // Short Form Content
        return (
          <div className="w-full h-full bg-neutral-950 flex items-center justify-center p-6 relative overflow-hidden">
            {/* Phone Frame */}
            <div className="w-[110px] h-[170px] rounded-2xl border-2 border-white/10 relative overflow-hidden bg-neutral-900 flex flex-col justify-between p-2 shadow-2xl">
              {/* Glowing captions mockup */}
              <div className="absolute inset-0 bg-radial-gradient from-blue-500/10 to-transparent pointer-events-none" />
              <div className="w-full h-1 bg-white/15 rounded-full mb-1" />
              <div className="flex flex-col items-center justify-center flex-1 gap-2">
                <span className="px-2 py-0.5 bg-yellow-500 text-black font-extrabold text-[8px] rounded uppercase tracking-tighter scale-110 animate-bounce">
                  VIRAL HOOK
                </span>
                <span className="text-[6px] text-white/50 font-bold uppercase text-center tracking-wide leading-none">
                  Engaging caption<br/>flashing
                </span>
              </div>
              {/* Mini user profile mockup */}
              <div className="flex items-center gap-1.5 mt-auto">
                <div className="w-4 h-4 rounded-full bg-primary/30 border border-white/10 flex items-center justify-center text-[5px] text-white font-bold">EG</div>
                <div className="flex-1 space-y-0.5">
                  <div className="w-8 h-1 bg-white/40 rounded-full" />
                  <div className="w-6 h-0.5 bg-white/20 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        );
      case 2: // Social Media Management
        return (
          <div className="w-full h-full bg-neutral-950 flex items-center justify-center relative overflow-hidden">
            <svg className="w-full h-full max-w-[200px]" viewBox="0 0 200 200">
              {/* Grid backdrop */}
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
              {/* Expanding shares nodes */}
              <g stroke="rgba(47, 128, 255, 0.2)" strokeWidth="1">
                <line x1="100" y1="100" x2="60" y2="70" />
                <line x1="100" y1="100" x2="140" y2="70" />
                <line x1="100" y1="100" x2="100" y2="150" />
                <line x1="60" y1="70" x2="40" y2="100" />
                <line x1="140" y1="70" x2="160" y2="100" />
              </g>
              {/* Main Node */}
              <circle cx="100" cy="100" r="14" fill="#2F80FF" opacity="0.8" className="animate-pulse" />
              <path d="M96 95 L106 100 L96 105 Z" fill="white" />
              {/* Sub Nodes */}
              <circle cx="60" cy="70" r="8" fill="#101010" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
              <circle cx="140" cy="70" r="8" fill="#101010" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
              <circle cx="100" cy="150" r="8" fill="#101010" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
              <circle cx="40" cy="100" r="6" fill="#101010" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
              <circle cx="160" cy="100" r="6" fill="#101010" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
              {/* Tiny Floating Metrics bubbles */}
              <g transform="translate(115, 80)">
                <rect x="0" y="0" width="30" height="12" rx="4" fill="rgba(47, 128, 255, 0.15)" stroke="rgba(47,128,255,0.4)" strokeWidth="0.5"/>
                <text x="5" y="9" fill="#2F80FF" fontSize="7" fontWeight="bold" fontFamily="monospace">+1.2k</text>
              </g>
            </svg>
          </div>
        );
      case 3: // YouTube Growth
        return (
          <div className="w-full h-full bg-neutral-950 flex flex-col justify-between p-4 relative overflow-hidden font-mono text-[9px]">
            {/* Header info */}
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <span className="text-white/40">CHANNEL METRICS</span>
              <span className="text-rose-500 font-bold">LIVE AUDIT</span>
            </div>
            {/* Chart line SVG */}
            <div className="flex-1 flex items-end relative my-2 h-[80px]">
              <svg className="w-full h-full" viewBox="0 0 150 60" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#FF2F2F" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#FF2F2F" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                {/* Area under curve */}
                <path d="M 0 60 Q 20 40 40 48 T 80 20 T 120 28 T 150 4 Z L 150 60 Z" fill="url(#chartGlow)" />
                {/* Curve Line */}
                <path d="M 0 60 Q 20 40 40 48 T 80 20 T 120 28 T 150 4" fill="none" stroke="#FF2F2F" strokeWidth="2" strokeLinecap="round" />
                {/* Pulse dot */}
                <circle cx="150" cy="4" r="3.5" fill="#FF2F2F" />
                <circle cx="150" cy="4" r="7" fill="none" stroke="#FF2F2F" strokeWidth="1" className="animate-ping" style={{ transformOrigin: '150px 4px' }} />
              </svg>
            </div>
            {/* Stats row */}
            <div className="grid grid-cols-2 gap-2 border-t border-white/5 pt-2">
              <div>
                <span className="text-white/40 block text-[7px] leading-tight">AVG CTR</span>
                <span className="text-white font-bold">14.2% <span className="text-emerald-500 text-[8px]">+3.2%</span></span>
              </div>
              <div>
                <span className="text-white/40 block text-[7px] leading-tight">VIEW GAIN</span>
                <span className="text-white font-bold">2.4M views</span>
              </div>
            </div>
          </div>
        );
      case 4: // Brand Design
        return (
          <div className="w-full h-full bg-neutral-950 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Vector graphics mockup */}
            <svg className="w-full h-full max-w-[180px]" viewBox="0 0 160 160">
              <defs>
                <pattern id="brandGrid" width="16" height="16" patternUnits="userSpaceOnUse">
                  <path d="M 16 0 L 0 0 0 16" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#brandGrid)" />
              {/* Construction guide circles */}
              <circle cx="80" cy="80" r="45" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="3 3" />
              <circle cx="80" cy="80" r="30" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
              {/* Anchor vector path drawing a customized curved geometric logo */}
              <path d="M 45 90 C 45 50, 115 50, 115 90 C 115 120, 80 130, 80 130" fill="none" stroke="#2F80FF" strokeWidth="2" strokeLinecap="round" />
              {/* Tangent guide lines */}
              <line x1="45" y1="90" x2="45" y2="60" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" strokeDasharray="2 2" />
              <line x1="115" y1="90" x2="115" y2="60" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" strokeDasharray="2 2" />
              {/* Anchor points squares */}
              <rect x="42" y="87" width="6" height="6" fill="#101010" stroke="#2F80FF" strokeWidth="1.5" />
              <rect x="112" y="87" width="6" height="6" fill="#101010" stroke="#2F80FF" strokeWidth="1.5" />
              <rect x="77" y="127" width="6" height="6" fill="#2F80FF" />
              {/* Handle endpoint dots */}
              <circle cx="45" cy="60" r="2.5" fill="#2F80FF" />
              <circle cx="115" cy="60" r="2.5" fill="#2F80FF" />
              {/* Mini Color Swatch Panel */}
              <g transform="translate(10, 135)">
                <rect x="0" y="0" width="10" height="10" fill="#2F80FF" rx="2" />
                <rect x="14" y="0" width="10" height="10" fill="#00D2D2" rx="2" />
                <rect x="28" y="0" width="10" height="10" fill="#FFFFFF" rx="2" />
                <rect x="42" y="0" width="10" height="10" fill="#1C1C1C" rx="2" />
              </g>
            </svg>
          </div>
        );
      case 5: // Motion Graphics
        return (
          <div className="w-full h-full bg-neutral-950 flex items-center justify-center relative overflow-hidden">
            {/* Spinning holographic 3D wireframe cube */}
            <div className="w-[100px] h-[100px] relative preserve-3d" style={{ perspective: '800px' }}>
              <div 
                className="absolute inset-0 border border-primary/45 rounded-lg flex items-center justify-center animate-spin"
                style={{
                  transformStyle: 'preserve-3d',
                  animationDuration: '8s',
                  boxShadow: '0 0 15px rgba(47, 128, 255, 0.15), inset 0 0 15px rgba(47, 128, 255, 0.1)'
                }}
              >
                {/* Secondary inner orbital ring */}
                <div 
                  className="w-16 h-16 rounded-full border border-cyan-400/40"
                  style={{
                    transform: 'rotateX(75deg) rotateY(15deg)',
                    animation: 'pulse 2s ease-in-out infinite alternate'
                  }}
                />
                {/* Inner glowing dot */}
                <div className="absolute w-2 h-2 rounded-full bg-white shadow-[0_0_12px_2px_#fff]" />
              </div>
            </div>
            <div className="absolute bottom-3 left-4 right-4 flex justify-between font-mono text-[7px] text-white/30">
              <span>FPS: 60.0</span>
              <span>RENDER: GPU_MESH</span>
            </div>
          </div>
        );
      case 6: // Meta Ads
        return (
          <div className="w-full h-full bg-neutral-950 flex flex-col justify-between p-4 relative overflow-hidden font-mono text-[9px]">
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <span className="text-white/40">CAMPAIGN SPLIT-TEST</span>
              <span className="text-emerald-400 font-bold">ROAS 4.8X</span>
            </div>
            {/* Comparison graph */}
            <div className="flex-1 flex items-end relative my-2 h-[80px]">
              <svg className="w-full h-full" viewBox="0 0 150 60" preserveAspectRatio="none">
                {/* Grid horizontal markers */}
                <line x1="0" y1="15" x2="150" y2="15" stroke="rgba(255,255,255,0.03)" strokeWidth="0.8" />
                <line x1="0" y1="35" x2="150" y2="35" stroke="rgba(255,255,255,0.03)" strokeWidth="0.8" />
                
                {/* Path A (Standard Campaign) */}
                <path d="M 0 50 Q 30 45 60 40 T 120 42 T 150 36" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeDasharray="3 3" />
                
                {/* Path B (Bespoke Creative Campaign) */}
                <path d="M 0 50 Q 30 35 60 25 T 120 12 T 150 2" fill="none" stroke="#2F80FF" strokeWidth="2.5" />
                <circle cx="150" cy="2" r="3" fill="#2F80FF" />
              </svg>
              {/* Conversion node tooltips */}
              <div className="absolute top-2 left-[65%] px-1.5 py-0.5 rounded bg-neutral-900 border border-primary/20 text-[6.5px] text-white">
                CREATIVE_WINNER
              </div>
            </div>
            <div className="flex items-center justify-between text-[7px] text-white/55">
              <span>Budget: scaling</span>
              <span className="text-primary font-bold">CPA: -32%</span>
            </div>
          </div>
        );
      case 7: // Thumbnail Design
        return (
          <div className="w-full h-full bg-neutral-950 flex items-center justify-center p-4 relative overflow-hidden font-mono">
            {/* Design frame grid mockup */}
            <div className="absolute inset-2 border border-white/5 rounded-lg flex flex-col justify-between p-2">
              <div className="flex justify-between text-[6px] text-white/30">
                <span>[RULE_OF_THIRDS]</span>
                <span>GRID: ACTIVE</span>
              </div>
              {/* Inner Layout guides */}
              <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none opacity-10">
                <div className="border-r border-b border-white" />
                <div className="border-r border-b border-white" />
                <div className="border-b border-white" />
                <div className="border-r border-b border-white" />
                <div className="border-r border-b border-white" />
                <div className="border-b border-white" />
                <div className="border-r border-white" />
                <div className="border-r border-white" />
                <div className="bg-transparent" />
              </div>
              
              {/* Bold Thumbnail Title Text overlay Mockup */}
              <div className="relative z-10 self-center flex flex-col items-center justify-center gap-1.5 w-full mt-4">
                <div 
                  className="px-3 py-1 bg-gradient-to-r from-red-600 to-amber-600 text-white font-extrabold text-[12px] uppercase skew-x-[-8deg] border border-white/10 shadow-[0_0_15px_rgba(239,68,68,0.4)]"
                >
                  CLICK RATE
                </div>
                <div 
                  className="px-2 py-0.5 bg-white text-black font-extrabold text-[9px] uppercase skew-x-[-8deg]"
                >
                  X2 FORMULA
                </div>
              </div>

              <div className="flex justify-between text-[6px] text-white/30 mt-auto">
                <span>SATURATION: +45%</span>
                <span>A/B SCORE: 98</span>
              </div>
            </div>
          </div>
        );
      case 8: // Content Strategy
        return (
          <div className="w-full h-full bg-neutral-950 flex items-center justify-center p-4 relative overflow-hidden">
            <svg className="w-full h-full max-w-[190px]" viewBox="0 0 160 160">
              <defs>
                <linearGradient id="glowGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#2F80FF" />
                  <stop offset="100%" stopColor="#EC4899" />
                </linearGradient>
              </defs>
              <circle cx="80" cy="80" r="50" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
              {/* Spider Node network */}
              <g stroke="url(#glowGrad)" strokeWidth="1" strokeDasharray="3 3" opacity="0.6">
                <line x1="80" y1="80" x2="30" y2="60" />
                <line x1="80" y1="80" x2="130" y2="60" />
                <line x1="80" y1="80" x2="50" y2="120" />
                <line x1="80" y1="80" x2="110" y2="120" />
              </g>
              {/* Central Node */}
              <circle cx="80" cy="80" r="10" fill="url(#glowGrad)" />
              <text x="80" y="83" textAnchor="middle" fill="white" fontSize="6" fontWeight="bold" fontFamily="monospace">MAP</text>
              {/* Satellite nodes */}
              <circle cx="30" cy="60" r="6" fill="#101010" stroke="#2F80FF" strokeWidth="1" />
              <text x="30" y="49" textAnchor="middle" fill="#B8B8B8" fontSize="5" fontFamily="monospace">HOOKS</text>
              
              <circle cx="130" cy="60" r="6" fill="#101010" stroke="#EC4899" strokeWidth="1" />
              <text x="130" y="49" textAnchor="middle" fill="#B8B8B8" fontSize="5" fontFamily="monospace">SEO</text>
              
              <circle cx="50" cy="120" r="6" fill="#101010" stroke="#2F80FF" strokeWidth="1" />
              <text x="50" y="132" textAnchor="middle" fill="#B8B8B8" fontSize="5" fontFamily="monospace">FUNNELS</text>
              
              <circle cx="110" cy="120" r="6" fill="#101010" stroke="#EC4899" strokeWidth="1" />
              <text x="110" y="132" textAnchor="middle" fill="#B8B8B8" fontSize="5" fontFamily="monospace">VIRAL</text>
            </svg>
          </div>
        );
      default:
        return <div className="w-full h-full bg-neutral-950 flex items-center justify-center text-white/30 text-xs">Preview</div>;
    }
  };

  return (
    <motion.div
      onClick={onClick}
      onMouseEnter={() => isActive && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        width: '320px',
        height: '470px',
        scale,
        rotateY,
        z: translateZ,
        x: translateX,
        opacity,
        filter: useTransform(
          [blurVal, brightnessVal],
          ([blur, brightness]) => `blur(${blur}) brightness(${brightness})`
        ),
        zIndex: zIndexVal,
        transformStyle: 'preserve-3d',
        willChange: 'transform, opacity, filter',
      }}
      animate={isActive && isHovered ? {
        y: -10,
        scale: 1.02,
        transition: { type: 'spring', stiffness: 400, damping: 25 }
      } : {
        y: 0,
        transition: { type: 'spring', stiffness: 300, damping: 30 }
      }}
      className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none group flex flex-col justify-between rounded-[32px] overflow-hidden border transition-all duration-500 cursor-pointer ${
        isActive 
          ? 'border-white/15 bg-neutral-950/80 shadow-[0_0_50px_-15px_rgba(47,128,255,0.45)]' 
          : 'border-white/5 bg-neutral-950/45 hover:border-white/10'
      }`}
    >
      {/* Top Image/Video Illustration Area */}
      <div className="w-full h-[180px] border-b border-white/5 overflow-hidden relative bg-neutral-950">
        {renderVisualPreview()}
        {/* Glow overlay */}
        <div 
          className="absolute inset-0 bg-gradient-to-t from-neutral-950 to-transparent opacity-60 pointer-events-none" 
        />
        {/* Decorative service icon badge */}
        <div className="absolute top-4 right-4 w-9 h-9 rounded-xl bg-neutral-900/80 backdrop-blur border border-white/10 flex items-center justify-center z-20">
          <Icon className={`w-4 h-4 transition-colors duration-300 ${isActive ? 'text-primary' : 'text-white'}`} />
        </div>
      </div>

      {/* Bottom Content Area */}
      <div className="flex-1 p-6 flex flex-col justify-between bg-neutral-950/50 backdrop-blur-md">
        <div>
          {/* Title */}
          <h3 className="text-xl font-space font-bold tracking-tight text-white mb-2 group-hover:text-primary transition-colors">
            {service.title}
          </h3>
          
          {/* Description */}
          <p className="text-xs text-muted-custom leading-relaxed line-clamp-3 mb-4 font-sans font-medium">
            {service.description}
          </p>
        </div>

        {/* Details list tags */}
        <div className="flex flex-wrap gap-1.5 mt-auto border-t border-white/5 pt-4">
          {service.details.map((detail, dIdx) => (
            <span
              key={dIdx}
              className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/5 text-[8px] font-bold uppercase tracking-wider text-muted-custom hover:text-white hover:bg-white/10 transition-colors duration-200"
            >
              {detail}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
