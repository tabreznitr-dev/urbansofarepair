"use client"
import React, { useState, useEffect, useRef, useCallback } from "react"
import { SparklesCore } from "@/components/ui/Sparkles"
import { AnimatePresence, motion } from "motion/react"
import { cn } from "@/lib/utils"
import { IconDotsVertical, IconArrowsHorizontal, IconPlayerPause, IconPlayerPlay } from "@tabler/icons-react"

interface CompareProps {
  firstImage?: string
  secondImage?: string
  firstImageLabel?: string
  secondImageLabel?: string
  className?: string
  firstImageClassName?: string
  secondImageClassname?: string
  initialSliderPercentage?: number
  slideMode?: "hover" | "drag"
  showHandlebar?: boolean
  autoplay?: boolean
  autoplayDuration?: number
}

export const Compare = ({
  firstImage = "",
  secondImage = "",
  firstImageLabel = "Before",
  secondImageLabel = "After",
  className,
  firstImageClassName,
  secondImageClassname,
  initialSliderPercentage = 50,
  slideMode = "hover",
  showHandlebar = true,
  autoplay = false,
  autoplayDuration = 5000,
}: CompareProps) => {
  const [sliderXPercent, setSliderXPercent] = useState(initialSliderPercentage)
  const [isDragging, setIsDragging] = useState(false)
  const [isAutoplayActive, setIsAutoplayActive] = useState(autoplay)
  const [isMouseOver, setIsMouseOver] = useState(false)

  const sliderRef = useRef<HTMLDivElement>(null)
  const autoplayRef = useRef<NodeJS.Timeout | null>(null)

  const startAutoplay = useCallback(() => {
    if (!isAutoplayActive) return

    const startTime = Date.now()
    const animate = () => {
      const elapsedTime = Date.now() - startTime
      const progress = (elapsedTime % (autoplayDuration * 2)) / autoplayDuration
      const percentage = progress <= 1 ? progress * 100 : (2 - progress) * 100

      setSliderXPercent(percentage)
      autoplayRef.current = setTimeout(animate, 16)
    }

    animate()
  }, [isAutoplayActive, autoplayDuration])

  const stopAutoplay = useCallback(() => {
    if (autoplayRef.current) {
      clearTimeout(autoplayRef.current)
      autoplayRef.current = null
    }
  }, [])

  useEffect(() => {
    startAutoplay()
    return () => stopAutoplay()
  }, [startAutoplay, stopAutoplay])

  function mouseEnterHandler() {
    setIsMouseOver(true)
    stopAutoplay()
  }

  function mouseLeaveHandler() {
    setIsMouseOver(false)
    if (slideMode === "hover") {
      setSliderXPercent(initialSliderPercentage)
    }
    if (slideMode === "drag") {
      setIsDragging(false)
    }
    if (isAutoplayActive) {
      startAutoplay()
    }
  }

  const handleStart = useCallback(
    (clientX: number) => {
      if (slideMode === "drag") {
        setIsDragging(true)
      }
    },
    [slideMode],
  )

  const handleEnd = useCallback(() => {
    if (slideMode === "drag") {
      setIsDragging(false)
    }
  }, [slideMode])

  const handleMove = useCallback(
    (clientX: number) => {
      if (!sliderRef.current) return
      if (slideMode === "hover" || (slideMode === "drag" && isDragging)) {
        const rect = sliderRef.current.getBoundingClientRect()
        const x = clientX - rect.left
        const percent = (x / rect.width) * 100
        requestAnimationFrame(() => {
          setSliderXPercent(Math.max(0, Math.min(100, percent)))
        })
      }
    },
    [slideMode, isDragging],
  )

  const handleMouseDown = useCallback((e: React.MouseEvent) => handleStart(e.clientX), [handleStart])
  const handleMouseUp = useCallback(() => handleEnd(), [handleEnd])
  const handleMouseMove = useCallback((e: React.MouseEvent) => handleMove(e.clientX), [handleMove])

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (!isAutoplayActive) {
        handleStart(e.touches[0].clientX)
      }
    },
    [handleStart, isAutoplayActive],
  )

  const handleTouchEnd = useCallback(() => {
    if (!isAutoplayActive) {
      handleEnd()
    }
  }, [handleEnd, isAutoplayActive])

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isAutoplayActive) {
        handleMove(e.touches[0].clientX)
      }
    },
    [handleMove, isAutoplayActive],
  )

  const toggleAutoplay = () => {
    setIsAutoplayActive(!isAutoplayActive)
    if (!isAutoplayActive) {
      startAutoplay()
    } else {
      stopAutoplay()
    }
  }

  return (
    <div className="relative mt-[-60px]">
      <div className="flex items-center justify-between mb-8 p-6 glass bg-card/60 rounded-2xl ">
       

        {autoplay && (
          <motion.button
            onClick={toggleAutoplay}
            className="flex items-center gap-3 px-6 py-3 rounded-xl glass bg-card/80 glass-border hover:bg-accent/20 transition-all duration-300 text-sm font-bold font-sans neon-glow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isAutoplayActive ? (
              <>
                <IconPlayerPause className="w-5 h-5 text-accent" />
                <span className="text-foreground">Pause</span>
              </>
            ) : (
              <>
                <IconPlayerPlay className="w-5 h-5 text-accent" />
                <span className="text-foreground">Play</span>
              </>
            )}
          </motion.button>
        )}
      </div>

      <div
        ref={sliderRef}
        className={cn(
          "relative overflow-hidden rounded-3xl glass bg-card/40 glass-border backdrop-blur-2xl",
          "w-[600px] h-[450px] group neon-glow-strong shadow-2xl",
          className,
        )}
        style={{
          cursor: slideMode === "drag" ? (isDragging ? "grabbing" : "grab") : "col-resize",
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={mouseLeaveHandler}
        onMouseEnter={mouseEnterHandler}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchMove={handleTouchMove}
      >
        <AnimatePresence initial={false}>
          <motion.div
            className="h-full w-1 absolute top-0 z-40 rounded-full"
            style={{
              left: `${sliderXPercent}%`,
              background:
                "linear-gradient(to bottom, transparent 0%, hsl(var(--accent)) 5%, hsl(var(--accent)) 95%, transparent 100%)",
              boxShadow: "0 0 20px hsl(var(--accent)), 0 0 40px hsl(var(--accent))",
            }}
            transition={{ duration: 0 }}
          >
            <div className="w-40 h-full absolute top-1/2 -translate-y-1/2 left-0 opacity-40">
              <div className="w-full h-full bg-gradient-to-r from-accent/30 via-accent/50 to-transparent [mask-image:radial-gradient(120px_at_left,white,transparent)] blur-sm" />
            </div>

            <div className="w-12 h-4/5 top-1/2 -translate-y-1/2 absolute -right-12 [mask-image:radial-gradient(80px_at_left,white,transparent)]">
              <MemoizedSparklesCore
                background="transparent"
                minSize={0.4}
                maxSize={1.2}
                particleDensity={1000}
                className="w-full h-full"
                particleColor="hsl(var(--accent))"
                speed={3}
              />
            </div>

            {showHandlebar && (
              <motion.div
                className="h-12 w-12 rounded-full top-1/2 -translate-y-1/2 glass bg-card/90 glass-border z-50 -right-6 absolute flex items-center justify-center neon-glow group-hover:neon-glow-strong transition-all duration-300"
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.9 }}
                style={{
                  boxShadow: "0 0 25px hsl(var(--accent)), inset 0 0 15px hsl(var(--accent))/20",
                }}
              >
                <IconDotsVertical className="h-5 w-5 text-accent" />
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="overflow-hidden w-[94vw] h-full relative z-20 pointer-events-none rounded-3xl">
          <AnimatePresence initial={false}>
            {firstImage ? (
              <motion.div
                className={cn(
                  "absolute inset-0 z-20 shrink-0 w-full h-full select-none overflow-hidden rounded-3xl",
                  firstImageClassName,
                )}
                style={{
                  clipPath: `inset(0 ${100 - sliderXPercent}% 0 0)`,
                }}
                transition={{ duration: 0 }}
              >
                <img
                  alt={firstImageLabel}
                  src={firstImage || "/placeholder.svg"}
                  className={cn(
                    "absolute inset-0 z-20 shrink-0 w-full h-full select-none object-cover rounded-3xl",
                    firstImageClassName,
                  )}
                  draggable={false}
                />
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        <AnimatePresence initial={false}>
          {secondImage ? (
            <motion.img
              className={cn(
                "absolute top-0 left-0 z-[19] w-full h-full select-none object-cover rounded-3xl",
                secondImageClassname,
              )}
              alt={secondImageLabel}
              src={secondImage}
              draggable={false}
            />
          ) : null}
        </AnimatePresence>

        <motion.div
          className="absolute bottom-6 left-6 z-30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="glass bg-card/90 glass-border rounded-xl px-4 py-3 text-sm font-bold text-foreground backdrop-blur-xl neon-glow">
            <span className="text-accent">{Math.round(sliderXPercent)}%</span>
            <span className="text-muted-foreground mx-2">•</span>
            <span className="text-accent">{Math.round(100 - sliderXPercent)}%</span>
          </div>
        </motion.div>
      </div>

    
    </div>
  )
}

const MemoizedSparklesCore = React.memo(SparklesCore)
