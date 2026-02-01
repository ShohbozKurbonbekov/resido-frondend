import SpinnerGrids from "@/app/components/loading/SpinnerGrids";
import { useCallback, useEffect, useState } from "react";
import { createSelector } from "reselect";
import type { Dispatch } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import type { CommonInput } from "@/lib/type/common";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "@/lib/sweetAlerts";
import { setAgentMyProperties } from "./slice";
import { retrieveAgentMyProperties } from "./selector";
import type {
  CommonPropertyResults,
  MyProperties,
  Property,
} from "@/lib/type/property";
import AgentService from "@/app/services/Agent.service";
import PropertyService from "@/app/services/Property.service";
import { useGlobals } from "@/app/hooks/useGlobals";
import { Navigate } from "react-router-dom";
import type { PropertyFormType } from "@/app/data/properties";
import { PropertyStatus, SellingTypeEnum } from "@/lib/enums/property.enum";
import MyPropertiesHeader from "@/app/components/myProperties/MyPropertiesHeader";
import MyPropertiesContent from "@/app/components/myProperties/MyPropertiesContent";

export const myPropertiesCardWrapper = "grid grid-cols-1 gap-y-3";

// ----------------------------------------- REDUX INTEGRATION --------------------------
const agentMyPropertiesDispatch = (dispatch: Dispatch) => ({
  setAgentMyProperties: (data: CommonPropertyResults<MyProperties>) =>
    dispatch(setAgentMyProperties(data)),
});

const agentMyPropertieRetriever = createSelector(
  retrieveAgentMyProperties,
  (agentMyProperties) => ({ agentMyProperties }),
);

// --------------------------------------- COMPONENT --------------------
export default function AgentDashboardMyProperties() {
  const { authmember } = useGlobals();
  const { setAgentMyProperties } = agentMyPropertiesDispatch(useDispatch());
  const { agentMyProperties } = useSelector(agentMyPropertieRetriever);
  const [fetchedProperty, setFetchedProperty] = useState<null | Property>(null);
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(
    null,
  );
  const [openModal, setModal] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(true);
  const [agentMyPropertiesInput, setAgentMyPropertiesInput] =
    useState<CommonInput>({
      page: 1,
      limit: 4,
    });

  // 1 -  Fetch agent properties data
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

  // 2 - Fetch a specific property
  useEffect(() => {
    if (!selectedPropertyId) return;

    const property = new PropertyService();
    const fetchProperty = async () => {
      try {
        const result = await property.getPublisherProperty(selectedPropertyId);

        setFetchedProperty(result);
      } catch (error) {
        console.log("Error in fetching a property: ", error);
        setSelectedPropertyId(null);
        await sweetErrorHandling(error!);
      }
    };
    fetchProperty();
  }, [selectedPropertyId]);

  // --------------------------------------- HANDLERS --------------------
  // const onArchive = useCallback(
  //   async (id: string) => {
  //     const oldMyProperties = agentMyProperties;
  //     const updatedAgentMyProperties = oldMyProperties.properties.map(
  //       (property) =>
  //         property._id === id
  //           ? { ...property, status: PropertyStatus.ARCHIVED }
  //           : property,
  //     );
  //     setAgentMyProperties({
  //       properties: updatedAgentMyProperties,
  //       totalPropertiesNumber: [
  //         {
  //           total: oldMyProperties.totalPropertiesNumber[0].total || 0,
  //         },
  //       ],
  //     });

  //     const agent = new AgentService();
  //     try {
  //       await agent.archiveMyProperty(id);
  //     } catch (error) {
  //       console.log("Error in handleArchive: ", error);
  //       await sweetErrorHandling(error!);
  //       setAgentMyProperties(oldMyProperties);
  //     }
  //   },
  //   [agentMyProperties, setAgentMyProperties],
  // );
  // const onReject = useCallback(async () => {}, []);
  const onUpdate = useCallback(
    async (values: PropertyFormType) => {
      if (!fetchedProperty) return;

      const snaptShot = agentMyProperties;
      const updatedProperties = snaptShot.properties.map((property) =>
        property._id === fetchedProperty._id
          ? {
              ...property,
              status: PropertyStatus.PENDING_APPROVAL,
              title: values.title,
              address: values.address,
              propertyType: values.propertyType,
              area: Number(values.area),
              sellingOption:
                values.sellingOption.type === SellingTypeEnum.RENT
                  ? {
                      optionRent: {
                        type: SellingTypeEnum.RENT,
                        monthlyPayment: Number(
                          values.sellingOption.monthlyPayment,
                        ),
                        overalAmount: Number(values.sellingOption.overalAmount),
                        devidedMonths: Number(
                          values.sellingOption.devidedMonths,
                        ),
                      },
                    }
                  : {
                      optionSell: {
                        type: SellingTypeEnum.SALE,
                        overalAmunt: Number(values.sellingOption.overalAmunt),
                        discount: Number(values.sellingOption.discount),
                      },
                    },
              images:
                values.images.image1 instanceof File
                  ? [URL.createObjectURL(values.images.image1)]
                  : [property.images[0]],
            }
          : property,
      );

      setAgentMyProperties({
        properties: updatedProperties as MyProperties[],
        totalPropertiesNumber: snaptShot.totalPropertiesNumber,
      });
      try {
        const agent = new AgentService();
        await agent.updatePublisherProperty(fetchedProperty._id, values);
        await sweetTopSmallSuccessAlert("Property updated!");

        setModal(false);
        setFetchedProperty(null);
        setSelectedPropertyId(null);
      } catch (error) {
        console.log("Error in onUpdate: ", error);
        setAgentMyProperties(snaptShot);
        throw error;
      }
    },
    [
      setModal,
      agentMyProperties,
      setAgentMyProperties,
      fetchedProperty,
      setFetchedProperty,
      setSelectedPropertyId,
    ],
  );

  // --------------------------------------- RENDER --------------------

  if (!authmember) {
    return <Navigate to={"/"} replace />;
  }
  return (
    <div className="flex flex-col gap-7 h-full">
      <MyPropertiesHeader />

      {loading ? (
        <SpinnerGrids columns={myPropertiesCardWrapper} count={3} />
      ) : (
        <MyPropertiesContent
          authmember={authmember}
          openModal={openModal}
          setFetchedProperty={setFetchedProperty}
          setSelectedPropertyId={setSelectedPropertyId}
          setModal={setModal}
          fetchedProperty={fetchedProperty}
          onUpdate={onUpdate}
          myProperties={agentMyProperties}
          myPropertiesInput={agentMyPropertiesInput}
          setMyPropertiesInput={setAgentMyPropertiesInput}
        />
      )}
    </div>
  );
}
