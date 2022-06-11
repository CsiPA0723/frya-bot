import Collection from "@discordjs/collection";
import axios from "axios";
import { uuidString } from "types/guilded/common";
import { RespServerChannel, ServerChannel } from "types/guilded/Channels";
import { RespServerMember, ServerMember, User } from "types/guilded/Members";
import { RespServer, Server } from "types/guilded/Servers";
import { ChatMessage, RespChatMessage } from "types/guilded/ChatMessage";
import API_Paths from "./components/API_Paths.js";

class CacheSys {
  private _channels = new Collection<uuidString, ServerChannel>();
  private _users = new Collection<string, User>();
  private _servers = new Collection<string, Server>();
  private _messages = new Collection<uuidString, ChatMessage>();

  public async getBotSelfUser() {
    try {
      const bot = await this.fetchServerMember(process.env.MAIN_GUILD_ID, process.env.BOT_USER_ID);
      if (!bot) throw new Error("Bot user could not be found");
      return Promise.resolve(bot.user);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public cacheMessage(msg: ChatMessage): void {
    if (!msg) throw new Error("The message object was empty");
    this._messages.set(msg.id, msg);
  }

  public cacheChannel(channel: ServerChannel): void {
    if (!channel) throw new Error("The channel object was empty");
    this._channels.set(channel.id, channel);
  }

  public cacheUser(user: User): void {
    if (!user) throw new Error("The user object was empty");
    this._users.set(user.id, user);
  }

  public cacheServer(server: Server): void {
    if (!server) throw new Error("The server object was empty");
    this._servers.set(server.id, server);
  }

  public async tryGetMessage(channelId: uuidString, messageId: uuidString): Promise<ChatMessage | undefined> {
    try {
      if (this._messages.has(messageId)) return Promise.resolve(this._messages.get(messageId));
      const { data } = await axios.get<RespChatMessage>(API_Paths.GET.message(channelId, messageId));
      if (!data || !data.message) return Promise.resolve(undefined);
      this.cacheMessage(data.message);
      return Promise.resolve(data.message);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async tryGetChannel(channelId: uuidString): Promise<ServerChannel | undefined> {
    try {
      if (this._channels.has(channelId)) return Promise.resolve(this._channels.get(channelId));
      const { data } = await axios.get<RespServerChannel>(API_Paths.GET.channel(channelId));
      if (!data || !data.channel) return Promise.resolve(undefined);
      this.cacheChannel(data.channel);
      return Promise.resolve(data.channel);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async tryGetUser(userId: string): Promise<User | undefined> {
    try {
      return Promise.resolve(this._users.get(userId));
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async tryGetServer(serverId: string): Promise<Server | undefined> {
    try {
      if (this._servers.has(serverId)) return Promise.resolve(this._servers.get(serverId));
      const { data } = await axios.get<RespServer>(API_Paths.GET.server(serverId));
      if (!data || !data.server) return Promise.resolve(undefined);
      this.cacheServer(data.server);
      return Promise.resolve(data.server);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async fetchServerMember(serverId: string, userId: string): Promise<ServerMember | undefined> {
    try {
      const { data } = await axios.get<RespServerMember>(API_Paths.GET.member(serverId, userId));
      if (!data || !data.member) return Promise.resolve(undefined);
      this.cacheUser(data.member.user);
      return Promise.resolve(data.member);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default new CacheSys();
