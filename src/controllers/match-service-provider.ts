// Libraries
import { NextFunction, Request, Response } from "express";

// DI
import { services } from "src/di/services";

// Errors
import { InternalError } from "src/errors/error";
import { ErrorCodes } from "src/errors/utils";

export async function matchServiceProvider(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const users = await services.usersRepository.list({
      location: {
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        radius: 50,
      },
    });

    if (!users.length) {
      throw new InternalError(ErrorCodes.UNSUFICIENT_SERVICE_PROVIDERS);
    }

    const roomId = await services.broadcast.open();

    return res.status(200).send({ roomId });
  } catch (error) {
    next(error);
  }
}
