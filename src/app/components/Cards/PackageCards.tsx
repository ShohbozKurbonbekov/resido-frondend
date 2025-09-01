import type { PackagesType } from "@/lib/type/pricing";
import PackageCard from "./PackageCard";

const packages: PackagesType[] = [
  {
    fee: 49,
    tariff: "Basic Package",
    tariffColor: "#074DA3",
    headerBg: "#172554",
    features: [
      "5+ Listings",
      "Contact With Agent",
      "3 Month Validity",
      "7x24 Fully Support",
      "50GB Space",
    ],
    buttonColor: "#172554",
  },
  {
    fee: 99,
    tariff: "PLATINUM PACKAGE",
    tariffColor: "#FFFFFF",
    headerBg: "#074DA3",
    features: [
      "5+ Listings",
      "Contact With Agent",
      "3 Month Validity",
      "7x24 Fully Support",
      "50GB Space",
    ],
    buttonColor: "#074DA3",
  },
  {
    fee: 199,
    tariff: "STANDARD PACKAGE",
    tariffColor: "#FFFFFF",
    headerBg: "#000",
    features: [
      "5+ Listings",
      "Contact With Agent",
      "3 Month Validity",
      "7x24 Fully Support",
      "50GB Space",
    ],
    buttonColor: "#000",
  },
];

export default function Packages() {
  return (
    <section className="p-20 bg-slate-50 flex justify-center">
      <div className="container flex flex-col gap-0 items-center">
        <div className="section-heading max-w-[536px] flex flex-col items-center gap-y-2 text-darkBlue mx-auto">
          <h2 className="font-bold capitalize font-jostFont leading-[1.2] text-3xl">
            Explore Featured Agents
          </h2>
          <p className="mb-2 leading-[1.7] text-center">
            At vero eos et accusamus et iusto odio dignissimos ducimus qui
            blanditiis praesentium voluptatum deleniti atque corrupti quos
            dolores
          </p>
        </div>

        {/* // packages */}

        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {packages.map((card: PackagesType, index: number) => (
            <PackageCard {...card} key={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
