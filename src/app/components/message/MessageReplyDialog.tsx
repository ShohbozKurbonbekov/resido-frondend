import { memo } from "react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Forward, Undo, Undo2 } from "lucide-react";
import type { Message } from "@/lib/type/message";

interface MessageReplyDialogType {
  message: Message;
  isDialogOpen: boolean;
  setDialogOpen: (isDialogOpen: boolean) => void;
  handleReply: (oldMsg: Message, content: string) => Promise<void>;
}
const MessageReplyDialog: React.FC<MessageReplyDialogType> = memo(
  ({ isDialogOpen = false, setDialogOpen, handleReply, message }) => {
    const {
      content: originalContent,
      senderData: { name: receiverName },
    } = message;
    const [replyInput, setReplyInput] = useState<string>("");
    return (
      <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg w-full">
          <DialogHeader>
            <DialogTitle className="flex flex-row items-center gap-3 font-jostFont text-gray-600 text-sm md:text-lg">
              <Undo2 className="h-4 w-4 md:h-6 md:w-6 rotate-180" />
              Reply to{" "}
              <span className="bg-slate-200  py-2 px-4 rounded-lg text-slate-900 font-normal capitalize">
                {" "}
                {receiverName}
              </span>
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <Card className="bg-muted/40 p-3 text-sm text-muted-foreground shadow-none border-gray-200 rounded-md font-jostFont">
              {originalContent}
            </Card>

            <Textarea
              placeholder="Write your reply…"
              className="text-muted-foreground font-jostFont rounded-md bg-muted/40 p-3 focus-visible:ring-slate-500"
              value={replyInput}
              onChange={(e) => setReplyInput(e.target.value)}
              autoFocus
              rows={5}
            />
          </div>

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              <Undo className="h-4 w-4" />
              Cancel
            </Button>
            <Button
              onClick={() => {
                handleReply(message, replyInput);
                setDialogOpen(false);
                setReplyInput("");
              }}
              variant={"default"}
              className="transition-colors duration-200 ease-linear bg-blue-600 hover:bg-blue-900 border-transparent box-border"
              disabled={replyInput.trim() === ""}
            >
              <Forward className="h-4 w-4" />
              Send
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  },
);
export default MessageReplyDialog;
