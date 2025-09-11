import type { T } from "@/lib/type/common";
import { useState, type ReactNode } from "react";
import Cookies from "universal-cookie";
import { GlobalContext } from "../hooks/useGlobals";

const ContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const cookies = new Cookies();
  if (!cookies.get("accessToken")) localStorage.removeItem("memberData");

  const [authmember, setAuthMember] = useState<null | T>(
    localStorage.getItem("memberData")
      ? JSON.parse(localStorage.getItem("memberData") as string)
      : null
  );

  return (
    <GlobalContext.Provider
      value={{
        authmember,
        setAuthMember,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default ContextProvider;
