'use client'
import React, { useRef, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: "easeOut" },
      });
    }
  }, [isInView, controls]);

  return (
    <motion.footer
      id="contact"
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
      className="bg-primary text-gray-300 rounded-t-2xl md:mt-20 px-6 md:px-16 py-10"
    >
      {/* Main Footer Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 border-b border-gray-700 pb-8">
        
        {/* Brand */}
        <div>
          <h1 className="text-xl font-semibold text-[#DEB887] flex items-center gap-2">
            <i className="ri-sofa-fill"></i> Shagun Sofa Repair
          </h1>
          <p className="text-sm mt-2">M3M Cosmopolitan Mall, Gurgaon</p>
          <p className="text-sm mt-3 leading-relaxed">
            Revive, redesign, or upgrade – we bring life back to your sofas with expert repair and craftsmanship trusted since 2012.
          </p>
          <div className="flex gap-4 text-2xl mt-4 text-[#DEB887]">
            <i className="ri-facebook-circle-fill cursor-pointer hover:scale-110 transition" />
            <a href="https://www.instagram.com/farman__ali92/" target="_blank">
              <i className="ri-instagram-fill cursor-pointer hover:scale-110 transition" />
            </a>
            <a
              href="https://wa.me/919058304133?text=Hi%2C%20I%20need%20a%20sofa%20repair%20service"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="ri-whatsapp-fill cursor-pointer hover:scale-110 transition" />
            </a>
          </div>
        </div>

        {/* Services */}
        <div>
          <h2 className="text-lg font-semibold text-[#DEB887]">Our Services</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li>Sofa Repair</li>
            <li>New Sofa Making</li>
            <li>Chair Repair</li>
            <li>Bed Design & Repair</li>
            <li>Same Day Delivery</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h2 className="text-lg font-semibold text-[#DEB887]">Contact Us</h2>
          <ul className="mt-3 space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <i className="ri-map-pin-fill text-[#DEB887]" /> M3M Cosmopolitan Mall, Gurgaon
            </li>
            <li className="flex items-center gap-2">
              <a href="tel:+919058304133" className="flex items-center gap-2 hover:text-[#DEB887]">
                <i className="ri-phone-fill text-[#DEB887]" /> +91 9058304133
              </a>
            </li>
            <li className="flex items-center gap-2">
              <a href="mailto:shagunsofarepair@gmail.com" className="flex items-center gap-2 hover:text-[#DEB887]">
                <i className="ri-mail-fill text-[#DEB887]" /> shagunsofarepair@gmail.com
              </a>
            </li>
            <li className="flex items-center gap-2">
              <i className="ri-time-fill text-[#DEB887]" /> Mon-Sun, 9AM - 9PM
            </li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-semibold text-[#DEB887]">Quick Links</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li><a href="#home" className="hover:text-[#DEB887]">Home</a></li>
            <li><a href="#about" className="hover:text-[#DEB887]">About Us</a></li>
            <li><a href="#services" className="hover:text-[#DEB887]">Services</a></li>
            <li><a href="#contact" className="hover:text-[#DEB887]">Contact</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="text-center text-sm text-gray-500 mt-6">
        <i className="ri-copyright-line"></i> 2025 Shagun Sofa Repair. All rights reserved.
      </div>
    </motion.footer>
  );
}

export default Footer;