import Achievement from "./Achievement";
import CustomersReview from "./CustomersReview";
import FeaturedAgents from "./FeaturedAgents";
import FeaturedProperties from "./FeaturedProperties";
import Hero from "./Hero";
import NewProperties from "./NewProperties";
import Packages from "@/app/components/Cards/PackageCards";

export default function HomePage() {
  return (
    <div className="home-page">
      <Hero />
      <Achievement />
      <NewProperties />
      <FeaturedProperties />
      <FeaturedAgents />
      <CustomersReview />
      <Packages />
    </div>
  );
}
