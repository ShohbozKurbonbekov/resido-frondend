import { useGlobals } from "@/app/hooks/useGlobals";
import { Navigate, Outlet } from "react-router-dom";

export default function RequiredAuth() {
  const { authmember } = useGlobals();

  return authmember?.memberType === "AGENCY" ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace />
  );
}
