"use client";
import React from "react";
import dryCleaning from "@/assets/dryCleaning.jpg";
import sofaRepair from "@/assets/h6.jpg";
import newSofa from "@/assets/h4.jpg";
import sofaPolish from "@/assets/woodensofa.jpg";
import fabric from "@/assets/sofafabric2.jpg";
import Image from "next/image";
import { CheckCircle } from "lucide-react";

const services = [
  {
    id: 1,
    image: sofaRepair,
    icon: "ri-tools-fill",
    color: "blue",
    des: "Breathe new life into your favorite sofa .",
    title: "Sofa Repair",
    description: ["Fix frames & springs", "Replace foam", "Fresh upholstery"],
  },
  {
    id: 2,
    image: newSofa,
    icon: "ri-sofa-fill",
    color: "blue",
    des: "A sofa that matches your style and comfort preferences.",
    title: "New Sofa Making",
    description: ["Custom design", "Premium materials", "Durable construction"],
  },
  {
    id: 3,
    image: fabric,
    icon: "ri-scissors-cut-fill",
    color: "blue",
    des: "Upgrade your sofa with premium fabrics and a perfect fit.",
    title: "Fabric Replacement",
    description: ["Premium fabrics", "Custom sizes", "Perfect fit"],
  },
  {
    id: 4,
    image: dryCleaning,
    icon: "ri-nurse-fill",
    color: "blue",
    des: "Refresh your sofa with a gentle clean and fresh scent.",
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
    icon: "ri-paint-fill",
    color: "blue",
    des: "Revive the elegance, restore the beauty.",
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
    <section 
    id="services"
    className="py-16 px-3 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl  border-[#DEB887] font-semibold text-center text-gray-900 mb-2">
          Our Services
        </h2>
        <p className="text-center text-gray-600 mb-12">Every stitch, every polish, every detail — made to last for years to come.</p>

        {/* Service Cards */}
        <div className="flex flex-wrap gap-8 px-2 justify-center">
          {services.map((service) => (
            <div
              key={service.id}
              className={`
                rounded-2xl overflow-hidden  hover:shadow-xl transition-all duration-300 
                w-full sm:w-[300px] shadow-xl
               
              `}
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
              <div className="p-4 pl-4 relative">
                {/* Icon badge */}
                <div
                  className={`
                    absolute -top-8 left-6 bg-white border-2 border-${service.color}-200 
                    text-blue-400 p-3 px-4 rounded-full shadow
                  `}
                >
                  <i className={`${service.icon} text-xl`}></i>
                </div>

                <h3 className="text-xl font-mono  font-semibold text-black/80 mt-4 flex items-center gap-2">
                  {service.title}
                </h3>
                <p className="text-gray-700 mb-4 text-[12px]">{service.des}</p>
                <ul className="space-y-2 text-gray-700">
                  {service.description.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-2 text-sm font-medium"
                    >
                      <CheckCircle
                        className={`w-4 h-4 text-${service.color}-500`}
                      />
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