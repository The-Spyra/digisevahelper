import { Request, Response } from "express"
import posterModel from "../../models/poster.model"

export const getAllPosters = async (req: Request, res: Response) => {
  const posters = await posterModel.find()

  res.status(200).send({
    success: true,
    message: "Posters fetched successfully",
    posters,
  })
}

export const createPoster = async (req: Request, res: Response) => {
  const { name, imageUrl } = req.body

  if (!name || !imageUrl) {
    return res.status(400).send({
      success: false,
      message: "Missing data",
    })
  }

  const poster = new posterModel({
    name,
    imageUrl,
  })

  await poster.save()

  res.status(200).send({
    success: true,
    message: "Poster created successfully",
    poster,
  })
}

export const updatePoster = async (req: Request, res: Response) => {
  const { name, imageUrl } = req.body
  const { id } = req.params

  if (!id) {
    return res.status(400).send({
      success: false,
      message: "Id not provided",
    })
  }

  const poster = await posterModel.findById(id)

  if (!poster) {
    return res.status(400).send({
      success: false,
      message: "Poseter not found",
    })
  }

  if (name) {
    poster.name = name
  }

  if (imageUrl) {
    poster.imageUrl = imageUrl
  }

  await poster.save()

  res.status(200).send({
    success: true,
    message: "Tool updated successfully",
    poster,
  })
}

export const deletePoster = async (req: Request, res: Response) => {
  const { id } = req.params

  if (!id) {
    return res.status(400).send({
      success: false,
      message: "Id is not provided",
    })
  }

  const response = await posterModel.deleteOne({ _id: id })

  if (response.deletedCount < 1) {
    return res.status(500).send({
      success: false,
      message: "Failed to delete poster",
    })
  }

  res.status(200).send({
    success: true,
    message: "Poster created successfully",
  })
}
