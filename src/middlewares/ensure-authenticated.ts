// Libraries
import { Request, Response, NextFunction } from "express";

// DI
import { services } from "src/di/services";
import { InternalError } from "src/errors/error";
import { ErrorCodes } from "src/errors/utils";

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const user = services.usersRepository.users[0];

    if (!user) {
      throw new InternalError(ErrorCodes.UNAUTHORIZED);
    }

    request.user = user;
    next();
  } catch (error) {
    next(error);
  }
}
