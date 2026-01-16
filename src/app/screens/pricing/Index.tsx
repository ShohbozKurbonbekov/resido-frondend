import Packages from "@/app/screens/pricing/Packages";
import SectionIntroNoBackground from "@/app/components/SectionIntroNoBackground";

export default function PricingPage() {
  return (
    <>
      <SectionIntroNoBackground
        title="Pricing"
        subtitle="we provide different services with different prices, feel free to have one"
      />
      <Packages />
    </>
  );
}
