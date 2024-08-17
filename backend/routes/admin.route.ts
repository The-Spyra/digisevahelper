import { Router } from "express"
import adminAuthRoute from "./admin/auth.route"
const adminRoute = Router()

adminRoute.use("/auth", adminAuthRoute)
export default adminRoute
