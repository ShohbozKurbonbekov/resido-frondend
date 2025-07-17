import { useState } from "react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

type StarProp = {
  size: string;
};

export default function Stars({ size = "80px" }: StarProp) {
  const [rating, setRating] = useState<number>(5);

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
