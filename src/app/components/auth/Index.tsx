import { useGlobals } from "@/app/hooks/useGlobals";
import { Navigate, Outlet } from "react-router-dom";

export default function RequiredAuth() {
  const { authmember } = useGlobals();

  return authmember?.role === "USER" ? <Outlet /> : <Navigate to="/" replace />;
}
