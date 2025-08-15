// Libraries
import Joi, { valid } from "joi";
import { NextFunction, Request, Response } from "express";

// DI
import { services } from "src/di/services";

// Entities
import { EarlyAdopter } from "src/entities/early-adopter";

// Errors
import { InternalError } from "src/errors/error";
import { ErrorCodes } from "src/errors/utils";

// Controllers
import { validate } from "./utils";

export const registerInterestSchema = Joi.object({
  email: Joi.string().email().required(),
});

export async function registerInterest(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { email } = validate(registerInterestSchema, req.body);

    const earlyAdopterAlreadyExists =
      await services.earlyAdoptersRepository.findByEmail(email);

    if (earlyAdopterAlreadyExists) {
      throw new InternalError(ErrorCodes.RESOURCE_ALREADY_EXISTS);
    }

    const earlyAdopter = new EarlyAdopter({
      email: req.body.email,
    });

    await services.earlyAdoptersRepository.create(earlyAdopter);

    return res.status(201).send();
  } catch (error) {
    next(error);
  }
}
