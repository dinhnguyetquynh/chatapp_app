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
  senderId: {
    _id: string;
    phoneNumber: string;
    avatar: string;
    displayName: string;
  };
  revoked: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface MessageRes {
  messages: Message[];
}
