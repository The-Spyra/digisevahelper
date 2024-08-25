import express from "express"
import morgan from "morgan"
import cors from "cors"
import { loadEnvFile } from "process"
import connectDb from "./config/database.config"
import errorHandlingMiddleware from "./middlewares/errorhandling.middleware"
import authRoute from "./routes/auth.route"
import userRoute from "./routes/user.route"
import cookies from "cookie-parser"
import adminRoute from "./routes/admin.route"
import serviceRoute from "./routes/service.route"
import posterRoute from "./routes/poster.route"
import formRoute from "./routes/form.route"
import toolRoute from "./routes/tool.route"
import authorizationMiddleware from "./middlewares/authorization.middleware"
import paymentRoute from "./routes/payment.route"

loadEnvFile(".env")
connectDb()

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookies())
app.use(morgan("dev"))
app.use(
  cors({
    origin: process.env.FRONTEND,
    credentials: true,
  })
)

app.use("/auth", authRoute)
app.use("/user", userRoute)
app.use("/admin", adminRoute)
app.use("/service", serviceRoute)
app.use("/poster", authorizationMiddleware, posterRoute)
app.use("/form", authorizationMiddleware, formRoute)
app.use("/tool", authorizationMiddleware, toolRoute)
app.use("/payment", authorizationMiddleware, paymentRoute)

app.use(errorHandlingMiddleware)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`server started listening http://localhost:${PORT}`)
})
