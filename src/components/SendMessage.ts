import { uuidString } from "types/guilded/common";
import { ChatMessage, PostChatMessage } from "types/guilded/ChatMessage";
import axios, { AxiosResponse } from "axios";
import API_Paths from "./API_Paths.js";

export default async function SendMessage(
  channelId: uuidString,
  message: PostChatMessage
): Promise<AxiosResponse<ChatMessage, PostChatMessage>> {
  try {
    const resp = await axios.post<ChatMessage, AxiosResponse<ChatMessage, PostChatMessage>, PostChatMessage>(
      API_Paths.POST.message(channelId),
      message
    );
    return Promise.resolve(resp);
  } catch (error) {
    return Promise.reject(error);
  }
}
