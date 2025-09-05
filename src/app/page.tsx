
'use client'
import NavigationBar from "@/components/NavigationBar";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import AboutUs from "@/components/AboutUs";
import Services from "@/components/Services";
import HeroSection from "@/components/Home";
import { useScroll , motion } from "framer-motion"
import OfferBand from "@/components/OfferBand";

export default function Home() {
  const { scrollYProgress } = useScroll();
  return (
   <div className="bg-gray-50">
    <HeroSection/>
    <OfferBand/>
      <NavigationBar/>
      <Services/>
      <AboutUs/>
      <OfferBand/>
      <Faq/>
      
      <Footer/>

      <motion.div  className="bg-[#DEB887] z-25  w-full h-[10px]  origin-left fixed top-14 md:top-16 left-0"
        style={{
          scaleX : scrollYProgress
        }}></motion.div>
   </div>
  );
}
