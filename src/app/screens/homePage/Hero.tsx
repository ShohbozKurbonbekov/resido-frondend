export default function Hero() {
  return (
    <section
      className="w-full  h-screen overflow-hidden relative
    "
    >
      <div
        className="overlay absolute left-0 top-0 right-0 bottom-0"
        style={{ backgroundColor: "#032137", opacity: "60%" }}
      ></div>
      <div className="absolute top-0 left-0 right-0 bottom-0 mt-14  z-30 flex flex-col items-center justify-center text-slate-50 text-center px-4">
        <p className="font-loraFont text-xl italic">
          Find Best Places around the world
        </p>
        <h1 className=" font-jostFont text-4xl ms:text-6xl leading-none text-slate-50 font-bold capitalize  mt-3">
          Find Your Perfect Place
        </h1>
      </div>
      <video className="w-full h-full object-cover" autoPlay muted loop>
        <source src="/video/banners.mp4" type="video/mp4" />
      </video>
    </section>
  );
}
