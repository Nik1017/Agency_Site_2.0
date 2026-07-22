'use client';

import { motion } from 'framer-motion';

export default function CTA() {
  const handleScrollTo = (e: React.MouseEvent, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    const lenis = (window as any).lenis;
    if (element) {
      if (lenis) {
        lenis.scrollTo(element, { offset: -60, duration: 1.5 });
      } else {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="relative py-32 bg-background z-10 overflow-hidden select-none border-t border-white/5">
      {/* Background Graphic Grid */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.08) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />
      
      {/* Background Glowing Orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] max-w-[800px] max-h-[800px] bg-primary/10 rounded-full blur-[140px] pointer-events-none mix-blend-screen animate-pulse-slow" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 flex flex-col items-center justify-center text-center relative z-10">
        
        <span className="text-xs uppercase font-space font-bold tracking-widest text-[#2F80FF] mb-6">
          Let's Talk
        </span>
        
        <h2 className="text-5xl md:text-7xl lg:text-[7rem] xl:text-[8rem] font-sans font-black tracking-tighter uppercase text-white leading-[0.85] max-w-5xl mb-14">
          Ready to <br />
          grow <span className="font-serif-italic italic font-normal text-muted-custom/75 lowercase">smarter?</span>
        </h2>
        
        {/* Glow Magnetic Button */}
        <motion.a
          onClick={(e) => handleScrollTo(e, 'contact')}
          href="#contact"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative inline-flex items-center justify-center p-[2px] overflow-hidden rounded-full group cursor-pointer shadow-2xl hover:shadow-[#2F80FF]/35 transition-all duration-300"
        >
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary via-[#1E6FFF] to-accent-gold rounded-full group-hover:opacity-100 transition-opacity duration-300 opacity-90 blur-[2px]" />
          <span className="relative px-12 py-5 font-space font-bold uppercase tracking-widest text-xs text-white bg-[#050505] rounded-full transition-all duration-200 group-hover:bg-opacity-0">
            Start a Project
          </span>
        </motion.a>

      </div>
    </section>
  );
}
