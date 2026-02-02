import { createSelector } from "reselect";
import type { Dispatch } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import type {
  CommonPropertyResults,
  MyProperties,
  Property,
} from "@/lib/type/property";
import { setAgencyMyProperties } from "../slice";
import { retrieveAgencyMyProperties } from "../selector";
import { useGlobals } from "@/app/hooks/useGlobals";
import { useCallback, useEffect, useState } from "react";
import { PropertyStatus } from "@/lib/enums/property.enum";
import type { CommonInput } from "@/lib/type/common";
import AgencyService from "@/app/services/Agency.service";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "@/lib/sweetAlerts";
import PropertyService from "@/app/services/Property.service";
import { Navigate } from "react-router-dom";
import MyPropertiesHeader from "@/app/components/myProperties/MyPropertiesHeader";
import SpinnerGrids from "@/app/components/loading/SpinnerGrids";
import MyPropertiesContent from "@/app/components/myProperties/MyPropertiesContent";
import MemberService from "@/app/services/Member.service";

export const myPropertiesCardWrapper = "flex flex-col gap-y-2";

// ----------------------------------------- REDUX INTEGRATION --------------------------
const agencyMyPropertiesDispatch = (dispatch: Dispatch) => ({
  setAgencyMyProperties: (data: CommonPropertyResults<MyProperties>) =>
    dispatch(setAgencyMyProperties(data)),
});

const agencyMyPropertiesRetriever = createSelector(
  retrieveAgencyMyProperties,
  (myAllProperties) => ({ myAllProperties }),
);

// ----------------------------------------- COMPONENT --------------------------
export default function AgencyDashboardMyProperties() {
  const { setAgencyMyProperties } = agencyMyPropertiesDispatch(useDispatch());
  const { myAllProperties } = useSelector(agencyMyPropertiesRetriever);

  const { authmember } = useGlobals();
  const [fetchedProperty, setFetchedProperty] = useState<null | Property>(null);
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(
    null,
  );
  const [openModal, setModal] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(true);
  const [agencyMyPropertiesInput, setAgencyMyPropertiesInput] = useState<
    CommonInput & { status?: PropertyStatus }
  >({
    page: 1,
    limit: 4,
    status: PropertyStatus.PENDING_APPROVAL,
  });

  // 1 - Fetch Agecy properties
  useEffect(() => {
    (async () => {
      const member = new MemberService();
      try {
        setLoading(true);
        const result = await member.dashboardMyProperties(
          agencyMyPropertiesInput,
        );
        setAgencyMyProperties(result);
      } catch (error) {
        console.log("Error in agencyMyProperties: ", error);
        await sweetErrorHandling(error!);
      } finally {
        setLoading(false);
      }
    })();
  }, [agencyMyPropertiesInput]);

  //  2 - Fetch a certain property
  useEffect(() => {
    if (!selectedPropertyId) return;

    const property = new PropertyService();
    (async () => {
      try {
        const result = await property.getPublisherProperty(selectedPropertyId);

        setFetchedProperty(result);
      } catch (error) {
        console.log(
          "Error in fetching a property in AgencyDashboardMyProperties: ",
          error,
        );
        setSelectedPropertyId(null);
        await sweetErrorHandling(error!);
      }
    })();
  }, [selectedPropertyId]);

  // --------------------------------------- HANDLERS --------------------

  const clear = () => {
    setModal(false);
    setFetchedProperty(null);
    setSelectedPropertyId(null);
  };

  const onArchive = useCallback(
    async (id: string) => {
      const prevProperties = myAllProperties;
      const updatedProperties = prevProperties.properties.filter(
        (property) => property._id !== id,
      );
      setAgencyMyProperties({
        properties: updatedProperties,
        totalPropertiesNumber: [
          {
            total: Math.max(
              0,
              (prevProperties.totalPropertiesNumber[0]?.total || 1) - 1,
            ),
          },
        ],
      });

      try {
        const agency = new AgencyService();
        await agency.changeAgencyPropertyStatus(id, PropertyStatus.ARCHIVED);
      } catch (error) {
        console.log("Error in onArchive: ", error);
        await sweetErrorHandling(error!);
        setAgencyMyProperties(prevProperties);
      }
    },
    [myAllProperties, setAgencyMyProperties],
  );
  const onReject = useCallback(async () => {
    if (!selectedPropertyId) return;
    const prevProperties = myAllProperties;
    const updatedProperties = prevProperties.properties.filter(
      (property) => property._id !== selectedPropertyId,
    );

    setAgencyMyProperties({
      properties: updatedProperties,
      totalPropertiesNumber: [
        {
          total: Math.max(
            0,
            (prevProperties.totalPropertiesNumber[0]?.total || 1) - 1,
          ),
        },
      ],
    });

    try {
      const agency = new AgencyService();
      await agency.changeAgencyPropertyStatus(
        selectedPropertyId,
        PropertyStatus.REJECTED,
      );
      await sweetTopSmallSuccessAlert("Successfully Rejected");
    } catch (error) {
      setAgencyMyProperties(prevProperties);
      console.log("Error in onReject: ", error);
      await sweetErrorHandling(error!);
    } finally {
      clear();
    }
  }, [selectedPropertyId, myAllProperties, setAgencyMyProperties]);

  const onApprove = useCallback(async () => {
    if (!selectedPropertyId) return;
    const prevProperties = myAllProperties;
    const updatedProperties = prevProperties.properties.filter(
      (property) => property._id !== selectedPropertyId,
    );

    setAgencyMyProperties({
      properties: updatedProperties,
      totalPropertiesNumber: [
        {
          total: Math.max(
            0,
            (prevProperties.totalPropertiesNumber[0]?.total || 1) - 1,
          ),
        },
      ],
    });

    try {
      const agency = new AgencyService();
      await agency.changeAgencyPropertyStatus(
        selectedPropertyId,
        PropertyStatus.AVAILABLE,
      );
      await sweetTopSmallSuccessAlert("Successfully Approved");
    } catch (error) {
      setAgencyMyProperties(prevProperties);
      console.log("Error in onApprove: ", error);
      await sweetErrorHandling(error!);
    } finally {
      clear();
    }
  }, [selectedPropertyId, myAllProperties, setAgencyMyProperties]);

  const onChangeStatus = useCallback((status: PropertyStatus) => {
    setAgencyMyPropertiesInput((prev) => {
      return { ...prev, status: status };
    });
  }, []);

  if (!authmember) {
    return <Navigate to={"/"} replace />;
  }
  return (
    <div className="flex flex-col gap-3 h-full">
      <MyPropertiesHeader
        title="Property Moderation"
        subtitle="Review property listings submitted by agents. Approve, reject, or archive properties to control what appears on the platform."
      />

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
          myProperties={myAllProperties}
          myPropertiesInput={agencyMyPropertiesInput}
          setMyPropertiesInput={setAgencyMyPropertiesInput}
          onApprove={onApprove}
          onReject={onReject}
          onArchive={onArchive}
          onChangeStatus={onChangeStatus}
        />
      )}
    </div>
  );
}
