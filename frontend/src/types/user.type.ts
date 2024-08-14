interface User {
  _id: string
  email: string
  phone: string
  password: string
  bannerUrl: string
  watermarkUrl: string
  bannerVerfiied: boolean
  watermarkVerified: boolean
  planExp: Date
  freetriel: boolean
  trielExpiry: Date
  verified: boolean
  verificationTokenExp: Date
  watermarkCreatedAt: Date
  bannerCreatedAt: Date
  createdAt: Date
}

export default User
