import { Card, CardContent } from "@/components/ui/card";
import type { SetStateType } from "@/lib/type/common";
import type { Message } from "@/lib/type/message";
import React, { useCallback } from "react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, MailOpen, Reply } from "lucide-react";
import { MemberType } from "@/lib/enums/agent.enum";
import { defaultUserAvatar, serverAPI } from "@/lib/config";
import {
  customLetterCustomise,
  dateConverter,
  getMilliSeconds,
} from "@/lib/utils";
import { sweetErrorHandling } from "@/lib/sweetAlerts";
import MemberService from "@/app/services/MemberService";
import { useGlobals } from "@/app/hooks/useGlobals";

interface MemberMessageCardType {
  message: Message;
  setMainPageLoading: SetStateType<boolean>;
  handleDeleteMessage: (id: string) => Promise<void>;
}
const MemberMessageCard: React.FC<MemberMessageCardType> = React.memo(
  ({ setMainPageLoading, message, handleDeleteMessage }) => {
    const { authmember } = useGlobals();
    const isSender = message.senderType === MemberType.USER;
    const counterpart =
      authmember?._id === message.senderId
        ? message.receiverData
        : message.senderData;
    const imgUrl = counterpart?.avatar
      ? `${serverAPI}/${counterpart?.avatar}`
      : defaultUserAvatar;

    const isEditable = useCallback(() => {
      return Date.now() - getMilliSeconds(message.createdAt) <= 1000 * 60 * 10;
    }, [message]);

    // --------------------------------------- HANDLERS -----------------------------
    const handleMarkRead = useCallback(async () => {
      try {
        console.log("working still");
        const member = new MemberService();
        await member.messageRead(message._id);
        setMainPageLoading((prev) => !prev);
      } catch (error) {
        console.log("Error in handleMarkRead: ", error);
        await sweetErrorHandling(error!);
      }
    }, [message, setMainPageLoading]);

    return (
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
              <div className="flex items-center gap-2">
                <h4 className="truncate text-sm lg:text-lg font-semibold text-foreground font-jostFont capitalize">
                  {counterpart?.name || "Unknown"}
                </h4>
                {!message.isRead && (
                  <Badge variant="secondary" className="h-5 px-2 text-size_10">
                    New
                  </Badge>
                )}
              </div>

              {message.isRead && message.whenIsRead ? (
                <span className="text-xs text-green-600">
                  Read at:{" "}
                  {dateConverter(message.whenIsRead, "D/MM/YYYY, HH:MM")}
                </span>
              ) : (
                <span className="text-xs text-destructive">
                  Sent at {dateConverter(message.createdAt, "D/MM/YYYY, HH:MM")}
                </span>
              )}
            </div>

            <div className="fle flex-col">
              <div className=" flex flex-row gap-x-2 items-center flex-wrap">
                <span className="text-sm font-jostFont capitalize text-gray-500">
                  Subject:
                </span>
                <p className="text-sm font-medium text-foreground font-jostFont ">
                  {customLetterCustomise(message.subject)}
                </p>
              </div>
              <div className="flex flex-row items-start flex-wrap gap-x-2 ">
                <span className="text-sm font-jostFont capitalize text-gray-500">
                  Content:
                </span>
                <p className="mt-1 text-sm text-muted-foreground font-jostFont rounded-xl bg-muted/40 p-3 flex-1">
                  {message.content}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-1 flex flex-wrap items-center gap-2">
              {isSender ? (
                <>
                  {isEditable() && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-1 duration-200 transition-colors ease-linear"
                    >
                      <Pencil className="h-4 w-4" />
                      Edit
                    </Button>
                  )}

                  <Button
                    size="sm"
                    variant="default"
                    className="gap-1 hover:bg-red-600 duration-200 transition-colors ease-linear bg-red-400"
                    onClick={() => handleDeleteMessage(message._id)}
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
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
    );
  }
);

export default MemberMessageCard;
