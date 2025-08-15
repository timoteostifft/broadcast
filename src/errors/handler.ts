// Libraries
import Joi from "joi";
import { NextFunction, Request, Response } from "express";

// Errors
import { InternalError } from "./error";
import { ErrorCodes, ErrorMessages, ErrorStatuses } from "./utils";

export async function handler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error instanceof Joi.ValidationError) {
    return res.status(400).send({
      code: ErrorCodes.VALIDATION_ERROR,
      message: ErrorMessages[ErrorCodes.VALIDATION_ERROR],
      details: error.details,
    });
  }

  if (error instanceof InternalError) {
    return res
      .status(error.status)
      .send({ code: error.code, message: error.message });
  }

  console.log(error);

  res.status(ErrorStatuses[ErrorCodes.INTERNAL_ERROR]).send({
    code: ErrorCodes.INTERNAL_ERROR,
    message: ErrorMessages[ErrorCodes.INTERNAL_ERROR],
  });
}
