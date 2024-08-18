import { Router } from "express"
import {
  getAllPosters,
  getPosterDetails,
} from "../controllers/poster.controller"

const posterRoute = Router()

posterRoute.get("/", getAllPosters)
posterRoute.get("/:id", getPosterDetails)

export default posterRoute
