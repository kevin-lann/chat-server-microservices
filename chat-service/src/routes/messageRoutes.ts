import { Router } from "express";
import MessageController from "../controllers/MessageController";
import { authMiddleware } from "../middleware";

const messageRoutes = Router();

/**
 * @swagger
 * tags:
 *   name: Chat
 *   description: The chat api
 * components:
 *   schemas:
 *     Message:
 *       type: object
 *       required:
 *         - senderId
 *         - receiverId
 *         - essage
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the message
 *         senderId:
 *           type: string
 *           description: The id of the user sending the message
 *         receiverId:
 *           type: string
 *           description: The id of the user receiving the message. Must not be same as senderId
 *         message:
 *           type: string
 *           description: The message contents
 *         status:
 *           type: string
 *           description: One of "NotDelivered", "Delivered", "Seen"
 *         updatedAt:
 *           type: string
 *           format: date
 *           description: The date the user was modified
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the user was added
 *       example:
 *         id: 67717989338l4bdef7e49999
 *         senderId: 67717989338l4bdef7e49999
 *         receiverId: 147719893384bdef7e491212 
 *         message: Hello! How are you 
 *         tatus: NotDelivered
 *         updatedAt: 2024-12-29T16:32:09.865+00:00
 *         createdAt: 2024-12-29T16:32:09.865+00:00
 */

/**
 * @swagger
 * /chat/send:
 *   post:
 *     summary: Send message.
 *     tags: [Chat]
 *     description: Sends a message from provided user to a provided receiver.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               receiverId: 
 *                 type: string
 *               message:
 *                 type: string
 *             required: ['receiverId']
 *     responses:
 *       '200':
 *         description: A successful response
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Message"
 *       '500':
 *         description: Internal server error
 */
// @ts-ignore
messageRoutes.post("/send", authMiddleware, MessageController.send);

/**
 * @swagger
 * /chat/get/{receiverId}:
 *   get:
 *     summary: Get conversation history.
 *     tags: [Chat]
 *     description: Get conversation messages between provided user and provided receiver id.
 *     parameters:
 *       - in: path
 *         name: receiverId
 *         schema:
 *           type: string
 *         required: true
 *         description: The receiver's user id
 *     responses:
 *       '200':
 *         description: A successful response
 *         content: 
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Message"
 *       '500':
 *         description: Internal server error
 */
messageRoutes.get(
    "/get/:receiverId",
    // @ts-ignore
    authMiddleware,
    MessageController.getConversation
);

export default messageRoutes;