import type { MemberType } from "../enums/agent.enum";
import type { CollectionName } from "../enums/mesage.enum";
import type { CommonUsers, TotalCounter } from "./common";

export interface MessageInput {
  //sender
  senderId?: string;
  senderType?: MemberType;
  deletedBySender?: boolean;

  // receiver
  receiverId?: string;
  receiverType?: MemberType;
  deletedByReceiver?: boolean;

  // content
  isRead?: boolean;
  whenIsRead?: Date;
  content: string;
  subject: string;
  email: string;
  phone: string;
}

export interface Message {
  _id: string;
  senderId: string;
  senderType: MemberType;
  deletedBySender: boolean;
  senderCollectionName: CollectionName;
  senderData: CommonUsers;

  receiverId: string;
  receiverType: MemberType;
  deletedByReceiver: boolean;
  receiverCollectionName: CollectionName;
  receiverData: CommonUsers;

  isRead: boolean;
  whenIsRead: string | null;
  content: string;
  subject: string;
  email: string;
  phone: string;
}

export interface MemberMessages {
  messages: Message[];
  metaCounter: TotalCounter[];
}
