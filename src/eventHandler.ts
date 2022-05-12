import Collection from "@discordjs/collection";
import fs from "fs";
import { WebSocketEvent } from "types/guilded/common";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

class EventHandler {
  private _events: Collection<string, (data: object, ...args: unknown[]) => Promise<void>> = new Collection();

  constructor() {
    const path = `${__dirname}/events/`;
    fs.readdir(path, { encoding: "utf-8" }, (err, files) => {
      if (err) throw err;
      const jsFiles = files.filter((f) => f.split(".").pop() === "js");
      jsFiles.forEach((f) => {
        const [name] = f.split(".");
        import(`${dirname(import.meta.url)}/events/${f}`)
          .then((v) => {
            this._events.set(name, v.default);
            console.log(`Loaded: ${name}`);
          })
          .catch((err) => console.error(err));
      });
    });
  }

  public handle({ t: eventType, d: eventData }: WebSocketEvent) {
    if (!eventType || !eventData) return;
    this._events.get(eventType)?.(eventData);
  }
}

export default new EventHandler();
