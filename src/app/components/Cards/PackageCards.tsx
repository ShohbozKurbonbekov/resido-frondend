import type { PackagesType } from "@/lib/type/pricing";
import PackageCard from "./PackageCard";
import { paymentPackages } from "@/app/data/packages";

export default function Packages() {
  return (
    <section className="p-20 bg-slate-50 flex justify-center">
      <div className="container flex flex-col gap-y-10 items-center ">
        <div className="max-w-[536px] flex flex-col items-center gap-y-2 text-darkBlue mx-auto">
          <h2 className="font-bold capitalize font-jostFont leading-[1.2] text-3xl">
            See our packages
          </h2>
          <p className="mb-2 leading-[1.7] text-center">
            Explore a variety of property packages tailored to match your needs
            and budget.
          </p>
        </div>

        {/* // packages */}

        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {paymentPackages.map((card: PackagesType) => (
            <PackageCard card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
