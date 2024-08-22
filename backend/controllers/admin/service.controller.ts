import { Request, Response } from "express"
import serviceModel from "../../models/service.model"

export const getAllServices = async (req: Request, res: Response) => {
  const { name, provided } = req.query

  const query: any = {}

  if (name) {
    query.name = { $regex: name, $options: "i" }
  }

  if (typeof provided == "boolean") {
    query.provided = provided
  }

  const services = await serviceModel.find(query)

  res.status(200).send({
    success: true,
    message: "Fetched all services successfully",
    services,
  })
}

export const createService = async (req: Request, res: Response) => {
  const {
    name,
    imageUrl,
    redirectUrl,
    documents,
    description,
    minPrice,
    provided,
    maxPrice,
  } = req.body

  if (!name || !imageUrl || !redirectUrl || !description) {
    return res.status(400).send({
      success: false,
      message: "Missing data",
    })
  }

  const service = new serviceModel({
    name,
    imageUrl,
    redirectUrl,
    description,
    documents: documents || [],
    provided,
    maxPrice,
    minPrice,
  })

  await service.save()

  res.status(200).send({
    success: true,
    message: "Service created successfully",
    service,
  })
}

export const getServiceDetails = async (req: Request, res: Response) => {
  const { id } = req.params

  if (!id) {
    return res.status(400).send({
      success: false,
      message: "Service Id not provided",
    })
  }

  const service = await serviceModel.findById(id)

  if (!service) {
    return res.status(400).send({
      success: false,
      message: "Service not found",
    })
  }

  res.status(200).send({
    success: true,
    message: "Service details fetched successufll",
    service,
  })
}

export const updateService = async (req: Request, res: Response) => {}

export const deleteService = async (req: Request, res: Response) => {
  const { id } = req.params

  if (!id) {
    return res.status(400).send({
      success: false,
      message: "Id not provided",
    })
  }

  const response = await serviceModel.deleteOne({ _id: id })

  if (response.deletedCount < 1) {
    return res.status(500).send({
      success: false,
      message: "Failed to delete Service",
    })
  }

  res.status(200).send({
    success: true,
    message: "service delete successfully",
  })
}
