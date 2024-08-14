import { Router } from "express"
import { getUserDetails } from "../controllers/user.controller"
import authorizationMiddleware from "../middlewares/authorization.middleware"
const userRoute = Router()

userRoute.get("/", authorizationMiddleware, getUserDetails)

export default userRoute
