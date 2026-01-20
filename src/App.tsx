import { Route, Routes, useLocation } from "react-router-dom";
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
import DashboardRouter from "./app/screens/dashboards/Index";

// ------------------------------------------ MAIN COMPONENT -------------------------------------
export default function App() {
  const location = useLocation();

  // ------------------------------------------ HANDLERS ----------------------------------------------

  // ------------------------------------------  RENDER -------------------------------------
  return (
    <>
      {location.pathname === "/" ? <Navbar /> : <OtherNavbar />}

      <Routes>
        <Route path="/property/*" element={<PropertiesPage />} />
        <Route path="/agents/*" element={<AgentsPage />} />
        <Route path="/agencies/*" element={<AgenciesPage />} />
        <Route path="/blogs/*" element={<BlogsPage />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/contact-us" element={<ContactUsPage />} />
        <Route path="/Faqs" element={<FaqPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route
          path="/payment"
          element={
            // <MemberPayment />
            null
          }
        />
        <Route path="/" element={<HomePage />} />
      </Routes>

      <Routes>
        <Route path="/dashboard/*" element={<DashboardRouter />} />
      </Routes>

      <Footer />
    </>
  );
}
