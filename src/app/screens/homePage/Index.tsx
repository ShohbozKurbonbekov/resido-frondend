import Achievement from "./Achievement";
import FeaturedAgents from "./FeaturedAgents";
import FeaturedProperties from "./FeaturedProperties";
import Hero from "./Hero";
import NewProperties from "./NewProperties";

export default function HomePage() {
  return (
    <div className="home-page">
      <Hero />
      <Achievement />
      <NewProperties />
      <FeaturedProperties />
      <FeaturedAgents />
    </div>
  );
}
