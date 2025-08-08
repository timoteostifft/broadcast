// Environment
import "dotenv/config";

// Libraries
import express from "express";
import cors from "cors";

// Router
import { router } from "./router";

// Errors
import { handler } from "./errors/handler";

const server = express();

server.use(cors());
server.use(express.json());
server.use(router);
server.use(handler);

server.listen(3333, () => console.log("🚀 Servidor HTTP rodando!"));
