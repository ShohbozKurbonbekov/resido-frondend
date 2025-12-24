import React, { useCallback, useMemo, useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2 } from "lucide-react";
import Rating from "@mui/material/Rating";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";
import type { Comment, CommentUpdate } from "@/lib/type/comment";
import type { SetStateType } from "@/lib/type/common";
import { CommentTargetType } from "@/lib/enums/comment.enum";
import { dateConverter, handleRating } from "@/lib/utils";
import CommentService from "@/app/services/CommentService";
import { sweetErrorHandling } from "@/lib/sweetAlerts";
import {
  defaultBlogImage,
  defaultPropertyAvatar,
  defaultUserAvatar,
  serverAPI,
} from "@/lib/config";
import { useGlobals } from "@/app/hooks/useGlobals";
import type { User } from "@/lib/type/dashboard/user";

// ------------------------------ COMPONENT ---------------------------------
interface UserCommentsCardType {
  comment: Comment;
  setMainPageLoading: SetStateType<boolean>;
}

const UserCommentsCard: React.FC<UserCommentsCardType> = React.memo(
  ({ comment, setMainPageLoading }) => {
    const { authmember } = useGlobals();
    const user = authmember as User;
    const [updatedInput, setUpdatedInput] = useState<CommentUpdate>({
      content: comment.content,
      rating: comment.rating,
    });
    const [isEditing, setIsEditing] = useState(false);

    const edited = comment.updatedAt !== comment.createdAt;

    const receiverMeta = useMemo(() => {
      let itemLink = "/";
      let fallback = defaultPropertyAvatar;

      if (comment.targetType === CommentTargetType.BLOG) {
        itemLink = `/blogs/${comment.targetId}`;
        fallback = defaultBlogImage;
      }
      if (comment.targetType === CommentTargetType.AGENT) {
        itemLink = `/agents/${comment.targetId}`;
        fallback = defaultUserAvatar;
      }
      if (comment.targetType === CommentTargetType.PROPERTY) {
        itemLink = `/property/${comment.targetId}`;
        fallback = defaultPropertyAvatar;
      }

      return { itemLink, fallback };
    }, [comment]);

    // ---------------------------- HANDLERS ----------------------------
    const handleUpdate = useCallback(async () => {
      try {
        const service = new CommentService();
        await service.updateUserComment(comment._id, updatedInput);
        setMainPageLoading((p) => !p);
        setIsEditing(false);
      } catch (e) {
        await sweetErrorHandling(e!);
      }
    }, [comment, updatedInput, setMainPageLoading]);

    const handleDelete = useCallback(async () => {
      try {
        const service = new CommentService();
        await service.deleteUserComment(comment._id);
        setMainPageLoading((p) => !p);
      } catch (e) {
        await sweetErrorHandling(e!);
      }
    }, [comment, setMainPageLoading]);

    // ------------------------------ RENDER ------------------------------
    return (
      <Card className="group rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 hover:shadow-lg transition-all">
        <CardContent className="p-5 space-y-4">
          {/* Top row */}
          <div className="flex flex-col sm:flex-row sm:items-stretch gap-4">
            {/* User */}
            <div className="flex items-center gap-3">
              <Avatar className="h-14 w-14 ring-2 ring-emerald-500/20">
                <AvatarImage
                  src={
                    user.avatar
                      ? `${serverAPI}/${user.avatar}`
                      : defaultUserAvatar
                  }
                />
                <AvatarFallback>ME</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-semibold text-slate-800">You</p>
                <p className="text-xs text-slate-400">left a review</p>
              </div>
            </div>

            {/* Receiver card */}
            <Link
              to={receiverMeta.itemLink}
              className="flex items-center gap-4 p-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition"
            >
              <img
                src={
                  comment.receiverData?.targetImage
                    ? `${serverAPI}/${comment.receiverData.targetImage}`
                    : receiverMeta.fallback
                }
                alt="receiver"
                className="h-20 w-24 rounded-lg object-cover"
              />
              <div className="flex-1">
                <p className="text-sm font-semibold text-slate-800 line-clamp-2 capitalize">
                  {comment.receiverData?.targetName}
                </p>
                <div className="flex items-center gap-2 text-xs text-slate-400 mt-1 capitalize">
                  <Badge variant="secondary">{comment.targetType}</Badge>
                  <span>•</span>
                  <span>{dateConverter(comment.createdAt, "Do MMM YYYY")}</span>
                  {edited && <span className="italic">edited</span>}
                </div>
              </div>
            </Link>

            {/* Rating */}
            <div className="flex-1  flex justify-end">
              <Rating
                value={handleRating(updatedInput.rating)}
                precision={0.1}
                size="small"
                readOnly={!isEditing}
                onChange={(_, v) =>
                  setUpdatedInput((p) => ({ ...p, rating: v ?? 0 }))
                }
              />
            </div>
          </div>

          {/* Content */}
          <div className="relative">
            <span className="absolute -left-2 top-0 h-full w-1 bg-emerald-500/40 rounded-full" />
            {isEditing ? (
              <Textarea
                value={updatedInput.content}
                onChange={(e) =>
                  setUpdatedInput((p) => ({ ...p, content: e.target.value }))
                }
                className={
                  "border-slate-300 bg-slate-50 text-slate-800 placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-emerald-600/30 focus-visible:border-emerald-600"
                }
              />
            ) : (
              <p className="text-slate-700 pl-4 leading-relaxed break-words font-jostFont text-base">
                {updatedInput.content}
              </p>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex justify-end gap-3 px-5 pb-4">
          <Button
            size="sm"
            variant="outline"
            onClick={isEditing ? handleUpdate : () => setIsEditing(true)}
            className="flex items-center gap-2"
          >
            <Pencil size={14} /> {isEditing ? "Save" : "Edit"}
          </Button>

          <Button
            size="sm"
            className="bg-red-500 hover:bg-red-600"
            onClick={isEditing ? () => setIsEditing(false) : handleDelete}
          >
            <Trash2 size={14} /> {isEditing ? "Cancel" : "Delete"}
          </Button>
        </CardFooter>
      </Card>
    );
  }
);

export default UserCommentsCard;
