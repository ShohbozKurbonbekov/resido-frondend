import UserProfileHeader from "./UserProfileHeader";
import { useGlobals } from "@/app/hooks/useGlobals";
import type { User } from "@/lib/type/dashboard/user";
import UserProfileCard from "@/app/components/Cards/UserProfileCard";
import { useCallback } from "react";
import type { UserProfileSubmitType } from "@/app/data/dashboard/user";
import MemberService from "@/app/services/Member.service";
import { sweetTopSmallSuccessAlert } from "@/lib/sweetAlerts";

// ----------------------------------------- REDUX INTEGRATION --------------------------

export const UserCardWrapperClasses =
  "w-full grid gap-y-4 md:gap-y-5 grid-cols-1";
// --------------------------------------- COMPONENT --------------------
export default function MyProfile() {
  const { authmember, setAuthMember } = useGlobals();
  const user = authmember as User;

  // --------------------------------------- HANDLERS --------------------
  const onSubmit = useCallback(
    async (values: UserProfileSubmitType) => {
      try {
        const member = new MemberService();
        const data = await member.updateMember(values);
        setAuthMember(data);

        await sweetTopSmallSuccessAlert("Modified successfully!", 1000);
      } catch (error) {
        console.log("Error in MyProfile: ", error);
        throw error;
      }
    },
    [setAuthMember],
  );
  if (!user) return;
  return (
    <div className="lg:col-span-9  flex flex-col gap-7">
      <div className="flex flex-col gap-y-5 h-full">
        <UserProfileHeader />
        <UserProfileCard
          user={user}
          formTitle="User Profile"
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
}
