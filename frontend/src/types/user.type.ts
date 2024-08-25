interface User {
  _id: string
  email: string
  phone: string
  shopName: string
  password: string
  blocked: boolean
  bannerUrl: string
  watermarkUrl: string
  newBanner: string
  newBannerDate: Date
  bannerVerified: boolean
  watermarkVerified: boolean
  planType: string
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
