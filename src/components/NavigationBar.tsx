"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

function NavigationBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const menuItems = [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#services" },
    { name: "Why Us", href: "#why-choose-us" },
    { name: "Our Offerings", href: "#offerings" },
    { name: "Restoration", href: "#restoration-showcase" },
    { name: "Contact", href: "#contact" },
  ];

  /* Scroll detection */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Lock body scroll when mobile menu open */
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    // FIX: Added curly braces to ensure we return void, not the string "auto"
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <>
      {/* Spacer to avoid overlap */}
      <div className="h-16" />

      {/* Phone Button */}
      <div className="fixed bottom-5 left-5 md:bottom-10 md:left-10 z-50">
        <div className="relative w-14 h-14">
          <span className="absolute inset-0 rounded-full smooth-ripple border-2 border-[#42A5F5]" />
          <a href="tel:+917428240037">
            <button className="relative w-14 h-14 bg-white rounded-full shadow-xl flex items-center justify-center">
              <i className="ri-phone-fill text-2xl text-[#5682B1]" />
            </button>
          </a>
        </div>
      </div>

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/917428240037?text=Hi%2C%20I%20need%20a%20sofa%20repair%20service"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 md:bottom-10 md:right-10 z-50"
      >
        <button className="w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-xl">
          <i className="ri-whatsapp-line text-3xl text-white" />
        </button>
      </a>

      {/* Navbar */}
      <nav
        className={`fixed top-0 w-full z-40 transition-all duration-300 ${
          scrolled
            ? "bg-white shadow-md border-b border-blue-100"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div>
              <h1
                className={`text-xl ${
                  scrolled ? "text-[#647FBC]" : "text-white/80"
                }`}
              >
                <i className="ri-sofa-fill" /> Shagun Sofa
                <p className="text-[10px]">
                 Sector 63A Foji Market Near,Petrol Pump
                </p>
              </h1>
            </div>

            {/* Desktop Menu */}
            <div className="hidden sm:flex space-x-8">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`transition-colors ${
                    scrolled
                      ? "text-slate-600 hover:text-blue-500"
                      : "text-white hover:text-yellow-200"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsOpen((v) => !v)}
              className={`sm:hidden text-2xl ${
                scrolled ? "text-[#5682B1]" : "text-white"
              }`}
              aria-label="Toggle menu"
            >
              ☰
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-black/50 z-40"
                onClick={() => setIsOpen(false)}
              />

              {/* Drawer */}
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="fixed top-0 left-0 w-[85vw] max-w-[320px] h-screen bg-white z-50 overflow-hidden will-change-transform"
              >
                <div className="p-6 space-y-4">
                  {menuItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="block py-3 text-lg text-gray-700 hover:text-[#647FBC]"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}

export default NavigationBar;