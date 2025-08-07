// Libraries
import { Router } from "express";

// Controllers
import { matchServiceProvider } from "./controllers/match-service-provider";

export const router = Router();

router.get("/match-service-provider", matchServiceProvider);
