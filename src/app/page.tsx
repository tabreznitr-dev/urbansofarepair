import NavigationBar from "@/components/NavigationBar";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import AboutUs from "@/components/AboutUs";
import Services from "@/components/Services";

export default function Home() {
  return (
   <div className="bg-gray-50">
      <NavigationBar/>
      <Services/>
      <AboutUs/>
      
      <Faq/>
      <Footer/>
   </div>
  );
}
