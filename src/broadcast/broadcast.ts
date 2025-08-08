// Libraries
import { WebSocket, WebSocketServer } from "ws";
import { randomUUID } from "crypto";
import { URL } from "url";

// Environment
import { env } from "../env";
import { BroadcastMatchResponse } from "./enun";

export type BroadcastRequestCode = (typeof Broadcast.codes)[number];

export class Broadcast {
  private rooms = new Map<string, Set<WebSocket>>();

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
    this.rooms.set("1", new Set());

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

      room.add(client);

      client.on("message", (data) => {
        try {
          const payload = JSON.parse(data.toString());

          if (!Broadcast.codes.includes(payload.code)) {
            return;
          }

          const code = payload.code as BroadcastRequestCode;

          // switch (code) {
          //   case "ACCEPT_MATCH":
          //     break;
          //   case "DECLINE_MATCH":
          //     break;
          //   case "END_MATCH":
          //     break;
          //   case "CANCEL_MATCH":
          //     break;
          //   default:
          //     return;
          // }

          for (const client of room) {
            client.send(
              JSON.stringify({
                code: BroadcastMatchResponse[code],
              })
            );
          }
        } catch (error) {
          return;
        }

        client.on("close", () => {
          room.delete(client);
          // if (!room.size) {
          //   this.rooms.delete(roomId);
          // }
        });
      });
    });
  }

  async open() {
    const roomId = randomUUID();

    this.rooms.set(roomId, new Set());

    return roomId;
  }

  static codes = [
    "ACCEPT_MATCH",
    "DECLINE_MATCH",
    "END_MATCH",
    "CANCEL_MATCH",
  ] as const;
}
