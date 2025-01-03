import express from "express";
import { register, login } from "../controllers/AuthController";

const userRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: The auth api
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         name:
 *           type: string
 *           description: The user's full name
 *         email:
 *           type: string
 *           description: The user's unique email address
 *         password:
 *           type: string
 *           description: The user's password
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
 *         name: John Doe 
 *         email: johndoe@gmail.com
 *         password: $2a$12$oPEgqLfslcmr090j12eb87@&^121ccuAhfz4Cij5AQur5C
 *         updatedAt: 2024-12-29T16:32:09.865+00:00
 *         createdAt: 2024-12-29T16:32:09.865+00:00
 */

/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: Register new user.
 *     tags: [Auth]
 *     description: Register new user.
 *     responses:
 *       '400':
 *         description: User already exists
 *       '200':
 *         description: A successful response
 *       '500':
 *         description: Internal server error
 */
userRouter.post("/register", register);
/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Login.
 *     tags: [Auth]
 *     description: Login.
 *     responses:
 *       '200':
 *         description: A successful response
 *       '400':
 *         description: Incorrrct Email or Password
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal server error
 */
userRouter.post("/login", login);

export default userRouter;