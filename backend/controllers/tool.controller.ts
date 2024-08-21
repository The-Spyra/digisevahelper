import { Request, Response } from "express"
import toolModel from "../models/tool.model"

export const getAllTools = async (req: Request, res: Response) => {
  const tools = await toolModel.find()

  res.status(200).send({
    success: true,
    message: "Tools fetched successfully",
    tools,
  })
}

export const getToolDetails = async (req: Request, res: Response) => {
  const { id } = req.params

  if (!id) {
    return res.status(400).send({
      success: false,
      message: "Tool id no provided",
    })
  }

  const tool = await toolModel.findById(id)

  if (!tool) {
    return res.status(400).send({
      success: false,
      message: "Tool not found",
    })
  }

  res.status(200).send({
    success: false,
    message: "Tool details fetched successfully",
    tool,
  })
}
