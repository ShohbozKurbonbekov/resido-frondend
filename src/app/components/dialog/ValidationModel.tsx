import type { SetStateType } from "@/lib/type/common";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";

interface ValidationModelType {
  isOpen: boolean;
  setIsOpen: SetStateType<boolean>;
}

export default function ValidationModel({
  isOpen,
  setIsOpen,
}: ValidationModelType) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-screen-md w-5/6  rounded-md py-10">
        <DialogHeader>
          <DialogTitle className="hidden opacity-0 absolute -l-[500px]">
            We’re reviewing your information. This usually takes a few moments.
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col space-y-3 items-center ">
          <div className="p-3 bg-black/10 rounded-xl">
            <Spinner className="size-4 md:size-6 text-slate-500" />
          </div>
          <h3 className="text-sm md:text-lg font-jostFont text-darkBlue  max-w-80 text-center">
            We’re reviewing your information. This usually takes a few moments.
          </h3>
        </div>
      </DialogContent>
    </Dialog>
  );
}
