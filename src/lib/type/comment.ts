import type { SortOrder } from "../enums/blog.enum";
import type { CommentStatus, CommentTargetType } from "../enums/comment.enum";
import type { CommonInput, TotalCounter } from "./common";

export interface ReceiverDataType {
  targetName: string;
  targetImage: undefined | string;
}
export interface AuthorDataType {
  _id: string;
  memberName: string;
  memberPhone: string;
  occupation: string;
  avatar: string;
  memberEmail: string;
}
export interface Comment {
  _id: string;
  targetType: CommentTargetType;
  targetId: string;
  content: string;
  receiverData: ReceiverDataType;
  authorData?: AuthorDataType;
  userId: string;
  rating: number;
  status: CommentStatus;
  createdAt: string;
  updatedAt: string;
}

export interface Comments {
  comments: Comment[];
  metaCounter: TotalCounter[];
}

export interface ChosenItemCommentsInput extends CommonInput {
  commentTarget: CommentTargetType;
}

export interface CommentInput {
  targetType: CommentTargetType;
  targetId: string;
  content: string;
  userId?: string;
  rating?: number;
  status?: CommentStatus;
}

export interface CommentUpdate {
  content: string;
  rating: number;
}

export interface CommentsSearchInput extends CommonInput {
  // limit, page
  sort: SortOrder;
  category?: CommentTargetType;
}
