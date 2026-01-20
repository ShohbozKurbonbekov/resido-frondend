import NoFound from "@/app/components/NoFound";
import type {
  CommonPropertyResults,
  MyProperties,
  Property,
} from "@/lib/type/property";
import React, { useEffect, useState } from "react";
import { PaginationCom } from "@/app/components/PaginationCom";
import type { CommonInput, SetStateType } from "@/lib/type/common";
import { myPropertiesCardWrapper } from "../AgentDashboardMyProperties";
import MyPropertiesCard from "./MyPropertiesCard";
import MyPropertiesEditModel from "./MyPropertiesEditModel";
import { sweetErrorHandling } from "@/lib/sweetAlerts";
import PropertyService from "@/app/services/Property.service";

///////////////////////////////////// COMPONENT //////////////////
interface MyPropertiesContentType {
  myProperties: CommonPropertyResults<MyProperties>;
  myPropertiesInput: CommonInput;
  setMyPropertiesInput: SetStateType<CommonInput>;
  handleArchive: (id: string) => Promise<void>;
}

const MyPropertiesContent: React.FC<MyPropertiesContentType> = React.memo(
  ({
    myProperties,
    myPropertiesInput,
    setMyPropertiesInput,
    handleArchive,
  }) => {
    const [fetchedProperty, setFetchedProperty] = useState<null | Property>(
      null,
    );
    const [selectedId, setSelectedId] = useState<string>("");

    const [openModal, setOpenModal] = useState<boolean>(false);

    useEffect(() => {
      if (!selectedId) return;

      const property = new PropertyService();
      const fetchProperty = async () => {
        try {
          const result = await property.getPublisherProperty(selectedId);

          setFetchedProperty(result);
        } catch (error) {
          console.log("Error in fetching a property: ", error);
          setSelectedId("");
          await sweetErrorHandling(error!);
        }
      };
      fetchProperty();
    }, [selectedId]);

    //////////////////////////////////// RENDER /////////////////////////////
    return (
      <>
        {myProperties?.properties?.length ? (
          <div className="flex-1 flex flex-col justify-between">
            <div
              className={`${myPropertiesCardWrapper} bg-white py-2 px-3 rounded-md`}
            >
              <h5 className="font-jostFont font-semibold text-lg mt-4">
                My Properties
              </h5>
              {myProperties?.properties.map((property: MyProperties) => (
                <MyPropertiesCard
                  setOpenModal={setOpenModal}
                  setSelectedId={setSelectedId}
                  handleArchive={handleArchive}
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
          <MyPropertiesEditModel
            setSelectedId={setSelectedId}
            setFetchedProperty={setFetchedProperty}
            openModal={openModal}
            fetchedProperty={fetchedProperty}
            setOpenModal={setOpenModal}
            key={fetchedProperty._id}
          />
        )}
      </>
    );
  },
);

export default MyPropertiesContent;
