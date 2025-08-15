// Libraries
import { Router } from "express";

// Controllers
import { fetchMatch } from "./controllers/fetch-match";
import { createMatch } from "./controllers/request-service-provider";
import { registerInterest } from "./controllers/register-interest";

// Middlewares
import { ensureAuthenticated } from "./middlewares/ensure-authenticated";

export const router = Router();

router.get("/match/:id", ensureAuthenticated, fetchMatch);
router.post("/match", ensureAuthenticated, createMatch);

router.post("/early-adopter", registerInterest);
