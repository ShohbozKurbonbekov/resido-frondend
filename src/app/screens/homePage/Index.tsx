import type { Dispatch } from "@reduxjs/toolkit";
import Achievement from "./Achievement";
import CustomersReview from "./CustomersReview";
import FeaturedAgents from "./FeaturedAgents";
import FeaturedProperties from "./FeaturedProperties";
import Hero from "./Hero";
import NewProperties from "./NewProperties";
import Packages from "@/app/components/Cards/PackageCards";
import {
  setFeaturedAgents,
  setFeaturedProperties,
  setRecentRentProperties,
} from "./slice";
import { useDispatch } from "react-redux";
import type {
  FeaturedPropertyResults,
  RecentPropertyResult,
} from "@/lib/type/property";
import { useEffect } from "react";
import PropertyService from "@/app/services/PropertyService";
import AgentService from "@/app/services/AgentService";
import type { FeaturedAgentsResult } from "@/lib/type/agent";

// REDUX SLICE $ SELECTOR
const actionDispatch = (dispatch: Dispatch) => ({
  setRecentRentProperties: (data: RecentPropertyResult) =>
    dispatch(setRecentRentProperties(data)),
  setFeaturedProperties: (data: FeaturedPropertyResults) =>
    dispatch(setFeaturedProperties(data)),
  setFeaturedAgents: (data: FeaturedAgentsResult) =>
    dispatch(setFeaturedAgents(data)),
});
export default function HomePage() {
  const { setRecentRentProperties, setFeaturedProperties, setFeaturedAgents } =
    actionDispatch(useDispatch());

  // GET DATA FROM  DB BY SERVER
  useEffect(() => {
    const property = new PropertyService();
    const agent = new AgentService();

    // GET RECENT RENT PROPERTY
    property
      .getRecentRentProperty({
        page: 1,
        limit: 4,
      })
      .then((data) => {
        console.log("RESUT, ----------", data);
        setRecentRentProperties(data);
      })
      .catch((error) => {
        console.log(error);
      });

    // GET FEATURED PROPERTY
    property
      .getFeaturedProperty({
        page: 1,
        limit: 4,
      })
      .then((data) => {
        setFeaturedProperties(data);
      })
      .catch((error) => {
        console.log(error);
      });

    // GET FEATURED PROPERTY
    agent
      .getFeaturedAgents({
        page: 1,
        limit: 10,
      })
      .then((data) => {
        setFeaturedAgents(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
