import { Request, Response } from "express"
import { plans } from "../models/plan.model"
import razorpay from "../utils/razorpay"
import crypto from "crypto"
import userModel from "../models/user.model"
import { verifyToken } from "../utils/auth"

export const createOrder = async (req: Request, res: Response) => {
  const { planType } = req.body as { planType: string }
  const payload = verifyToken(req.cookies.token)

  const user = await userModel.findById(payload.id)

  if (!user) {
    return res.status(404).send({
      success: false,
      message: "User not found",
    })
  }

  const plan = plans.find((e) => e.name == planType)

  if (!plan) {
    return res.send(400).send({
      success: false,
      message: "invalid plan type",
    })
  }

  if (user.planExp && user.planExp.getTime() > Date.now()) {
    if (planType == "plan1") {
      if (user.planType == "plan3") {
        return res.status(400).send({
          success: false,
          message: "Cannot downgrade plan, wait for expiration",
        })
      }

      if (user.planType == "plan2") {
        return res.status(400).send({
          success: false,
          message: "Cannot extend plan with addon",
        })
      }
    }

    if (planType == "plan2") {
      if (!user.planType) {
        return res.status(400).send({
          success: false,
          message: "Cannot purchase addon without plan 1",
        })
      }

      if (user.planType == "plan3") {
        return res.status(400).send({
          success: false,
          message: "Cannot downgrade plan, wait for expiration",
        })
      }
    }

    if (planType == "plan3") {
      if (user.planType == "plan1" || user.planType == "plan2") {
        return res.status(400).send({
          success: false,
          message: "cannot upgrade from plan 1, wait for expiration",
        })
      }
    }
  }

  const order = await razorpay.orders.create({
    amount: plan.price * 100,
    currency: "INR",
  })

  return res.status(200).send({
    success: true,
    message: "Order created successfully",
    order,
  })
}

export const verifyPayment = async (req: Request, res: Response) => {
  const { razorpayResponse, userId, planType } = req.body

  if (!razorpayResponse || !userId || !planType) {
    return res.status(400).send({
      success: false,
      message: "data not provided for verification",
    })
  }

  const razorpaySecret = process.env.RAZORPAY_SECRET

  if (!razorpaySecret) {
    throw new Error("razorpay secret not set in environment")
  }

  const generated_signature = crypto
    .createHmac("sha256", razorpaySecret)
    .update(
      razorpayResponse.razorpay_order_id +
        "|" +
        razorpayResponse.razorpay_payment_id
    )
    .digest("hex")

  if (generated_signature != razorpayResponse.razorpay_signature) {
    return res.status(400).send({
      success: false,
      message: "Invalid payment signature",
    })
  }

  const plan = plans.find((e) => e.name == planType)

  if (!plan) {
    return res.status(400).send({
      success: false,
      message: "Invalid plan type",
    })
  }

  const user = await userModel.findById(userId)

  if (!user) {
    return res.status(404).send({
      success: false,
      message: "User not found",
    })
  }

  user.planType = planType

  if (user.planExp && user.planExp.getTime() > Date.now()) {
    if (user.planType == planType) {
      const newExpirationDate = new Date(user.planExp.getFullYear() + 1)

      user.planExp = newExpirationDate
    } else {
      const newExpirationDate = new Date()
      newExpirationDate.setFullYear(newExpirationDate.getFullYear() + 1)

      user.planExp = newExpirationDate
    }
  }

  await user.save()

  res.status(200).send({
    success: true,
    message: "Subscription successfull",
  })
}
