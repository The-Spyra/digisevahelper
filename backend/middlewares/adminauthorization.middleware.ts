import { NextFunction, Request, Response } from "express"
import { verifyToken } from "../utils/auth"
import adminModel from "../models/admin.model"

const adminAuthorizationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.adminToken

  if (!token) {
    return res.status(401).send({
      success: false,
      message: "You are not authorized",
      error: "admin-unauthorized",
    })
  }

  const payload = verifyToken(token)

  const admin = await adminModel.findById(payload.id)

  if (!admin) {
    return res.status(401).send({
      success: false,
      message: "You are not authorized",
      error: "admin-unauthorized",
    })
  }

  next()
}

export default adminAuthorizationMiddleware
