import { Router } from "express"
import adminServiceRoute from "./admin/service.route"
import adminToolRoute from "./admin/tool.route"
import adminFormRoute from "./admin/form.route"
import adminPosterRoute from "./admin/poster.route"
import adminAuthRoute from "./admin/auth.route"
import adminAuthorizationMiddleware from "../middlewares/adminauthorization.middleware"
import adminUserRoute from "./admin/user.route"

const adminRoute = Router()

adminRoute.use("/auth", adminAuthRoute)
adminRoute.use("/service", adminAuthorizationMiddleware, adminServiceRoute)
adminRoute.use("/tool", adminAuthorizationMiddleware, adminToolRoute)
adminRoute.use("/form", adminAuthorizationMiddleware, adminFormRoute)
adminRoute.use("/poster", adminAuthorizationMiddleware, adminPosterRoute)
adminRoute.use("/user", adminAuthorizationMiddleware, adminUserRoute)

export default adminRoute
