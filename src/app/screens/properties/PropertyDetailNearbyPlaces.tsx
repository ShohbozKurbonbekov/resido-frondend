import Stars from "@/app/components/Stars";
import type {
  NearbyFoodRestaurantType,
  NearbySchoolsType,
} from "@/lib/type/property";

type PropertyDetailNearbyPlacesType = {
  propertyName: string;
};

const nearbySchools: NearbySchoolsType[] = [
  {
    schoolName: "Green Iseland School",
    schoolRatings: 4,
    schoolDistanceFromProperty: "3km",
    schoolReviewAmount: 421,
  },
  {
    schoolName: "Ragni Intermediate College",
    schoolRatings: 4,
    schoolDistanceFromProperty: "1.5km",
    schoolReviewAmount: 470,
  },
  {
    schoolName: "Rose Wood Primary Scool",
    schoolRatings: 4,
    schoolDistanceFromProperty: "0.5km",
    schoolReviewAmount: 204,
  },
];
const nearbyFoodRestaurant: NearbyFoodRestaurantType[] = [
  {
    restaurantName: "The Rise hotel",
    restaurantRatings: 5,
    restaurantDistanceFromProperty: "2.4km",
    restaurantReviewAmount: 105,
  },
  {
    restaurantName: "Blue Ocean Bar & Restaurant",
    restaurantRatings: 4,
    restaurantDistanceFromProperty: "1.5km",
    restaurantReviewAmount: 40,
  },
];
export default function PropertyDetailNearbyPlaces({
  propertyName,
}: PropertyDetailNearbyPlacesType) {
  return (
    <div className="grid gap-y-4">
      {/* //School part */}
      <div className="flex flex-row justify-between items-center">
        <h4 className="font-jostFont font-semibold text-darkBlue text-lg capitalize">
          School around
        </h4>
        <p className="font-jostFont text-lg font-light text-slate-400">
          Powered By Google Places
        </p>
      </div>
      <ul className="flex flex-col  [&>*:last-child]:border-none">
        {nearbySchools.map((school: NearbySchoolsType, index: number) => (
          <li
            className="flex flex-row items-center border-b-2 py-3"
            key={index}
          >
            <span className="flex-1 text-sm font-semibold text-darkBlue font-jostFont leading-none">
              {school.schoolName}
              <span className="ms-3">
                ({school.schoolDistanceFromProperty})
              </span>
            </span>

            <span className="flex flex-row gap-2 items-center">
              <Stars size={"80px"} ratingNum={school.schoolRatings} />
              <span className="text-xs text-slate-400 font-light font-jostFont capitalize">
                ({school.schoolReviewAmount} Reviews)
              </span>
            </span>
          </li>
        ))}
      </ul>

      {/* // food restaurant part */}
      <div className="flex flex-row justify-between items-center mt-5">
        <h4 className="font-jostFont font-semibold text-darkBlue text-lg capitalize">
          Food Around
        </h4>
        <p className="font-jostFont text-lg font-light text-slate-400">
          Powered By Google Food
        </p>
      </div>
      <ul className="flex flex-col  [&>*:last-child]:border-none">
        {nearbyFoodRestaurant.map(
          (food: NearbyFoodRestaurantType, index: number) => (
            <li
              className="flex flex-row items-center border-b-2 py-3"
              key={index}
            >
              <span className="flex-1 text-sm font-semibold text-darkBlue font-jostFont leading-none">
                {food.restaurantName}
                <span className="ms-3">
                  ({food.restaurantDistanceFromProperty})
                </span>
              </span>

              <span className="flex flex-row gap-2 items-center">
                <Stars size={"80px"} ratingNum={food.restaurantRatings} />
                <span className="text-xs text-slate-400 font-light font-jostFont capitalize">
                  ({food.restaurantReviewAmount} Reviews)
                </span>
              </span>
            </li>
          )
        )}
      </ul>
    </div>
  );
}
