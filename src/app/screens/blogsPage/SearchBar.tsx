import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="py-9 px-7 bg-white rounded-md border-2 border-slate-200 flex flex-col space-y-2">
      <h4 className="text-xl leading-tight text-darkBlue font-bold font-jostFont">
        Search
      </h4>
      <form action="#" className="relative  py-1">
        <input
          type="text"
          className="bg-sky-50 rounded-sm text-xs h-[60px] box-border py-1.5 ps-7 pe-[70px] border border-slate-200 outline-none focus-visible:ring-0  w-full background font-jostFont text-slate-500"
          placeholder="Search... "
        />
        <button
          type="submit"
          className="absolute right-2  px-4 py-4  bg-blue-800 rounded-sm top-1/2 -translate-y-1/2 "
        >
          <Search className="w-[14px] h-[14px]  fill-transparent stroke-white " />
        </button>
      </form>
    </div>
  );
}
