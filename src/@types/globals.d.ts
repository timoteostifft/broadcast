import "@goodrequest/joi-type-extract";

// Entities
import { User } from "src/entities/user";

declare global {
  namespace Express {
    interface Request {
      user: User;
    }
  }
}
