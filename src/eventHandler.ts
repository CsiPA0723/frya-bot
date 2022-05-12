import Collection from "@discordjs/collection";
import fs from "fs";
import { WebSocketEvent } from "types/guilded/common";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

class EventHandler {
  private _events: Collection<string, (...args: any[]) => Promise<void>> = new Collection();

  constructor() {
    const path = `${__dirname}/events/`;
    fs.readdir(path, { encoding: "utf-8" }, (err, files) => {
      if (err) throw err;
      const jsFiles = files.filter((f) => f.split(".").pop() === "js");
      jsFiles.forEach((f) => {
        const [name] = f.split(".");
        import(`${dirname(import.meta.url)}/events/${f}`)
          .then((v) => {
            console.log(`Loading: ${name}`);
            this._events.set(name, v.default);
          })
          .catch((err) => console.error(err));
      });
    });
  }

  public handle({ t: eventType, d: eventData }: WebSocketEvent) {
    if (!eventType || !eventData) return;
    if (this._events.has(eventType)) {
      const handler = this._events.get(eventType);
      if (handler) handler(eventData);
    }
  }
}

export default new EventHandler();
