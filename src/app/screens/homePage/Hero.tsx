import { useGlobals } from "@/app/hooks/useGlobals";
import { useContext } from "react";

export default function Hero() {
  const { authmember } = useGlobals();
  console.log("authmember", authmember);
  return (
    <section
      className="hero-section w-full  h-screen overflow-hidden relative
    "
    >
      <div
        className="overlay absolute left-0 top-0 right-0 bottom-0"
        style={{ backgroundColor: "#032137", opacity: "60%" }}
      ></div>
      <div className="hero-description absolute top-0 left-0 right-0 bottom-0 mt-14  z-30 flex flex-col items-center justify-center text-slate-50">
        <p className="font-loraFont text-[20px] italic">
          Find Best Places in Korea
        </p>
        <h1 className=" font-jostFont text-6xl leading-[1.1] text-slate-50 font-bold capitalize">
          Find Your Perfect Place
        </h1>
      </div>
      <video className="w-full h-full object-cover" autoPlay muted loop>
        <source src="/video/banners.mp4" type="video/mp4" />
      </video>
    </section>
  );
}
