'use client'
import React, { useEffect, useRef, useState } from 'react'
import { motion, useAnimation } from 'framer-motion'

export default function OfferBand() {
  const trackRef = useRef<HTMLDivElement | null>(null)
  const controls = useAnimation()
  const [contentWidth, setContentWidth] = useState(0)

  useEffect(() => {
    function measure() {
      if (!trackRef.current) return
      const first = trackRef.current.querySelector<HTMLDivElement>('.marquee-item')
      if (first) setContentWidth(first.offsetWidth)
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  useEffect(() => {
    if (!contentWidth) return
    const pxPerSecond = 280
    const duration = Math.max(contentWidth / pxPerSecond, 7)
    controls.start({
      x: [0, -contentWidth],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: 'loop',
          duration,
          ease: 'linear',
        },
      },
    })
  }, [contentWidth, controls])

  const content = (
    <div className="flex items-center gap-4 whitespace-nowrap px-6">
      <span className="font-semibold text-black/80 text-lg">
        10% OFF for New Customers on Sofa Repair and New Sofa Making &nbsp; &nbsp; &nbsp;  |&nbsp;&nbsp; 
      </span>
    </div>
  )

  return (
    <div className="w-full bg-yellow-100 py-3 overflow-hidden">
      <motion.div
        ref={trackRef}
        className="flex items-center"
        onMouseEnter={() => controls.stop()}
        onMouseLeave={() => {
          if (!contentWidth) return
          const pxPerSecond = 180
          const duration = Math.max(contentWidth / pxPerSecond, 4)
          controls.start({
            x: [0, -contentWidth],
            transition: {
              x: {
                repeat: Infinity,
                repeatType: 'loop',
                duration,
                ease: 'linear',
              },
            },
          })
        }}
        animate={controls}
        style={{ willChange: 'transform' }}
      >
        {/* 👇 duplicate content twice to make seamless loop */}
        <div className="marquee-item flex items-center">{content}</div>
        <div className="marquee-item flex items-center">{content}</div>
      </motion.div>
    </div>
  )
}