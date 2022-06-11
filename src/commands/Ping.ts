import Command from "@components/Command";
import { ChatMessage } from "types/guilded/ChatMessage";
import SendMessage from "../components/SendMessage.js";

class Ping implements Command {
  public readonly name = "Ping";
  public readonly aliases: string[] = [];
  public readonly desc = "Pong!";
  public readonly usage = "%prefix%ping";
  public async execute(message: ChatMessage): Promise<void> {
    const resp = await SendMessage(message.channelId, { content: "Pong!" });
    console.log(resp.statusText);
  }
}

export default new Ping();
