import { Navigate, Route, Routes } from "react-router-dom";
import MainContentAgent from "./MainContentAgent";
import AgentDashboardOverview from "./AgentDashboardOverview";
import AgentDashboardNotifications from "./AgentDashboardNotifications";
import AgentDashboardMyProperties from "./AgentDashboardMyProperties";
import AgentDashboardTransactions from "./AgentDashboardTransactions";
import AgentDashboardReviews from "./AgentDashboardReviews";
import AgentDashboardMessages from "./AgentDashboardMessages";
import AgentDashboardCreateProperty from "./AgentDashboardCreateProperty";
import AgentDashboardPostBlog from "./blog/AgentDashboardPostBlog";
import AgentDashboardMyProfile from "./AgentDashboardMyProfile";
import { useGlobals } from "@/app/hooks/useGlobals";
import AgentDashboardMyBlogs from "./blog/AgentDashboardMyBlogs";

export default function AgentDashboard() {
  const { authmember } = useGlobals();
  if (!authmember) {
    return <Navigate to="/" replace />;
  }
  return (
    <MainContentAgent>
      <Routes>
        <Route index element={<AgentDashboardOverview />} />
        <Route
          path="/agent-notifications"
          element={<AgentDashboardNotifications />}
        ></Route>
        <Route
          path="/agent-my-properties"
          element={<AgentDashboardMyProperties />}
        ></Route>
        <Route
          path="/agent-transactions"
          element={<AgentDashboardTransactions />}
        ></Route>

        <Route
          path="/agent-reviews"
          element={<AgentDashboardReviews />}
        ></Route>

        <Route
          path="/agent-messages"
          element={<AgentDashboardMessages />}
        ></Route>

        <Route
          path="/agent-create-property"
          element={<AgentDashboardCreateProperty />}
        ></Route>

        <Route
          path="/agent-post-blog"
          element={<AgentDashboardPostBlog />}
        ></Route>

        <Route
          path="/agent-my-blogs"
          element={<AgentDashboardMyBlogs />}
        ></Route>

        <Route
          path="/agent-my-profile"
          element={<AgentDashboardMyProfile />}
        ></Route>
      </Routes>
    </MainContentAgent>
  );
}
