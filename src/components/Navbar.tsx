'use client';
import React from 'react';

function Navbar() {
  // Define the function normally in React
  const gtag_report_conversion = (url?: string) => {
    const callback = () => {
      if (typeof url !== 'undefined') {
        window.location.href = url;
      }
    };
    (window as any).gtag('event', 'conversion', {
      send_to: 'AW-17487093185/a9KWCObAqogbEMG7v5JB',
      value: 15000.0,
      currency: 'INR',
      event_callback: callback,
    });
    return false;
  };

  return (
    <div>
      {/* phone button */}
      <div>
      <div className="fixed bottom-5 md:left-15 md:bottom-10 left-5 z-50">
    <div className="relative w-14 h-14">
        {/* Ripple Layers - Reduced count with 'charged' colors */}
        <span
            className="absolute left-1.5 top-1.5 w-11 h-11 rounded-full smooth-ripple"
            style={{
                borderColor: '#42A5F5', /* A bright, vibrant blue */
                animationDelay: '0.4s'
            }}
        ></span>
        <span
            className="absolute left-1.5 top-1.5 w-11 h-11 rounded-full smooth-ripple"
            style={{
                borderColor: '#42A5F5', /* A medium, strong blue */
                animationDelay: '0.6s'
            }}
        ></span>
        <span
            className="absolute left-1.5 top-1.5 w-11 h-11 rounded-full smooth-ripple"
            style={{
                borderColor: '#42A5F5', /* A deep, dark blue */
                animationDelay: '1.0s'
            }}
        ></span>

        {/* Phone button */}
        <a href="tel:+917846940025">
            <button className="relative w-14 h-14 bg-[#3396D3] rounded-full shadow-xl flex items-center justify-center">
                <i className="text-2xl text-white ri-phone-fill"></i>
            </button>
        </a>
    </div>
</div>

      {/* whatsapp button */}
      <a
        href="https://wa.me/917846940025?text=Hi%2C%20I%20need%20a%20sofa%20repair%20service"
        target="_blank"
        rel="noopener noreferrer"
      >
        <button className="w-14 h-14 rounded-full bg-[#25D366] bottom-5 right-5 md:right-15 md:bottom-10 z-50 fixed">
          <i className="text-4xl px-1 text-white ri-whatsapp-line"></i>
        </button>
      </a>

      </div>


    </div>
  );
}

export default Navbar;