import NoFound from "@/app/components/NoFound";
import type {
  CommonPropertyResults,
  MemberPropertyActionsType,
  MyProperties,
  Property,
} from "@/lib/type/property";
import React, { useMemo } from "react";
import { PaginationCom } from "@/app/components/PaginationCom";
import type { CommonInput, CommonUsers, SetStateType } from "@/lib/type/common";
import MyPropertiesCard from "./MyPropertiesCard";
import { PropertyStatus } from "@/lib/enums/property.enum";
import { MemberType } from "@/lib/enums/agent.enum";
import type { PropertyFormType } from "@/app/data/properties";
import MyPropertiesEditModal from "./MyPropertiesEditModal";
import { myPropertiesCardWrapper } from "@/app/screens/dashboards/agency/myProperties/AgencyDashboardMyProperties";
import MyPropertiesStatus from "@/app/components/myProperties/MyPropertiesStatus";

///////////////////////////////////// COMPONENT //////////////////
interface MyPropertiesContentType {
  onApprove?: () => Promise<void>;
  onReject?: () => Promise<void>;
  onUpdate?: (values: PropertyFormType) => Promise<void>;
  onArchive?: (id: string) => Promise<void>;
  fetchedProperty: Property | null;
  setFetchedProperty: SetStateType<Property | null>;
  setSelectedPropertyId: SetStateType<string | null>;
  openModal: boolean;
  setModal: SetStateType<boolean>;
  myProperties: CommonPropertyResults<MyProperties>;
  myPropertiesInput: CommonInput & { status?: PropertyStatus };
  setMyPropertiesInput: SetStateType<CommonInput & { status?: PropertyStatus }>;
  authmember: CommonUsers;
  onChangeStatus: (status: PropertyStatus) => void;
}

const MyPropertiesContent: React.FC<MyPropertiesContentType> = React.memo(
  ({
    myProperties,
    myPropertiesInput,
    setMyPropertiesInput,
    fetchedProperty,
    setFetchedProperty,
    onArchive,
    onUpdate,
    setSelectedPropertyId,
    openModal,
    setModal,
    authmember,
    onApprove,
    onReject,
    onChangeStatus,
  }) => {
    //////////////////////////////////// RENDER /////////////////////////////
    const propertyActions: MemberPropertyActionsType = useMemo(() => {
      const canCheckProperty = Boolean(
        fetchedProperty &&
          fetchedProperty.status === PropertyStatus.PENDING_APPROVAL &&
          authmember.role === MemberType.AGENCY,
      );

      const canChangeProperty = Boolean(
        fetchedProperty &&
          [PropertyStatus.REJECTED, PropertyStatus.DRAFT].includes(
            fetchedProperty.status,
          ) &&
          authmember.role === MemberType.AGENT,
      );
      return { canChangeProperty, canCheckProperty };
    }, [authmember.role, fetchedProperty]);

    return (
      <>
        {myPropertiesInput.status && (
          <MyPropertiesStatus
            onChange={onChangeStatus}
            value={myPropertiesInput.status}
          />
        )}
        {myProperties?.properties?.length ? (
          <div className="h-full flex flex-col justify-between gap-4">
            <div className={myPropertiesCardWrapper}>
              {myProperties.properties.map((property: MyProperties) => (
                <MyPropertiesCard
                  authmember={authmember}
                  setModal={setModal}
                  setSelectedPropertyId={setSelectedPropertyId}
                  onArchive={onArchive}
                  property={property}
                  key={property._id}
                />
              ))}
            </div>
            <PaginationCom
              totalPages={Math.ceil(
                (myProperties.totalPropertiesNumber[0]?.total ?? 0) /
                  myPropertiesInput.limit,
              )}
              styleclasses="flex flex-row items-center justify-center mt-6 gap-3 "
              currentPage={myPropertiesInput.page}
              onPageChange={setMyPropertiesInput}
            />
          </div>
        ) : (
          <NoFound title="No properties found" />
        )}

        {/*UPDATE MODAL*/}
        {fetchedProperty && (
          <MyPropertiesEditModal
            onUpdate={onUpdate}
            onApprove={onApprove}
            onReject={onReject}
            propertyActions={propertyActions}
            setModal={setModal}
            setSelectedPropertyId={setSelectedPropertyId}
            setFetchedProperty={setFetchedProperty}
            openModal={openModal}
            fetchedProperty={fetchedProperty}
            key={fetchedProperty._id}
          />
        )}
      </>
    );
  },
);

export default MyPropertiesContent;
