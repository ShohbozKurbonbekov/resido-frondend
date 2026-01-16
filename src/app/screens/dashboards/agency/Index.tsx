import SectionIntroNoBackground from "@/app/components/SectionIntroNoBackground";

export default function AgencyDashboard() {
  return (
    <>
      <SectionIntroNoBackground
        title={"Welcome!"}
        subtitle={"Welcome to your account"}
      />
      <section className="py-20 bg-sky-100 ">
        <div className="px-3 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:items-start">
          {/* // sidebar */}
          <div className="lg:col-span-3 hidden lg:block "></div>

          <div className="lg:col-span-9 flex flex-col gap-7">
            <div className="cards  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"></div>
          </div>
        </div>
      </section>
    </>
  );
}
