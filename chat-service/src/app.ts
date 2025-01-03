import express, { Express } from "express";
import messageRoutes from "./routes/messageRoutes";
import { errorConverter, errorHandler } from "./middleware";
import swaggerjsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { swaggerOptions } from "./config/swaggerOptions";

const app: Express = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(messageRoutes)
app.use(errorConverter)
app.use(errorHandler)

const swaggerDocs = swaggerjsdoc(swaggerOptions)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

export default app