"use client";
import React, { useEffect, useState, useRef } from "react";
import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

// Utility function to merge Tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Card type definition remains the same
type Card = {
  id: number;
  name: string;
  designation: string;
  content: React.ReactNode;
  bgColor: string;
};

// --- CSS-Powered CardStack ---
const CardStack = ({ items, activeIndex }: { items: Card[]; activeIndex: number }) => {
  return (
    <div
      className="relative h-60 w-full flex justify-center md:h-60 md:w-96 card-stack-container"
      style={{ "--active-index": activeIndex } as React.CSSProperties}
    >
      {items.map((card, index) => {
        const isInactive = activeIndex > index;
        return (
          <div
            key={card.id}
            className={cn(
              "card-stack-item h-60 w-85 md:h-60 md:w-96 rounded-3xl p-4 shadow-xl border border-gray-200 shadow-black/[0.1] flex flex-col justify-between",
              card.bgColor
            )}
            // Pass the index to CSS and set active status
            style={{ "--i": index } as React.CSSProperties}
            data-active={activeIndex === index}
            data-status={isInactive ? "inactive" : "active"}
          >
            <div className="font-normal text-black/60">{card.content}</div>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-800 text-xl font-medium">{card.name}</p>
                <p className="text-black/70 text-[12px] font-normal">{card.designation}</p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" x="10px" y="10px" width="35" height="35" viewBox="0 0 48 48">
                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
              </svg>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// Your customer review data remains the same
const CUSTOMER_REVIEWS: Card[] = [
    { id: 0, name: "Anupam", designation: "DLF Phase 3, Gurugram", bgColor: "bg-amber-100", content: <p>Amazing sofa repair service! They restored my old sofa to look brand new. Quick service and very professional.</p> },
    { id: 1, name: "Neha Kapoor", designation: "Sohna Road, Gurugram", bgColor: "bg-sky-100", content: <p>I got a custom sofa made from them. The design, comfort, and finishing are top-notch. Highly recommended!</p> },
    { id: 2, name: "Amit Verma", designation: "MG Road, Gurugram", bgColor: "bg-teal-100", content: <p>Their same-day sofa repair service saved me before a family function. Excellent craftsmanship and polite staff.</p> },
    { id: 3, name: "Priya Malhotra", designation: "Golf Course Road, Gurugram", bgColor: "bg-pink-100", content: <p>I was worried about my expensive leather sofa, but they did an amazing job with polishing and fixing. Looks brand new now!</p> },
    { id: 4, name: "Karan Mehta", designation: "Sector 56, Gurugram", bgColor: "bg-green-100", content: <p>Very professional team. They explained the process clearly and completed the repair work on time. Great experience overall.</p> },
    { id: 5, name: "Simran Kaur", designation: "Palam Vihar, Gurugram", bgColor: "bg-purple-100", content: <p>The fabric change and foam replacement they did has made my sofa more comfortable than ever. Totally worth the price.</p> },
];

// Main component that renders the customer review section
export default function App() {
  // State is now a simple index, not the whole array
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Simplified logic for next/prev
  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % CUSTOMER_REVIEWS.length);
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + CUSTOMER_REVIEWS.length) % CUSTOMER_REVIEWS.length);
  };

  // Autoplay logic now just updates the index
  useEffect(() => {
    const startAutoScroll = () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = setInterval(handleNext, 5000);
    };

    startAutoScroll();

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [activeIndex]); // Restart timer on manual navigation

  return (
    <main className="flex flex-col items-center justify-center w-full bg-gray-100 text-gray-900 p-4">
      <h1 className="text-3xl md:text-5xl font-bold text-center mb-12 md:mb-16">
        What Our Customers Say
      </h1>
      <div className="flex flex-col items-center justify-center">
        <CardStack items={CUSTOMER_REVIEWS} activeIndex={activeIndex} />
        <div className="flex items-center gap-4 mt-8">
          <button
            onClick={handlePrev}
            className="px-4 py-2 bg-white rounded-full font-semibold text-gray-800 shadow-md hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
            aria-label="Previous review"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={handleNext}
            className="px-4 py-2 bg-white rounded-full font-semibold text-gray-800 shadow-md hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
            aria-label="Next review"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </main>
  );
}