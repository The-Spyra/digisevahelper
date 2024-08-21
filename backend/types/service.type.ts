interface Service {
  _id: string
  name: string
  imageUrl: string
  redirectUrl: string
  documents: string[]
  description: string
  provided: boolean
  minPrice: number
  maxPrice: number
  createdAt: Date
}

export default Service
