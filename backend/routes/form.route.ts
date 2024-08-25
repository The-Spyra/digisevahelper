import { Router } from "express"
import { getAllForms, getFormDetails } from "../controllers/form.controller"
import authorizationMiddleware from "../middlewares/authorization.middleware"
import subscriptionValidation from "../middlewares/subscriptionvalidatoin.middleware"

const formRoute = Router()

formRoute.get(
  "/",
  authorizationMiddleware,
  subscriptionValidation("service"),
  getAllForms
)
formRoute.get(
  "/:id",
  authorizationMiddleware,
  subscriptionValidation("service"),
  getFormDetails
)

export default formRoute
