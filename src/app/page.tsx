
'use client'
import NavigationBar from "@/components/NavigationBar";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import AboutUs from "@/components/AboutUs";
import Services from "@/components/Services";
import HeroSection from "@/components/Home";
import { useScroll , motion } from "framer-motion"
import OfferBand from "@/components/OfferBand";
import Testimonial from "@/components/Testimonial";
import CompareImage from "@/components/CompareImage";
import Gallery from "@/components/Gallery";



export default function Home() {
  const { scrollYProgress } = useScroll();
  return (
   <div className="bg-gray-50">
    <HeroSection/>
    <OfferBand/>
      <NavigationBar/>
      <Services/>
      <AboutUs/>
      <CompareImage/>
      <OfferBand/>
      <Testimonial/>
      <Gallery/>
      <Faq/>

      <Footer/>

      <motion.div  className="bg-[#5682B1] z-25  w-full h-[8px]  origin-left fixed top-15 md:top-16 left-0"
        style={{
          scaleX : scrollYProgress
        }}></motion.div>
   </div>
  );
}
