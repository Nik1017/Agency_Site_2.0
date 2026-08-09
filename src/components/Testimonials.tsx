'use client';

import { motion } from 'framer-motion';
import { BRAND_NAME } from '@/config/branding';

const testimonialsCol1 = [
  {
    name: 'Sarah Jenkins',
    role: 'Founder, ScaledMedia',
    review: `${BRAND_NAME} completely overhauled our operations. We reclaimed 20 hours a week and scaled our reach to millions.`,
    img: 'SJ',
  },
  {
    name: 'David Chen',
    role: 'VP Marketing, FinLink',
    review: 'Our customer acquisition costs dropped by 40% in our first quarter with their systems.',
    img: 'DC',
  },
  {
    name: 'Elena Rostova',
    role: 'Creator (2.5M Subs)',
    review: 'The digital presence they built for us is world-class. It\'s clean, minimal, and highly effective.',
    img: 'ER',
  },
];

const testimonialsCol2 = [
  {
    name: 'Marcus Brody',
    role: 'Director, Apex Group',
    review: 'Their lead generation funnel helped us secure over $4.2M in qualified buyer pipeline in six months.',
    img: 'MB',
  },
  {
    name: 'Aisha Rahman',
    role: 'CEO, EdTech Stream',
    review: 'We automated our entire lead qualification pipeline, allowing our sales team to close deals faster.',
    img: 'AR',
  },
  {
    name: 'Niels K.',
    role: 'Head of Brand, Vesper',
    review: 'They built custom databases and brand strategies that made our platform run smoothly.',
    img: 'NK',
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative py-28 bg-background z-10 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 mb-16">
        {/* Header Block */}
        <div className="flex flex-col items-start gap-4 max-w-xl">
          <span className="text-xs uppercase font-space font-bold tracking-widest text-[#2F80FF]">
            Partners
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-space font-bold tracking-tighter uppercase text-white leading-none">
            What our <br />
            clients <span className="font-serif-italic italic font-normal text-muted-custom/70 lowercase">experience.</span>
          </h2>
          <p className="text-xs md:text-sm text-[#B8B8B8] leading-relaxed">
            We build long-term systems for growing digital brands and SaaS.
          </p>
        </div>
      </div>

      {/* Infinite scrolling testimonial tracks */}
      <div className="flex flex-col gap-6 md:gap-8 relative w-full">
        {/* Track 1: Scroll Left */}
        <div className="flex gap-6 overflow-hidden w-full relative group">
          <div className="flex gap-6 min-w-full shrink-0 justify-around animate-marquee-loop group-hover:[animation-play-state:paused]">
            {testimonialsCol1.map((item, idx) => (
              <div 
                key={idx} 
                className="w-[300px] md:w-[360px] glass rounded-3xl p-6 border border-white/5 flex flex-col justify-between h-[230px] shrink-0 hover:border-[#2F80FF]/30 transition-all duration-300"
              >
                <p className="text-[11.5px] text-muted-custom leading-relaxed font-medium italic">
                  "{item.review}"
                </p>
                <div className="flex items-center gap-3 border-t border-white/5 pt-4 mt-6">
                  <div className="w-9 h-9 rounded-full bg-primary/20 border border-primary/25 flex items-center justify-center text-[10px] font-black text-white">
                    {item.img}
                  </div>
                  <div>
                    <h4 className="text-xs font-space font-bold text-white uppercase">{item.name}</h4>
                    <span className="text-[9px] uppercase tracking-wide text-muted-custom/70">{item.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Duplicate for Marquee Loop */}
          <div 
            className="flex gap-6 min-w-full shrink-0 justify-around animate-marquee-loop group-hover:[animation-play-state:paused]"
            aria-hidden="true"
          >
            {testimonialsCol1.map((item, idx) => (
              <div 
                key={`dup-${idx}`} 
                className="w-[300px] md:w-[360px] glass rounded-3xl p-6 border border-white/5 flex flex-col justify-between h-[230px] shrink-0 hover:border-[#2F80FF]/30 transition-all duration-300"
              >
                <p className="text-[11.5px] text-muted-custom leading-relaxed font-medium italic">
                  "{item.review}"
                </p>
                <div className="flex items-center gap-3 border-t border-white/5 pt-4 mt-6">
                  <div className="w-9 h-9 rounded-full bg-primary/20 border border-primary/25 flex items-center justify-center text-[10px] font-black text-white">
                    {item.img}
                  </div>
                  <div>
                    <h4 className="text-xs font-space font-bold text-white uppercase">{item.name}</h4>
                    <span className="text-[9px] uppercase tracking-wide text-muted-custom/70">{item.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Track 2: Scroll Right */}
        <div className="flex gap-6 overflow-hidden w-full relative mt-2 group">
          <div className="flex gap-6 min-w-full shrink-0 justify-around animate-marquee-loop-right group-hover:[animation-play-state:paused]">
            {testimonialsCol2.map((item, idx) => (
              <div 
                key={idx} 
                className="w-[300px] md:w-[360px] glass rounded-3xl p-6 border border-white/5 flex flex-col justify-between h-[230px] shrink-0 hover:border-[#2F80FF]/30 transition-all duration-300"
              >
                <p className="text-[11.5px] text-muted-custom leading-relaxed font-medium italic">
                  "{item.review}"
                </p>
                <div className="flex items-center gap-3 border-t border-white/5 pt-4 mt-6">
                  <div className="w-9 h-9 rounded-full bg-primary/20 border border-primary/25 flex items-center justify-center text-[10px] font-black text-white">
                    {item.img}
                  </div>
                  <div>
                    <h4 className="text-xs font-space font-bold text-white uppercase">{item.name}</h4>
                    <span className="text-[9px] uppercase tracking-wide text-muted-custom/70">{item.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Duplicate for Marquee Loop */}
          <div 
            className="flex gap-6 min-w-full shrink-0 justify-around animate-marquee-loop-right group-hover:[animation-play-state:paused]"
            aria-hidden="true"
          >
            {testimonialsCol2.map((item, idx) => (
              <div 
                key={`dup-${idx}`} 
                className="w-[300px] md:w-[360px] glass rounded-3xl p-6 border border-white/5 flex flex-col justify-between h-[230px] shrink-0 hover:border-[#2F80FF]/30 transition-all duration-300"
              >
                <p className="text-[11.5px] text-muted-custom leading-relaxed font-medium italic">
                  "{item.review}"
                </p>
                <div className="flex items-center gap-3 border-t border-white/5 pt-4 mt-6">
                  <div className="w-9 h-9 rounded-full bg-primary/20 border border-primary/25 flex items-center justify-center text-[10px] font-black text-white">
                    {item.img}
                  </div>
                  <div>
                    <h4 className="text-xs font-space font-bold text-white uppercase">{item.name}</h4>
                    <span className="text-[9px] uppercase tracking-wide text-muted-custom/70">{item.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <style jsx global>{`
        @keyframes marquee-tracks-left {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        @keyframes marquee-tracks-right {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(0%);
          }
        }
        .animate-marquee-loop {
          animation: marquee-tracks-left 32s linear infinite;
        }
        .animate-marquee-loop-right {
          animation: marquee-tracks-right 32s linear infinite;
        }
      `}</style>
    </section>
  );
}
