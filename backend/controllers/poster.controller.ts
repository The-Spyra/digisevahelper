import { Request, Response } from "express"
import posterModel from "../models/poster.model"

export const getAllPosters = async (req: Request, res: Response) => {
  const posters = await posterModel.find()

  res.status(200).send({
    success: true,
    message: "Posters fetched successfully",
    posters,
  })
}

export const getPosterDetails = async (req: Request, res: Response) => {
  const { id } = req.params

  if (!id) {
    return res.status(400).send({
      success: false,
      message: "Poster id no provided",
    })
  }

  const poster = await posterModel.findById(id)

  if (!poster) {
    return res.status(400).send({
      success: false,
      message: "Poster not found",
    })
  }

  res.status(200).send({
    success: false,
    message: "Poster details fetched successfully",
    poster,
  })
}
