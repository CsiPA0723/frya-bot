import Command from "@components/Command";
import { ChatMessage } from "types/guilded/ChatMessage";
import CacheSys from "../CacheSys.js";
import SendMessage from "../components/SendMessage.js";
import { prefix } from "../settings.js";

class Avatar implements Command {
  public readonly name = "Avatar";
  public readonly aliases: string[] = ["Profile"];
  public readonly desc = "Avatar!";
  public readonly usage = `${prefix}avatar <felhasználó>`;
  public async execute(message: ChatMessage): Promise<void> {
    try {
      if (!message.serverId) throw new Error("Message were not sent from a server");
      const mentions = message.mentions;
      const targetId = mentions && mentions.users && mentions.users[0] ? mentions.users[0].id : message.createdBy;
      const target =
        (await CacheSys.tryGetUser(targetId)) || (await CacheSys.fetchServerMember(message.serverId, targetId))?.user;
      if (!target) throw new Error("Member could not be found");
      const bot = await CacheSys.getBotSelfUser();

      const resp = await SendMessage(message.channelId, {
        embeds: [
          {
            image: { url: target.avatar },
            author: {
              name: bot.name,
              icon_url: bot.avatar,
            },
            description: `<@${target.id}>'s Avatar`,
            timestamp: new Date().toISOString(),
            footer: {
              text: "Made By CsiPA",
              icon_url: "https://img.guildedcdn.com/WebhookPrimaryMedia/f11dcb4ba8449917f00c148363b4e1ba-Full.webp",
            },
          },
        ],
      });
      console.log(resp.statusText);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default new Avatar();
