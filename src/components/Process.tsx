'use client';

import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

const steps = [
  {
    num: '01',
    title: 'Discovery Call',
    subtitle: 'Understanding your business',
    desc: 'We learn about your goals, audience, current marketing efforts, and operational challenges to build a tailored strategy.',
  },
  {
    num: '02',
    title: 'Strategy & Planning',
    subtitle: 'Building the roadmap',
    desc: 'We create a content strategy, automation plan, and growth roadmap aligned with your business objectives.',
  },
  {
    num: '03',
    title: 'Content Production',
    subtitle: 'Creating your brand assets',
    desc: 'Our team produces engaging videos, graphics, and copy designed to strengthen your brand across every platform.',
  },
  {
    num: '04',
    title: 'Social Media Setup',
    subtitle: 'Optimizing your presence',
    desc: 'We optimize your profiles, organize content calendars, and prepare your channels for consistent publishing.',
  },
  {
    num: '05',
    title: 'Automation Integration',
    subtitle: 'Streamlining operations',
    desc: 'We connect your CRM, forms, email, WhatsApp, and internal workflows to eliminate repetitive manual tasks.',
  },
  {
    num: '06',
    title: 'Launch & Management',
    subtitle: 'Running the system',
    desc: 'We publish content, manage your social platforms, monitor automations, and ensure everything runs smoothly.',
  },
  {
    num: '07',
    title: 'Growth & Optimization',
    subtitle: 'Scaling what works',
    desc: 'We track performance, refine campaigns, improve automations, and continuously optimize for long-term business growth.',
  },
];

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress of the process container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });

  // Spring smooth scroll progress mapping for timeline line
  const scaleYSpring = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 18,
    restDelta: 0.001
  });

  return (
    <section id="process" className="relative py-28 bg-background z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        
        {/* Header Block */}
        <div className="flex flex-col items-start gap-4 mb-24 max-w-xl">
          <span className="text-xs uppercase font-space font-bold tracking-widest text-[#2F80FF]">
            The Process
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-space font-bold tracking-tighter uppercase text-white leading-none">
            From audit <br />
            to <span className="font-serif-italic italic font-normal text-muted-custom/75 lowercase">scale.</span>
          </h2>
          <p className="text-xs md:text-sm text-[#B8B8B8] leading-relaxed">
            A structured, seven-step approach to automate your operations and amplify your online presence.
          </p>
        </div>

        {/* Timeline body */}
        <div ref={containerRef} className="relative max-w-4xl mx-auto">
          
          {/* Vertical central tracking line (Desktop) */}
          <div className="absolute left-[30px] md:left-1/2 top-4 bottom-4 w-[2px] bg-white/5 -translate-x-1/2 hidden md:block">
            <motion.div 
              style={{ scaleY: scaleYSpring }}
              className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#2F80FF] via-[#1E6FFF] to-primary origin-top"
            />
          </div>

          {/* Timeline steps */}
          <div className="flex flex-col gap-16">
            {steps.map((step, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div 
                  key={idx}
                  className="flex flex-col md:flex-row items-start relative"
                >
                  {/* Central Node Indicator */}
                  <div className="absolute left-[30px] md:left-1/2 top-1.5 w-4 h-4 rounded-full border-2 border-primary bg-background -translate-x-1/2 z-20 hidden md:block" />

                  {/* Left Side (Even items get details, odd list empty spaces) */}
                  <div className={`w-full md:w-1/2 flex ${isEven ? 'md:justify-end md:pr-16' : 'md:order-2 md:pl-16'} pl-16 md:pl-0`}>
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-100px' }}
                      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                      className="glass rounded-3xl p-8 border border-white/5 relative hover:border-white/10 transition-colors duration-300 w-full"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[10px] font-space font-bold tracking-widest text-[#B8B8B8] uppercase">
                          {step.subtitle}
                        </span>
                        <span className="text-xs font-black font-space tracking-tight text-primary">
                          {step.num}
                        </span>
                      </div>
                      
                      <h3 className="text-lg md:text-xl font-space font-bold uppercase tracking-tight text-white mb-3">
                        {step.title}
                      </h3>
                      
                      <p className="text-xs text-muted-custom leading-relaxed">
                        {step.desc}
                      </p>
                    </motion.div>
                  </div>

                  {/* Empty Side (desktop only) */}
                  <div className="hidden md:block w-1/2" />
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
