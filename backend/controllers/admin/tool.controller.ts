import { Request, Response } from "express"
import toolModel from "../../models/tool.model"

export const getAllToosl = async (req: Request, res: Response) => {
  const { name } = req.query

  const query: any = {}

  if (name) {
    query.name = { $regex: name, $options: "i" }
  }

  const tools = await toolModel.find(query)

  res.status(200).send({
    success: true,
    message: "Tools fetched succesfully",
    tools: tools,
  })
}

export const createTool = async (req: Request, res: Response) => {
  const { name, redirectUrl } = req.body

  if (!name || !redirectUrl) {
    return res.status(400).send({
      success: false,
      message: "Missing data",
    })
  }

  const tool = new toolModel({
    name,
    redirectUrl,
  })

  await tool.save()

  res.status(200).send({
    success: true,
    message: "Tool created successfully",
    tool,
  })
}

export const updateTool = async (req: Request, res: Response) => {
  const { name, redirectUrl } = req.body
  const { id } = req.params

  if (!id) {
    return res.status(400).send({
      success: false,
      message: "Id not provided",
    })
  }

  const tool = await toolModel.findById(id)

  if (!tool) {
    return res.status(400).send({
      success: false,
      message: "Tool not found",
    })
  }

  if (name) {
    tool.name = name
  }

  if (redirectUrl) {
    tool.redirectUrl = redirectUrl
  }

  await tool.save()

  res.status(200).send({
    success: true,
    message: "Tool updated successfully",
    tool,
  })
}

export const deleteTool = async (req: Request, res: Response) => {
  const { id } = req.params

  if (!id) {
    return res.status(400).send({
      success: true,
      message: "Id not provided",
    })
  }

  const response = await toolModel.deleteOne({ _id: id })

  if (response.deletedCount < 1) {
    return res.status(500).send({
      success: true,
      message: "Failed to delete tool",
    })
  }

  res.status(200).send({
    success: true,
    message: "Tool deleted successfully",
  })
}
