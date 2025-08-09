import DetailShortInfo from "./DetailShortInfo";

export default function DetaiLMaincontent() {
  return (
    <div className="container pt-20 pb-20 grid grid-cols-1 lg:grid-cols-6 gap-5 px-6 lg:px-3">
      <div className="lg:col-span-4">
        <DetailShortInfo />
      </div>
      <div className="bg-yellow-300 lg:col-span-2">part2</div>
    </div>
  );
}
