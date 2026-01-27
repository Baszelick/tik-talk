import { Profile } from "libs/interfaces/src/lib/profile/profile.interface";


export interface Chat {
  id: number;
  userFirst: Profile;
  userSecond: Profile;
  messages: Messages[];
  companion?: Profile;
}

export interface Messages {
  id: number;
  userFromId: number;
  personalChatId: number;
  text: string;
  createdAt: string;
  isRead: boolean;
  updatedAt?: string;
  user?: Profile;
  isMine?: boolean;
}

export interface LastMessageRes {
  id: number;
  userFrom: Profile;
  message: string | null;
  createdAt: string;
  unRead: number | null;
}
