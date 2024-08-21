import { Router } from "express"
import {
  createTool,
  deleteTool,
  getAllToosl,
  updateTool,
} from "../../controllers/admin/tool.controller"

const adminToolRoute = Router()

adminToolRoute.route("/").get(getAllToosl).post(createTool)

adminToolRoute.route("/:id").put(updateTool).delete(deleteTool)

export default adminToolRoute
