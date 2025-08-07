// Libraries
import { NextFunction, Request, Response } from "express";

// Database
import { users } from "src/database/users";

// DI
import { services } from "src/di/services";

export async function matchServiceProvider(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    console.log(users);

    const roomId = await services.broadcast.open();

    return res.status(200).send({ roomId });
  } catch (error) {
    next(error);
  }
}
