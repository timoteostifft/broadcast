// Libraries
import { Router } from "express";

// Controllers
import { requestServiceProvider } from "./controllers/request-service-provider";

// Middlewares
import { ensureAuthenticated } from "./middlewares/ensure-authenticated";

export const router = Router();

router.post(
  "/request-service-provider",
  ensureAuthenticated,
  requestServiceProvider
);
