'use client';

import { motion } from 'framer-motion';
import { X, Check, ShieldAlert, Award, ArrowUpRight } from 'lucide-react';
import { BRAND_NAME } from '@/config/branding';

const comparisonData = [
  {
    feature: 'Operations Automated',
    traditional: '22%',
    traditionalVal: 22,
    revyromedia: '72%',
    revyromediaVal: 72,
    suffix: '%',
  },
  {
    feature: 'Conversion Rate',
    traditional: '3.2%',
    traditionalVal: 26,
    revyromedia: '12.4%',
    revyromediaVal: 92,
    suffix: '%',
  },
  {
    feature: 'Average ROI',
    traditional: '1.6x',
    traditionalVal: 32,
    revyromedia: '4.8x',
    revyromediaVal: 96,
    suffix: 'x',
  },
];

const checklistComparison = [
  {
    topic: 'Operational Focus',
    traditional: 'Repetitive, manual data entry and slow spreadsheets.',
    revyromedia: 'Intelligent automations running silently in the background.',
  },
  {
    topic: 'Growth Strategy',
    traditional: 'Generic templates, loud sales pitches, high waste.',
    revyromedia: 'Precision SEO and target channels that attract organic buyers.',
  },
  {
    topic: 'Delivery & Support',
    traditional: 'Delayed responses, endless meetings, slow turnarounds.',
    revyromedia: 'Dedicated Slack channel, transparent progress, and rapid delivery.',
  },
];

export default function WhyUs() {
  return (
    <section id="whyus" className="relative py-24 bg-background z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20">
          <div className="flex flex-col items-start gap-4">
            <span className="text-xs uppercase font-space font-bold tracking-widest text-primary">
              Comparison
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-space font-bold tracking-tighter uppercase text-white leading-none">
              The agency <br />
              vs <span className="font-serif-italic italic font-normal text-primary lowercase">{BRAND_NAME.toLowerCase()}.</span>
            </h2>
          </div>
          <p className="text-xs md:text-sm text-muted-custom max-w-sm leading-relaxed mb-1">
            We replace manual agencies with intelligent, automated systems built for sustainable growth.
          </p>
        </div>

        {/* Dashboard grid mapping comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Animated Bar Charts statistics */}
          <div className="lg:col-span-5 glass rounded-3xl p-8 border border-white/5 flex flex-col justify-between gap-8 h-full min-h-[460px]">
            <div>
              <span className="text-[10px] font-bold text-muted-custom uppercase tracking-widest block mb-1">DATA INDEX</span>
              <h3 className="text-xl font-space font-bold text-white uppercase tracking-tight">Performance Calibration</h3>
            </div>

            <div className="flex flex-col gap-6 my-auto">
              {comparisonData.map((data, idx) => (
                <div key={idx} className="flex flex-col gap-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-white">{data.feature}</span>
                    <span className="text-primary font-black uppercase text-[10px]">{data.revyromedia} vs {data.traditional}</span>
                  </div>
                  
                  {/* Traditional bar */}
                  <div className="relative h-6 bg-neutral-950 rounded-lg overflow-hidden border border-white/5 flex items-center justify-between px-3">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${data.traditionalVal}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.0, ease: 'easeOut', delay: idx * 0.1 }}
                      className="absolute left-0 top-0 bottom-0 bg-neutral-800"
                    />
                    <span className="text-[9px] uppercase tracking-wider font-bold text-muted-custom/70 z-10">Traditional</span>
                    <span className="text-[10px] font-bold text-muted-custom/85 z-10">{data.traditional}</span>
                  </div>

                  {/* Revyro Media bar */}
                  <div className="relative h-7 bg-neutral-950 rounded-lg overflow-hidden border border-primary/20 flex items-center justify-between px-3">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${data.revyromediaVal}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: 'easeOut', delay: idx * 0.15 }}
                      className="absolute left-0 top-0 bottom-0 bg-primary/25"
                    />
                    <span className="text-[9px] uppercase tracking-widest font-black text-primary z-10 flex items-center gap-1.5 animate-pulse">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
                      {BRAND_NAME.toUpperCase()}
                    </span>
                    <span className="text-xs font-black text-white z-10">{data.revyromedia}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-white/5 pt-4 text-[10px] text-muted-custom flex items-center gap-2">
              <Award className="w-4 h-4 text-primary" />
              <span>Based on client data collected over the trailing twelve months.</span>
            </div>
          </div>

          {/* Right Column: Comparative Grid Items */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {checklistComparison.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="glass rounded-[24px] p-6 border border-white/5 grid grid-cols-1 md:grid-cols-2 gap-6 relative group hover:border-white/10 transition-colors"
              >
                {/* Traditional Section */}
                <div className="flex flex-col gap-3 pr-4 border-b md:border-b-0 md:border-r border-white/5 pb-4 md:pb-0">
                  <div className="flex items-center gap-2 text-rose-500 font-bold uppercase tracking-wider text-[10px]">
                    <ShieldAlert className="w-4 h-4" />
                    <span>Traditional agency</span>
                  </div>
                  <h4 className="text-xs font-black uppercase text-white tracking-tight">{item.topic}</h4>
                  <p className="text-[11px] text-muted-custom/75 leading-relaxed">{item.traditional}</p>
                </div>

                {/* Revyro Media Section */}
                <div className="flex flex-col gap-3 pl-0 md:pl-2">
                  <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-[9.5px]">
                    <Check className="w-4 h-4 text-primary" />
                    <span>{BRAND_NAME.toUpperCase()} STANDARD</span>
                  </div>
                  <h4 className="text-xs font-black uppercase text-white tracking-tight">{item.topic}</h4>
                  <p className="text-[11px] text-white leading-relaxed">{item.revyromedia}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
