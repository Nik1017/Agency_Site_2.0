'use client';

import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Instagram, 
  Play, 
  Sparkles, 
  Anchor, 
  Target, 
  BookOpen, 
  Layers, 
  Volume2 
} from 'lucide-react';

const features = [
  { 
    title: 'Task Automation', 
    icon: Instagram, 
    desc: 'Automate repetitive workflows to free up high-value creative focus.', 
    stat: '+80%', 
    metric: 'Time Reclaimed' 
  },
  { 
    title: 'Data Pipelines', 
    icon: Play, 
    desc: 'Clean, structured pipelines that process and deliver information instantly.', 
    stat: '99.9%', 
    metric: 'Data Accuracy' 
  },
  { 
    title: 'Interface Design', 
    icon: Sparkles, 
    desc: 'Premium user interfaces built for modern digital applications.', 
    stat: 'Modern', 
    metric: 'Visual Quality' 
  },
  { 
    title: 'User Conversion', 
    icon: Anchor, 
    desc: 'Capture visitor attention immediately with fast-loading, clean landing paths.', 
    stat: '14.2%', 
    metric: 'Clickthrough Rate' 
  },
  { 
    title: 'System Reliability', 
    icon: Target, 
    desc: 'Zero-downtime architecture built to handle peak traffic without interruptions.', 
    stat: '99.99%', 
    metric: 'Uptime SLA' 
  },
  { 
    title: 'Clear Positioning', 
    icon: BookOpen, 
    desc: 'A refined message that clearly defines your value to the market.', 
    stat: '100%', 
    metric: 'Message Clarity' 
  },
  { 
    title: 'Modern Styling', 
    icon: Layers, 
    desc: 'Tailored dark modes and sophisticated styling built for high-end feel.', 
    stat: 'Premium', 
    metric: 'Style Quality' 
  },
  { 
    title: 'Sleek Interactions', 
    icon: Volume2, 
    desc: 'Micro-animations and subtle cues that make interfaces feel responsive.', 
    stat: 'Fluent', 
    metric: 'UX Response' 
  },
];

export default function FeaturesCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (carouselRef.current) {
        setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
      }
    };
    
    // Give browser a split second to compute layout
    setTimeout(handleResize, 100);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="relative py-24 bg-background overflow-hidden z-10 select-none">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="flex flex-col items-start gap-4">
            <span className="text-xs uppercase font-space font-bold tracking-widest text-[#2F80FF]">
              The Details
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-space font-bold tracking-tighter uppercase text-white leading-none">
              Built for <br />
              <span className="font-serif-italic italic font-normal text-muted-custom/75 lowercase">efficiency.</span>
            </h2>
          </div>
          <p className="text-xs md:text-sm text-muted-custom max-w-sm leading-relaxed mb-1">
            Explore the systems driving our operations.
          </p>
        </div>

        {/* Drag Container */}
        <motion.div 
          ref={carouselRef} 
          className="cursor-grab active:cursor-grabbing overflow-hidden -mx-6 px-6 md:-mx-12 md:px-12 lg:-mx-24 lg:px-24"
        >
          <motion.div 
            drag="x" 
            dragConstraints={{ right: 0, left: -width }} 
            className="flex gap-6 w-max pb-8"
          >
            {features.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <motion.div
                  key={idx}
                  whileHover={{ 
                    rotateY: 8, 
                    rotateX: -4, 
                    y: -5,
                    scale: 1.01 
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="w-[280px] md:w-[320px] h-[380px] rounded-3xl glass p-8 flex flex-col justify-between border border-white/5 relative group select-none overflow-hidden"
                  style={{
                    transformStyle: 'preserve-3d',
                    perspective: '1000px'
                  }}
                >
                  {/* Subtle hover gradient card glow */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Card Front Top */}
                  <div style={{ transform: 'translateZ(30px)' }}>
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center mb-6">
                      <Icon className="w-5 h-5 text-white group-hover:text-primary transition-colors duration-300" />
                    </div>
                    
                    <h3 className="text-lg font-space font-bold uppercase tracking-tight text-white mb-2">
                      {feat.title}
                    </h3>
                    
                    <p className="text-xs text-muted-custom leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>

                  {/* Card Front Bottom (Stats indicators) */}
                  <div 
                    style={{ transform: 'translateZ(40px)' }}
                    className="border-t border-white/5 pt-4 mt-auto flex items-end justify-between"
                  >
                    <div>
                      <span className="text-[7.5px] uppercase font-bold tracking-widest text-[#B8B8B8] block mb-1">
                        {feat.metric}
                      </span>
                      <span className="text-xs font-bold text-white uppercase">{feat.stat}</span>
                    </div>
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center self-end opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                      <svg className="w-3.5 h-3.5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </div>

                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
