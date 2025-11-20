import type { CommentTargetType } from "../enums/comment.enum";
import type { CommonInput } from "./common";

export interface ChosenItemCommentsInput extends CommonInput {
  commentTarget: CommentTargetType;
}
