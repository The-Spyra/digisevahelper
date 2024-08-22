import { Router } from "express"
import {
  getAllUsers,
  getUserDetails,
  verifyBanner,
  blockUser,
} from "../../controllers/admin/user.controller"

const adminUserRoute = Router()

adminUserRoute.get("/", getAllUsers)
adminUserRoute.put("/verifyBanner", verifyBanner)
adminUserRoute.put("/block", blockUser)

adminUserRoute.get("/:id", getUserDetails)

export default adminUserRoute
