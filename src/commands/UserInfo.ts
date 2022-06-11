import Command from "@components/Command";
import { ChatMessage } from "types/guilded/ChatMessage";
import CacheSys from "../CacheSys.js";
import { prefix } from "../settings.js";

class UserInfo implements Command {
  name = "userinfo";
  aliases = ["user"];
  desc = "Információk a te profilodról vagy máséról.";
  usage = `${prefix}userinfo <felhasználó>`;
  async execute(message: ChatMessage): Promise<void> {
    try {
      if (!message.serverId) throw new Error("Message were not sent from a server");
      const mentions = message.mentions;
      const targetId = mentions && mentions.users && mentions.users[0] ? mentions.users[0].id : message.createdBy;
      const target =
        (await CacheSys.tryGetUser(targetId)) || (await CacheSys.fetchServerMember(message.serverId, targetId))?.user;
      if (!target) throw new Error("Member could not be found");
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default new UserInfo();
