// Environment
import "dotenv/config";

// Libraries
import express from "express";
import cors from "cors";

// Broadcast
import { Broadcast } from "./broadcast";

// Router
import { router } from "./router";

const server = express();

server.use(cors());
server.use(express.json());
server.use(router);

server.listen(3333, () => console.log("🚀 Servidor HTTP rodando!"));
