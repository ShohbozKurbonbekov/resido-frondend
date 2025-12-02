import { OUR_STORY } from "@/app/data/contactUs";

export default function AboutOurStory() {
  return (
    <section className="py-20 bg-white">
      <div className="container grid grid-cols-1 md:grid-cols-2 gap-7 md:items-center md:justify-items-start">
        <div className=" w-full h-auto">
          <img
            src="/img/sb.png"
            alt="descriptive picture should be here"
            className="w-full object-cover"
          />
        </div>
        <div className="w-full h-auto flex flex-col gap-y-4 items-start justify-start">
          <h2 className="text-darkBlue font-bold capitalize text-3xl font-jostFont">
            Our goals
          </h2>
          <ul className="flex flex-col gap-y-2.5 text-slate-500 italic  font-jostFont">
            {OUR_STORY.map((story: string, index: number) => (
              <li
                className="leading-tight flex flex-row gap-5 items-center "
                key={index}
              >
                <span className="relative p-4 rounded-full bg-green-200">
                  <span className="h-3 w-2 absolute  top-2 left-3 border-r-green-700 border-b-green-700 border-2 rotate-45 border-t-0 border-l-0 "></span>
                </span>
                {story}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
