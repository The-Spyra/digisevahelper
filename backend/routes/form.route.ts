import { Router } from "express"
import { getAllForms, getFormDetails } from "../controllers/form.controller"

const formRoute = Router()

formRoute.get("/", getAllForms)
formRoute.get("/:id", getFormDetails)

export default formRoute
