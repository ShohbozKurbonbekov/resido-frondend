import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import type { PackagesType } from "@/lib/type/pricing";
import { ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

export default function PackageCard({
  fee,
  features,
  tariff,
  headerBg,
  tariffColor,
  buttonColor,
}: PackagesType) {
  return (
    <Card className="shadow-none">
      <CardHeader>
        <div
          style={{ backgroundColor: `${headerBg}` }}
          className={`flex flex-col gap-3 justify-center items-center font-jostFont font-bold rounded-md py-9`}
        >
          <h2 className="text-6xl flex flex-row justify-start text-slate-50">
            <sup className="text-3xl text-slate-400">$</sup>
            {fee}
          </h2>
          <p style={{ color: `${tariffColor}` }} className=" uppercase text-sm">
            {tariff}
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="flex flex-col list-none p-0 mb-5">
          {features.map((feature: string, index: number) => (
            <li
              key={index}
              className={`py-2 flex flex-row items-center gap-2 ${
                index === features.length - 1
                  ? "border-0"
                  : "border-b-2 border-t-0 border-s-0 border-e-0 border-slate-200 border-dotted"
              }`}
            >
              <ShieldCheck className="text-slate-50 box-content p-1.5 bg-blue-800 rounded-full h-4 w-4 " />
              <span className="text-slate-500 font-jostFont text-sm font-semibold">
                {feature}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <button
          style={{ backgroundColor: `${buttonColor}` }}
          type="button"
          className={`w-full py-3 text-slate-50 text-sm rounded-lg hover:opacity-70 transition-all duration-200 ease-linear active:scale-95`}
        >
          <Link to="/payment">Choose Plan</Link>
        </button>
      </CardFooter>
    </Card>
  );
}
