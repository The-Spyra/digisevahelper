import { Request, Response } from "express"
import userModel from "../models/user.model"
import {
  decryptPassword,
  encryptPassword,
  signToken,
  verifyToken,
} from "../utils/auth"
import { sendVeirificationMail } from "../utils/mail"

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).send({
      success: false,
      message: "please fill all fields",
    })
  }

  const user = await userModel.findOne({ email })

  if (!user) {
    return res.status(400).send({
      success: false,
      message: "no user with user email exists",
    })
  }

  const passCheck = await decryptPassword(password, user.password)

  if (!passCheck) {
    return res.status(400).send({
      message: "Incorrect password",
    })
  }

  const token = signToken(user._id)

  res.cookie("token", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
  })

  res.status(200).send({
    success: true,
    message: "Logged in successfully",
  })
}

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).send({
      message: "Please fill all fields",
    })
  }

  const checkUser = await userModel.findOne({ email })

  if (checkUser) {
    return res.status(400).send({
      message: "Email all ready in use",
    })
  }

  const hashedPass = await encryptPassword(password)
  const user = new userModel({
    email,
    password: hashedPass,
  })

  await user.save()

  const token = signToken(user._id)

  const FORNTENDURL = process.env.FRONTEND

  sendVeirificationMail(email, `${FORNTENDURL}/verify?token=${token}`)

  res.status(200).send({
    success: true,
    messge: "User registered successfully",
  })
}

export const unverifiedUserDetails = async (req: Request, res: Response) => {
  const { token } = req.body

  if (!token) {
    return res.status(400).send({
      success: false,
      message: "Token not provided",
    })
  }

  const payload = verifyToken(token)
  const user = await userModel.findById(payload.id)

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

export const resendVerificationLink = (req: Request, res: Response) => {}

export const verify = async (req: Request, res: Response) => {
  const { token } = req.body

  if (!token) {
    return res.status(400).send({
      message: "Verification token not provided",
    })
  }

  const payload = verifyToken(token)
  const user = await userModel.findById(payload.id)

  if (!user) {
    return res.status(400).send({
      success: false,
      message: "No user account found",
    })
  }

  user.verified = true
  const response = await userModel.updateOne({ verified: true })

  if (response.modifiedCount < 1) {
    return res.status(500).send({
      success: false,
      message: "Verification failed",
    })
  }

  res.status(200).send({
    success: true,
    message: "User verified successfully",
  })
}
