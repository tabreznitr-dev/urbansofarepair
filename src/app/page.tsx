import Navbar from "@/components/Navbar";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import AboutUs from "@/components/AboutUs";

export default function Home() {
  return (
   <div>
      <Navbar/>
      <AboutUs/>
     
      <Faq/>
      <Footer/>
   </div>
  );
}
