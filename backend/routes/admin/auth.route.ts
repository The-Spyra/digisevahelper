import { Router } from "express"
import {
  adminLogin,
  adminRegister,
} from "../../controllers/admin/auth.controller"

const adminAuthRoute = Router()

adminAuthRoute.post("/login", adminLogin)
adminAuthRoute.post("/register", adminRegister)

export default adminAuthRoute
