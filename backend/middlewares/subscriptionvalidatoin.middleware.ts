import { NextFunction, Request, Response } from "express"
import { verifyToken } from "../utils/auth"
import userModel from "../models/user.model"

const subscriptionValidation = (access: "service" | "full") => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token
    const payload = verifyToken(token)

    const user = await userModel.findById(payload.id)

    if (!user) {
      return res.status(400).send({
        success: false,
        message: "User not found",
      })
    }

    if (!user.planType) {
      return res.status(400).send({
        success: false,
        message: "No active subcription",
        error: "subscription",
      })
    }

    if (user.planExp.getTime() < Date.now()) {
      return res.status(400).send({
        success: false,
        message: "Subscripton is expired",
      })
    }

    if (access == "full" && !["plan3", "plan2"].includes(user.planType)) {
      return res.status(400).send({
        success: false,
        message: "This feature is not available on your current plan",
        error: "subscription",
      })
    }

    next()
  }
}

export default subscriptionValidation
