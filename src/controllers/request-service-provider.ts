// Libraries
import { NextFunction, Request, Response } from "express";

// DI
import { services } from "src/di/services";

// Errors
import { InternalError } from "src/errors/error";
import { ErrorCodes } from "src/errors/utils";

export async function requestServiceProvider(
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

    console.log({
      client: req.user,
      serviceProviders,
    });

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

    return res.status(200).send({ roomId });
  } catch (error) {
    next(error);
  }
}
