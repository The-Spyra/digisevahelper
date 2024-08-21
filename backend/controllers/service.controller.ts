import { Request, Response } from "express"
import serviceModel from "../models/service.model"

export const getAllSerivces = async (req: Request, res: Response) => {
  const services = await serviceModel.find()

  res.status(200).send({
    success: true,
    message: "Services fetched successfully",
    services,
  })
}

export const getServiceDetails = async (req: Request, res: Response) => {
  const { id } = req.params

  if (!id) {
    return res.status(400).send({
      success: false,
      message: "Id not provided",
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
    message: "Service details fetched successfully",
    service,
  })
}
