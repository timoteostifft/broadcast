// Broadcast
import { Broadcast } from "src/broadcast/broadcast";

// Database
import { UsersRepository } from "src/database/users";
import { MatchsRepository } from "src/database/matchs";
import { EarlyAdoptersRepository } from "src/database/early-adopters";

// Notification
import { Notification } from "src/notification/notification";

export const services = {
  broadcast: new Broadcast(),
  notification: new Notification(),
  usersRepository: new UsersRepository(),
  matchsRepository: new MatchsRepository(),
  earlyAdoptersRepository: new EarlyAdoptersRepository(),
};
