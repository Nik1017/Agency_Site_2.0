'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect } from 'react';

export default function BackgroundEffects() {
  const mouseX = useMotionValue(-300);
  const mouseY = useMotionValue(-300);

  const glowX = useSpring(mouseX, { stiffness: 80, damping: 25 });
  const glowY = useSpring(mouseY, { stiffness: 80, damping: 25 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Keep glow centered on mouse
      mouseX.set(e.clientX - 175);
      mouseY.set(e.clientY - 175);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-background">
      {/* Noise Overlay */}
      <div className="noise-overlay" />

      {/* Floating Blob 1 - Top Left */}
      <div 
        className="absolute top-[-10%] left-[-15%] w-[45vw] h-[45vw] max-w-[650px] max-h-[650px] rounded-full bg-glow/10 blur-[130px] animate-pulse-slow mix-blend-screen"
      />

      {/* Floating Blob 2 - Bottom Right */}
      <div 
        className="absolute bottom-[10%] right-[-10%] w-[40vw] h-[40vw] max-w-[550px] max-h-[550px] rounded-full bg-primary/5 blur-[120px] animate-pulse-slow mix-blend-screen"
        style={{ animationDelay: '3s' }}
      />
      
      {/* Floating Blob 3 - Middle Left Gold accent glow */}
      <div 
        className="absolute top-[40%] right-[30%] w-[35vw] h-[35vw] max-w-[400px] max-h-[400px] rounded-full bg-accent-gold/[0.02] blur-[150px] animate-pulse-slow mix-blend-screen"
        style={{ animationDelay: '5s' }}
      />

      {/* Mouse Spot-Light follower (Desktop only) */}
      <motion.div
        className="absolute w-[350px] h-[350px] rounded-full bg-primary/10 blur-[110px] mix-blend-screen opacity-70 hidden md:block"
        style={{
          x: glowX,
          y: glowY,
        }}
      />
    </div>
  );
}
