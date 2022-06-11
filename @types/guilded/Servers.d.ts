import { dateTimeString, mediaUriString, uuidString } from "./common";

export type Server = {
  /** The ID of the server */
  id: string;
  /** The ID of the user who created this server */
  ownerId: string;
  /** The type of server designated from the server's settings page */
  type?: "team" | "organization" | "community" | "clan" | "guild" | "friends" | "streaming" | "other";
  /** The name given to the server */
  name: string;
  /** The URL that the server can be accessible from. For example, a value of "Guilded-Official" means the server can be accessible from https://www.guilded.gg/Guilded-Official */
  url?: string;
  /** The description associated with the server */
  about?: string;
  /** The avatar image associated with the server */
  avatar?: mediaUriString;
  /** The banner image associated with the server */
  banner?: mediaUriString;
  /** The timezone associated with the server */
  timezone?: string;
  /** The verified status of the server */
  isVerified?: boolean;
  /** The channel ID of the default channel of the server. Useful for welcome messages */
  defaultChannelId?: uuidString;
  /** The ISO 8601 timestamp that the server was created at */
  createdAt: dateTimeString;
};

export type RespServer = {
  server: Server;
};
