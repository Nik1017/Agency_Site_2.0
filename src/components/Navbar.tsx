'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      
      setLastScrollY(currentScrollY);

      // Section highlit tracking
      const sections = ['home', 'services', 'work', 'process', 'testimonials', 'about', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navItems = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'Services', href: '#services', id: 'services' },
    { name: 'Work', href: '#work', id: 'work' },
    { name: 'Process', href: '#process', id: 'process' },
    { name: 'Testimonials', href: '#testimonials', id: 'testimonials' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const lenis = (window as any).lenis;
      if (lenis) {
        lenis.scrollTo(element, { offset: -60, duration: 1.5 });
      } else {
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.header
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4"
        >
          <div className="glass-nav flex items-center justify-between w-full max-w-6xl h-16 px-6 rounded-full">
            {/* Logo */}
            <a 
              href="#home" 
              onClick={(e) => handleNavClick(e, '#home')}
              className="flex items-center gap-1 font-space text-lg font-black tracking-tighter cursor-pointer text-white"
            >
              Edify<span className="font-serif-italic italic font-normal text-primary">Grow</span>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`text-xs font-semibold uppercase tracking-wider transition-colors py-1 relative ${
                    activeSection === item.id 
                      ? 'text-white' 
                      : 'text-muted-custom/75 hover:text-white'
                  }`}
                >
                  {item.name}
                  {activeSection === item.id && (
                    <motion.span 
                      layoutId="navIndicator" 
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-primary rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="flex items-center gap-3">
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-xs font-bold uppercase tracking-wider text-white rounded-full group cursor-pointer transition-all duration-300 active:scale-95"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary to-glow rounded-full group-hover:opacity-100 transition-opacity duration-300 opacity-90 blur-[2px]" />
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-[#050505] rounded-full group-hover:bg-opacity-0">
                  Book a Call
                </span>
              </a>
            </div>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
