// Libraries
import { NextFunction, Request, Response } from "express";

// DI
import { services } from "src/di/services";

// Errors
import { InternalError } from "src/errors/error";
import { ErrorCodes } from "src/errors/utils";
import { MatchPresenter } from "src/presenters/match-presenter";

export async function fetchMatch(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const match = await services.matchsRepository.findById("1");

    if (!match) {
      throw new InternalError(ErrorCodes.RESOURCE_NOT_FOUND);
    }

    if (!match.belongsToUser(req.user.id)) {
      throw new InternalError(ErrorCodes.RESOURCE_NOT_FOUND);
    }

    return res.status(200).send(MatchPresenter.toHTTP(match));
  } catch (error) {
    next(error);
  }
}
