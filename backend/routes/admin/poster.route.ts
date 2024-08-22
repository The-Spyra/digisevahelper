import { Router } from "express"
import {
  createPoster,
  deletePoster,
  getAllPosters,
  updatePoster,
} from "../../controllers/admin/poster.controller"

const adminPosterRoute = Router()

adminPosterRoute.route("/").get(getAllPosters).post(createPoster)
adminPosterRoute.route("/:id").put(updatePoster).delete(deletePoster)

export default adminPosterRoute
