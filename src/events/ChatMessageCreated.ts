import { ChatMessageCreated } from "types/guilded/ChatMessage";
import CacheSys from "../CacheSys.js";
import CommandHandler from "../CommandHandler.js";
import SendMessage from "../components/SendMessage.js";
import { prefix } from "../settings.js";

export default async function ChatMessageCreated(data: ChatMessageCreated): Promise<void> {
  try {
    const { message } = data;
    CacheSys.cacheMessage(message);
    if (!message.content?.startsWith(prefix)) return Promise.resolve();

    const { command, args } = CommandHandler.get(message);

    command?.execute(message, args);
    return Promise.resolve();
  } catch (error) {
    SendMessage(data.message.channelId, { content: `${error}` }).catch((err) => console.error(err));
    return Promise.reject(error);
  }
}
