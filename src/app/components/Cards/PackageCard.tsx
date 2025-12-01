import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import type { PackagesType } from "@/lib/type/pricing";
import { ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

// -------------------------- COMPONENT -----------------------
interface PackageCardType {
  card: PackagesType;
}
export default function PackageCard(props: PackageCardType) {
  const {
    id,
    name,
    price,
    paymentType,
    benefits,
    styleClasses: { container, title, button },
  } = props.card;

  // ------------------------- RENDER -------------------------
  return (
    <Card className={`${container}`} key={id}>
      <CardHeader>
        <div
          className={`flex flex-col gap-3 justify-center items-center font-jostFont font-bold rounded-md py-9`}
        >
          <h2 className={props.card.styleClasses.price}>
            <sup className="text-3xl text-slate-400">$</sup>
            {price}
            <span className="ml-2 text-lg text-slate-300 font-normal font-jostFont">
              ({paymentType})
            </span>
          </h2>
          <p className={title}>{name}</p>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ul className="flex flex-col list-none p-0 mb-5">
          {benefits.map((feature: string, index: number) => (
            <li
              key={index}
              className={`py-2 flex flex-row items-center gap-2 ${
                index === benefits.length - 1
                  ? "border-0"
                  : "border-b-2 border-t-0 border-s-0 border-e-0 border-slate-100 border-dashed"
              }`}
            >
              <ShieldCheck className="text-slate-50 box-content p-1.5 rounded-full h-4 w-4 bg-green-600" />

              <span className="text-slate-500 font-jostFont text-sm font-semibold">
                {feature}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="flex-1 flex flex-row items-end   p-0">
        <button type="button" className={button}>
          <Link to="/payment">Choose Plan</Link>
        </button>
      </CardFooter>
    </Card>
  );
}
