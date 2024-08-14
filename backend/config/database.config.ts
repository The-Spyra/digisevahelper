import mongoose from "mongoose"

const connectDb = async () => {
  const DBURL = process.env.DATABASE_URL

  if (!DBURL) {
    throw new Error("DATABASE_URL not set in environment variables")
  }

  await mongoose.connect(DBURL)
}

export default connectDb
