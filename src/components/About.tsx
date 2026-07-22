'use client';

import { motion } from 'framer-motion';
import { Target, Eye, Sparkles, Youtube, Instagram, Linkedin } from 'lucide-react';

const pillars = [
  {
    icon: Target,
    title: 'Workflow Engineering',
    desc: 'We design logic models to map process steps, removing human bottlenecks and error.',
  },
  {
    icon: Eye,
    title: 'Discovery Auditing',
    desc: 'We audit and map target channels, ensuring your platform is positioned exactly where prospective clients seek answers.',
  },
  {
    icon: Sparkles,
    title: 'Presence Building',
    desc: 'We build clean landing pipelines and brand assets that build authority and trust immediately.',
  },
];

const founders = [
  {
    name: 'Nikhil G.',
    role: 'CEO & Systems Architect',
    bio: 'Ex-consultant specializing in process automation. Designed custom business backbones and integrations for high-growth enterprises.',
    img: 'NG',
    socials: [
      { icon: Youtube, url: '#' },
      { icon: Instagram, url: '#' },
      { icon: Linkedin, url: '#' },
    ],
  },
  {
    name: 'Marcus Vance',
    role: 'Creative Director',
    bio: 'Award-winning visual designer specializing in corporate presence and brand systems for digital-first companies.',
    img: 'MV',
    socials: [
      { icon: Instagram, url: '#' },
      { icon: Linkedin, url: '#' },
    ],
  },
];

export default function About() {
  return (
    <section id="about" className="relative py-28 bg-background z-10 select-none">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        
        {/* Upper Title Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-24">
          <div className="lg:col-span-5 flex flex-col items-start gap-4">
            <span className="text-xs uppercase font-space font-bold tracking-widest text-[#2F80FF]">
              Philosophy
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-space font-bold tracking-tighter uppercase text-white leading-none">
              Systems engineered <br />
              to <span className="font-serif-italic italic font-normal text-muted-custom/70 lowercase">scale.</span>
            </h2>
          </div>
          <div className="lg:col-span-7">
            <p className="text-sm md:text-base text-muted-custom leading-relaxed font-medium">
              Edify Grow was founded to replace legacy agency overhead with high-performance, automated operations and robust digital visibility.
            </p>
          </div>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-28">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="glass rounded-3xl p-8 border border-white/5 hover:border-white/12 transition-colors duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-lg font-space font-bold text-white mb-3 uppercase tracking-tight">
                  {pillar.title}
                </h3>
                <p className="text-xs text-muted-custom leading-relaxed">
                  {pillar.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Founders / Team Section */}
     {/* <div className="border-t border-white/5 pt-20">
          <div className="flex flex-col items-start gap-4 mb-16">
            <span className="text-xs uppercase font-space font-bold tracking-widest text-primary">
              Leadership
            </span>
            <h2 className="text-3xl md:text-5xl font-space font-bold tracking-tighter uppercase text-white leading-none">
              The systems <span className="font-serif-italic italic font-normal text-muted-custom/70 lowercase">architects.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
            {founders.map((lead, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="glass rounded-3xl p-8 border border-white/5 flex flex-col md:flex-row gap-6 items-start relative group"
              >
                {/* Profile Placeholder Circle 
                <div className="w-20 h-20 rounded-2xl bg-neutral-900 border border-white/8 shrink-0 flex items-center justify-center text-xl font-space font-black text-primary group-hover:border-primary/50 transition-colors">
                  {lead.img}
                </div>

                <div className="flex flex-col justify-between flex-grow h-full gap-4">
                  <div>
                    <h3 className="text-lg font-space font-bold text-white uppercase">{lead.name}</h3>
                    <span className="text-[10px] font-bold text-primary uppercase tracking-widest block mb-3">
                      {lead.role}
                    </span>
                    <p className="text-[11.5px] text-muted-custom leading-relaxed">
                      {lead.bio}
                    </p>
                  </div>

                  {/* Social Handles 
                  <div className="flex gap-3 border-t border-white/5 pt-4 mt-2">
                    {lead.socials.map((platform, pIdx) => {
                      const SocialIcon = platform.icon;
                      return (
                        <a
                          key={pIdx}
                          href={platform.url}
                          className="w-7 h-7 rounded-lg bg-neutral-950 border border-white/5 flex items-center justify-center text-muted-custom hover:text-white hover:border-primary/55 transition-colors"
                        >
                          <SocialIcon className="w-3.5 h-3.5" />
                        </a>
                      );
                    })}
                  </div>
                </div>

              </motion.div>
            ))}
          </div> 
        </div> 
             */}
      </div>
    </section>
  );
}
