import PackageCard from "./PackageCard";

export type PackagesType = {
  fee: number;
  tariff: string;
  facility1: string;
  facility2: string;
  facility3: string;
  facility4: string;
  facility5: string;
  cardHeaderBg?: string;
  cardTariffColor?: string;
};

const packages: PackagesType[] = [
  {
    fee: 49,
    tariff: "Basic Package",
    facility1: "5+ Listings",
    facility2: "Contact With Agent",
    facility3: "3 Month Validity",
    facility4: "7x24 Fully Support",
    facility5: "50GB Space",
  },
  {
    fee: 99,
    tariff: "Basic Package",
    facility1: "5+ Listings",
    facility2: "Contact With Agent",
    facility3: "3 Month Validity",
    facility4: "7x24 Fully Support",
    facility5: "50GB Space",
    cardTariffColor: "#FFFFFF",
    cardHeaderBg: "#074DA3",
  },
  {
    fee: 199,
    tariff: "Basic Package",
    facility1: "5+ Listings",
    facility2: "Contact With Agent",
    facility3: "3 Month Validity",
    facility4: "7x24 Fully Support",
    facility5: "50GB Space",
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
