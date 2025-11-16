import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface CommentsComType {
  triggerBtn: React.ReactNode;
  description: React.ReactNode;
  content: React.ReactNode;
  submitBtn: React.ReactNode;
}
export function CommentsCom({
  triggerBtn,
  description,
  content,
  submitBtn,
}: CommentsComType) {
  return (
    <Dialog>
      <DialogTrigger asChild>{triggerBtn}</DialogTrigger>
      <DialogContent className="w-11/12 max-w-[900px] px-10 overflow-y-auto h-[90%] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-md md:text-xl text-slate-500 text-center font-jostFont">
            See All comments
          </DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {content}
        <DialogFooter>{submitBtn}</DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
