'use client';

import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselControlsProps {
  activeIndex: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  onSelect: (index: number) => void;
}

export default function CarouselControls({
  activeIndex,
  total,
  onPrev,
  onNext,
  onSelect,
}: CarouselControlsProps) {
  return (
    <div className="flex flex-col items-center gap-6 mt-12 relative z-20">
      {/* Arrow Buttons & Indicators Wrapper */}
      <div className="flex items-center gap-8">
        {/* Prev Button */}
        <motion.button
          onClick={onPrev}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-12 h-12 rounded-full flex items-center justify-center border border-white/10 bg-neutral-900/60 backdrop-blur-md text-white hover:text-primary hover:border-primary/40 shadow-lg transition-colors cursor-pointer"
          aria-label="Previous service"
        >
          <ChevronLeft className="w-5 h-5" />
        </motion.button>

        {/* Pagination Dots */}
        <div className="flex items-center gap-3">
          {Array.from({ length: total }).map((_, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={index}
                onClick={() => onSelect(index)}
                className="relative py-2 px-1 cursor-pointer group"
                aria-label={`Go to service ${index + 1}`}
              >
                <div className="relative w-2 h-2 rounded-full overflow-visible">
                  {/* Outer active ring glow */}
                  {isActive && (
                    <motion.div
                      layoutId="activeDotGlow"
                      className="absolute inset-[-4px] rounded-full bg-primary/25 blur-[4px]"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                  {/* Inner dot */}
                  <motion.div
                    animate={{
                      scale: isActive ? 1.25 : 1,
                      backgroundColor: isActive ? '#2F80FF' : 'rgba(255, 255, 255, 0.25)',
                    }}
                    transition={{ duration: 0.2 }}
                    className="w-full h-full rounded-full group-hover:bg-white/60 transition-colors"
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* Next Button */}
        <motion.button
          onClick={onNext}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-12 h-12 rounded-full flex items-center justify-center border border-white/10 bg-neutral-900/60 backdrop-blur-md text-white hover:text-primary hover:border-primary/40 shadow-lg transition-colors cursor-pointer"
          aria-label="Next service"
        >
          <ChevronRight className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
}
