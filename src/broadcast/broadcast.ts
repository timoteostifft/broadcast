// Libraries
import { WebSocketServer } from "ws";
import { randomUUID } from "crypto";
import { URL } from "url";

// Environment
import { env } from "../env";

// Broadcast
import { BroadcastMatchStatus, RoomParticipant } from "./utils";

// Entities
import { User } from "src/entities/user";

export type BroadcastCode = (typeof Broadcast.codes)[number];

interface BroadcastOpenRequest {
  client: User;
  serviceProviders: User[];
}

interface ChooseMatchStatusRequest {
  status: BroadcastCode;
  isParticipantInvolvedInMatchUpdate: boolean;
}

export class Broadcast {
  private rooms = new Map<string, Map<string, RoomParticipant>>();

  private server = new WebSocketServer({
    port: env.WS_PORT,
    verifyClient: (info, done) => {
      if (info.req.headers["authorization"] !== env.BROADCAST_AUTHORIZATION) {
        done(false, 401);
      } else {
        done(true);
      }
    },
  });

  constructor() {
    this.server.on("connection", (client, req) => {
      if (!req.url) {
        client.close(1003);
        return;
      }

      const url = new URL(req.url, `ws://${env.SERVER}:${env.WS_PORT}`);

      const roomId = url.searchParams.get("roomId");

      if (!roomId) {
        return client.close(1003);
      }

      const room = this.rooms.get(roomId);

      if (!room) {
        return client.close(1003);
      }

      const userId = url.searchParams.get("userId");

      if (!userId) {
        return client.close(1003);
      }

      const participant = room.get(userId);

      if (!participant) {
        return client.close(1003);
      }

      participant.socket = client;

      client.on("message", (data) => {
        try {
          const payload = JSON.parse(data.toString());

          if (!Broadcast.codes.includes(payload.code)) {
            return;
          }

          const code = payload.code as BroadcastCode;

          // switch (code) {
          //   case "ACCEPT_MATCH":
          //     break;
          //   case "DECLINE_MATCH":
          //     break;
          //   case "CANCEL_MATCH":
          //     break;
          //   default:
          //     return;
          // }

          for (const participant of room.values()) {
            if (!participant.socket) {
              continue;
            }

            const status = this.chooseMatchStatus({
              status: code,
              isParticipantInvolvedInMatchUpdate:
                participant.user.id === userId ||
                participant.user.role === "CLIENT",
            });

            if (status) {
              participant.socket.send(JSON.stringify({ status }));
            }

            const shouldDisconnectParticipant =
              status !== BroadcastMatchStatus.ACCEPTED;

            if (shouldDisconnectParticipant) {
              participant.socket.close();
            }
          }
        } catch (error) {
          return client.close(1003);
        }
      });

      client.on("close", () => {
        room.delete(userId);

        if (!room.size) {
          this.rooms.delete(roomId);
        }
      });
    });
  }

  async open({ client, serviceProviders }: BroadcastOpenRequest) {
    const roomId = randomUUID();

    const participants = new Map<string, RoomParticipant>();

    participants.set(client.id, { user: client, socket: null });

    serviceProviders.forEach((provider) => {
      participants.set(provider.id, { user: provider, socket: null });
    });

    this.rooms.set(roomId, participants);

    return roomId;
  }

  private chooseMatchStatus({
    status,
    isParticipantInvolvedInMatchUpdate,
  }: ChooseMatchStatusRequest): BroadcastMatchStatus | null {
    switch (status) {
      case "ACCEPT_MATCH":
        return isParticipantInvolvedInMatchUpdate
          ? BroadcastMatchStatus.ACCEPTED
          : BroadcastMatchStatus.CLOSED;
      case "DECLINE_MATCH":
        return isParticipantInvolvedInMatchUpdate
          ? BroadcastMatchStatus.DECLINED
          : null;
      case "CANCEL_MATCH":
        return isParticipantInvolvedInMatchUpdate
          ? BroadcastMatchStatus.CANCELED
          : BroadcastMatchStatus.CLOSED;
    }
  }

  static codes = ["ACCEPT_MATCH", "DECLINE_MATCH", "CANCEL_MATCH"] as const;
}
