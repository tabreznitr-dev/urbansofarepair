'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

// --- MODIFIED: Added 'title' property ---
interface Slide {
  id: number;
  imageUrl: string;
  alt: string;
  title: string; 
}

interface ImageCarouselProps {
  slides: Slide[];
}

export function ImageCarousel({ slides }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleNext = () => {
    setDirection('right');
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevious = () => {
    setDirection('left');
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };
  
  const handleDotClick = (index: number) => {
    if (index > currentIndex) {
      setDirection('right');
    } else {
      setDirection('left');
    }
    setCurrentIndex(index);
  }

  const startAutoplay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      handleNext();
    }, 5000);
  };

  const stopAutoplay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, []);

  const slideVariants = {
    hidden: (direction: 'left' | 'right') => ({
      x: direction === 'right' ? '100%' : '-100%',
      opacity: 0,
      scale: 0.8,
      zIndex: 1,
    }),
    visible: {
      x: '0%',
      opacity: 1,
      scale: 1,
      zIndex: 10,
    },
    exit: (direction: 'left' | 'right') => ({
      x: direction === 'right' ? '-100%' : '100%',
      opacity: 0,
      scale: 0.8,
      zIndex: 1,
    }),
  };

  return (
    <div 
      className="relative flex flex-col items-center justify-center w-full max-w-4xl mx-auto"
      onMouseEnter={stopAutoplay}
      onMouseLeave={startAutoplay}
    >
      <div className="relative w-full h-64 md:h-96 overflow-hidden">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            variants={slideVariants}
            custom={direction}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 200, damping: 25 },
              opacity: { duration: 0.5 },
            }}
            className="absolute w-full h-full flex items-center justify-center"
          >
            {/* --- NEW: Relative container for the image and title --- */}
            <div className="relative w-[80%] h-full">
              <img
                src={slides[currentIndex].imageUrl}
                alt={slides[currentIndex].alt}
                className="object-cover brightness-75 w-full h-full rounded-lg shadow-2xl"
              />
              {/* --- NEW: Animated Title Display --- */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="absolute bottom-0 left-0 p-4 md:p-6 text-white text-2xl  md:text-4xl font-thin"
                style={{ textShadow: '2px 2px 8px rgba(0, 0, 0, 0.8)' }}
              >
                {slides[currentIndex].title}
              </motion.h2>
            </div>
          </motion.div>
        </AnimatePresence>

        <AnimatePresence>
            <motion.div 
                className="absolute top-0 left-0 w-full h-full flex items-center justify-start"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 0.8 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
            >
                <img
                    src={slides[(currentIndex - 1 + slides.length) % slides.length].imageUrl}
                    alt={slides[(currentIndex - 1 + slides.length) % slides.length].alt}
                    className="object-cover h-[80%] w-[45%] brightness-50 rounded-lg shadow-lg opacity-40"
                    style={{ transform: 'translateX(-40%) scale(0.9)' }}
                />
            </motion.div>
        </AnimatePresence>

        <AnimatePresence>
            <motion.div 
                className="absolute top-0 right-0 w-full h-full flex items-center justify-end"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 0.8 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
            >
                 <img
                    src={slides[(currentIndex + 1) % slides.length].imageUrl}
                    alt={slides[(currentIndex + 1) % slides.length].alt}
                    className="object-cover h-[80%] w-[45%] rounded-lg shadow-lg opacity-40"
                    style={{ transform: 'translateX(40%) scale(0.9)' }}
                />
            </motion.div>
        </AnimatePresence>
      </div>

      <button
        onClick={handlePrevious}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white/80 transition-colors p-2 rounded-full z-20"
      >
        <ChevronLeft className="w-6 h-6 text-gray-800" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white/80 transition-colors p-2 rounded-full z-20"
      >
        <ChevronRight className="w-6 h-6 text-gray-800" />
      </button>
      
      <div className="flex justify-center space-x-2 mt-4">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={cn(
              'w-2 h-2 rounded-full transition-colors',
              currentIndex === index ? 'bg-gray-800' : 'bg-gray-400'
            )}
          />
        ))}
      </div>
    </div>
  );
}