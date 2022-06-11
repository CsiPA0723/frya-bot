import { dateTimeString, mediaUriString } from "./common";

export type RespServerMember = {
  member: ServerMember;
};

export type ServerMember = {
  user: User;
  /** (must have unique items true) */
  roleIds: number[];
  nickname?: string;
  /** The ISO 8601 timestamp that the member was created at */
  joinedAt: dateTimeString;
};

export type User = {
  id: string;
  /** The type of user. If this property is absent, it can assumed to be of type `user` */
  type?: "bot" | "user";
  name: string;
  /** The avatar image associated with the user */
  avatar?: mediaUriString;
  /** The banner image associated with the user */
  banner?: mediaUriString;
  /** The ISO 8601 timestamp that the user was created at */
  createdAt: dateTimeString;
};
