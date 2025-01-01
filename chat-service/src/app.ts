import express, { Express } from "express";
import messageRoutes from "./routes/messageRoutes";
import { errorConverter, errorHandler } from "./middleware";

const app: Express = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(messageRoutes)
app.use(errorConverter)
app.use(errorHandler)

export default app