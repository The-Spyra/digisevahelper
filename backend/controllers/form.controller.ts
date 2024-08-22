import { Request, Response } from "express"
import formModel from "../models/form.model"

export const getAllForms = async (req: Request, res: Response) => {
  const forms = await formModel.find()

  return res.status(200).send({
    success: true,
    message: "Form fetched successfully",
    forms,
  })
}

export const getFormDetails = async (req: Request, res: Response) => {
  const { id } = req.params

  if (!id) {
    return res.status(400).send({
      success: false,
      message: "Form id no provided",
    })
  }

  const form = await formModel.findById(id)

  if (!form) {
    return res.status(400).send({
      success: false,
      message: "Form not found",
    })
  }

  res.status(200).send({
    success: false,
    message: "Form details fetched successfully",
    form,
  })
}
