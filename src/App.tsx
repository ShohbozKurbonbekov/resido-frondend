import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Footer from "./app/components/footer/Index";
import Navbar from "./app/components/header/Navbar";
import HomePage from "./app/screens/homePage/Index";
import OtherNavbar from "./app/components/header/OtherNavbar";
import AgentsPage from "./app/screens/agentsPage/Index";
import AgenciesPage from "./app/screens/agenciesPage/Index";
import AboutUsPage from "./app/screens/aboutUs/Index";
import ContactUsPage from "./app/screens/contactUs/Index";
import FaqPage from "./app/screens/FAQ/Index";
import PricingPage from "./app/screens/pricing/Index";
import BlogsPage from "./app/screens/blogsPage/Index";
import PropertiesPage from "./app/screens/propertiesPage/Index";
import { useCallback } from "react";
import MemberService from "./app/services/MemberService";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "./lib/sweetAlerts";
import { useGlobals } from "./app/hooks/useGlobals";
import DashboardRouter from "./app/screens/dashboards/Index";

// ------------------------------------------ MAIN COMPONENT -------------------------------------
export default function App() {
  const location = useLocation();
  const navigation = useNavigate();

  const { setAuthMember } = useGlobals();

  // ------------------------------------------ HANDLERS ----------------------------------------------
  const handleLogout = useCallback(async () => {
    const member = new MemberService();
    try {
      await member.logout();
      await sweetTopSmallSuccessAlert("Successfully logged out!");

      setAuthMember(null);
      navigation("/");
    } catch (error) {
      console.log("Error in logout process: ", error);
      await sweetErrorHandling(error!);
    }
  }, [setAuthMember, navigation]);

  // ------------------------------------------  RENDER -------------------------------------
  return (
    <>
      {location.pathname === "/" ? (
        <Navbar handleLogout={handleLogout} />
      ) : (
        <OtherNavbar handleLogout={handleLogout} />
      )}

      <Routes>
        <Route path="/property/*" element={<PropertiesPage />} />
        <Route path="/agents/*" element={<AgentsPage />} />
        <Route path="/agencies/*" element={<AgenciesPage />} />
        <Route path="/blogs/*" element={<BlogsPage />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/contact-us" element={<ContactUsPage />} />
        <Route path="/Faqs" element={<FaqPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>

      <Routes>
        <Route path="/dashboard/*" element={<DashboardRouter />} />
      </Routes>

      <Footer />
    </>
  );
}
