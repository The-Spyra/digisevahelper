import nodeMailer from "nodemailer"
import { loadEnvFile } from "process"

loadEnvFile(".env")

const EMAIL_SERVER = process.env.EMAIL_SERVER
const EMAIL_PORT = process.env.EMAIL_PORT
const EMAIL = process.env.EMAIL
const EMAIL_PASS = process.env.EMAIL_PASS

if (!EMAIL || !EMAIL_SERVER || !EMAIL_PORT || !EMAIL_PASS) {
  throw new Error("Missing enironment variables")
}

const transporter = nodeMailer.createTransport({
  host: EMAIL_SERVER,
  port: Number(EMAIL_PORT),
  auth: {
    user: EMAIL,
    pass: EMAIL_PASS,
  },
})

export const sendVeirificationMail = async (to: string, url: string) => {
  const response = await transporter.sendMail({
    from: EMAIL,
    to,
    subject: "DIGISEVAHELPER account verification link",
    text: `opt link: ${url}`,
  })

  console.log(response)
}

export const sendResetMail = (to: string) => {}
