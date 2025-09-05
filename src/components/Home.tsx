"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Sofa, Wrench, Brush } from "lucide-react";
import sofa1 from "@/assets/h1.jpg";
import sofa2 from "@/assets/h2.jpg";
import sofa3 from "@/assets/h3.jpg";

/**
 * USAGE:
 * 1. Place your images in /public/images/
 *    - /public/images/hero1.jpg
 *    - /public/images/hero2.jpg
 *    - /public/images/hero3.jpg
 *
 * 2. Import and use <HeroCarousel /> in your page.
 *
 * This component auto-rotates images every 5s, only the image + tag change.
 */

const SLIDES = [
  {
    id: 1,
    src: sofa1, // replace with your image
    tag: "⭐ 15+ Years Experience",
  },
  {
    id: 2,
    src: sofa2,
    tag: "🛋️ Custom Sofa Designs",
  },
  {
    id: 3,
    src: sofa3,
    tag: "✨ Premium Finishing",
  },
];

const FEATURES = [
  { id: "f1", Icon: Sofa, label: "Custom Designs", color: "#2563EB", bg: "#DBEAFE" }, // blue
  { id: "f2", Icon: Wrench, label: "Expert Repairs", color: "#10B981", bg: "#D1FAE5" }, // green
  { id: "f3", Icon: Brush, label: "Deep Cleaning", color: "#F59E0B", bg: "#FEF3C7" }, // amber
];

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef<number | null>(null);

  // Pause when page not visible
  useEffect(() => {
    const onVis = () => {
      if (document.hidden) {
        setPaused(true);
      } else {
        setPaused(false);
      }
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  // Auto-advance
  useEffect(() => {
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    intervalRef.current = window.setInterval(() => {
      if (!paused) {
        setIndex((i) => (i + 1) % SLIDES.length);
      }
    }, 5000);
    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, [paused]);

  // manual dot click
  function goTo(i: number) {
    setIndex(i % SLIDES.length);
  }

  const activeSlide = SLIDES[index];

  return (
    <section
      className="relative w-full h-[99vh] overflow-hidden "
      aria-label="Hero: Sofa showcase"
    >
      {/* Background images (stacked, fade) */}
      {SLIDES.map((s, i) => (
        <div
        key={s.id}
        className={`absolute inset-0 transition-opacity duration-1000 ${
          i === index ? "opacity-100 z-10" : "opacity-0 z-0"
        }`}
      >
        <Image
          src={s.src}
          alt={`hero ${i + 1}`}
          fill
          sizes="100vw"
          className="object-cover object-bottom"
          priority={i === 0}
        />
        {/* Stronger black overlay */}
        <div className="absolute inset-0 bg-black/50" />
      </div>
      ))}

      {/* Fixed content (heading + subheading + CTAs) */}
      <div className="relative z-20  h-full flex flex-col justify-center items-center px-4 ">
       <div className="   flex justify-start flex-wrap">
         <h1 className="text-4xl text-semibold text-white/90">
         Premium Sofa <br /> Makers 
         & Repair <br /> in Gurgaon
         </h1>
      

        <p className="mt-4 text-[12px] sm:text-base text-white/85 max-w-2xl">
        Crafted for Comfort | Designed to Last | luxury living made affordable.
        </p>

        {/* CTA row (keeps fixed) */}
        <div className="mt-6 flex gap-3">
        <a
  href="tel:+911234567890"
  className="border-1 border-[#DEB887] px-4 py-2 rounded-2xl  text-[#DEB887] "
>
  Book Now
</a>
        </div>
        </div>
      </div>

      {/* Floating tag (updates with image) */}
      <div
        className="absolute top-6 left-6 z-30"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setPaused(false)}
      >
        <div
          className="rounded-xl px-3 py-1.5 text-sm font-semibold bg-white/90 backdrop-blur-sm shadow-sm border"
          style={{ borderColor: "rgba(235,214,189,0.9)", color: "#8b5e34" }}
          aria-live="polite"
        >
          {activeSlide.tag}
        </div>
      </div>

      {/* Bottom feature bar */}
      {/* <div className="absolute bottom-9 left-1/2 transform -translate-x-1/2 z-30 w-[95%] sm:w-[78%] md:w-[60%] lg:w-[44%]">
        <div
          className="w-full rounded-2xl px-6 py-3 flex justify-between items-center gap-4 shadow-2xl"
          style={{
            background: "rgba(255,255,255,0.92)",
            backdropFilter: "blur(6px)",
            border: "1px solid rgba(226,219,211,0.9)",
          }}
        >
          {FEATURES.map(({ id, Icon, label, color, bg }) => (
            <div key={id} className="flex flex-col items-center justify-center text-center">
              <div
                className="p-2 rounded-full mb-2 shadow-sm"
                style={{ backgroundColor: bg }}
              >
                <Icon size={18} style={{ color }} />
              </div>
              <span className="text-[12px] font-medium text-slate-700">{label}</span>
            </div>
          ))}
        </div>
      </div> */}

      {/* Dots / indicators just above feature bar */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
        {SLIDES.map((s, i) => (
          <button
            key={s.id}
            onClick={() => goToSlide(i, setIndex)}
            aria-label={`Show slide ${i + 1}`}
            className={`h-2.5 w-2.5 rounded-full transition-all ${
              i === index ? "scale-110" : "opacity-50"
            }`}
            style={{
              backgroundColor: i === index ? "#58A0C8" : "#34699A",
              border: "none",
            }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          />
        ))}
      </div>
    </section>
  );
}

/** small helper so linter isn't unhappy about inline function */
function goToSlide(i: number, setIndexFn: (v: number) => void) {
  setIndexFn(i);
}