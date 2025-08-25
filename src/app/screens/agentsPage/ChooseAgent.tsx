import AgentService from "@/app/services/AgentService";
import type { Agent } from "@/lib/type/agent";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import AgentShortInfo from "./AgentShortInfo";

export default function ChooseAgent() {
  const chosenAgent: Agent = {
    agentImage: "/img/user-2.jpg",
    agentName: "Daniel Radcliffe",
    agentProperties: 33,
    agentPhone: "01039674224",
    agentRating: 5,
    agentReviews: 101,
    agentContacts: {
      facebook: "https://www.facebook.com",
      twitter: "https://www.twitter.com",
      instagram: "https://www.instagram.com/",
      linkedin: "https://www.linkedin.com",
    },

    agentDescription:
      "Think of a news blog that's filled with content hourly on the day of going live However, reviewers tend to be distracted by comprehensible content. In a professional context it often happens that private or corporate clients corder a publication to be made and presented with the actual content still not being ready.",
    agentLocation: "3599 Huntz Lane",
  };

  const { agentId } = useParams<{ agentId: string }>();

  useEffect(() => {
    const agent = new AgentService();
    agent
      .getAgent("nsvjslvnsjvbnsljb")
      .then((data) => {
        console.log(data);
        // set Agent data
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (!chosenAgent) return null;

  return (
    <>
      {/* // Section introduction */}
      <section className="py-10 bg-blue-800 relative">
        <div className="container">
          <div className="py-[30px] flex flex-col items-start gap-y-2">
            <h2 className="text-white font-bold font-jostFont leading-tight text-3xl">
              Agent Detail
            </h2>
            <p className="italic text-lg font-light text-slate-300 leading-none ">
              Adam D. Okraar from Canada
            </p>
          </div>
        </div>
      </section>

      <AgentShortInfo agent={chosenAgent} />
    </>
  );
}
