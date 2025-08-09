// Entities
import { User } from "src/entities/user";

// Libraries
import { WebSocket } from "ws";

export enum BroadcastMatchStatus {
  ACCEPT_MATCH = "MATCH_ACCEPTED",
  DECLINE_MATCH = "MATCH_DECLINED",
  CLOSE_MATCH = "MATCH_CLOSED",
  CANCEL_MATCH = "MATCH_CANCELED",
}

export interface RoomParticipant {
  user: User;
  socket: WebSocket | null;
}
