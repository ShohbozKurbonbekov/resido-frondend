interface SectionIntroNoBackgroundProp {
  title?: string;
  subtitle?: string;
}
const SectionIntroNoBackground = ({
  title,
  subtitle,
}: SectionIntroNoBackgroundProp) => {
  return (
    <section className="py-10 bg-blue-800 relative">
      <div className="container">
        <div className="py-8 flex flex-col items-start gap-y-2">
          <h2 className="text-white font-bold font-jostFont leading-tight text-3xl capitalize">
            {title}
          </h2>
          <p className="italic text-lg font-light text-slate-300 leading-tight">
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  );
};

export default SectionIntroNoBackground;
