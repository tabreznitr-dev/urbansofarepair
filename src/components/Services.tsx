'use client'
import React, { useEffect, useRef } from 'react';
// Step 1: Import motion and necessary hooks from framer-motion
import { motion, useAnimation, useInView } from 'framer-motion';
import sofaRepair from "../assets/SofaRepair.jpg"
import newSofa from "../assets/NewSofa.jpg"
import sofaFabric from "../assets/SofaFabric.jpg"
import dryClean from "../assets/SofaDryClean.jpg"
import sofaPolish from "../assets/Sofa-Polish.jpg"
import { v4 as uuidv4 } from 'uuid';
import Image from 'next/image';


function Services() {
  
  const services = [
         {
          index : 1,
          img : sofaRepair.src,
          icon : <i className="ri-tools-fill"></i>,
          title : "Sofa Repair",
          caption : "Breathe new life into your favorite sofa.",
          points : ["Fix frames & springs","Replace foam","Fresh upholstery"]
         },
         {
          index : 2,
          img : newSofa.src,
          icon : <i className="ri-armchair-fill"></i>,
          title : "New Sofa Making",
          caption : "A sofa that’s truly yours, from concept to comfort.",
          points : ["Custom designs","Shape & size options","Premium fabrics"]
         },
         {
          index : 3,
          img : sofaFabric.src,
          icon : <i className="ri-scissors-cut-fill"></i>,
          title : "Fabric Change",
          caption : "Transform your sofa’s look in just one step.",
          points : ["Trendy materials","Spill-resistant","Perfect fit"]
         },
         {
         index : 4,
          img : dryClean.src,
          icon : <i className="ri-filter-2-fill"></i>,
          title : "Dry Cleaning",
          caption : "Bring back your sofa’s freshness in just one clean.",
          points : ["Dust-free freshness","	Stain & odor removal","Gentle fabric care"]
         },
          {
          index : 5,
          img : sofaPolish.src,
          icon : <i className="ri-sofa-fill"></i>,
          title : "Sofa Polishing",
          caption : "Restore the shine, revive the style.",
          points : ["Restores original shine","Protects against wear & tear","Enhances sofa’s elegance"]
         },

  ]
  // Step 2: Set up controls and refs for scroll-triggered animations
  const controls = useAnimation();
  const ref = useRef(null);
  

  const isInView = useInView(ref, { once: false,});


  useEffect(() => {
    if (isInView) {
    
      controls.start('visible');
    } else {

      controls.start('hidden');
    }
  }, [isInView, controls]);


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
      
        staggerChildren: 0.2,
      },
    },
  };


  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut"
        }
    },
  };

  return (
    <div id='services' className='mt-15 md:mt-45'>
        
          <div className='flex md:flex md:justify-evenly justify-center mb-8 md:mb-15 font-semibold'>
        <h1 className='text-4xl border-b-4 border-[#F5DEB3] opacity-75'>Our Services</h1>
      </div>

        
        <motion.div
        ref={ref}
        className='flex flex-wrap gap-6 md:gap-15 p-4 md:p-2 justify-center' 
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        >

       {services.map((serv)=>(
        <motion.div
          key={serv.index}
          className='shadow-2xl rounded-2xl w-full sm:w-auto md:w-[350px]' 
          
        >
          <div className='w-full'>
            <Image
            src={serv.img}
            alt='Our Services'
            width={800}
            height={600}
            className='w-full h-52 object-cover rounded-t-2xl'
            priority
            />
            {/* <img src={serv.img} alt="Sofa Repair" className='w-full h-52 object-cover rounded-t-2xl' /> */}
          </div>
          <div className='p-4'>
            <h1 className='text-2xl font-semibold font-mono opacity-70'>{serv.icon} {serv.title}</h1>
            <p className='text-[12px] text-[black]/60'>{serv.caption}</p>
            <div className='mt-3 text-[15px]'>
              <ul className='list-disc pl-6 custom-bullets text-[black]/80 [&>li::marker]:text-[#facf7f] [&>li::marker]:text-xl'>
                {serv.points.map((point)=>(
                   <li key={uuidv4()}>{point}</li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
       ))}
       

      </motion.div>
    </div>
  );
}

export default Services;