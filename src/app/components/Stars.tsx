import Rating from "@mui/material/Rating";

interface StarsType {
  rating: number;
}
export default function Stars({ rating }: StarsType) {
  return (
    <Rating
      name="property-rating"
      value={rating}
      precision={0.5}
      readOnly
      className="yellow-500"
    />
  );
}
