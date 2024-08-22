import { Request, Response } from "express"
import posterModel from "../models/poster.model"
import { mergeImagesWithWatermark } from "../utils/merge"
import { verifyToken } from "../utils/auth"
import userModel from "../models/user.model"
import fs from "fs"

export const getAllPosters = async (req: Request, res: Response) => {
  const { name } = req.query

  const query: any = {}

  if (name) {
    query.name = { $regex: name, $options: "i" }
  }

  const posters = await posterModel.find(query)

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

export const downloadPoster = async (req: Request, res: Response) => {
  const { posterId } = req.query
  const token = req.cookies.token
  const payload = verifyToken(token)

  const user = await userModel.findById(payload.id)
  const poster = await posterModel.findById(posterId)

  if (!user) {
    return res.status(400).send({
      success: false,
      message: "User not found",
    })
  }

  if (!poster) {
    return res.status(400).send({
      success: false,
      message: "Poster not found",
    })
  }

  const result = await mergeImagesWithWatermark(
    poster.imageUrl,
    user.bannerUrl,
    user.shopName,
    user.phone
  )

  if (!result) {
    return res.status(400).send({
      success: false,
      message: "Fialed to merge poster",
    })
  }

  res.status(200).send({
    success: true,
    message: "Poster fetched successfully",
    poster: result.toString("base64"),
  })
}
