import UserProfileHeader from "./UserProfileHeader";
import UserProfileContent from "./UserProfileContent";
import { useGlobals } from "@/app/hooks/useGlobals";
import type { User } from "@/lib/type/dashboard/user";

// ----------------------------------------- REDUX INTEGRATION --------------------------

export const UserCardWrapperClasses =
  "w-full grid gap-y-4 md:gap-y-5 grid-cols-1";
// --------------------------------------- COMPONENT --------------------
export default function MyProfile() {
  const { authmember } = useGlobals();
  const user = authmember as User;
  // --------------------------------------- COMPONENT --------------------
  if (!user) return;
  return (
    <div className="lg:col-span-9  flex flex-col gap-7">
      <div className="flex flex-col gap-y-5 h-full">
        <UserProfileHeader />
        <UserProfileContent user={user} />
      </div>
    </div>
  );
}
