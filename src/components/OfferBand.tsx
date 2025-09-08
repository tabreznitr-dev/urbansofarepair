'use client'
import React, { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils' // Assuming you have a cn utility for classnames

export default function OfferBand() {
  const trackRef = useRef<HTMLDivElement | null>(null)
  const [duration, setDuration] = useState(120)

  // Use a single, simple effect to measure and set duration
  useEffect(() => {
    if (trackRef.current) {
      const contentWidth = trackRef.current.scrollWidth / 2 // We have two copies of the content
      const pxPerSecond = 80 // Adjust this value to make it faster or slower
      setDuration(contentWidth / pxPerSecond)
    }
  }, [])

  const content = (
    <>
      <span className="font-semibold text-black/80 text-lg">
        10% OFF for New Customers on Sofa Repair and New Sofa Making
      </span>
      <span className="mx-6 text-black/50">|</span>
    </>
  )

  return (
    <div className="w-full bg-yellow-100 py-3 overflow-hidden">
      <div
        // The 'group' class allows us to pause the animation on hover
        className="group flex w-full items-center"
      >
        <div
          ref={trackRef}
          // The CSS animation is applied here
          className="flex animate-marquee items-center gap-4 whitespace-nowrap group-hover:paused"
          // We pass the calculated duration to CSS via a custom property
          style={{ '--duration': `${duration}s` } as React.CSSProperties}
        >
          {/* Render the content multiple times to ensure a seamless loop on all screen sizes */}
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center">
              {content}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}