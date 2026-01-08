import SpinnerGrids from "@/app/components/loading/SpinnerGrids";
import { useCallback, useEffect, useState } from "react";
import { createSelector } from "reselect";
import type { Dispatch } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import type { CommonInput } from "@/lib/type/common";
import { sweetErrorHandling } from "@/lib/sweetAlerts";
import { setAgentMyProperties } from "./slice";
import { retrieveAgentMyProperties } from "./selector";
import type { CommonPropertyResults, MyProperties } from "@/lib/type/property";
import AgentService from "@/app/services/AgentService";
import { PropertyStatus } from "@/lib/enums/property.enum";
import MyPropertiesHeader from "../../../components/myProperties/MyPropertiesHeader";
import MyPropertiesContent from "../../../components/myProperties/MyPropertiesContent";

export const myPropertiesCardWrapper = "grid grid-cols-1 gap-y-3";

// ----------------------------------------- REDUX INTEGRATION --------------------------
const agentMyPropertiesDispatch = (dispatch: Dispatch) => ({
  setAgentMyProperties: (data: CommonPropertyResults<MyProperties>) =>
    dispatch(setAgentMyProperties(data)),
});

const agentMyPropertieRetriever = createSelector(
  retrieveAgentMyProperties,
  (agentMyProperties) => ({ agentMyProperties })
);

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
  const handleArchive = useCallback(
    async (id: string) => {
      const oldMyProperties = agentMyProperties;
      const updatedAgentMyProperties = oldMyProperties.properties.map(
        (property) =>
          property._id === id
            ? { ...property, status: PropertyStatus.ARCHIVED }
            : property
      );
      setAgentMyProperties({
        properties: updatedAgentMyProperties,
        totalPropertiesNumber: [
          {
            total: oldMyProperties.totalPropertiesNumber[0].total || 0,
          },
        ],
      });

      const agent = new AgentService();
      try {
        await agent.archiveMyProperty(id);
      } catch (error) {
        console.log("Error in handleArchive: ", error);
        await sweetErrorHandling(error!);
        setAgentMyProperties(oldMyProperties);
      }
    },
    [agentMyProperties, setAgentMyProperties]
  );

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
      <MyPropertiesHeader />

      {loading ? (
        <SpinnerGrids columns={myPropertiesCardWrapper} count={2} />
      ) : (
        <div className="flex flex-col gap-y-5 h-full">
          <MyPropertiesContent
            handleArchive={handleArchive}
            myProperties={agentMyProperties}
            myPropertiesInput={agentMyPropertiesInput}
            setMyPropertiesInput={setAgentMyPropertiesInput}
          />
        </div>
      )}
    </div>
  );
}
