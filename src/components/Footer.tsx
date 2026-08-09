'use client';

import { Instagram, Linkedin, Youtube, ArrowUp } from 'lucide-react';
import { BRAND_PART1, BRAND_PART2, BRAND_NAME } from '@/config/branding';

export default function Footer() {
  const handleScrollToTop = () => {
    const lenis = (window as any).lenis;
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.5 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative bg-background border-t border-white/5 pt-20 pb-12 z-10 select-none">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        
        {/* Top footer row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 pb-12 border-b border-white/5">
          <div>
            <h1 className="font-space text-3xl font-black tracking-tighter text-white uppercase mb-2">
              {BRAND_PART1}<span className="font-serif-italic italic font-normal text-primary">{BRAND_PART2}</span>
            </h1>
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#B8B8B8]">
              © {new Date().getFullYear()} {BRAND_NAME} Systems. All rights reserved.
            </span>
          </div>

          {/* Social Channels */}
          <div className="flex gap-4">
            <a 
              href="#" 
              aria-label="Instagram"
              className="w-10 h-10 rounded-full bg-white/5 border border-white/8 flex items-center justify-center text-muted-custom hover:text-white hover:border-[#2F80FF]/50 transition-all duration-300"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a 
              href="#" 
              aria-label="LinkedIn"
              className="w-10 h-10 rounded-full bg-white/5 border border-white/8 flex items-center justify-center text-muted-custom hover:text-white hover:border-[#2F80FF]/50 transition-all duration-300"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a 
              href="#" 
              aria-label="YouTube"
              className="w-10 h-10 rounded-full bg-white/5 border border-white/8 flex items-center justify-center text-muted-custom hover:text-white hover:border-[#2F80FF]/50 transition-all duration-300"
            >
              <Youtube className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-8 gap-4">
          <div className="flex gap-6 text-[10.5px] font-bold uppercase tracking-wider text-muted-custom/75">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>

          <button
            onClick={handleScrollToTop}
            className="group flex items-center gap-2 text-[10.5px] font-bold uppercase tracking-widest text-muted-custom hover:text-white transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <div className="w-7 h-7 rounded-full bg-white/5 border border-white/8 flex items-center justify-center group-hover:-translate-y-1 transition-transform">
              <ArrowUp className="w-3.5 h-3.5" />
            </div>
          </button>
        </div>

      </div>
    </footer>
  );
}
