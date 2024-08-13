import express from "express"
import morgan from "morgan"
import cors from "cors"
import { loadEnvFile } from "process"

loadEnvFile(".env.example")

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(morgan("dev"))
app.use(cors({
	origin: "*"
}))

const PORT = process.env.PORT
app.listen(PORT, () => {
	console.log(`server started listening http://localhost:${PORT}`)
})
