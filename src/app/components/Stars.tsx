import { useState } from "react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

type StarProp = {
  size: string;
  ratingNum: number;
};

export default function Stars({ size = "80px", ratingNum }: StarProp) {
  const [rating, setRating] = useState<number>(ratingNum);

  return (
    <Rating
      value={rating}
      onChange={setRating}
      items={5}
      halfFillMode="svg"
      isRequired
      style={{ maxWidth: `${size}` }}
    />
  );
}
