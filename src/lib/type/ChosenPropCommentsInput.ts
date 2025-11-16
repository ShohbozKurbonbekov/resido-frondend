import type { CommentTargetType } from "../enums/comment.enum";
import type { CommonInput } from "./common";

export interface ChosenPropCommentsInput extends CommonInput {
  commentTarget: CommentTargetType;
}
