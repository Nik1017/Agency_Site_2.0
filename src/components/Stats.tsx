'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { PlaySquare, BarChart, Users, HeartHandshake } from 'lucide-react';

function Counter({ endValue, duration = 1.2 }: { endValue: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  useEffect(() => {
    if (!inView) return;
    
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      setCount(Math.floor(progress * endValue));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(endValue);
      }
    };
    
    window.requestAnimationFrame(step);
  }, [inView, endValue, duration]);

  return <span ref={ref}>{count}</span>;
}

const statsList = [
  {
    icon: PlaySquare,
    title: 'Automated Workflows',
    number: 500,
    suffix: '+',
    desc: 'Production pipelines operating without manual input.',
  },
  {
    icon: BarChart,
    title: 'Audience Reach',
    number: 100,
    suffix: 'M+',
    desc: 'Organic views generated across brand digital profiles.',
  },
  {
    icon: Users,
    title: 'Active Platforms',
    number: 50,
    suffix: '+',
    desc: 'Enterprise dashboards and consumer brands scaled.',
  },
  {
    icon: HeartHandshake,
    title: 'Customer Retention',
    number: 98,
    suffix: '%',
    desc: 'Client relationships that continue month-over-month.',
  },
];

export default function Stats() {
  return (
    <section className="relative py-20 bg-background z-10 select-none">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        
        {/* Grid layout cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsList.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
                className="glass rounded-3xl p-8 border border-white/5 flex flex-col justify-between items-start min-h-[220px] relative group hover:border-[#2F80FF]/30 transition-all duration-300"
              >
                {/* Micro-spark background glow */}
                <div className="absolute inset-0 bg-[#2F80FF]/5 opacity-0 group-hover:opacity-100 rounded-3xl blur-2xl transition-opacity duration-500 pointer-events-none" />

                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center mb-6 group-hover:border-primary/50 transition-colors">
                  <Icon className="w-5 h-5 text-white group-hover:text-primary transition-colors" />
                </div>

                <div>
                  <div className="text-4xl md:text-5xl font-space font-black text-white mb-2">
                    <Counter endValue={stat.number} />
                    <span className="text-primary font-bold">{stat.suffix}</span>
                  </div>
                  
                  <h4 className="text-xs uppercase font-space font-bold tracking-wider text-[#B8B8B8] mb-1 group-hover:text-white transition-colors">
                    {stat.title}
                  </h4>
                  
                  <p className="text-[10.5px] text-muted-custom/75 leading-relaxed">
                    {stat.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
