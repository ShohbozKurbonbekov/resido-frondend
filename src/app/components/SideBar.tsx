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

type SideBarType = {
  triggeredBtn: React.ReactNode;
  headerTitle: React.ReactNode;
  headerDecription?: React.ReactNode;
  renderedContent: React.ReactNode;
};

export default function SideBarCom(props: SideBarType) {
  const { headerTitle, headerDecription, renderedContent, triggeredBtn } =
    props;

  return (
    <Sheet>
      <SheetTrigger asChild>{triggeredBtn}</SheetTrigger>
      <SheetContent
        side={"left"}
        className="w-100% max-w-[450px] overflow-auto "
      >
        <SheetHeader>
          <SheetTitle>{headerTitle}</SheetTitle>
          {headerDecription ? (
            <SheetDescription>{headerDecription}</SheetDescription>
          ) : null}
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 px-4 mt-10">
          {renderedContent}
        </div>

        <SheetFooter>
          <SheetClose className=" mt-3">
            <button className="bg-slate-300 py-2 hover:bg-slate-500 text-darkBlue font-bold text-sm text-center w-full rounded-md duration-100 ease-in transition-colors hover:text-white  px-7">
              Close
            </button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
