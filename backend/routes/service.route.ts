import { Router } from "express"
import {
  getAllSerivces,
  getServiceDetails,
  getServiesWithDocs,
  getServiceCharges,
} from "../controllers/service.controller"
import authorizationMiddleware from "../middlewares/authorization.middleware"

const serviceRoute = Router()

serviceRoute.get("/", getAllSerivces)
serviceRoute.get("/docs", authorizationMiddleware, getServiesWithDocs)
serviceRoute.get("/charges", authorizationMiddleware, getServiceCharges)
serviceRoute.get("/:d", getServiceDetails)

export default serviceRoute
