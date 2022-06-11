import { ChatMessage } from "types/guilded/ChatMessage";

interface Command {
  name: string;
  aliases: string[];
  desc: string;
  usage: string;

  execute(message: ChatMessage, args?: string[]): Promise<unknown>;
}

export default Command;
