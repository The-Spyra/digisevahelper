import { Router } from "express"
import authorizationMiddleware from "../middlewares/authorization.middleware"
import { createOrder, verifyPayment } from "../controllers/payment.controller"

const paymentRoute = Router()

paymentRoute.post("/order", authorizationMiddleware, createOrder)
paymentRoute.post("/verify", authorizationMiddleware, verifyPayment)

export default paymentRoute
