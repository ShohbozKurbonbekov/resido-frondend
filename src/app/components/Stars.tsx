import Rating from "@mui/material/Rating";

interface StarsType {
  rating: number;
  size?: string;
}
export default function Stars({ rating, size = "small" }: StarsType) {
  return (
    <Rating
      name="property-rating"
      value={rating}
      precision={0.5}
      readOnly
      className="yellow-500"
      size={size}
    />
  );
}
