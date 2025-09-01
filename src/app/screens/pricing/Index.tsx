import SectionIntroNoBackground from "@/app/components/SectionIntroNoBackground";
import PricingOptions from "./PricingOptions";
import { useEffect, useState } from "react";
import type { T } from "@/lib/type/common";
import type { PackagesType } from "@/lib/type/pricing";

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

export default function PricingPage() {
  const [pricingOptions, setPricingOptions] = useState<PackagesType[]>([]);

  useEffect(() => {
    // getting  packages data from the database
    setPricingOptions(packages);
  }, []);
  return (
    <>
      <SectionIntroNoBackground
        title="Pricing"
        subtitle="we provide different services with different prices, feel free to have one"
      />
      <PricingOptions pricingOptions={pricingOptions} />
    </>
  );
}
