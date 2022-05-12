import axios, { AxiosResponse } from "axios";
import { ChatMessageCreated, Message, Post } from "types/guilded/ChatMessage";

export default async function ChatMessageCreated(data: ChatMessageCreated) {
  try {
    const { message } = data;
    if (message.content?.includes("ping")) {
      const resp = await axios.post<Message, AxiosResponse<Message, Post>, Post>(
        `/channels/${message.channelId}/messages`,
        {
          content: "Pong!",
        }
      );
      console.log(resp.statusText);
    }
    return Promise.resolve();
  } catch (error) {
    return Promise.reject(error);
  }
}
