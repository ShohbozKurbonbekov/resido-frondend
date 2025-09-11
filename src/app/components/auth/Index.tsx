import { useGlobals } from "@/app/hooks/useGlobals";
import { Navigate, Outlet } from "react-router-dom";

export default function RequiredAuth() {
  const { authmember } = useGlobals();
  console.log(authmember);
  return authmember?.memberType === "USER" ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace />
  );
}
