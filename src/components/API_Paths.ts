import { uuidString } from "types/guilded/common";

const GET = {
  channel: (channelId: uuidString) => `/channels/${channelId}`,
  server: (serverId: string) => `/servers/${serverId}`,
  message: (channelId: uuidString, messageId: uuidString) => `/channels/${channelId}/messages/${messageId}`,
  allMessages: (channelId: uuidString) => `/channels/${channelId}/messages`,
  member: (serverId: string, userId: string) => `/servers/${serverId}/members/${userId}`,
  allMembers: (serverId: string) => `/servers/${serverId}/members`,
};

const POST = {
  message: (channelId: uuidString) => `/channels/${channelId}/messages`,
};

export default {
  GET,
  POST,
};
