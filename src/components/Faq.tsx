'use client'
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

type AccordionProps = {
  title: string;
  content: string;
};

const Accordion: React.FC<AccordionProps> = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded-2xl border border-gray-200 shadow-sm bg-white/90 hover:shadow-md transition-shadow duration-300">
      {/* Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-5 text-left focus:outline-none"
      >
        <span className="text-lg font-semibold text-gray-800">{title}</span>
        <ChevronDown
          className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {/* Content */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p className="px-5 pb-5 text-gray-600 leading-relaxed">{content}</p>
      </div>
    </div>
  );
};

function Faq() {
  return (
    <section className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8 mt-10 md:mt-28 mb-16">
      <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center text-gray-900">
        Frequently Asked Questions
      </h2>

      <div className="grid gap-6 md:grid-cols-2">
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
          content="Yes, absolutely! You can get a brand-new sofa designed to match your style, size requirements, and comfort preferences."
        />
        <Accordion
          title="How long does a sofa repair take?"
          content="Most repairs are completed within 1-3 days, depending on the complexity."
        />
      </div>
    </section>
  );
}

export default Faq;