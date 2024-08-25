import { Router } from "express"
import {
  getAllSerivces,
  getServiceDetails,
  getServiesWithDocs,
  getServiceCharges,
} from "../controllers/service.controller"
import authorizationMiddleware from "../middlewares/authorization.middleware"
import subscriptionValidation from "../middlewares/subscriptionvalidatoin.middleware"

const serviceRoute = Router()

serviceRoute.get("/", getAllSerivces)
serviceRoute.get(
  "/docs",
  authorizationMiddleware,
  subscriptionValidation("service"),
  getServiesWithDocs
)
serviceRoute.get(
  "/charges",
  authorizationMiddleware,
  subscriptionValidation("service"),
  getServiceCharges
)
serviceRoute.get("/:d", getServiceDetails)

export default serviceRoute
