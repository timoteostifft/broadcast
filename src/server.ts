// Environment
import "dotenv/config";

// Libraries
import express from "express";
import cors from "cors";
import https from "https";
import fs from "fs";

// Router
import { router } from "./router";

// Errors
import { handler } from "./errors/handler";

const server = express();

server.use(cors());

server.use(express.json());
server.use(router);
server.use(handler);

https
  .createServer(
    {
      key: fs.readFileSync("key.pem"),
      cert: fs.readFileSync("cert.pem"),
    },
    server
  )
  .listen(8080, () => {
    console.log("🚀 Servidor HTTPS rodando!");
  });
