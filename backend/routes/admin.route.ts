import { Router } from "express"
import adminToolRoute from "./admin/tool.route"
import adminAuthRoute from "./admin/auth.route"
import adminAuthorizationMiddleware from "../middlewares/adminauthorization.middleware"
const adminRoute = Router()

adminRoute.use("/auth", adminAuthRoute)
adminRoute.use("/tool", adminAuthorizationMiddleware, adminToolRoute)
export default adminRoute
