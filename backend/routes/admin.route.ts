import { Router } from "express"
import adminToolRoute from "./admin/tool.route"
import adminFormRoute from "./admin/form.route"
import adminPosterRoute from "./admin/poster.route"
import adminAuthRoute from "./admin/auth.route"
import adminAuthorizationMiddleware from "../middlewares/adminauthorization.middleware"
const adminRoute = Router()

adminRoute.use("/auth", adminAuthRoute)
adminRoute.use("/tool", adminAuthorizationMiddleware, adminToolRoute)
adminRoute.use("/form", adminAuthorizationMiddleware, adminFormRoute)
adminRoute.use("/poster", adminAuthorizationMiddleware, adminPosterRoute)
export default adminRoute
