import type { CommentStatus, CommentTargetType } from "../enums/comment.enum";
import type { TotalCounter } from "./common";

interface UserInfoType {
  avatar: string;
  name: string;
  occupation: string;
  phone?: string;
  email?: string;
  userAddress?: string;
  userDescription?: string;
}
export interface Comment {
  targetType: CommentTargetType;
  targetId: string;
  content: string;
  userInfo: UserInfoType;
  userId: string;
  rating: number;
  status: CommentStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface Comments {
  comments: Comment[];
  metaCounter: TotalCounter[];
}
