'use client'
import React, { useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

function AboutUs() {
  // Helper component for animated cards
  function AnimatedCard({ children }: { children: React.ReactNode }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const controls = useAnimation();

    React.useEffect(() => {
      if (isInView) {
        controls.start({
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: "easeOut" },
        });
      }
    }, [isInView, controls]);

    return (
      // --- CHANGES HERE ---
      // 1. `flex-1`: Allows the card to grow and shrink.
      // 2. `basis-[300px]`: Sets a base width. Cards will wrap when they can't maintain this width.
      // 3. `max-w-md`: Prevents cards from becoming too wide on large screens.
      // 4. `flex flex-col`: Ensures content inside the card stacks vertically.
      <motion.div
        id="about"
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={controls}
        className=" flex-1 basis-[300px] max-w-md flex flex-col border border-black/20 p-3  rounded-2xl shadow-2xl"
      >
        {children}
      </motion.div>
    );
  }

  // Card data array
  const cards = [
    {
      icon: "15+",
      iconClasses: "px-8 py-12",
      title: "15+ Years Of Experience",
      description:
        "We’ve helped countless homes upgrade their comfort and style. Every sofa is crafted or repaired with precision using premium materials. Our designs combine durability and elegance, keeping your sofa beautiful for years."
    },
    {
      icon: <i className="ri-team-fill"></i>,
      iconClasses: "px-11 py-10",
      title: "Customer-First Approach",
      description:
        "We put our customers at the heart of everything we do. From design to delivery, every step is tailored to meet your needs, ensuring comfort, quality, and lasting satisfaction."
    },
    {
      icon: <i className="ri-user-settings-fill"></i>,
      iconClasses: "px-11 py-10",
      title: "Sofa Makers, Repair Experts",
      description:
        "Crafting and restoring sofas with precision, we blend skilled craftsmanship and premium materials for comfort, style, and durability. Whether creating a new piece or reviving an old one, every detail reflects our commitment to quality."
    }
  ];

  return (
    <div id="about md:px-40">
      <div className="flex justify-center mt-10 md:mt-30 ">
        <h1 className="text-4xl font-medium opacity-80 border-b-4 border-[#F5DEB3]">
          About Us
        </h1>
      </div>

      {/* --- CHANGE HERE --- */}
      {/* Added `justify-center` to center the cards in the container */}
      <div className="flex w-full flex-wrap justify-center gap-8 mt-8 p-4">
        {cards.map((card, index) => (
          <AnimatedCard key={index}>
            <div className="flex justify-center text-5xl">
              <h1
                className={`opacity-75 font-semibold text-[#DEB887] rounded-[50%] bg-gray-500/10 ${card.iconClasses}`}
              >
                {card.icon}
              </h1>
            </div>
            <div className="mt-4">
              <h1 className="text-2xl opacity-80 font-semibold text-center">
                {card.title}
              </h1>
              <p className="p-3 font-thin">{card.description}</p>
            </div>
          </AnimatedCard>
        ))}
      </div>
    </div>
  );
}

export default AboutUs;