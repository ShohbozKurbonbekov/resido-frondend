import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import React from "react";

type SideBarComType = {
  triggeredBtn: React.ReactNode;
  headerTitle: string;
  headerDecription?: React.ReactNode;
  renderedContent: React.ReactNode;
};

const SideBarCom: React.FC<SideBarComType> = ({
  headerTitle,
  headerDecription,
  renderedContent,
  triggeredBtn,
}) => {
  return (
    <Sheet>
      <SheetTrigger asChild>{triggeredBtn}</SheetTrigger>
      <SheetContent side={"left"} className="w-100% max-w-md overflow-auto ">
        <SheetHeader>
          <SheetTitle>{headerTitle}</SheetTitle>
          {headerDecription ? (
            <SheetDescription>{headerDecription}</SheetDescription>
          ) : null}
        </SheetHeader>
        <div className="mt-10">{renderedContent}</div>

        <SheetFooter>
          <SheetClose className="mt-3">
            <button className="bg-slate-300 py-2 hover:bg-slate-500 text-darkBlue font-bold text-sm text-center w-full rounded-md duration-100 ease-in transition-colors hover:text-white  px-7">
              Close
            </button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default SideBarCom;
