import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const encryptPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10)
  const encryptedPassword = await bcrypt.hash(password, salt)
  return encryptedPassword
}

export const decryptPassword = async (
  password: string,
  encryptedPassword: string
) => {
  const pass = await bcrypt.compare(password, encryptedPassword)
  return pass
}

export const signToken = (id: string) => {
  const jwtSecret = process.env.JWT_SECRET
  if (!jwtSecret) {
    throw new Error("JWT_SECRET is not set in environment")
  }

  const payload = jwt.sign({ id }, jwtSecret)
  return payload
}

export const verifyToken = (token: string) => {
  const jwtSecret = process.env.JWT_SECRET
  if (!jwtSecret) {
    throw new Error("JWT_SECRET is not set in environment")
  }

  const payload = jwt.verify(token, jwtSecret) as { id: string }
  return payload
}
