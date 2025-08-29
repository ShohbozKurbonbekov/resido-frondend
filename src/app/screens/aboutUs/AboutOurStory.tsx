export default function AboutOurStory() {
  return (
    <section className="py-20 bg-white">
      <div className="container grid grid-cols-1 md:grid-cols-2 gap-7 md:items-center md:justify-items-start">
        <div className=" w-full h-auto">
          <img
            src="/public/img/sb.png"
            alt=""
            className="w-full object-cover"
          />
        </div>
        <div className="w-full h-auto flex flex-col gap-y-4 items-start justify-start">
          <h2 className="text-darkBlue font-bold capitalize text-3xl font-jostFont">
            Our Story
          </h2>
          <p className="text-[19px] italic leading-[1.8] text-slate-500">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <p className="text-[19px] italic leading-[1.8] text-slate-500">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </div>
      </div>
    </section>
  );
}
