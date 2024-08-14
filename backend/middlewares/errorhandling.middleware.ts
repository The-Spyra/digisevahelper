import { NextFunction, Request, Response } from "express"

const errorHandlingMiddleware = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.log(error)
  res.status(500).send({
    messge: "Server error",
  })
}

export default errorHandlingMiddleware
