'use client'
import React, { useState } from "react";

type AccordionProps = {
  title: string;
  content: string;
};

const Accordion: React.FC<AccordionProps> = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-[black]/30">
      {/* Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center py-4 text-left focus:outline-none"
      >
        <span className="text-lg font-semibold text-black/80">{title}</span>
        <svg
          className={`w-5 h-5 transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Content */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p className="pb-4 text-gray-500">{content}</p>
      </div>
    </div>
  );
};

function Faq() {
  return (
    <div className="max-w-2xl md:max-w-6xl mx-auto p-4 mt-5 md:mt-40 mb-10 text-[black]/60">
      <h2 className="text-2xl font-bold mb-6 text-center text-[black]/80 border-b-3 border-[#DEB887]">
        Frequently Asked Questions
      </h2>

      <Accordion
        title="Do you offer at-home sofa repair?"
        content="Yes, we provide at-home repair services so you don’t have to worry about transport."
      />
      <Accordion
        title="Can I choose my own fabric?"
        content="Absolutely! We offer a wide range of premium fabrics and leathers to choose from."
      />
      <Accordion
        title="Can I customise a new sofa?"
        content="Yes, absolutely! You can get a brand-new sofa designed to match your style, size requirements, and comfort preferences. From choosing the fabric and color to selecting the shape, size, and cushioning, we can customize every detail to make it truly yours."
      />
      <Accordion
        title="How long does a sofa repair take?"
        content="Most repairs are completed within 1-3 days, depending on the complexity."
      />
    </div>
  );
}

export default Faq;