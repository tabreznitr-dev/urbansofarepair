"use client"
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'  
import { Navigation, Pagination } from 'swiper/modules'

// Import Swiper and modules styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

function HeroSection() {
  return (
    <div>
      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        spaceBetween={20}
        slidesPerView={1}
      >
        <SwiperSlide>
          <div className="h-64 flex items-center justify-center bg-red-400 text-white text-xl font-bold">
            Slide 1
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="h-64 flex items-center justify-center bg-blue-400 text-white text-xl font-bold">
            Slide 2
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  )
}

export default HeroSection