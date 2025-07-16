export default function Achievement() {
  return (
    <section className="achievement py-20 flex flex-row justify-center items-center">
      <div className="container flex flex-col items-center">
        <div className="text-center max-w-[746px] mb-6 text-[#0c2339]">
          <h2 className="text-3xl font-bold font-jostFont">Achievement</h2>
          <p className="leading-[1.7] ">
            At vero eos et accusamus et iusto odio dignissimos ducimus qui
            blanditiis praesentium voluptatum deleniti atque corrupti quos
            dolores
          </p>
        </div>
        <div className="grid grid-cols-4 w-full place-items-center mt-5">
          <div className="text-center box-border p-3">
            <h2 className="mb-2 font-jostFont text-[40px] font-bold capitalize leading-none">
              615K
            </h2>
            <p className="text-[#074da3]">Completed Property</p>
          </div>
          <div className="text-center box-border p-3">
            <h2 className="mb-2 font-jostFont text-[40px] font-bold capitalize leading-none">
              210K
            </h2>
            <p className="text-[#074da3]"> Property Sales</p>
          </div>
          <div className="text-center box-border p-3">
            <h2 className="mb-2 font-jostFont text-[40px] font-bold capitalize leading-none">
              916+
            </h2>
            <p className="text-[#074da3]">Apartment Rent</p>
          </div>
          <div className="text-center box-border p-3">
            <h2 className="mb-2 font-jostFont text-[40px] font-bold capitalize leading-none">
              150+
            </h2>
            <p className="text-[#074da3]">Happy Clients</p>
          </div>
        </div>
      </div>
    </section>
  );
}
