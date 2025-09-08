"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

function NavigationBar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const menuItems = [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#services" },
    { name: "Why Us", href: "#why-choose-us" },
    { name: "Our Offerings", href: "#offerings" },
    { name: "Restoration", href: "#restoration-showcase" },
    { name: "Contact", href: "#contact" },
  ]

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Conversion tracking
  const gtag_report_conversion = (url?: string) => {
    const callback = () => {
      if (url) {
        window.location.href = url
      }
    }

    window.gtag?.("event", "conversion", {
      send_to: "AW-17487093185/a9KWCObAqogbEMG7v5JB",
      value: 15000.0,
      currency: "INR",
      event_callback: callback,
    })

    return false
  }

  return (
    <div>
      {/* Phone Button */}
      <div className="fixed bottom-5 md:left-15 md:bottom-10 left-5 z-50">
        <div className="relative w-14 h-14">
          {/* Ripple Effects */}
          <span
            className="absolute left-1.5 top-1.5 w-11 h-11 rounded-full smooth-ripple"
            style={{ borderColor: "#42A5F5", animationDelay: "0.4s" }}
          ></span>
          <span
            className="absolute left-1.5 top-1.5 w-11 h-11 rounded-full smooth-ripple"
            style={{ borderColor: "#42A5F5", animationDelay: "0.6s" }}
          ></span>
          <span
            className="absolute left-1.5 top-1.5 w-11 h-11 rounded-full smooth-ripple"
            style={{ borderColor: "#42A5F5", animationDelay: "1.0s" }}
          ></span>

          {/* Phone button */}
          <a href="tel:+919058304133">
            <button className="relative w-14 h-14 bg-white rounded-full shadow-xl flex items-center justify-center">
              <i className="text-2xl text-[#5682B1] ri-phone-fill"></i>
            </button>
          </a>
        </div>
      </div>

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/919058304133?text=Hi%2C%20I%20need%20a%20sofa%20repair%20service"
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
          scrolled ? "bg-white border-b-2 border-blue-100 shadow-md" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <div className="flex-shrink-0">
              <h1 className={`text-xl  ${scrolled ? "text-[#647FBC]" : "text-white/80"}`}>
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
                    scrolled ? "text-slate-600 hover:text-blue-500" : "text-white hover:text-yellow-200"
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
                className={`text-[#647FBC] focus:outline-none ${scrolled ? "text-[#5682B1]" : "text-white/80"}`}
                aria-label="Open menu"
              >
                <span className="text-2xl">&#9776;</span>
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                // ✨ Changed: Faster backdrop transition
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="fixed inset-0 bg-black/50 z-40"
                onClick={() => setIsOpen(false)}
              />

              {/* Mobile Menu Panel */}
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                // ✨ Changed: Replaced duration-based ease with a physics-based spring
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
                // ✨ Added: Performance optimization for smoother animation
                className="fixed top-0 left-0 w-80 max-w-[85vw] h-screen bg-white shadow-2xl z-50 flex flex-col will-change-transform"
              >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                  <div>
                    <h2 className="text-xl font-bold text-[#647FBC] flex items-center gap-2">
                      <i className="ri-sofa-fill"></i>
                      Shagun Sofa
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">M3M Cosmopolitan Mall, Gurgaon</p>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                    aria-label="Close menu"
                  >
                    <span className="text-xl text-gray-600">&times;</span>
                  </button>
                </div>

                {/* Navigation Links */}
                <div className="flex-1 py-6">
                  <nav className="space-y-2 px-6">
                    {menuItems.map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.07 + 0.1 }}
                      >
                        <Link
                          href={item.href}
                          className="flex items-center gap-3 py-3 px-4 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-[#647FBC] transition-all duration-200 group"
                          onClick={() => setIsOpen(false)}
                        >
                          <span className="w-2 h-2 rounded-full bg-[#647FBC] opacity-0 group-hover:opacity-100 transition-opacity"></span>
                          <span className="text-lg font-medium">{item.name}</span>
                        </Link>
                      </motion.div>
                    ))}
                  </nav>
                </div>

                {/* Contact Actions */}
                <div className=" p-6 border-t border-gray-100 space-y-3">
                  <a
                    href="tel:+919058304133"
                    className="flex items-center gap-3 w-full py-3 px-4 bg-[#647FBC] text-white rounded-lg hover:bg-[#5682B1] transition-colors"
                  >
                    <i className="ri-phone-fill text-lg"></i>
                    <span className="font-medium">Call Now</span>
                  </a>
                  <a
                    href="https://wa.me/919058304133?text=Hi%2C%20I%20need%20a%20sofa%20repair%20service"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 w-full py-3 px-4 bg-[#25D366] text-white rounded-lg hover:bg-[#22c55e] transition-colors"
                  >
                    <i className="ri-whatsapp-line text-lg"></i>
                    <span className="font-medium">WhatsApp</span>
                  </a>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>
    </div>
  )
}

export default NavigationBar