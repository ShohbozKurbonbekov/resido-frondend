export default function DetailShortInfo() {
  return (
    <div className="rounded-md bg-slate-50 mb-4 p-6 flex flex-col items-start gap-2">
      <span className="py-1 px-3 text-slate-50 bg-green-600 text-size_10 rounded-sm font-bold align-middle leading-none">
        For Sale
      </span>
      <h4 className="text-darkBlue capitalize font-bold text-2xl lg-text-3xl font-jostFont">
        the green canton chrysler
      </h4>
      <p className="text-slate-400 font-jostFont capitalize">
        778 Country St. Panama City, FL
      </p>
      <p className="text-darkBlue font-semibold text-xl lg:text-2xl">
        $7,600{" "}
        <sub className="leading-none text-slate-400  text-sm font-thin">
          /Month
        </sub>
      </p>
    </div>
  );
}
