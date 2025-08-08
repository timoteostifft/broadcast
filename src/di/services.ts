// Broadcast
import { Broadcast } from "src/broadcast/broadcast";

// Database
import { UsersRepository } from "src/database/users";

export const services = {
  broadcast: new Broadcast(),
  usersRepository: new UsersRepository(),
};
