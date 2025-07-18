import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

export default function PropertiesResultSection() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const resultPerPage: number = 9;

  const paginationedData: number[] = Array.from(Array(30).keys()).slice(
    (currentPage - 1) * resultPerPage,
    currentPage * resultPerPage
  );

  return (
    <section className="pt-20 bg-sky-100  pb-8">
      <div className="container grid grid-cols-1 lg:grid-cols-2 mx-auto border-2 bg-white rounded px-5 py-4 gap-5">
        <div className="flex flex-row justify-between items-center">
          <p className="text-sm text-darkBlue font-jostFont font-semibold capitalize">
            Showing{" "}
            <span>
              1 - {"20"} of {"72"}
            </span>{" "}
            results
          </p>

          <div className="flex flex-row gap-2 items-center">
            {[1, 2, 3, 4, 5].map((result: number, index: number) => (
              <span
                className={`w-7 h-7 rounded-full text-sm text-white bg-slate grid place-content-center font-bold transition-all duration-100 ease-in ${
                  result === currentPage ? "bg-blue-600" : "bg-blue-300"
                }`}
                key={index}
              >
                {result}
              </span>
            ))}
          </div>
        </div>
        <div className="border-t-0 border-slate-100 lg:border-l-4 border-b-0 border-r-0 ps-4 flex flex-row justify-between items-center ">
          <p className="text-sm text-darkBlue font-jostFont font-semibold capitalize ">
            Sort By:
          </p>

          <Select>
            <SelectTrigger className="w-[50%] text-sm text-darkBlue font-jostFont font-semibold capitalize py-5">
              <SelectValue placeholder="Select" className="" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem
                  className="text-slate-500 text-sm font-bold"
                  value="low price"
                >
                  Low price
                </SelectItem>
                <SelectItem
                  value="high price"
                  className="text-slate-500 text-sm font-bold"
                >
                  high price
                </SelectItem>
                <SelectItem
                  value="most popular"
                  className="text-slate-500 text-sm font-bold"
                >
                  most popular
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </section>
  );
}
