import { Request, Response } from "express"
import adminModel from "../../models/admin.model"
import { comparePassword, encryptPassword, signToken } from "../../utils/auth"

export const adminLogin = async (req: Request, res: Response) => {
  const { username, password } = req.body

  if (!username || !password) {
    res.status(400).send({
      success: false,
      message: "Credentials not provided",
    })
  }

  const admin = await adminModel.findOne({ username })

  if (!admin) {
    return res.status(400).send({
      success: false,
      message: `Admin "${username}" not found`,
    })
  }

  const passCheck = await comparePassword(password, admin.password)

  if (!passCheck) {
    return res.status(400).send({
      success: false,
      message: "Incorrect password",
    })
  }

  const token = signToken(admin._id)

  res.cookie("adminToken", token, {
    maxAge: 24 * 60 * 60 * 1000,
  })

  res.status(200).send({
    success: true,
    message: "Logged in successfully",
  })
}

export const adminRegister = async (req: Request, res: Response) => {
  const hashedPassword = await encryptPassword("admin")

  const admin = new adminModel({
    username: "admin",
    password: hashedPassword,
  })

  await admin.save()

  res.status(200).send({
    success: true,
    message: "Admin created successfully",
  })
}
