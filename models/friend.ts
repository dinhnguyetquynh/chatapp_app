export interface Friend {
  _id: string;
  phoneNumber: string;
  avatar: string;
  displayName: string;
}
export type FriendListRes = Friend[];

export interface FriendReq {
  senderId: string;
  receiverId: string;
}
