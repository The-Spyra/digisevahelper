import { Router } from "express"
import {
  createForm,
  deleteForm,
  getAllForm,
  updateForm,
} from "../../controllers/admin/form.controller"

const admniFormRoute = Router()

admniFormRoute.route("/").get(getAllForm).post(createForm)

admniFormRoute.route("/:id").put(updateForm).delete(deleteForm)

export default admniFormRoute
