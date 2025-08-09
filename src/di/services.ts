// Broadcast
import { Broadcast } from "src/broadcast/broadcast";
import { MatchsRepository } from "src/database/matchs";

// Database
import { UsersRepository } from "src/database/users";

// Notification
import { Notification } from "src/notification/notification";

export const services = {
  broadcast: new Broadcast(),
  notification: new Notification(),
  usersRepository: new UsersRepository(),
  matchsRepository: new MatchsRepository(),
};
