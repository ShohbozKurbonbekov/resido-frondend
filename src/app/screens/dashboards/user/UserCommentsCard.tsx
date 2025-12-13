import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { Comment, CommentUpdate } from "@/lib/type/comment";
import type { SetStateType } from "@/lib/type/common";
import React, { useCallback, useMemo, useState } from "react";
import { CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { dateConverter, handleRating } from "@/lib/utils";
import { Link } from "react-router-dom";
import { CommentTargetType } from "@/lib/enums/comment.enum";
import Rating from "@mui/material/Rating";
import { Textarea } from "@/components/ui/textarea";
import { sweetErrorHandling } from "@/lib/sweetAlerts";
import CommentService from "@/app/services/CommentService";

// --------------------------------------------------- COMPONENT -------------------------------------
interface UserCommentsCardType {
  comment: Comment;
  setMainPageLoading: SetStateType<boolean>;
}

const UserCommentsCard: React.FC<UserCommentsCardType> = React.memo(
  ({ comment, setMainPageLoading }) => {
    const [updatedInput, setUpdatedInput] = useState<CommentUpdate>({
      content: comment.content,
      rating: comment.rating,
    });
    const [isediting, setisEditing] = useState<boolean>(false);

    const showRating = isediting ? (
      <Rating
        name="rating"
        value={handleRating(updatedInput.rating)}
        precision={0.1}
        className="yellow-500"
        size={"medium"}
        onChange={(_, newRating) => handleRate(newRating ?? 0)}
      />
    ) : (
      <Rating
        value={handleRating(updatedInput.rating)}
        name="rating"
        precision={0.1}
        className="yellow-500"
        size="small"
        readOnly
      />
    );
    const edited =
      comment?.updatedAt && comment.updatedAt !== comment.createdAt;

    const commentedItemLink = useMemo(() => {
      let itemLink;
      if (comment.targetType === CommentTargetType.AGENT) {
        itemLink = `/agents/${comment.targetId}`;
      }
      if (comment.targetType === CommentTargetType.BLOG) {
        itemLink = `/blogs/${comment.targetId}`;
      }
      if (comment.targetType === CommentTargetType.PROPERTY) {
        itemLink = `/property/${comment.targetId}`;
      }
      return itemLink;
    }, [comment]);

    // --------------------------------- HANDLERS -----------------------
    const handleEditBtn = useCallback(() => {
      setisEditing(true);
    }, []);

    const handleContent = useCallback(
      (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const input = e.target.value;
        setUpdatedInput((prev) => {
          return { ...prev, content: input };
        });
      },
      []
    );

    const handleRate = useCallback((rating: number) => {
      setUpdatedInput((prev) => {
        return {
          ...prev,
          rating: rating,
        };
      });
    }, []);

    const handleUpdateComment = useCallback(async () => {
      try {
        const target = new CommentService();

        await target.updateUserComment(comment._id, updatedInput);
        setMainPageLoading((prev) => !prev);
        setisEditing(false);
      } catch (error) {
        console.log("Error in  handleUpdateComment: ", error);
        await sweetErrorHandling(error!);
      }
    }, [comment, updatedInput, setMainPageLoading]);

    const handleCancel = useCallback(() => {
      setisEditing(false);
    }, []);

    const handleDelete = useCallback(async () => {
      try {
        const target = new CommentService();
        await target.deleteUserComment(comment._id);
        setMainPageLoading((prev) => !prev);
      } catch (error) {
        console.log("Error in handleDelete: ", error);
        await sweetErrorHandling(error!);
      }
    }, [comment, setMainPageLoading]);

    // ---------------------------------------- RENDER -------------------------------
    return (
      <Card className="w-full bg-white rounded-2xl shadow-md">
        <CardHeader className="flex md:flex-row items-start justify-between pb-2 flex-col ">
          <div>
            <Link
              to={commentedItemLink ?? "/"}
              className="text-xs  md:text-sm  font-semibold text-darkBlue font-jostFont capitalize hover:text-blue-700 rounded-md underline"
            >
              Commented: {comment.targetType}
            </Link>
          </div>

          <div className="md:text-right">
            <p className="text-xs text-muted-foreground font-jostFont py-1 px-3 rounded-sm bg-slate-200">
              {dateConverter(comment.createdAt, "Do MMMM YYYY, HH:MM")}
            </p>
            {edited && (
              <p className="text-sm text-gray-400 italic mt-0.5 font-jostFont">
                Edited
              </p>
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-3">
          {showRating}

          {isediting ? (
            <Textarea
              onChange={handleContent}
              value={updatedInput.content}
              className="text-sm md:text-lg  font-jostFont text-darkBlue focus-visible:ring-gray-400"
            ></Textarea>
          ) : (
            <p className="text-sm md:text-lg text-gray-700 leading-relaxed break-words font-jostFont">
              {updatedInput.content || ""}
            </p>
          )}
        </CardContent>

        <CardFooter className="flex justify-end gap-3">
          <Button
            onClick={isediting ? handleUpdateComment : handleEditBtn}
            variant="outline"
            size="sm"
            className="rounded-xl flex items-center gap-2 active:scale-95 duration-200 ease-linear transition-all"
          >
            <Pencil size={16} /> {isediting ? "Save" : "Edit"}
          </Button>

          <Button
            variant="default"
            size="sm"
            onClick={isediting ? handleCancel : handleDelete}
            className="rounded-xl flex items-center gap-2  bg-red-500 hover:bg-red-700 duration-200 transition-all ease-linear active:scale-95"
          >
            {isediting ? (
              "Cancel"
            ) : (
              <>
                <Trash2 size={16} />
                Delete
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    );
  }
);

export default UserCommentsCard;
