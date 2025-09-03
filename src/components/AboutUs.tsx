'use client'
import React, { useRef, ReactNode, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
}

function AboutUs() {
  // Helper component for animated cards
  function AnimatedCard({ children, className }: AnimatedCardProps) {
    const ref = useRef<HTMLDivElement | null>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const controls = useAnimation();

    useEffect(() => {
      if (isInView) {
        controls.start({
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: "easeOut" },
        });
      }
    }, [isInView, controls]);

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={controls}
        className={`relative flex-1 basis-[300px] max-w-md flex flex-col border border-[#DEB887] rounded-2xl shadow-xl p-6 bg-white ${className}`}
      >
        {children}
      </motion.div>
    );
  }

  interface Card {
    icon: ReactNode;
    iconClasses: string;
    title: string;
    description: string;
  }

  const cards: Card[] = [
    {
      icon: "15+",
      iconClasses: "text-lg font-bold",
      title: "15+ Years Of Experience",
      description:
        "We’ve helped countless homes upgrade their comfort and style. Every sofa is crafted or repaired with precision using premium materials. Our designs combine durability and elegance, keeping your sofa beautiful for years."
    },
    {
      icon: <i className="ri-team-fill"></i>,
      iconClasses: "text-2xl",
      title: "Customer-First Approach",
      description:
        "We put our customers at the heart of everything we do. From design to delivery, every step is tailored to meet your needs, ensuring comfort, quality, and lasting satisfaction."
    },
    {
      icon: <i className="ri-user-settings-fill"></i>,
      iconClasses: "text-2xl",
      title: "Sofa Makers, Repair Experts",
      description:
        "Crafting and restoring sofas with precision, we blend skilled craftsmanship and premium materials for comfort, style, and durability. Whether creating a new piece or reviving an old one, every detail reflects our commitment to quality."
    }
  ];

  return (
    <div id="about" className="md:px-40 py-10">
      <div className="flex justify-center mt-10 md:mt-30">
        <h1 className="text-4xl font-medium opacity-80 border-b-4 border-[#DEB887]">
          About Us
        </h1>
      </div>

      <div className="flex w-full flex-wrap justify-center gap-8 mt-8 p-4">
        {cards.map((card, index) => (
          <AnimatedCard key={index} className="mt-10">
            {/* Floating Icon Badge */}
            <div className="absolute -top-8 left-6">
              <div className="w-22 h-22 flex items-center justify-center rounded-full border-2 border-[#DEB887] bg-white shadow-md">
                <span className={`text-[#DEB887] text-3xl ${card.iconClasses}`}>
                  {card.icon}
                </span>
              </div>
            </div>

            {/* Card Content */}
            <div className="mt-10">
              <h1 className="text-2xl opacity-80 font-semibold text-center">
                {card.title}
              </h1>
              <p className="p-3 font-thin text-center">{card.description}</p>
            </div>
          </AnimatedCard>
        ))}
      </div>
    </div>
  );
}

export default AboutUs;