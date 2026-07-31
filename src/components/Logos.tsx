  'use client';

import { 
  Instagram, 
  Youtube, 
  Tv, 
  Layers, 
  Play, 
  Music, 
  Activity, 
  Globe   
} from 'lucide-react';

export default function Logos() {
  const logos = [
    { name: 'Instagram', icon: Instagram },
    { name: 'YouTube', icon: Youtube },
    { name: 'Meta Ads', icon: Tv },
    { name: 'Adobe suite', icon: Layers },
    { name: 'Spotify Music', icon: Music },
    { name: 'Netflix', icon: Play },
    { name: 'Airbnb', icon: Globe },
    { name: 'Nike Live', icon: Activity },
  ];

  return (
    <section className="relative py-14 bg-background overflow-hidden border-t border-b border-white/5 select-none z-10">
      {/* Side gradients to mask content edge */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background via-background/60 to-transparent z-20 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background via-background/60 to-transparent z-20 pointer-events-none" />

      {/* Marquee Track 1 (Scroll Left) */}
      <div className="flex gap-16 items-center overflow-hidden w-full relative">
        <div 
          className="flex gap-16 min-w-full shrink-0 justify-around select-none"
          style={{
            animation: 'marquee-scroll-left 25s linear infinite',
          }}
        >
          {logos.map((logo, idx) => {
            const Icon = logo.icon;
            return (
              <div key={idx} className="flex items-center gap-3 grayscale opacity-45 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                <Icon className="w-5 h-5 text-white" />
                <span className="text-sm font-space font-medium tracking-widest text-white uppercase select-none">
                  {logo.name}
                </span>
              </div>
            );
          })}
        </div>
        
        {/* Duplicated track for smooth infinite scroll */}
        <div 
          className="flex gap-16 min-w-full shrink-0 justify-around select-none"
          aria-hidden="true"
          style={{
            animation: 'marquee-scroll-left 25s linear infinite',
          }}
        >
          {logos.map((logo, idx) => {
            const Icon = logo.icon;
            return (
              <div key={`dup-${idx}`} className="flex items-center gap-3 grayscale opacity-45 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                <Icon className="w-5 h-5 text-white" />
                <span className="text-sm font-space font-medium tracking-widest text-white uppercase select-none">
                  {logo.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Styled animation frames */}
      <style jsx global>{`
        @keyframes marquee-scroll-left {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </section>
  );
}
