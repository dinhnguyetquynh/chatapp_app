export interface Member {
  friendRequests: any[];
  _id: string;
  friends: string[];
  phoneNumber: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  avatar: string;
  displayName: string;
}

export interface Message {
  _id: string;
  conversationId: string;
  text: string;
  files: string[];
  senderId: string;
  revoked: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Conversation {
  _id: string;
  name: string;
  message: Message;
  avatar: string;
  members: Member[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export type ConversationRes = Conversation[];
