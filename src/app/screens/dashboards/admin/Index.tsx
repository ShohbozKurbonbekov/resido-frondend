import { useGlobals } from "@/app/hooks/useGlobals";
import { Navigate, Route, Routes } from "react-router-dom";
import MainContentAdmin from "./MainContentAdmin";
import AdminDashboardOverview from "./AdminDashboardOverview";
import AdminDashboardNotifications from "./AdminDashboardNotifications";
import AdminDashboardMembers from "./AdminDashboardMembers";
import AdminDashboardProperties from "./AdminDashboardProperties";
import AdminDashboardBlogs from "./AdminDashboardBlogs";
import AdminDashboardComments from "./AdminDashboardComments";
import AdminDashboardMessages from "./AdminDashboardMessages";
import AdminDashboardTransactions from "./AdminDashboardTransactions";
import AdminDashboardTariffs from "./AdminDashboardTariffs";
import AdminDashboardTeam from "./AdminDashboardTeam";
import AdminDashboardAddQA from "./AdminDashboardAddQA";
import AdminDashboardProfile from "./AdminDashboardProfile";

export default function AdminDashboard() {
  const { authmember } = useGlobals();
  if (!authmember) {
    return <Navigate to="/" replace />;
  }

  return (
    <MainContentAdmin>
      <Routes>
        {/* Overview */}
        <Route index element={<AdminDashboardOverview />} />

        {/* Notifications */}
        <Route
          path="/admin-notifications"
          element={<AdminDashboardNotifications />}
        />

        {/* Members */}
        <Route path="/admin-members" element={<AdminDashboardMembers />} />

        {/* Content Moderation */}
        <Route
          path="/admin-properties"
          element={<AdminDashboardProperties />}
        />

        {/* Blogs */}
        <Route path="/admin-blogs" element={<AdminDashboardBlogs />} />

        {/* Comments */}
        <Route path="/admin-comments" element={<AdminDashboardComments />} />

        {/* Messages (read-only) */}
        <Route path="/admin-messages" element={<AdminDashboardMessages />} />

        {/* Platform */}

        {/* Transactions */}
        <Route
          path="/admin-transactions"
          element={<AdminDashboardTransactions />}
        />

        {/* Payment Tariffs */}
        <Route path="/admin-tariffs" element={<AdminDashboardTariffs />} />

        {/* Internal */}

        {/* Team Members */}
        <Route path="/admin-team" element={<AdminDashboardTeam />} />

        {/* Question & Answers */}
        <Route path="/admin-add-qa" element={<AdminDashboardAddQA />} />

        {/* Account */}

        {/* My Profile */}
        <Route path="/admin-profile" element={<AdminDashboardProfile />} />
      </Routes>
    </MainContentAdmin>
  );
}
