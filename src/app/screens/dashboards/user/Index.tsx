import { useGlobals } from "@/app/hooks/useGlobals";
import { Navigate, Route, Routes } from "react-router-dom";
import MainContentUSER from "./MainContentUSER";
import SavedProperties from "./SavedProperties";
import SavedArticles from "./SavedArticles";
import Reviews from "./Reviews";
import Messages from "./Messages";
import FollowedAgents from "./FollowedAgents";
import MyProfile from "./MyProfile";
import UserDashboardOverview from "./UserDashboardOverview";
import UserNotifications from "./UserNotifications";

// ------------------------------------------------- COMPONENT -------------------------------------------------
export default function UserDashboard() {
  const { authmember } = useGlobals();
  if (!authmember) {
    return <Navigate to="/" replace />;
  }

  // ------------------------------------------------- RENDER -------------------------------------------------
  return (
    <MainContentUSER>
      <Routes>
        <Route index element={<UserDashboardOverview />} />
        <Route path={`/notifications`} element={<UserNotifications />}></Route>

        <Route path={`/saved-properties`} element={<SavedProperties />}></Route>
        <Route path={`followed-agents`} element={<FollowedAgents />}></Route>
        <Route path={`/saved-articles`} element={<SavedArticles />}></Route>

        <Route path={`/reviews`} element={<Reviews />}></Route>

        <Route path={`/messages`} element={<Messages />}></Route>

        <Route path={`/my-profile`} element={<MyProfile />}></Route>
      </Routes>
    </MainContentUSER>
  );
}
