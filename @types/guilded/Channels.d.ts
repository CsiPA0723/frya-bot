import { dateTimeString, uuidString } from "./common";
import { User } from "./Members";

export type ServerChannel = {
  /** The ID of the channel */
  id: uuidString;
  /** he type of channel. This will determine what routes to use for creating content in a channel. For example, if this "chat", then one must use the routes for creating channel messages */
  type:
    | "announcements"
    | "chat"
    | "calendar"
    | "forums"
    | "media"
    | "docs"
    | "voice"
    | "list"
    | "scheduling"
    | "stream";
  /** The name of the channel (min length 1; max length 100) */
  name: string;
  /** The topic of the channel (min length 1; max length 512) */
  topic?: string;
  /** The ISO 8601 timestamp that the channel was created at */
  createdAt: dateTimeString;
  /** The ID of the user who created this channel */
  createdBy: string;
  /** The ISO 8601 timestamp that the channel was updated at, if relevant */
  updatedAt?: dateTimeString;
  /** The ID of the server */
  serverId: string;
  /** ID of the parent channel or parent thread, if present. Only relevant for server channels */
  parentId?: uuidString;
  /** Only relevant for server channels */
  categoryId?: number;
  /** The ID of the group */
  groupId: string;
  /** Whether the channel can be accessed from users who are not member of the server (default false) */
  isPublic?: boolean;
  /** The ID of the user who archived this channel */
  archivedBy?: string;
  /** The ISO 8601 timestamp that the channel was archived at, if relevant */
  archivedAt?: dateTimeString;
};

export type RespServerChannel = {
  channel: ServerChannel;
};

export type Mentions = {
  /** Info on mentioned users (min items 1) */
  users?: { id: User["id"] }[];
  /** Info on mentioned channels (min items 1) */
  channels?: { id: ServerChannel["id"] }[];
  /** Info on mentioned roles (min items 1) */
  roles?: { id: number }[];
  /** If @everyone was mentioned */
  everyone?: boolean;
  /** If @here was mentioned */
  here?: boolean;
};
