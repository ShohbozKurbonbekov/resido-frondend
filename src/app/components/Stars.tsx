import Rating from "@mui/material/Rating";

interface StarsType {
  rating: number;
  size?: "large" | "small" | "medium";
}
export default function Stars({ rating, size = "small" }: StarsType) {
  return (
    <Rating
      name="property-rating"
      value={rating}
      precision={0.1}
      readOnly
      className="yellow-500"
      size={size}
    />
  );
}
