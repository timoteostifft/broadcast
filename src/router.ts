// Libraries
import { Router } from "express";

// Controllers
import { matchServiceProvider } from "./controllers/match-service-provider";

export const router = Router();

router.post("/match-service-provider", matchServiceProvider);
