import { Router } from "express"
import {
  getAllPosters,
  getPosterDetails,
  downloadPoster,
} from "../controllers/poster.controller"
import authorizationMiddleware from "../middlewares/authorization.middleware"
import subscriptionValidation from "../middlewares/subscriptionvalidatoin.middleware"

const posterRoute = Router()

posterRoute.get(
  "/",
  authorizationMiddleware,
  subscriptionValidation("full"),
  getAllPosters
)
posterRoute.get(
  "/download",
  authorizationMiddleware,
  subscriptionValidation("full"),
  downloadPoster
)
posterRoute.get(
  "/:id",
  authorizationMiddleware,
  subscriptionValidation("full"),
  getPosterDetails
)

export default posterRoute
