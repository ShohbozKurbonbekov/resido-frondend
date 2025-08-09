import DetaiLMaincontent from "./DetaiLMaincontent";
import DetailTopImage from "./DetailTopImage";

export default function ChoseProduct() {
  return (
    <div className="property-detail bg-sky-100 ">
      {/* // Detail top image */}
      <DetailTopImage />
      <DetaiLMaincontent />
    </div>
  );
}
