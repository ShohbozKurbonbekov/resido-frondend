import type { MemberType } from "../enums/agent.enum";
import type {} from "../enums/mesage.enum";

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

  // receiver
  receiverId: string;
  receiverType: MemberType;
  deletedByReceiver: boolean;

  // content
  isRead: boolean;
  whenIsRead: Date;
  content: string;
  subject: string;
  email: string;
  phone: string;
}
