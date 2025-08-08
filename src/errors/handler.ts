// Libraries
import { NextFunction, Request, Response } from "express";

// Libraries
import { InternalError } from "./error";
import { ErrorCodes, ErrorMessages, ErrorStatuses } from "./utils";

export async function handler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(error);

  if (error instanceof InternalError) {
    return res
      .status(error.status)
      .send({ code: error.code, message: error.message });
  }

  res.status(ErrorStatuses[ErrorCodes.INTERNAL_ERROR]).send({
    code: ErrorCodes.INTERNAL_ERROR,
    message: ErrorMessages[ErrorCodes.INTERNAL_ERROR],
  });
}
