import { NextFunction, Request, Response } from "express"
import { verifyToken } from "../utils/auth"
import userModel from "../models/user.model"

const authorizationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token

  if (!token) {
    return res.status(403).send({
      success: false,
      message: "You are not loggedin",
      error: "unauthorized",
    })
  }

  const payload = verifyToken(token)

  const user = await userModel.findById(payload.id)

  if (!user) {
    res.clearCookie("token")
    return res.status(400).send({
      success: false,
      message: "User account not found",
      error: "unauthorized",
    })
  }

  if (!user.verified) {
    return res.status(403).send({
      success: false,
      message: "Account not verified",
      error: "unverified",
    })
  }

  if (user.blocked) {
    res.clearCookie("token")
    return res.status(403).send({
      success: false,
      message: "Account is blocked by an admin",
      error: "blocked",
    })
  }

  next()
}

export default authorizationMiddleware
