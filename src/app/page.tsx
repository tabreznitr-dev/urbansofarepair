import NavigationBar from "@/components/NavigationBar";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import AboutUs from "@/components/AboutUs";

export default function Home() {
  return (
   <div>
      <NavigationBar/>
      <AboutUs/>
     
      <Faq/>
      <Footer/>
   </div>
  );
}
