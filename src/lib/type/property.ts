export type PropertyDetailReviewType = {
  reviewImage: string;
  reviewDate: string;
  reviewName: string;
  reviewDescription: string;
};

export type NearbySchoolsType = {
  schoolName: string;
  schoolDistanceFromProperty: string;
  schoolRatings: number;
  schoolReviewAmount: number;
};

export type NearbyFoodRestaurantType = {
  restaurantName: string;
  restaurantDistanceFromProperty: string;
  restaurantRatings: number;
  restaurantReviewAmount: number;
};
