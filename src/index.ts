import WebSocket from "ws";
import axios from "axios";
import EventHandler from "./eventHandler.js";
import { WebSocketEvent } from "types/guilded/common";

axios.defaults.baseURL = "https://www.guilded.gg/api/v1";
axios.defaults.headers.common["Authorization"] = `Bearer ${process.env.TOKEN}`;
axios.defaults.headers.common["Accept"] = "application/json";

const socket = new WebSocket("wss://api.guilded.gg/v1/websocket", {
  headers: {
    Authorization: `Bearer ${process.env.TOKEN}`,
  },
});

socket.on("error", (err) => console.error(err));

socket.on("open", () => {
  console.log("Connected to Guilded!");
});

socket.on("message", async (data) => {
  console.log(JSON.parse(data.toString()));

  const event: WebSocketEvent = JSON.parse(data.toString());

  EventHandler.handle(event);
});
