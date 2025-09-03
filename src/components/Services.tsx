"use client";
import React from "react";
import dryCleaning from "@/assets/dryCleaning.jpg";
import sofaRepair from "@/assets/sofaRepair.jpg";
import newSofa from "@/assets/newSofa.jpg";
import sofaPolish from "@/assets/sofaPolish.jpg";
import fabric from "@/assets/fabric.jpg";
import Image from "next/image";
import { CheckCircle } from "lucide-react";

const services = [
  {
    id: 1,
    image: sofaRepair,
    title: "Sofa Repair",
    description: ["Fix frames & springs", "Replace foam", "Fresh upholstery"],
  },
  {
    id: 2,
    image: newSofa,
    title: "New Sofa Making",
    description: ["Custom design", "Premium materials", "Durable construction"],
  },
  {
    id: 3,
    image: fabric,
    title: "Fabric Replacement",
    description: ["Premium fabrics", "Custom sizes", "Perfect fit"],
  },
  {
    id: 4,
    image: dryCleaning,
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
    <section className="py-16 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl border-b-2 border-[#DEB887] text-center text-gray-900 mb-12">
          Our Services
        </h2>

        {/* Service Cards */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
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
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  {service.title}
                </h3>
                <ul className="space-y-2 text-gray-600">
                  {service.description.map((item, index) => (
                    <li key={index} className="flex items-center gap-2">
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