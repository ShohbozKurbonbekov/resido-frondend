import type { T } from "@/lib/type/common";
import { createContext, useContext } from "react";

interface GlobalInterface {
  authmember: null | T;
  setAuthMember: (member: T | null) => void;
}

export const GlobalContext = createContext<GlobalInterface | undefined>(
  undefined
);

export const useGlobals = (): GlobalInterface => {
  const context = useContext(GlobalContext);

  if (context === undefined) throw new Error("UseGlobals within Provider");
  return context;
};
