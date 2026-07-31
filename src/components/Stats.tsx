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
        

      </div>
    </section>
  );
}
