'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function NavigationBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const menuItems = [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#services" },
    { name: "Why  Us", href: "#why-choose-us" },
    { name: "Our Offerings", href: "#offerings" },
    { name: "Restoration", href: "#restoration-showcase" },
    { name: "Contact", href: "#contact" },
  ];

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Conversion tracking
  const gtag_report_conversion = (url?: string) => {
    const callback = () => {
      if (url) {
        window.location.href = url;
      }
    };

    window.gtag?.('event', 'conversion', {
      send_to: 'AW-17487093185/a9KWCObAqogbEMG7v5JB',
      value: 15000.0,
      currency: 'INR',
      event_callback: callback,
    });

    return false;
  };

  return (
    <div>
      {/* Phone Button */}
      <div className="fixed bottom-5 md:left-15 md:bottom-10 left-5 z-50">
        <div className="relative w-14 h-14">
          {/* Ripple Effects */}
          <span className="absolute left-1.5 top-1.5 w-11 h-11 rounded-full smooth-ripple"
            style={{ borderColor: '#42A5F5', animationDelay: '0.4s' }}></span>
          <span className="absolute left-1.5 top-1.5 w-11 h-11 rounded-full smooth-ripple"
            style={{ borderColor: '#42A5F5', animationDelay: '0.6s' }}></span>
          <span className="absolute left-1.5 top-1.5 w-11 h-11 rounded-full smooth-ripple"
            style={{ borderColor: '#42A5F5', animationDelay: '1.0s' }}></span>

          {/* Phone button */}
          <a href="tel:+917846940025">
            <button className="relative w-14 h-14 bg-white rounded-full shadow-xl flex items-center justify-center">
              <i className="text-2xl text-[#5682B1] ri-phone-fill"></i>
            </button>
          </a>
        </div>
      </div>

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/917846940025?text=Hi%2C%20I%20need%20a%20sofa%20repair%20service"
        target="_blank"
        rel="noopener noreferrer"
      >
        <button className="w-14 h-14 rounded-full bg-[#25D366] bottom-5 right-5 md:right-15 md:bottom-10 z-50 fixed">
          <i className="text-4xl px-1 text-white ri-whatsapp-line"></i>
        </button>
      </a>

      {/* Navbar */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white border-b-2 border-blue-100 shadow-md"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <div className="flex-shrink-0">
              <h1 className={`text-xl  ${scrolled ? "text-[#647FBC]" : "text-white/80"}`}
              >
                <i className="ri-sofa-fill"></i> Shagun Sofa
                <br />
                <p className={`text-black/80 text-[10px] ${scrolled ? "text-[#647FBC]" : "text-white/80"}`}>
                  M3M Cosmopolitan Mall, Gurgaon
                </p>
              </h1>
            </div>

            {/* Desktop Menu */}
            <div className="hidden sm:flex space-x-8">
              {menuItems.map((item, i) => (
                <Link
                  key={i}
                  href={item.href}
                  className={`transition-colors duration-300 ${
                    scrolled
                      ? "text-white hover:text-yellow-200"
                      : "text-white hover:text-yellow-200"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Mobile Toggle Button */}
            <div className="sm:hidden">
              <button
                onClick={() => setIsOpen(true)}
                className={`text-[#647FBC] focus:outline-none ${scrolled ? "text-[#647FBC]" : "text-white/80"}`}
              >
                <span className="text-2xl">&#9776;</span>
              </button>
            </div>
          </div>
        </div>

        {/* Full-Screen Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="fixed top-0 left-0 w-full h-screen bg-yellow-50 z-40 flex flex-col items-center justify-center space-y-8"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-5 right-5 text-xl text-gray-800 "
              >
                &times;
              </button>

              {menuItems.map((item, i) => (
                <Link
                  key={i}
                  href={item.href}
                  className="text-2xl font-mono font-thin  text-black  hover:text-primary transition-colors duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </div>
  );
}

export default NavigationBar;