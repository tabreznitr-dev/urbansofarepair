import React from 'react'
import {Compare }from './ui/compare'
import before1 from '@/assets/Before-1.jpeg'
import after1 from '@/assets/After-1.jpeg'
import before2 from '@/assets/BeforeRepair.jpg'
import after2 from '@/assets/AfterRepair.jpg'
import { IconArrowsHorizontal } from "@tabler/icons-react"

function CompareImage() {
  return (
    <div 
    id="restoration-showcase"
    className='flex justify-center flex-wrap gap-8 px-5 py-20'>
      <h2 className='text-3xl font-bold text-center'>Restoration Showcase</h2>
     
     


      <div className="text-center">
          <div className="text-sm font-bold text-foreground mb-2 font-sans"></div>
          <p className='font-bold'>After</p>
            <div className="w-16 h-2 bg-gradient-to-r from-accent to-accent/60 rounded-full neon-glow"></div>
          </div>
          
          <div className="p-3 rounded-full bg-accent/10 glass-border">
            <IconArrowsHorizontal className="w-6 h-6 text-accent" />
          </div>
          <div className="text-center">
          <div className="text-sm font-bold text-foreground mb-2 font-sans"></div>
          <p className='font-bold'>Before</p>
            <div className="w-16 h-2 bg-gradient-to-r from-primary to-primary/60 rounded-full neon-glow"></div>
          </div>
        


       <Compare
        firstImage={after2.src}
        secondImage={before2.src}
        initialSliderPercentage={40}
        className="h-90  w-full md:w-140 md:h-120 rounded-lg md:shadow-2xl"
        slideMode="hover"
      />
      <Compare
        firstImage={after1.src}
        secondImage={before1.src}
        initialSliderPercentage={40}
        className="h-90  w-full md:w-140 md:h-120 rounded-lg md:shadow-2xl"
        slideMode="hover"
      />
    </div>
  )
}

export default CompareImage