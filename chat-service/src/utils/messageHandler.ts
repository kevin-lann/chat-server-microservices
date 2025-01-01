import { UserStatusStore } from "./userStatusStore";
import { rabbitMQService } from "../services/RabbitMQService";

const userStatusStore = UserStatusStore.getInstance()

export const handleMessageReceived = async (
  senderName: string,
  senderEmail: string,
  receiverId: string,
  messageContent: string
) => {
  if (!userStatusStore.isUserOnline(receiverId)) {
    await rabbitMQService.notifyReceiver(
      receiverId,
      messageContent,
      senderEmail,
      senderName
    )
  }
}