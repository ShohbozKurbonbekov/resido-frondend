import type { CommonUsers } from "@/lib/type/common";
import { useState, type ReactNode } from "react";
import Cookies from "universal-cookie";
import { GlobalContext } from "../hooks/useGlobals";
import MemberService from "../services/Member.service";
import { sweetTopSmallSuccessAlert } from "@/lib/sweetAlerts";
import { useNavigate } from "react-router-dom";

const ContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const navigation = useNavigate();
  const cookies = new Cookies();
  if (!cookies.get("accessToken")) localStorage.removeItem("memberData");

  const [authmember, setAuthMember] = useState<null | CommonUsers>(
    localStorage.getItem("memberData")
      ? JSON.parse(localStorage.getItem("memberData") as string)
      : null,
  );

  const logout = async () => {
    const member = new MemberService();
    try {
      await member.logout();
      await sweetTopSmallSuccessAlert("Successfully logged out!");
    } catch (error) {
      console.log("Error in logout process: ", error);
    } finally {
      localStorage.removeItem("memberData");
      setAuthMember(null);
      localStorage.removeItem("memberData");
      navigation("/", { replace: true });
    }
  };
  return (
    <GlobalContext.Provider
      value={{
        authmember,
        setAuthMember,
        logout,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default ContextProvider;
