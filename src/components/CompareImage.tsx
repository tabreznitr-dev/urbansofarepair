import React from 'react'
import {Compare }from './ui/compare'
import before1 from '@/assets/Before-1.jpeg'
import after1 from '@/assets/After-1.jpeg'
import before2 from '@/assets/BeforeRepair.jpg'
import after2 from '@/assets/AfterRepair.jpg'

function CompareImage() {
  return (
    <div 
    id="restoration-showcase"
    className='flex justify-center flex-wrap gap-8 px-5 py-20'>
      <h2 className='text-3xl font-bold text-center'>Restoration Showcase</h2>
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