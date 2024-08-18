import { Router } from "express"
import {
  getAllSerivces,
  getServiceDetails,
} from "../controllers/service.controller"

const serviceRoute = Router()

serviceRoute.get("/", getAllSerivces)
serviceRoute.get("/:d", getServiceDetails)

export default serviceRoute
