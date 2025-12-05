import SectionIntroNoBackground from "@/app/components/SectionIntroNoBackground";
import { useGlobals } from "@/app/hooks/useGlobals";
import type { User } from "@/lib/type/dashboard/user";
import DashboardSideBar from "../Dashboard-sidebar";
import SidebarToggleBtn from "./SidebarToggleBtn";

interface MainContentUSERType {
  children?: React.ReactNode;
}
export default function MainContentUSER({ children }: MainContentUSERType) {
  const { authmember } = useGlobals();
  const member = authmember as User;

  return (
    <>
      <>
        <SectionIntroNoBackground
          title={`Welcome to your account ${member.memberName}`}
          subtitle={""}
        />
        <section className="py-20 bg-sky-100">
          <div className="px-3 grid grid-cols-1 lg:grid-cols-12 gap-5 lg:items-start">
            <div className="lg:col-span-3 hidden lg:block">
              <DashboardSideBar />
            </div>

            <SidebarToggleBtn />

            <div className="lg:col-span-9 flex flex-col gap-7">
              <div className="cards grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {/* {USER_CARDS.map((card, index) => (
                  <UserFeaturesCard key={index} values={card} />
                ))} */}
                {children}
              </div>
            </div>
          </div>
        </section>
      </>
    </>
  );
}
