import type { UserDashboardOverviewType } from "@/lib/type/dashboard/user";
import React, { useMemo } from "react";
import { UserDashboardOververWrapper } from "./UserDashboardOverview";
import UserOverviewCard from "./UserOverviewCard";

// -------------------------------------------- COMPONENT ---------------------------------
interface UserDashboardOverviewContentType {
  userDashboardOverview: UserDashboardOverviewType;
}

const UserDashboardOverviewContent: React.FC<UserDashboardOverviewContentType> =
  React.memo(({ userDashboardOverview }) => {
    const { generatedAt } = userDashboardOverview;

    // -------------------------------------------- RENDER ---------------------------------
    const removeGenerateAt = useMemo(() => {
      return Object.entries(userDashboardOverview).filter(
        ([key, _]) => key !== "generatedAt"
      );
    }, [userDashboardOverview]);
    return (
      <div className={UserDashboardOververWrapper}>
        {removeGenerateAt.map(([key, amount]) => (
          <UserOverviewCard
            title={key}
            key={key}
            amount={amount}
            updatedAt={generatedAt || "not given"}
          />
        ))}
      </div>
    );
  });

export default UserDashboardOverviewContent;
