// Broadcast
import { Broadcast } from "src/broadcast/broadcast";

// Database
import { UsersRepository } from "src/repositories/users";
import { MatchsRepository } from "src/repositories/matchs";
import { EarlyAdoptersRepository } from "src/repositories/early-adopters";

// Notification
import { Notification } from "src/notification/notification";

export const services = {
  broadcast: new Broadcast(),
  notification: new Notification(),
  usersRepository: new UsersRepository(),
  matchsRepository: new MatchsRepository(),
  earlyAdoptersRepository: new EarlyAdoptersRepository(),
};
