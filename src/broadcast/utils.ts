// Entities
import { User } from "src/entities/user";

// Libraries
import { WebSocket } from "ws";

export enum BroadcastMatchStatus {
  ACCEPTED = "MATCH_ACCEPTED",
  DECLINED = "MATCH_DECLINED",
  CLOSED = "MATCH_CLOSED",
  CANCELED = "MATCH_CANCELED",
}

export interface RoomParticipant {
  user: User;
  socket: WebSocket | null;
}
