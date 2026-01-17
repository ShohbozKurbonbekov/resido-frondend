import { useGlobals } from "@/app/hooks/useGlobals";
import { Navigate, Route, Routes } from "react-router-dom";
import MainContentAgency from "./MainContentAgency";
import AgencyDashboardNotifications from "./AgencyDashboardNotifications";
import AgencyDashboardOverview from "./overview/AgencyDashboardOverview";
import AgencyDashboardMyProperties from "./myProperties/AgencyDashboardMyProperties";
import AgencyDashboardMessages from "./AgencyDashboardMessages";
import AgencyDashboardPostBlog from "./blog/AgencyDashboardPostBlog";
import AgencyDashboardMyBlogs from "./blog/AgencyDashboardMyBlogs";
import AgencyDashboardMyProfile from "./myProfle/AgencyDashboardMyProfile";
import AgencyDashboardMyAgents from "./myAgents.tsx/AgencyDashboardMyAgents";
import AgencyDashboardBilling from "./AgencyDashboardBilling";

export default function AgencyDashboard() {
  const { authmember } = useGlobals();
  if (!authmember) {
    return <Navigate to="/" replace />;
  }

  return (
    <MainContentAgency>
      <Routes>
        <Route index element={<AgencyDashboardOverview />} />
        <Route
          path="/agency-notifications"
          element={<AgencyDashboardNotifications />}
        ></Route>
        <Route
          path="/agency-my-properties"
          element={<AgencyDashboardMyProperties />}
        ></Route>
        <Route
          path="/agency-my-agents"
          element={<AgencyDashboardMyAgents />}
        ></Route>

        <Route
          path="/agency-messages"
          element={<AgencyDashboardMessages />}
        ></Route>
        <Route
          path="/agency-billing"
          element={<AgencyDashboardBilling />}
        ></Route>

        <Route
          path="/agency-post-blog"
          element={<AgencyDashboardPostBlog />}
        ></Route>

        <Route
          path="/agency-my-blogs"
          element={<AgencyDashboardMyBlogs />}
        ></Route>

        <Route
          path="/agency-my-profile"
          element={<AgencyDashboardMyProfile />}
        ></Route>
      </Routes>
    </MainContentAgency>
  );
}
