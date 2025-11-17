interface SectionIntroductionBackgroundProp {
  title: string;
  subtitle: string;
}
export default function SectionIntroductionBackground({
  title,
  subtitle,
}: SectionIntroductionBackgroundProp) {
  return (
    <section className="py-20 bg-blue-800 relative">
      {/* // background 1 */}
      <div className="absolute top-0 left-0 mt-6  w-[96px] h-[64px] bg-[#eff4fc] opacity-25 rounded-e-full"></div>
      {/* // background 2 */}
      <div className="absolute bottom-0 ms-6  w-[64px] h-[84px] bg-[#eff4fc] opacity-25 rounded-t-full"></div>

      {/* // background 3 */}
      <div className="absolute right-0 bottom-0 mb-6  w-[96px] h-[64px] bg-[#eff4fc] opacity-25 rounded-s-full"></div>

      {/* // background 4 */}
      <div className="absolute right-0 top-0 me-6  w-[64px] h-[84px] bg-[#eff4fc] opacity-25 rounded-b-full"></div>

      <div className="container">
        <div className="py-8 flex flex-col items-start gap-y-2">
          <h2 className="text-white font-bold font-jostFont leading-tight text-3xl">
            {title}
          </h2>
          <p className="italic text-xl font-light text-slate-300 leading-none">
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  );
}
