"use client";
import React from "react";
import dryCleaning from "@/assets/dryCleaning.jpg";
import sofaRepair from "@/assets/sofaRepair.jpg";
import newSofa from "@/assets/newSofa.jpg";
import sofaPolish from "@/assets/sofaPolish.jpg";
import fabric from "@/assets/fabric.jpg";
import Image from "next/image";
import { CheckCircle, icons } from "lucide-react";

const services = [
  {
    id: 1,
    image: sofaRepair,
    icon : <i className="ri-tools-fill"></i>,
    des : "Breathe new life into your favorite sofa with expert care and a fresh look",  
    title: "Sofa Repair",
    description: ["Fix frames & springs", "Replace foam", "Fresh upholstery"],
  },
  {
    id: 2,
    image: newSofa,
    icon : <i className="ri-sofa-fill"></i>,
    des : "From vision to relaxation — a sofa made just for you.",
    title: "New Sofa Making",
    description: ["Custom design", "Premium materials", "Durable construction"],
  },
  {
    id: 3,
    image: fabric,
    icon : <i className="ri-scissors-cut-fill"></i>,
    des : "Upgrade your sofa with premium fabrics and a perfect fit.",
    title: "Fabric Replacement",
    description: ["Premium fabrics", "Custom sizes", "Perfect fit"],
  },
  {
    id: 4,
    image: dryCleaning,
    icon : <i className="ri-nurse-fill"></i>,
    des : "Refresh your sofa with a gentle clean and fresh scent.",
    title: "Dry Cleaning",
    description: [
      "Dust-free freshness",
      "Stain & odor removal",
      "Gentle fabric care",
    ],
  },
  {
    id: 5,
    image: sofaPolish,
    icon : <i className="ri-paint-fill"></i>,
    des : "Revive the elegance, restore the beauty.",
    title: "Sofa Polish",
    description: [
      "Enhance shine",
      "Protect wood & finish",
      "Long-lasting look",
    ],
  },
];

function Services() {
  return (
    <section className="py-16 px-3 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl border-b-2 border-[#DEB887] text-center text-gray-900 mb-12">
          Our Services
        </h2>

        {/* Service Cards */}
        <div className="flex flex-wrap gap-8 ">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Image */}
              <div className="h-56 w-full overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  width={500}
                  height={300}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-800 ">
                 {service.icon} {service.title}
                </h3>
                <p className="text-gray-600 mb-4 text-[12px]">{service.des}</p>
                <ul className="space-y-2 text-gray-600">
                  {service.description.map((item, index) => (
                    <li key={index} className="flex items-center gap-2 font-semibold font-mono ">
                      <CheckCircle className="w-4 h-4 text-[#DEB887]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;