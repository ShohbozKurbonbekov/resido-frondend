import { Card, CardContent } from "@/components/ui/card";
import type { SetStateType } from "@/lib/type/common";
import type { Message } from "@/lib/type/message";
import React, { useCallback, useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, MailOpen, Reply, Undo } from "lucide-react";
import { MemberType } from "@/lib/enums/agent.enum";
import { defaultUserAvatar, ErrorMessages, serverAPI } from "@/lib/config";
import {
  customLetterCustomise,
  dateConverter,
  getMilliSeconds,
} from "@/lib/utils";
import { emptyInputAlert, sweetErrorHandling } from "@/lib/sweetAlerts";
import MemberService from "@/app/services/MemberService";
import { useGlobals } from "@/app/hooks/useGlobals";
import { Textarea } from "@/components/ui/textarea";
import MessageReplyDialog from "./MessageReplyDialog";

const contentClasses =
  "mt-1 text-sm text-muted-foreground font-jostFont rounded-xl bg-muted/40 p-3 flex-1";
const badgeClasses = "h-5 px-2 text-size_10";

const subjectContentClasses = "flex flex-row gap-x-2 items-center flex-wrap";

const subConTextClasses = "text-sm font-jostFont capitalize text-gray-500";
interface MemberMessageCardType {
  message: Message;
  setMainPageLoading: SetStateType<boolean>;
  handleDeleteMessage: (id: string) => Promise<void>;
  handleSavebtn: (content: string, id: string) => Promise<void>;
  handleReply: (oldMsg: Message, content: string) => Promise<void>;
}
const MemberMessageCard: React.FC<MemberMessageCardType> = React.memo(
  ({
    setMainPageLoading,
    message,
    handleDeleteMessage,
    handleSavebtn,
    handleReply,
  }) => {
    const [isDialogOpen, setDialogOpen] = useState<boolean>(false);
    const [isEditing, setIsEditing] = useState<boolean>(false);

    const [updatedContent, setUpdatedContent] = useState<string>(
      message.content
    );
    const { authmember } = useGlobals();
    const isSender = message.senderType === MemberType.USER;
    const counterpart =
      authmember?._id === message.senderId
        ? message.receiverData
        : message.senderData;

    const imgUrl = counterpart?.avatar
      ? `${serverAPI}/${counterpart?.avatar}`
      : defaultUserAvatar;

    // --------------------------------------- HANDLERS -----------------------------
    const handleMarkRead = useCallback(async () => {
      try {
        const member = new MemberService();
        await member.messageRead(message._id);
        setMainPageLoading((prev) => !prev);
      } catch (error) {
        console.log("Error in handleMarkRead: ", error);
        await sweetErrorHandling(error!);
      }
    }, [message, setMainPageLoading]);

    const isInTenMins = useMemo(() => {
      return Date.now() - getMilliSeconds(message.createdAt) <= 1000 * 60 * 10;
    }, [message]);

    const handleEditbtn = useCallback(() => {
      setIsEditing(true);
    }, []);

    const handleContentChange = useCallback(
      (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const input = e.target.value;
        setUpdatedContent(input);
      },
      []
    );

    const editBtn = useCallback(() => {
      if (updatedContent === "") {
        emptyInputAlert(ErrorMessages.error3!);
      } else {
        handleSavebtn(updatedContent.trim(), message._id);
        setIsEditing(false);
      }
    }, [message, handleSavebtn, updatedContent]);

    const handleCancel = useCallback(() => {
      setIsEditing(false);
    }, []);
    return (
      <>
        <Card
          className={`group rounded-2xl shadow-sm transition-all hover:shadow-md ${
            message.isRead
              ? "border border-slate-300"
              : "border-l-4 border-t-0 border-r-0 border-b-0 border-primary"
          }`}
        >
          <CardContent className="flex gap-4 p-5">
            <Avatar className="h-12 w-12 shrink-0 ring-2 ring-muted">
              <AvatarImage src={imgUrl} alt={counterpart?.name ?? "unknown"} />
              <AvatarFallback className="text-sm font-semibold">
                {(counterpart?.name ?? "Uknown").slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <div className="flex items-start justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="truncate text-sm lg:text-lg font-semibold text-foreground font-jostFont capitalize">
                    {counterpart?.name || "Unknown"}
                  </h4>
                  {!message.isRead && (
                    <Badge
                      variant="default"
                      className={`${badgeClasses} bg-green-700 text-white hover:bg-green-700`}
                    >
                      New
                    </Badge>
                  )}
                  {message.isEdited ? (
                    <Badge variant={"outline"} className={badgeClasses}>
                      Edited
                    </Badge>
                  ) : null}
                </div>

                {message.isRead && message.whenIsRead ? (
                  <span className="text-xs text-green-600">
                    Read at:{" "}
                    {dateConverter(message.whenIsRead, "D/MM/YYYY, HH:mm")}
                  </span>
                ) : (
                  <span className="text-xs text-destructive">
                    Sent at{" "}
                    {dateConverter(message.createdAt, "D/MM/YYYY, HH:mm")}
                  </span>
                )}
              </div>

              <div className="fle flex-col">
                <div className={subjectContentClasses}>
                  <span className={subConTextClasses}>Subject:</span>
                  <p className="text-sm font-medium text-foreground font-jostFont ">
                    {customLetterCustomise(message.subject)}
                  </p>
                </div>
                <div className={subjectContentClasses}>
                  <span className={subConTextClasses}>Content:</span>
                  {isEditing ? (
                    <Textarea
                      className={`${contentClasses} focus-visible:ring-slate-400`}
                      value={updatedContent}
                      onChange={handleContentChange}
                    ></Textarea>
                  ) : (
                    <p className={`${contentClasses}`}>{message.content}</p>
                  )}
                </div>
              </div>

              <div className="mt-1 flex flex-wrap items-center gap-2">
                {isSender ? (
                  <>
                    {isInTenMins && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="gap-1 duration-200 transition-colors ease-linear"
                        onClick={isEditing ? editBtn : handleEditbtn}
                      >
                        <Pencil className="h-4 w-4" />
                        {isEditing ? "Save" : "Edit"}
                      </Button>
                    )}

                    <Button
                      size="sm"
                      variant="secondary"
                      className={`gap-1 duration-200 transition-colors ease-linear  ${isEditing ? "bg-white" : " hover:bg-red-600 bg-red-400 text-white"}`}
                      onClick={
                        isEditing
                          ? handleCancel
                          : () => handleDeleteMessage(message._id)
                      }
                    >
                      {isEditing ? (
                        <>
                          <Undo className="h-4 w-4" />
                          Cancel
                        </>
                      ) : (
                        <>
                          <Trash2 className="h-4 w-4" />
                          Delete
                        </>
                      )}
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      onClick={handleMarkRead}
                      size="sm"
                      variant="outline"
                      className={`gap-1 duration-200 transition-colors ease-linear ${message.isRead && "cursor-not-allowed bg-slate-200"}`}
                      disabled={message.isRead === true}
                    >
                      <MailOpen className="h-4 w-4" />
                      {message.isRead ? "Marked as read" : "Mark as read"}
                    </Button>
                    <Button
                      size="sm"
                      variant="default"
                      className="gap-1 duration-200 transition-colors ease-linear bg-green-700 text-white hover:bg-green-900"
                      onClick={() => setDialogOpen(true)}
                    >
                      <Reply className="h-4 w-4" />
                      Reply
                    </Button>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/*  REPLY  DIALOG*/}
        <MessageReplyDialog
          isDialogOpen={isDialogOpen}
          message={message}
          setDialogOpen={setDialogOpen}
          handleReply={handleReply}
        />
      </>
    );
  }
);

export default MemberMessageCard;
