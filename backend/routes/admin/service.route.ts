import { Router } from "express"
import {
  createService,
  deleteService,
  getAllServices,
  getServiceDetails,
  updateService,
} from "../../controllers/admin/service.controller"

const adminServiceRoute = Router()

adminServiceRoute.route("/").get(getAllServices).post(createService)

adminServiceRoute
  .route("/:id")
  .get(getServiceDetails)
  .patch(updateService)
  .delete(deleteService)

export default adminServiceRoute
