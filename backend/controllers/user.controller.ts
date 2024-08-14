import { Request, Response } from "express"
import { verifyToken } from "../utils/auth"
import userModel from "../models/user.model"

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
