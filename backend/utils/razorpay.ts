import Razorpay from "razorpay"

const razorpayId = process.env.RAZORPAY_ID
const razorpaySecret = process.env.RAZORPAY_SECRET

if (!razorpayId || !razorpaySecret) {
  throw new Error("Razorpay secrests not set in .env")
}

const razorpay = new Razorpay({
  key_id: razorpayId,
  key_secret: razorpaySecret,
})

export default razorpay
