import { Request, Response } from "express";
import { AuthRequest } from "../middleware";
import { Message } from "../database";
import { ApiError, handleMessageReceived } from "../utils";
import asyncHandler from "../middleware/asyncHandler";

const send = asyncHandler(async (req: AuthRequest, res: Response) => {
  try {
    const {receiverId, message} = req.body
    const {_id, email, name} = req.user

    validateReciever(_id, receiverId)

    const newMessage = await Message.create({
      senderId: _id,
      receiverId,
      message,
    })

    await handleMessageReceived(name, email, receiverId, message)

    return res.json({
      status: 200,
      message: "Message sent!",
      data: newMessage,
    })

  } catch (err: any) {
    return res.json({
      status: 500,
      message: err.message,
    })
  }
})

const validateReciever = async (senderId: string, receiverId: string) => {
  if (!receiverId) {
    throw new ApiError(404, "Receiver ID is required.");
  }

  if (senderId == receiverId) {
    throw new ApiError(400, "Sender and receiver cannot be the same.");
  }
}

const getConversation = asyncHandler(async (req: AuthRequest, res: Response) => {
  try {
    const {receiverId} = req.params
    const senderId = req.user._id

    const messages = await Message.find({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId }
      ]
    })

    return res.json({
      status: 200,
      message: "Messages Retrieved",
      data: messages,
    })

  } catch (err: any) {
    return res.json({
      status: 500,
      message: err.message,
    })
  }
})

export default {
  send,
  getConversation,
}