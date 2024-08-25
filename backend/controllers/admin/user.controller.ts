import { Request, Response } from "express"
import userModel from "../../models/user.model"
import { plans } from "../../models/plan.model"

export const getAllUsers = async (req: Request, res: Response) => {
  const { name } = req.query

  const query: any = {}

  if (name) {
    query.name = { $regex: name, $options: "i" }
  }

  const users = await userModel.find(query)

  res.status(200).send({
    success: true,
    message: "Users fetched successfully",
    users,
  })
}

export const getUserDetails = async (req: Request, res: Response) => {
  const { id } = req.params

  if (!id) {
    return res.status(400).send({
      success: false,
      message: "User id not proivded",
    })
  }

  const user = await userModel.findById(id)

  if (!user) {
    return res.status(400).send({
      success: false,
      message: "User not found",
    })
  }

  res.status(200).send({
    success: true,
    message: "User details fetched successfully",
    user,
  })
}

export const verifyBanner = async (req: Request, res: Response) => {
  const { userId } = req.body

  if (!userId) {
    return res.status(400).send({
      success: false,
      messge: "User id not provided",
    })
  }

  const user = await userModel.findById(userId)

  if (!user) {
    return res.status(400).send({
      success: false,
      message: "User not found",
    })
  }

  user.bannerVerified = true
  user.bannerUrl = user.newBanner
  user.bannerCreatedAt = user.newBannerDate

  await user.save()

  res.status(200).send({
    success: true,
    message: "User banner verfied",
  })
}

export const blockUser = async (req: Request, res: Response) => {
  const { blocked, userId } = req.body

  if (!userId) {
    return res.status(400).send({
      success: false,
      message: "User id not provided",
    })
  }

  const user = await userModel.findById(userId)

  if (!user) {
    return res.status(400).send({
      success: false,
      message: "User not found",
    })
  }

  user.blocked = blocked

  await user.save()

  res.status(200).send({
    success: true,
    message: blocked
      ? "User blocked successfully"
      : "User un blocked successfully",
  })
}
