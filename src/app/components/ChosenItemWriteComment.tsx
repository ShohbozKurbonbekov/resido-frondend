import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMemo, useState } from "react";
import type { CommentInput } from "@/lib/type/comment";
import { CommentTargetType } from "@/lib/enums/comment.enum";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "@/lib/sweetAlerts";
import { ErrorMessages } from "@/lib/config";
import CommentService from "@/app/services/CommentService";
import type { SetStateType } from "@/lib/type/common";

interface ChosenItemWriteCommentType {
  id: string;
  targetType: CommentTargetType;
  setReloadMainPage: SetStateType<boolean>;
}
const ChosenItemWriteComment: React.FC<ChosenItemWriteCommentType> = ({
  id,
  targetType,
  setReloadMainPage,
}) => {
  const [commentInput, setCommentInput] = useState<CommentInput>({
    content: "",
    targetId: id,
    targetType,
    rating: 0,
  });

  // ------------------------------------------- HANDLERS ---------------
  const commentTotalRatings = useMemo(() => {
    return Array.from({ length: 5 }, (_, i) => i + 1);
  }, []);

  const commentRatingHandler = (rating: string) => {
    const normalizedRating = parseInt(rating);
    setCommentInput((prev) => ({ ...prev, rating: normalizedRating }));
  };
  const commentContentHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentInput((prev) => ({ ...prev, content: e.target.value }));
  };

  const handleCommentSubmit = async () => {
    try {
      if (!commentInput.content) {
        throw new Error(ErrorMessages.error3);
      }

      const comment = new CommentService();
      console.log(commentInput);
      await comment.createComment(commentInput);
      sweetTopSmallSuccessAlert("you successfully commented for this property");
      setCommentInput((prev) => ({ ...prev, content: "", rating: 0 }));
      setReloadMainPage((prev) => !prev);
    } catch (error) {
      console.log("Error in comment in property: ", error);
      sweetErrorHandling(error!).then();
    }
  };
  return (
    <form className="grid grid-cols-1 justify-items-start gap-y-3 box-border pb-3 mt-3">
      <Textarea
        placeholder="Messages..."
        value={commentInput.content}
        rows={5}
        className="focus-visible:ring-0 placeholder:font-jostFont placeholder:text-lg bg-sky-50 text-slate-700 tracking-wider p-3"
        onChange={(e) => commentContentHandler(e)}
      />
      <Select
        name="propertyRating"
        onValueChange={(rating) => {
          commentRatingHandler(rating);
        }}
      >
        <SelectTrigger className="py-6 bg-sky-50 text-base font-jostFont box-border text-slate-700 border-slate-300 focus:outline-none focus:ring-0 focus:ring-offset-0">
          <SelectValue placeholder="Choose rating from 1 to 5" />
        </SelectTrigger>
        <SelectContent side="bottom">
          <SelectGroup>
            {commentTotalRatings.map((el: number) => (
              <SelectItem
                key={el}
                value={String(el)}
                className="box-border text-slate-700 font-jostFont text-base font-normal leading-[1.5] hover:px-5 transition-all duration-200 ease-linear"
              >
                {el} Star{el > 1 ? "s" : ""}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <button
        className="px-5 py-4 bg-blue-800 text-white capitalize font-jostFont font-bold rounded-md hover:bg-blue-500 transition-all duration-300 ease-linear"
        type="button"
        onClick={handleCommentSubmit}
      >
        Submit Review
      </button>
    </form>
  );
};

export default ChosenItemWriteComment;
