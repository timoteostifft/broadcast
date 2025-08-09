// Libraries
import { NextFunction, Request, Response } from "express";

// DI
import { services } from "src/di/services";
import { Match } from "src/entities/match";

// Errors
import { InternalError } from "src/errors/error";
import { ErrorCodes } from "src/errors/utils";
import { MatchPresenter } from "src/presenters/match-presenter";

export async function createMatch(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const serviceProviders = await services.usersRepository.list({
      roles: ["SERVICE_PROVIDER"],
      location: {
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        radius: 50,
      },
    });

    if (!serviceProviders.length) {
      throw new InternalError(ErrorCodes.UNSUFICIENT_SERVICE_PROVIDERS);
    }

    const roomId = await services.broadcast.open({
      client: req.user,
      serviceProviders,
    });

    const messages = serviceProviders.map((user) => ({
      to: user.id,
      subject: `Solicitação de serviço - ${roomId}`,
      content: `Você tem uma nova solicitação de serviço.`,
    }));

    await services.notification.send(messages);

    const match = new Match({
      clientId: req.user.id,
      serviceProviderId: serviceProviders[0].id,
      status: "PENDING",
    });

    await services.matchsRepository.create(match);

    return res
      .status(200)
      .send({ roomId, match: MatchPresenter.toHTTP(match) });
  } catch (error) {
    next(error);
  }
}
