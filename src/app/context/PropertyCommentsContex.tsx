import type { ChosenPropCommentsInput } from "@/lib/type/comment";
import type { SetStateType, T } from "@/lib/type/common";
import { createContext } from "react";

interface ContextType {
  propertyComments: ChosenPropCommentsInput;
  setPropertyComments: SetStateType<ChosenPropCommentsInput>;
}
export const ChosenPropCommentsContext = createContext<ContextType | T>({});
