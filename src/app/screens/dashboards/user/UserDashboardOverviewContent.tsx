import type { UserDashboardOverviewType } from "@/lib/type/dashboard/user";
import NoFound from "@/app/components/NoFound";
import React from "react";
import { UserDashboardOververWrapper } from "./UserDashboardOverview";

// -------------------------------------------- COMPONENT ---------------------------------
interface UserDashboardOverviewContentType {
  userDashboardOverview: UserDashboardOverviewType;
}

const UserDashboardOverviewContent: React.FC<UserDashboardOverviewContentType> =
  React.memo(({ userDashboardOverview }) => {
    // -------------------------------------------- RENDER ---------------------------------
    return (
      <>
        {userDashboardOverview?.generatedAt ? (
          <div className="flex-1 flex flex-col justify-between">
            <div className={UserDashboardOververWrapper}>Content</div>
          </div>
        ) : (
          <NoFound title="No user messages found" />
        )}
      </>
    );
  });

export default UserDashboardOverviewContent;
