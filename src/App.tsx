import { Route, Routes } from "react-router-dom";
import Footer from "./app/components/footer/Index";
import Navbar from "./app/components/header/Navbar";
import HomePage from "./app/screens/homePage/Index";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
      </Routes>
      <Footer />
    </>
  );
}
