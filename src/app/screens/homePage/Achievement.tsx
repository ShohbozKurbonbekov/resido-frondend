import {
  achievementData,
  type AchievementDataType,
} from "@/app/data/achievements";

export default function Achievement() {
  return (
    <section className="py-20 flex flex-row justify-center items-center">
      <div className="container flex flex-col items-center">
        <div className="text-center max-w-screen-md mb-6 text-darkBlue">
          <h2 className="text-3xl font-bold font-jostFont">Achievements</h2>

          <p className="leading-onePointEight ">
            See and teach with our achievements
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4  place-items-center mt-3 gap-2 w-full">
          {achievementData.map((el: AchievementDataType) => (
            <div className="text-center box-border p-3 border border-slate-200 w-full rounded-md max-w-sm">
              <h2 className="font-jostFont text-3xl sm:text-4xl font-bold capitalize leading-onePointEight sm:mb-2">
                {el.title}
              </h2>
              <p className="text-blue-500">{el.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
