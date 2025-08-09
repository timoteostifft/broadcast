// Libraries
import { Router } from "express";

// Controllers
import { createMatch } from "./controllers/request-service-provider";

// Middlewares
import { ensureAuthenticated } from "./middlewares/ensure-authenticated";
import { fetchMatch } from "./controllers/fetch-match";

export const router = Router();

router.post("/match", ensureAuthenticated, createMatch);

router.get("/match/:id", ensureAuthenticated, fetchMatch);
