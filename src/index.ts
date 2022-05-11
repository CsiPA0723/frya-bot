import WebSocket from "ws";
import axios from "axios";

const socket = new WebSocket("wss://api.guilded.gg/v1/websocket", {
  headers: {
    Authorization: `Bearer ${process.env.TOKEN}`,
  },
});

socket.on("open", () => {
  console.log("connected to Guilded");
});

socket.on("message", async (data) => {
  console.log(data.toString());

  const { t: eventType, d: eventData } = JSON.parse(data.toString());

  if (eventType === "ChatMessageCreated" || eventType === "ChatMessageUpdated") {
    const {
      message: { id: messageId, content, channelId },
    } = eventData;

    if (content === "ping") {
      try {
        const resp = await axios.post(
          `https://www.guilded.gg/api/v1/channels/${channelId}/messages`,
          {
            content: "Pong",
          },
          {
            headers: {
              Authorization: `Bearer ${process.env.TOKEN}`,
              Accept: "application/json",
              "Content-type": "application/json",
            },
          }
        );
        console.log(resp);
      } catch (error) {
        console.error(error);
      }
    }
  }
});
