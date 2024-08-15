import { Router } from "express"
import {
  login,
  register,
  unverifiedUserDetails,
  verify,
} from "../controllers/auth.controller"
const authRoute = Router()

authRoute.post("/login", login)
authRoute.post("/register", register)
authRoute.post("/verify", verify)
authRoute.post("/unverifiedUser", unverifiedUserDetails)

export default authRoute
