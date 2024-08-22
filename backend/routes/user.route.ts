import { Router } from "express"
import {
  getUserDetails,
  userUploadBanner,
} from "../controllers/user.controller"
import authorizationMiddleware from "../middlewares/authorization.middleware"
const userRoute = Router()

userRoute.get("/", authorizationMiddleware, getUserDetails)
userRoute.patch("/banner", authorizationMiddleware, userUploadBanner)

export default userRoute
