import SpinnerGrids from "@/app/components/loading/SpinnerGrids";
import { useEffect, useState } from "react";
import { createSelector } from "reselect";
import type { Dispatch } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import type { CommonInput } from "@/lib/type/common";
import { sweetErrorHandling } from "@/lib/sweetAlerts";
import { setAgentMyProperties } from "./slice";
import { retrieveAgentMyProperties } from "./selector";
import type { CommonPropertyResults } from "@/lib/type/property";
import AgentService from "@/app/services/AgentService";
import AgentMyPropertiesHeader from "./my-properties/AgentMyPropertiesHeader";
import AgentMyPropertiesContent from "./my-properties/AgentMyPropertiesContent";

// ----------------------------------------- REDUX INTEGRATION --------------------------
const agentMyPropertiesDispatch = (dispatch: Dispatch) => ({
  setAgentMyProperties: (data: CommonPropertyResults) =>
    dispatch(setAgentMyProperties(data)),
});

const agentMyPropertieRetriever = createSelector(
  retrieveAgentMyProperties,
  (agentMyProperties) => ({ agentMyProperties })
);

export const agentMyPropertiesCardWrapper = "grid grid-cols-1 gap-y-3";
// --------------------------------------- COMPONENT --------------------
export default function AgentDashboardMyProperties() {
  const { setAgentMyProperties } = agentMyPropertiesDispatch(useDispatch());
  const { agentMyProperties } = useSelector(agentMyPropertieRetriever);
  const [loading, setLoading] = useState<boolean>(true);
  const [agentMyPropertiesInput, setAgentMyPropertiesInput] =
    useState<CommonInput>({
      page: 1,
      limit: 4,
    });

  useEffect(() => {
    const agent = new AgentService();
    const fetchAgentMyProperties = async () => {
      try {
        const result = await agent.getAgentMyProperties(agentMyPropertiesInput);
        setAgentMyProperties(result);
      } catch (error) {
        console.log("Error in fetchAgentMyProperties: ", error);
        await sweetErrorHandling(error!);
      } finally {
        setLoading(false);
      }
    };

    fetchAgentMyProperties();
  }, [agentMyPropertiesInput]);
  // --------------------------------------- HANDLERS --------------------
  // const handleDeleteMessage = useCallback(
  //   async (id: string) => {
  //     const oldMessages = getAgentMessages;
  //     const updatedMessages = oldMessages.messages.filter(
  //       (message) => message._id !== id
  //     );
  //     setGetAgentMessages({
  //       messages: updatedMessages,
  //       metaCounter: [
  //         { total: Math.max(0, (oldMessages.metaCounter[0]?.total || 1) - 1) },
  //       ],
  //     });

  //     const member = new MemberService();
  //     try {
  //       await member.deleteMessage(id);
  //     } catch (error) {
  //       console.log("Error in handleDeleteMessage: ", error);
  //       await sweetErrorHandling(error!);
  //       setGetAgentMessages(oldMessages);
  //     }
  //   },
  //   [getAgentMessages, setGetAgentMessages]
  // );

  // const handleSavebtn = useCallback(
  //   async (content: string, id: string) => {
  //     const oldMessages = getAgentMessages;
  //     const updatedMessages = oldMessages.messages.map((message) => {
  //       if (message._id === id) {
  //         return { ...message, content: content, isEdited: true };
  //       } else {
  //         return message;
  //       }
  //     });
  //     setGetAgentMessages({
  //       messages: updatedMessages,
  //       metaCounter: oldMessages.metaCounter,
  //     });
  //     try {
  //       const member = new MemberService();
  //       await member.messageEdit(id, content);
  //     } catch (error) {
  //       console.log("Error in handleSavebtn: ", error);
  //       await sweetErrorHandling(error!);
  //       setGetAgentMessages(oldMessages);
  //     }
  //   },
  //   [getAgentMessages, setGetAgentMessages]
  // );

  // --------------------------------------- RENDER --------------------
  return (
    <div className="lg:col-span-9  flex flex-col gap-7">
      <AgentMyPropertiesHeader />

      {loading ? (
        <SpinnerGrids columns={agentMyPropertiesCardWrapper} count={2} />
      ) : (
        <div className="flex flex-col gap-y-5 h-full">
          <AgentMyPropertiesContent agentMyProperties={agentMyProperties} />
        </div>
      )}
    </div>
  );
}
