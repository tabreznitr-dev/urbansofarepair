"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, type Variants } from "framer-motion"
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface Slide {
  id: number
  imageUrl: string
  alt: string
  title: string
  subtitle?: string
}

interface ImageCarouselProps {
  slides: Slide[]
  autoplay?: boolean
  interval?: number
}

export function ImageCarousel({ slides, autoplay = true, interval = 5000 }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState<"left" | "right" | null>(null)
  const [isPlaying, setIsPlaying] = useState(autoplay)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const handleNext = () => {
    setDirection("right")
    setCurrentIndex((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1))
  }

  const handlePrevious = () => {
    setDirection("left")
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1))
  }

  const handleDotClick = (index: number) => {
    if (index > currentIndex) {
      setDirection("right")
    } else {
      setDirection("left")
    }
    setCurrentIndex(index)
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const startAutoplay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        handleNext()
      }, interval)
    }
  }

  const stopAutoplay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
  }

  useEffect(() => {
    startAutoplay()
    return () => stopAutoplay()
  }, [isPlaying, currentIndex])

  const slideVariants: Variants = {
    hidden: (direction: "left" | "right") => ({
      x: direction === "right" ? "100%" : "-100%",
      opacity: 0,
      scale: 0.98, // Slightly adjusted for a smoother scale effect
    }),
    visible: {
      x: "0%",
      opacity: 1,
      scale: 1,
    },
    exit: (direction: "left" | "right") => ({
      x: direction === "right" ? "-100%" : "100%",
      opacity: 0,
      scale: 0.98, // Slightly adjusted for a smoother scale effect
    }),
  }

  const textVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: 0.3, duration: 0.6, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.3 },
    },
  }

  return (
    <div className="px-4">
      <div className="relative w-full max-w-6xl mx-auto bg-background rounded-2xl overflow-hidden shadow-2xl">
        <div
          className="relative h-[57vh] md:h-[600px] overflow-hidden bg-black" // Added bg-black to parent
          onMouseEnter={stopAutoplay}
          onMouseLeave={startAutoplay}
        >
          {/* CHANGE 1: Removed mode="wait" to allow cross-fading and prevent the white flash. */}
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              variants={slideVariants}
              custom={direction}
              initial="hidden"
              animate="visible"
              exit="exit"
              // CHANGE 2: Reduced stiffness and damping for a gentler, smoother spring animation.
              transition={{
                x: { type: "spring", stiffness: 120, damping: 25 },
                opacity: { duration: 0.5 },
                scale: { duration: 0.5 },
              }}
              className="absolute inset-0"
            >
              <div className="relative w-full h-full">
                <Image
                  src={slides[currentIndex].imageUrl}
                  alt={slides[currentIndex].alt}
                  fill
                  style={{ objectFit: "cover" }}
                  priority={currentIndex === 0}
                  sizes="(max-width: 768px) 100vw, 1200px"
                  className="brightness-75"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`text-${currentIndex}`}
                      variants={textVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="max-w-2xl"
                    >
                      <h2 className="font-serif text-3xl md:text-5xl font-bold text-white mb-3 text-balance">
                        {slides[currentIndex].title}
                      </h2>
                      {slides[currentIndex].subtitle && (
                        <p className="font-sans text-lg md:text-xl text-white/90 text-pretty">
                          {slides[currentIndex].subtitle}
                        </p>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation arrows */}
          <button
            onClick={handlePrevious}
            className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 p-3 md:p-4 rounded-full z-20 group"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-blue-100" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 p-3 md:p-4 rounded-full z-20 group"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-blue-100" />
          </button>

          {/* Play/Pause button */}
          <button
            onClick={togglePlayPause}
            className="absolute top-4 md:top-6 right-4 md:right-6 bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 p-2 md:p-3 rounded-full z-20 group"
            aria-label={isPlaying ? "Pause autoplay" : "Play autoplay"}
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 md:w-5 md:h-5 text-blue-100" />
            ) : (
              <Play className="w-4 h-4 md:w-5 md:h-5 text-blue-100" />
            )}
          </button>
        </div>

        {/* Bottom section */}
        <div className="bg-card px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium text-muted-foreground">
              {String(currentIndex + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
            </div>
            <div className="flex items-center space-x-1">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={cn(
                    "relative h-2 rounded-full transition-all duration-300",
                    currentIndex === index ? "w-8 bg-blue-200" : "w-2 bg-blue-100 hover:bg-muted-foreground",
                  )}
                  aria-label={`Go to slide ${index + 1}`}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}