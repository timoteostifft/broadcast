// Libraries
import { WebSocket, WebSocketServer } from "ws";
import { randomUUID } from "crypto";
import { URL } from "url";

// Environment
import { env } from "./env";

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
    });
  }

  async open() {
    const roomId = randomUUID();

    this.rooms.set(roomId, new Set());

    return roomId;
  }
}
