import { Request, Response } from "express"
import formModel from "../../models/form.model"

export const getAllForm = async (_req: Request, res: Response) => {
  const forms = await formModel.find()

  res.status(200).send({
    success: true,
    message: "Forms fetched successfully",
    forms,
  })
}

export const createForm = async (req: Request, res: Response) => {
  const { fileUrl, name } = req.body

  if (!fileUrl || !name) {
    return res.status(400).send({
      success: false,
      message: "form is missing data",
    })
  }

  const form = new formModel({
    name,
    fileUrl,
  })

  await form.save()

  res.status(200).send({
    success: true,
    message: "Form created successfully",
    form,
  })
}

export const updateForm = async (req: Request, res: Response) => {
  const { id } = req.params
  const { name, fileUrl } = req.body

  if (!id) {
    return res.status(400).send({
      success: false,
      message: "Id not provided",
    })
  }

  const form = await formModel.findById(id)

  if (!form) {
    return res.status(400).send({
      success: false,
      message: "Form not found",
    })
  }

  if (name) {
    form.name = name
  }

  if (fileUrl) {
    form.fileUrl = fileUrl
  }

  res.status(200).send({
    success: true,
    message: "Form updated successfully",
    form
  })
}

export const deleteForm = async (req: Request, res: Response) => {
  const { id } = req.params

  if (!id) {
    return res.status(400).send({
      success: false,
      message: "Form id not provided",
    })
  }

  const response = await formModel.deleteOne({ _id: id })

  if (response.deletedCount < 1) {
    return res.status(500).send({
      success: false,
      message: "failed to delete form",
    })
  }

  res.status(200).send({
    success: true,
    message: "Form deleted succesfully",
  })
}
