'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springOptions = { stiffness: 250, damping: 28, mass: 0.4 };
  const cursorX = useSpring(mouseX, springOptions);
  const cursorY = useSpring(mouseY, springOptions);

  useEffect(() => {
    // Add custom cursor class to document
    document.documentElement.classList.add('custom-cursor-active');

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Check if target or parent is interactive
      const interactiveEl = target.closest('a, button, [role="button"], .interactive-hover');
      
      if (interactiveEl) {
        setHovered(true);
        const label = interactiveEl.getAttribute('data-cursor-label');
        if (label) {
          setCursorText(label);
        } else {
          setCursorText('');
        }
      } else {
        setHovered(false);
        setCursorText('');
      }
    };

    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      document.documentElement.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  return (
    <motion.div
      ref={cursorRef}
      className="fixed top-0 left-0 w-8 h-8 rounded-full border border-primary pointer-events-none z-[99999] flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
      style={{
        x: cursorX,
        y: cursorY,
        backgroundColor: hovered ? 'rgba(47, 128, 255, 0.15)' : 'rgba(47, 128, 255, 0.05)',
        borderColor: hovered ? '#1E6FFF' : '#2F80FF',
        width: hovered ? (cursorText ? 76 : 48) : 24,
        height: hovered ? (cursorText ? 76 : 48) : 24,
        boxShadow: hovered ? '0 0 25px rgba(30, 111, 255, 0.5)' : '0 0 10px rgba(47, 128, 255, 0.15)',
        mixBlendMode: hovered ? 'normal' : 'difference',
        transition: 'width 0.22s cubic-bezier(0.25, 1, 0.5, 1), height 0.22s cubic-bezier(0.25, 1, 0.5, 1), background-color 0.22s, border-color 0.22s, box-shadow 0.22s',
      }}
    >
      {cursorText && (
        <span className="text-[10px] uppercase font-sans font-black tracking-widest text-white text-center px-2 select-none">
          {cursorText}
        </span>
      )}
    </motion.div>
  );
}
