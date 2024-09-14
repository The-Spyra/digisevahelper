interface Service {
  _id: string
  name: string
  imageUrl: string
  redirectUrl: string
  documents: string[]
  description: string
  provided: boolean
  price: string
  createdAt: Date
}

export default Service
