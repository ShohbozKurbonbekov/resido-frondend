import { Route, Routes, useLocation } from "react-router-dom";
import Footer from "./app/components/footer/Index";
import Navbar from "./app/components/header/Navbar";
import HomePage from "./app/screens/homePage/Index";
import Properties from "./app/screens/propertiesPage/Index";
import OtherNavbar from "./app/components/header/OtherNavbar";
import AgentsPage from "./app/screens/agentsPage/Index";
import AgenciesPage from "./app/screens/agenciesPage/Index";
import AboutUsPage from "./app/screens/aboutUs/Index";
import ContactUsPage from "./app/screens/contactUs/Index";
import FaqPage from "./app/screens/FAQ/Index";
import PricingPage from "./app/screens/pricing/Index";

export default function App() {
  const location = useLocation();
  return (
    <>
      {location.pathname === "/" ? <Navbar /> : <OtherNavbar />}

      <Routes>
        <Route path="/properties/*" element={<Properties />} />
        <Route path="/agents/*" element={<AgentsPage />} />
        <Route path="/agencies/*" element={<AgenciesPage />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/contact-us" element={<ContactUsPage />} />
        <Route path="/Faqs" element={<FaqPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>

      <Footer />
    </>
  );
}
