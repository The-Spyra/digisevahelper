import { Router } from "express"
import {
  getAllPosters,
  getPosterDetails,
  downloadPoster,
} from "../controllers/poster.controller"

const posterRoute = Router()

posterRoute.get("/", getAllPosters)
posterRoute.get("/download", downloadPoster)
posterRoute.get("/:id", getPosterDetails)

export default posterRoute
