import Collection from "@discordjs/collection";
import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";
import Command from "@components/Command";
import { ChatMessage } from "types/guilded/ChatMessage";

const __dirname = dirname(fileURLToPath(import.meta.url));

class CommandHandler {
  private _commands: Collection<string, Command> = new Collection();

  constructor() {
    const path = `${__dirname}/commands/`;
    fs.readdir(path, { encoding: "utf-8" }, (err, files) => {
      if (err) throw err;
      const jsFiles = files.filter((f) => f.split(".").pop() === "js");
      jsFiles.forEach((f) => {
        const [name] = f.split(".");
        import(`${dirname(import.meta.url)}/commands/${f}`)
          .then((v) => {
            this._commands.set(name.toLowerCase(), v.default);
            console.log(`Loaded: ${name}`);
          })
          .catch((err) => console.error(err));
      });
    });
  }

  public get(message: ChatMessage): { command: Command | undefined; args: string[] } {
    const { commandName, args } = this.makeArgs(message, ">");
    console.log(commandName, args);
    const command =
      this._commands.get(commandName) || this._commands.find((c) => c.aliases && c.aliases.includes(commandName));
    return { command, args };
  }

  private makeArgs(message: ChatMessage, prefix: string): { commandName: string; args: string[] } {
    if (!message.content) throw new Error("Message.content is missing!");
    const [commandName, ...args] = message.content.trim().slice(prefix.length).split(/\s+/g);
    return { commandName: commandName.toLowerCase(), args: args };
  }
}

export default new CommandHandler();
