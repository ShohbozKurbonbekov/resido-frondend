import NoFound from "@/app/components/NoFound";
import type { CommonPropertyResults, MyProperties } from "@/lib/type/property";
import React from "react";
import { PaginationCom } from "@/app/components/PaginationCom";
import type { CommonInput, SetStateType } from "@/lib/type/common";
import { myPropertiesCardWrapper } from "../../screens/dashboards/agent/AgentDashboardMyProperties";
import MyPropertiesCard from "./MyPropertiesCard";

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
                  handleArchive={handleArchive}
                  property={property}
                  key={property._id}
                />
              ))}
            </div>
            <PaginationCom
              totalPages={Math.ceil(
                (myProperties.totalPropertiesNumber[0]?.total ?? 0) /
                  myPropertiesInput.limit
              )}
              styleclasses="flex flex-row items-center justify-center mt-6 gap-3 "
              currentPage={myPropertiesInput.page}
              onPageChange={setMyPropertiesInput}
            />
          </div>
        ) : (
          <NoFound title="No properties found" />
        )}
      </>
    );
  }
);

export default MyPropertiesContent;
