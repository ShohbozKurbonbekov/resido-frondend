import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { SetStateType } from "@/lib/type/common";

interface ReviewApplicationModalType {
  children: React.ReactNode;
  setModalOpen: SetStateType<boolean>;
  modalOpen: boolean;
  modalTitle?: string;
  modalDescription?: string;
}
export default function ReviewApplicationModal({
  modalTitle = "Review Submitted Application",
  modalDescription = "Please review the submitted information carefully. You may approve the application if all requirements are met, or reject it if the provided data is incomplete or invalid.",
  children,
  modalOpen,
  setModalOpen,
}: ReviewApplicationModalType) {
  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogContent
        className="h-5/6 w-11/12 max-w-5xl overflow-y-scroll"
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="text-base md:text-lg font-semibold leading-none tracking-tight font-jostFont text-gray-700  text-center">
            {modalTitle}
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground mt-2 font-jostFont max-w-3xl mx-auto text-center">
            {modalDescription}
          </DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
