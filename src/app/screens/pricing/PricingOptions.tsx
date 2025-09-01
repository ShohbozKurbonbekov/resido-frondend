import PackageCard from "@/app/components/Cards/PackageCard";
import NoFound from "@/app/components/NoFound";
import TitleContentSection from "@/app/components/TitleContentSection";
import type { PackagesType } from "@/lib/type/pricing";

interface PricingOptionsType {
  pricingOptions: PackagesType[];
}

export default function PricingOptions({ pricingOptions }: PricingOptionsType) {
  console.log(pricingOptions);
  return (
    <TitleContentSection
      sectionTitle={
        <div className="container mb-12">
          <div className="flex flex-col items-center justify-center space-y-2 max-w-[536px] mx-auto w-full">
            <h2 className="text-3xl font-bold font-jostFont capitalize text-darkBlue leading-9 ">
              See our packages
            </h2>
            <p className="mb-[5px] leading-relaxed text-slate-400 font-jostFont text-center">
              At vero eos et accusamus et iusto odio dignissimos ducimus qui
              blanditiis praesentium voluptatum deleniti atque corrupti quos
              dolores
            </p>
          </div>
        </div>
      }
      sectionContent={
        <div className="container">
          {pricingOptions.length === 0 ? (
            <NoFound title={"No packages, contact  with admin"} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 pt-6 px-3 gap-6 ">
              {pricingOptions.map((data, index) => (
                <PackageCard key={index} {...data} />
              ))}
            </div>
          )}
        </div>
      }
      sectionClass={"py-20 bg-white"}
    />
  );
}
