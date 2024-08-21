import { Router } from "express"
import { getAllTools, getToolDetails } from "../controllers/tool.controller"

const toolRoute = Router()

toolRoute.get("/", getAllTools)
toolRoute.get("/:id", getToolDetails)

export default toolRoute
