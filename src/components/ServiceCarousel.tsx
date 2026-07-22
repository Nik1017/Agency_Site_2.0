'use client';

import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import CarouselControls from './CarouselControls';
import ServiceCard from './ServiceCard';

interface ServiceItem {
  title: string;
  description: string;
  details: string[];
  icon: any;
  color: string;
  glow: string;
}

interface ServiceCarouselProps {
  services: ServiceItem[];
}

const mod = (n: number, m: number) => ((n % m) + m) % m;

export default function ServiceCarousel({ services }: ServiceCarouselProps) {
  const total = services.length;
  const containerRef = useRef<HTMLDivElement>(null);
  
  // virtualActiveIndex tracks continuous integer index (can be negative or > total)
  const [virtualActiveIndex, setVirtualActiveIndex] = useState(0);
  const activeIndex = mod(virtualActiveIndex, total);

  // Motion values for smooth spring movement
  const activeIndexMV = useMotionValue(0);
  const currentIndexMV = useSpring(activeIndexMV, {
    stiffness: 160,
    damping: 24,
    mass: 1.1,
  });

  const isDraggingRef = useRef(false);
  const lastWheelTime = useRef(0);
  const isInView = useInView(containerRef, { amount: 0.2 });

  // Update active index motion value when virtual active index state changes
  useEffect(() => {
    if (!isDraggingRef.current) {
      activeIndexMV.set(virtualActiveIndex);
    }
  }, [virtualActiveIndex, activeIndexMV]);

  // Navigate next / prev
  const handleNext = useCallback(() => {
    setVirtualActiveIndex((prev) => {
      const next = prev + 1;
      activeIndexMV.set(next);
      return next;
    });
  }, [activeIndexMV]);

  const handlePrev = useCallback(() => {
    setVirtualActiveIndex((prev) => {
      const prevIdx = prev - 1;
      activeIndexMV.set(prevIdx);
      return prevIdx;
    });
  }, [activeIndexMV]);

  const handleSelect = useCallback((index: number) => {
    setVirtualActiveIndex((prev) => {
      // Find closest virtual index that wraps to 'index'
      const currentWrapped = mod(prev, total);
      let diff = index - currentWrapped;
      if (diff > total / 2) diff -= total;
      if (diff < -total / 2) diff += total;
      
      const targetVirtual = prev + diff;
      activeIndexMV.set(targetVirtual);
      return targetVirtual;
    });
  }, [activeIndexMV, total]);

  // Drag Gesture Handlers
  const dragThreshold = 250; // px of drag to shift one card

  const handlePan = (event: any, info: any) => {
    isDraggingRef.current = true;
    // Update target motion value in real-time as we drag
    const dragProgress = -info.offset.x / dragThreshold;
    activeIndexMV.set(virtualActiveIndex + dragProgress);
  };

  const handlePanEnd = (event: any, info: any) => {
    // Determine card shift based on drag distance and flick velocity
    const dragProgress = -info.offset.x / dragThreshold;
    const velocityProgress = -info.velocity.x / 800; // factor in swipe velocity
    const indexChange = Math.round(dragProgress + velocityProgress);

    const nextIndex = virtualActiveIndex + indexChange;
    setVirtualActiveIndex(nextIndex);
    activeIndexMV.set(nextIndex);

    // Release drag lock shortly after to prevent instant click triggering
    setTimeout(() => {
      isDraggingRef.current = false;
    }, 50);
  };

  // Keyboard Arrow Listener
  useEffect(() => {
    if (!isInView) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isInView, handleNext, handlePrev]);

  // Mouse Wheel Listener with Cooldown
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (Math.abs(delta) < 25) return;

      const now = Date.now();
      if (now - lastWheelTime.current < 600) {
        // Prevent default document scroll inside our section
        e.preventDefault();
        return;
      }

      e.preventDefault();
      lastWheelTime.current = now;

      if (delta > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, [handleNext, handlePrev]);

  // Generate the 5 virtual indices around the virtualActiveIndex to render
  const visibleCards = React.useMemo(() => {
    const cards = [];
    for (let offset = -2; offset <= 2; offset++) {
      const vIdx = virtualActiveIndex + offset;
      const originalIdx = mod(vIdx, total);
      cards.push({
        vIdx,
        originalIdx,
        service: services[originalIdx],
      });
    }
    return cards;
  }, [virtualActiveIndex, services, total]);

  return (
    <div className="w-full flex flex-col items-center select-none">
      {/* 3D Viewport Carousel Wrapper */}
      <motion.div
        ref={containerRef}
        onPan={handlePan}
        onPanEnd={handlePanEnd}
        className="w-full relative h-[520px] overflow-visible flex items-center justify-center cursor-grab active:cursor-grabbing"
        style={{
          perspective: '2000px',
          transformStyle: 'preserve-3d',
        }}
      >
        {visibleCards.map(({ vIdx, originalIdx, service }) => {
          const isActive = originalIdx === activeIndex;
          return (
            <ServiceCard
              key={vIdx}
              service={service}
              index={originalIdx}
              vIndex={vIdx}
              offset={currentIndexMV}
              isActive={isActive}
              onClick={() => {
                if (!isDraggingRef.current && !isActive) {
                  handleSelect(originalIdx);
                }
              }}
            />
          );
        })}
      </motion.div>

      {/* Navigation controls */}
      <CarouselControls
        activeIndex={activeIndex}
        total={total}
        onPrev={handlePrev}
        onNext={handleNext}
        onSelect={handleSelect}
      />
    </div>
  );
}
