import {
  achievementData,
  type AchievementDataType,
} from "@/app/data/achievements";

export default function Achievement() {
  return (
    <section className="achievement py-20 flex flex-row justify-center items-center">
      <div className="container flex flex-col items-center">
        <div className="text-center max-w-[746px] mb-6 text-[#0c2339]">
          <h2 className="text-3xl font-bold font-jostFont">Achievement</h2>

          <p className="leading-onePointEight ">
            See and teach with our achievements
          </p>
        </div>

        <div className="grid grid-cols-4 w-full place-items-center mt-5">
          {achievementData.map((el: AchievementDataType) => (
            <div className="text-center box-border p-3">
              <h2 className="mb-2 font-jostFont text-4xl font-bold capitalize leading-none">
                {el.title}
              </h2>
              <p className="text-[#074da3]">{el.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
