import { Request, Response } from "express"
import { verifyToken } from "../utils/auth"
import userModel from "../models/user.model"
import { plans } from "../models/plan.model"
import razorpay from "../utils/razorpay"

export const getUserDetails = async (req: Request, res: Response) => {
  const token = req.cookies.token
  const payload = verifyToken(token)

  const user = await userModel.findById(payload.id)

  if (!user) {
    return res.status(400).send({
      success: false,
      message: "User not found",
      error: "unauthorized",
    })
  }

  res.status(200).send({
    success: true,
    message: "User details fetched successfully",
    user,
  })
}

export const userUploadBanner = async (req: Request, res: Response) => {
  const { bannerUrl } = req.body
  const token = req.cookies.token
  const payload = verifyToken(token)

  if (!bannerUrl) {
    return res.status(400).send({
      success: false,
      message: "Banner url not provided",
    })
  }

  const user = await userModel.findById(payload.id)

  if (!user) {
    return res.status(400).send({
      success: false,
      message: "User not found",
      error: "unauthorized",
    })
  }

  user.newBanner = bannerUrl
  user.bannerVerified = false
  user.newBannerDate = new Date()

  await user.save()

  res.status(200).send({
    success: true,
    message: "New banner set successfully",
  })
}
