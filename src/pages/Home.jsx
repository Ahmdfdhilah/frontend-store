import { useState, useEffect } from "react";
import { Navbar, Main,  Footer, DiscountedProducts} from "../components";
import Toaster from "../components/Toaster";
import FloatingFAQButton from "../components/FAQButton";

function Home() {
  const [showToaster, setShowToaster] = useState(false);

  useEffect(() => {
    const welcomeShown = localStorage.getItem('welcomeShown');
    if (welcomeShown === 'false') {
      setShowToaster(true);
      localStorage.setItem('welcomeShown', 'true'); 
    }
  }, []);

  const handleCloseToaster = () => {
    setShowToaster(false);
  };

  return (
    <>
      <Navbar />
      <Main />
      <DiscountedProducts/>
      <Footer />
      <FloatingFAQButton />
      <Toaster message="Welcome the trust!" show={showToaster} onClose={handleCloseToaster} color="success" />
    </>
  )
}

export default Home