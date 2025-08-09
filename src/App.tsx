import { Route, Routes, useLocation } from "react-router-dom";
import Footer from "./app/components/footer/Index";
import Navbar from "./app/components/header/Navbar";
import HomePage from "./app/screens/homePage/Index";
import Properties from "./app/screens/properties/Index";
import OtherNavbar from "./app/components/header/OtherNavbar";

export default function App() {
  const location = useLocation();
  return (
    <>
      {location.pathname === "/" ? <Navbar /> : <OtherNavbar />}

      <Routes>
        <Route path="/properties/*" element={<Properties />} />
        <Route path="/" element={<HomePage />} />
      </Routes>

      <Footer />
    </>
  );
}
