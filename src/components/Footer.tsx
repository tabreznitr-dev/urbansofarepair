'use client'
import React, { useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();

  React.useEffect(() => {
    if (isInView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: "easeOut" },
      });
    }
  }, [isInView, controls]);

  return (
    <motion.div
     id="contact"
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
      className=" bg-primary text-white/80 rounded-t-2xl md:mt-30 text-white-80 flex flex-wrap p-4"
    >
      <section>
        {/* About The Brand */}
        <div>
          <h1 className="text-2xl text-sand">
            <i className="ri-sofa-fill "></i>Shagun Sofa Repair
          </h1>
          <p className="text-[10px] font-normal ">M3M Cosmopolitan Mall, Gurgaon</p>
          <p className="text-[15px] font-thin   mt-3">
          Whether you’re reviving an old favorite, designing something completely new, or giving your sofa a stylish fabric upgrade, we 
            make it happen. Since 2012, we’ve been known for quality craftsmanship and timeless comfort.
          </p>
        </div>
        <div className="mt-5 flex gap-3 text-3xl text-sand">
          {/* social handels  */}
           <i className=" ri-facebook-circle-fill"></i>
         <a href="https://www.instagram.com/farman__ali92/" target="_blank"> <i className="  ri-instagram-fill"></i></a>
          <a href="https://wa.me/919058304133?text=Hi%2C%20I%20need%20a%20sofa%20repair%20service" 
          target="_blank" rel="noopener noreferrer"> <i className=" ri-whatsapp-fill"></i></a> 
        </div>
      </section>

      <section className="w-screen mt-3">
        {/* Services  Section */}
        <div className="border-t border-[#F5DEB3]/60 w-full ">
          <div className="mt-3 ">
            <h1 className="text-2xl text-sand ">Our Services</h1>
            <ul className="text-[15px] font-thin  mt-3">
              <li>Sofa Repair</li>
              <li>New Sofa Making</li>
              <li>Chair Repair</li>
              <li>Bed Design & Repair</li>
              <li>Same Day Delivery</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="w-screen  mt-3">
        {/* Contact Info Section */}
        <div className="border-t  border-[#F5DEB3]/60  w-full ">
          <div className="mt-3 ">
            <h1 className="text-2xl text-sand">Contact Us</h1>
            <div>
              <div className="text-[15px] font-thin  mt-3">
                <p>
                  <i className="text-sand text-[18px] ri-map-pin-fill"></i> M3M Cosmopolitan Mall, Gurgaon
                </p>
                <p>
                   <a href="tel:+919058304133"><i className="text-sand text-[18px] ri-phone-fill"></i> +91 9058304133 </a>
                </p>
                <p>
                  <a href="mailto:shagunsofarepair@gmail.com">
                  <i className="text-sand text-[18px] ri-mail-fill"></i> shagunsofarepair@gmail.com</a>
                </p>
                <p>
                  <i className="text-sand text-[18px] ri-time-fill"></i> Mon-Sun, 9AM - 9PM
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-screen  mt-3">
        {/* Quick Links Section */}
        <div className="border-t border-[#F5DEB3]/60  w-full ">
          <div className="text-center mt-5 mb-5 t text-[13px]">
            <i className="ri-copyright-line"></i> 2025 Shagun Sofa Repair. All rights reserved.
          </div>
        </div>
      </section>
    </motion.div>
  );
}

export default Footer;