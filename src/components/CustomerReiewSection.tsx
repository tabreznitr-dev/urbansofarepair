"use client";
import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

// Utility function to merge Tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Define the type for a single card object
type Card = {
  id: number;
  name: string;
  designation: string;
  content: React.ReactNode;
  bgColor: string;
};

// The core CardStack component with typed props
const CardStack = ({
  items,
  offset,
  scaleFactor,
}: {
  items: Card[];
  offset?: number;
  scaleFactor?: number;
}) => {
  const CARD_OFFSET = offset || 10;
  const SCALE_FACTOR = scaleFactor || 0.06;

  return (
    <div className="relative h-60 w-full flex justify-center md:h-60 md:w-96">
      {items.map((card, index) => {
        return (
          <motion.div
            key={card.id}
            className={cn(
              "absolute h-60 w-85 md:h-60 md:w-96 rounded-3xl p-4 shadow-xl border border-gray-200 shadow-black/[0.1] flex flex-col justify-between",
              card.bgColor
            )}
            style={{
              transformOrigin: "top center",
            }}
            animate={{
              top: index * -CARD_OFFSET,
              scale: 1 - index * SCALE_FACTOR,
              zIndex: items.length - index,
            }}
            transition={{
              duration: 0.4,
              ease: "easeInOut",
            }}
          >
            <div className="font-normal text-black/60">{card.content}</div>
            <div>
              <p className="text-gray-800 text-xl font-medium">{card.name}</p>
              <p className="text-black/70 text-[12px] font-normal">{card.designation}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

// Your customer review data
const CUSTOMER_REVIEWS: Card[] = [
    {
      id: 0,
      name: "Anupam",
      designation: "DLF Phase 3, Gurugram",
      bgColor: "bg-amber-100",
      content: (
        <p>
          Amazing sofa repair service! They restored my old sofa to look brand new.
          Quick service and very professional.
        </p>
      ),
    },
    {
      id: 1,
      name: "Neha Kapoor",
      designation: "Sohna Road, Gurugram",
      bgColor: "bg-sky-100",
      content: (
        <p>
          I got a custom sofa made from them. The design, comfort, and finishing
          are top-notch. Highly recommended!
        </p>
      ),
    },
    {
      id: 2,
      name: "Amit Verma",
      designation: "MG Road, Gurugram",
      bgColor: "bg-teal-100",
      content: (
        <p>
          Their same-day sofa repair service saved me before a family function.
          Excellent craftsmanship and polite staff.
        </p>
      ),
    },
    {
      id: 3,
      name: "Priya Malhotra",
      designation: "Golf Course Road, Gurugram",
      bgColor: "bg-pink-100",
      content: (
        <p>
          I was worried about my expensive leather sofa, but they did an amazing
          job with polishing and fixing. Looks brand new now!
        </p>
      ),
    },
    {
      id: 4,
      name: "Karan Mehta",
      designation: "Sector 56, Gurugram",
      bgColor: "bg-green-100",
      content: (
        <p>
          Very professional team. They explained the process clearly and completed
          the repair work on time. Great experience overall.
        </p>
      ),
    },
    {
      id: 5,
      name: "Simran Kaur",
      designation: "Palam Vihar, Gurugram",
      bgColor: "bg-purple-100",
      content: (
        <p>
          The fabric change and foam replacement they did has made my sofa more
          comfortable than ever. Totally worth the price.
        </p>
      ),
    },
  ];

// Main component that renders the customer review section
export default function App() {
  const [cards, setCards] = useState<Card[]>(CUSTOMER_REVIEWS);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startAutoScroll = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setCards((prevCards) => {
        const newArray = [...prevCards];
        const firstItem = newArray.shift();
        if (firstItem) {
          newArray.push(firstItem);
        }
        return newArray;
      });
    }, 5000);
  };

  const handleNext = () => {
    setCards((prevCards) => {
      const newArray = [...prevCards];
      const firstItem = newArray.shift();
      if (firstItem) {
        newArray.push(firstItem);
      }
      return newArray;
    });
    startAutoScroll();
  };

  const handlePrev = () => {
    setCards((prevCards) => {
      const newArray = [...prevCards];
      const lastItem = newArray.pop();
      if (lastItem) {
        newArray.unshift(lastItem);
      }
      return newArray;
    });
    startAutoScroll();
  };

  useEffect(() => {
    startAutoScroll();
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen w-full bg-gray-100 text-gray-900 p-4">
      <h1 className="text-3xl md:text-5xl font-bold text-center mb-17">
        What Our Customers Say
      </h1>
      <div className="flex flex-col items-center justify-center">
        <CardStack items={cards} />
        <div className="flex items-center gap-4 mt-8">
          <button
            onClick={handlePrev}
            className="px-4 py-2 bg-white rounded-full font-semibold text-gray-800 shadow-md hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={handleNext}
            className="px-4 py-2 bg-white rounded-full font-semibold text-gray-800 shadow-md hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </main>
  );
}

