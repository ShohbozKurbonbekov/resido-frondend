import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { type PackagesType } from "./PackageCards";

export default function PackageCard({
  fee,
  tariff,
  facility1,
  facility2,
  facility3,
  facility4,
  facility5,
  cardHeaderBg = "#041B2D",
  cardTariffColor = "#008AFF",
}: PackagesType) {
  return (
    <Card className="shadow-none">
      <CardHeader>
        <div
          style={{ backgroundColor: `${cardHeaderBg}` }}
          className={`py- flex flex-col gap-3 justify-center items-center font-jostFont font-bold rounded-t-sm py-9`}
        >
          <h2 className="text-6xl flex flex-row justify-start text-slate-50">
            <sup className="text-3xl text-slate-400">$</sup>
            {fee}
          </h2>
          <p
            style={{ color: `${cardTariffColor}` }}
            className="text-blue-600 text-md"
          >
            {tariff}
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="flex flex-col list-none p-0 ">
          {/* // list - 1 */}
          <li className="border-2 border-t-0 border-s-0 border-e-0 border-slate-200 border-dotted py-2 flex flex-row items-center gap-2">
            <ShieldCheck className="text-slate-50 box-content p-1.5 bg-blue-800 rounded-full h-4 w-4 " />
            <span className="text-slate-500 font-jostFont text-sm font-semibold">
              {facility1}
            </span>
          </li>

          {/* list - 2  */}
          <li className="border-2 border-t-0 border-s-0 border-e-0 border-slate-200 border-dotted py-2 flex flex-row items-center gap-2">
            <ShieldCheck className="text-slate-50 box-content p-1.5 bg-blue-800 rounded-full h-4 w-4 " />
            <span className="text-slate-500 font-jostFont text-sm font-semibold">
              {facility2}
            </span>
          </li>

          {/* // list - 3 */}
          <li className="border-2 border-t-0 border-s-0 border-e-0 border-slate-200 border-dotted py-2 flex flex-row items-center gap-2">
            <ShieldCheck className="text-slate-50 box-content p-1.5 bg-blue-800 rounded-full h-4 w-4 " />
            <span className="text-slate-500 font-jostFont text-sm font-semibold">
              {facility3}
            </span>
          </li>

          {/* // list - 4 */}
          <li className="border-2 border-t-0 border-s-0 border-e-0 border-slate-200 border-dotted py-2 flex flex-row items-center gap-2">
            <ShieldCheck className="text-slate-50 box-content p-1.5 bg-blue-800 rounded-full h-4 w-4 " />
            <span className="text-slate-500 font-jostFont text-sm font-semibold">
              {facility4}
            </span>
          </li>

          {/* // list 5 */}
          <li className="border-2 border-t-0 border-s-0 border-e-0 border-slate-200 border-dotted py-2 flex flex-row items-center gap-2">
            <ShieldCheck className="text-slate-50 box-content p-1.5 bg-blue-800 rounded-full h-4 w-4 " />
            <span className="text-slate-500 font-jostFont text-sm font-semibold">
              {facility5}
            </span>
          </li>
        </ul>
      </CardContent>
      <CardFooter>
        <button
          type="button"
          className={`w-full py-3 text-blue-800 bg-blue-100 text-sm rounded-lg hover:bg-blue-700 hover:text-slate-50 transition-all duration-200 ease-in-out`}
        >
          <Link to="/payment">Choose Plan</Link>
        </button>
      </CardFooter>
    </Card>
  );
}
