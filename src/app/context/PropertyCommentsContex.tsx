import type { ChosenPropCommentsInput } from "@/lib/type/ChosenPropCommentsInput";
import type { SetStateType, T } from "@/lib/type/common";
import type { ChosenPropertyStateType } from "@/lib/type/property";
import { createContext } from "react";

interface ContextType {
  setChosenPropertyState: SetStateType<ChosenPropertyStateType>;
  propertyComments: ChosenPropCommentsInput;
  setPropertyComments: SetStateType<ChosenPropCommentsInput>;
}
export const ChosenPropCommentsContext = createContext<ContextType | T>({});
