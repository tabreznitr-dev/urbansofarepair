import React from 'react'
import {ImageCarousel} from "./ui/ImageCarousel";
import leatherfabric from '@/assets/leatherfabrics.jpg'
import colorfulfabric from '@/assets/colorfulfabrics.jpg'
import primumfabric from "@/assets/preimumfabrics.jpg"
import woodensofa from '@/assets/woodensofa.jpg'
import reclinersofa from '@/assets/ReclinerSofa.jpg'
import sofacumbed from '@/assets/sofacumbed.jpg'
import minimalistsofa from '@/assets/MinimalistSofa.jpg'
import Lshapedsofa from '@/assets/Lshapedsofa.jpg'


function Gallery() {


  const slideData = [
    {
      id: 1,
      imageUrl: minimalistsofa.src,
      alt: "Tibetan prayer flags in the snow",
      title: "Minimalist Sofa",
    },
    {
      id: 2,
      imageUrl: Lshapedsofa.src,
      alt: "L Shaped Sofa",
      title: "L Shaped Sofa",
    },
    {
      id: 3,
      imageUrl: woodensofa.src,
      alt: "Wooden Sofa",
          title: "Wooden Sofa",
    },
    {
      id: 4,
      imageUrl: reclinersofa.src,
      alt: "Recliner Sofa",
      title: "Recliner Sofa",
    },
      {
      id: 5,
      imageUrl: sofacumbed.src,
      alt: "Sofa Cumbed",
      title: "Sofa Cumbed",
    },
    {
      id: 6, 
      imageUrl: leatherfabric.src,
      alt: "Leather Fabric",
      title: "Leather Fabric",
    },
    {
      id: 7,
      imageUrl: colorfulfabric.src,
      alt: "Colorful Fabric",
      title: "Colorful Fabric",
    },
    {
      id: 8,
      imageUrl: primumfabric.src,
      alt: "Primum Fabric",
      title: "Primum Fabric",
    },
  ];
  return (
    <div 
    id="offerings"
    className='py-10 '>
      <h2 className='text-3xl font-bold text-center mb-5'>Our Offerings</h2>
      <ImageCarousel slides={slideData} />
    </div>
  )
}

export default Gallery