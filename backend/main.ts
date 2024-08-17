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

app.use(errorHandlingMiddleware)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`server started listening http://localhost:${PORT}`)
})
