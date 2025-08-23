import { Route, Routes, useLocation } from "react-router-dom";
import Footer from "./app/components/footer/Index";
import Navbar from "./app/components/header/Navbar";
import HomePage from "./app/screens/homePage/Index";
import Properties from "./app/screens/propertiesPage/Index";
import OtherNavbar from "./app/components/header/OtherNavbar";
import AgentsPage from "./app/screens/agentsPage/Index";

export default function App() {
  const location = useLocation();
  return (
    <>
      {location.pathname === "/" ? <Navbar /> : <OtherNavbar />}

      <Routes>
        <Route path="/properties/*" element={<Properties />} />
        <Route path="/agents/*" element={<AgentsPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>

      <Footer />
    </>
  );
}
