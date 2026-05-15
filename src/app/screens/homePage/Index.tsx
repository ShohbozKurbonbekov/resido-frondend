import type { Dispatch } from "@reduxjs/toolkit";
import Achievement from "./Achievement";
import CustomersReview from "./CustomersReview";
import FeaturedAgents from "./FeaturedAgents";
import FeaturedProperties from "./FeaturedProperties";
import Hero from "./Hero";
import NewProperties from "./NewProperties";
import Packages from "@/app/screens/pricing/Packages";
import {
  setFeaturedAgents,
  setFeaturedProperties,
  setRecentRentProperties,
  setLatestComments,
} from "./slice";
import { useDispatch } from "react-redux";
import type {
  FeaturedPropertyResults,
  RecentPropertyResult,
} from "@/lib/type/property";
import { useEffect } from "react";
import PropertyService from "@/app/services/Property.service";
import AgentService from "@/app/services/Agent.service";
import type { FeaturedAgentsResult } from "@/lib/type/agent";
import CommentService from "@/app/services/Comment.service";
import type { Comment } from "@/lib/type/comment";

// REDUX SLICE $ SELECTOR
const actionDispatch = (dispatch: Dispatch) => ({
  setRecentRentProperties: (data: RecentPropertyResult) =>
    dispatch(setRecentRentProperties(data)),
  setFeaturedProperties: (data: FeaturedPropertyResults) =>
    dispatch(setFeaturedProperties(data)),
  setFeaturedAgents: (data: FeaturedAgentsResult) =>
    dispatch(setFeaturedAgents(data)),
  setLatestComments: (data: Comment[]) => dispatch(setLatestComments(data)),
});

export default function HomePage() {
  const {
    setRecentRentProperties,
    setFeaturedProperties,
    setFeaturedAgents,
    setLatestComments,
  } = actionDispatch(useDispatch());

  useEffect(() => {
    //------------------------ FETCH DATA ----------------
    const fetchDataFromDB = () => {
      const property = new PropertyService();
      const agent = new AgentService();
      const comment = new CommentService();

      // GET RECENT RENT PROPERTY
      property
        .getRecentRentProperty({
          page: 1,
          limit: 12,
        })
        .then((data) => {
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
          limit: 4,
        })
        .then((data) => {
          setFeaturedAgents(data);
        })
        .catch((error) => {
          console.log(error);
        });

      // GET LATEST 10 COMMENTS
      comment
        .getLatestComments()
        .then((data) => {
          setLatestComments(data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchDataFromDB();
  }, []);
  return (
    <div>
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
