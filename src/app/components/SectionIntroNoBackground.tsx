interface SectionIntroNoBackgroundProp {
  title: string;
  subtitle: string;
}
export default function SectionIntroNoBackground({
  title,
  subtitle,
}: SectionIntroNoBackgroundProp) {
  return (
    <section className="py-10 bg-blue-800 relative">
      <div className="container">
        <div className="py-[30px] flex flex-col items-start gap-y-2">
          <h2 className="text-white font-bold font-jostFont leading-tight text-3xl">
            {title}
          </h2>
          <p className="italic text-lg font-light text-slate-300 leading-none ">
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  );
}
