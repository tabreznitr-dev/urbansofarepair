'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { Award, ShieldCheck, ThumbsUp, BadgeDollarSign, Clock } from 'lucide-react'

const aboutPoints = [
  {
    title: '10+ Years Experience',
    icon: Award,
    color: 'bg-purple-100',
    iconColor: 'text-purple-500',
    description: 'We’ve been restoring sofas with expertise and care for over a decade.',
  },
  {
    title: 'Trusted Service',
    icon: ShieldCheck,
    color: 'bg-green-100',
    iconColor: 'text-green-500',
    description: 'Thousands of happy customers trust us with their furniture.',
  },
  {
    title: 'Quality Guaranteed',
    icon: ThumbsUp,
    color: 'bg-red-100',
    iconColor: 'text-red-500',
    description: 'We use premium materials and skilled craftsmanship to ensure lasting results.',
  },
  {
    title: 'Affordable Pricing',
    icon: BadgeDollarSign,
    color: 'bg-yellow-100',
    iconColor: 'text-yellow-500',
    description: 'Get premium sofa services at prices that fit your budget.',
  },
  {
    title: '2 Years Warranty',
    icon: Clock,
    color: 'bg-blue-100',
    iconColor: 'text-blue-500',
    description: 'Enjoy peace of mind with a 2-year warranty on sofa repairs and new sofa making.',
  },
]

export default function AboutUs() {
  return (
    <section className="w-full flex flex-col items-center text-center py-12 px-4">
      {/* Heading */}
      <h1 className="text-3xl font-bold mb-2">Why Choose Us ?</h1>
      <p className="text-gray-600 mb-8 max-w-md">
        We bring new life to old sofas with professional cleaning, repair, and polishing.
      </p>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-4 w-full max-w-md">
        {aboutPoints.map((point, index) => {
          const Icon = point.icon
          return (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className={`rounded-2xl p-6 shadow-md flex items-center gap-4 ${point.color}`}
            >
              {/* Icon */}
              <div className={`p-3 rounded-full bg-white shadow ${point.iconColor}`}>
                <Icon className={`w-6 h-6 ${point.iconColor}`} />
              </div>
              {/* Text */}
              <div className="text-left">
                <h2 className="text-xl mb-2 font-semibold">{point.title}</h2>
                <p className="text-sm text-gray-700">{point.description}</p>
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}