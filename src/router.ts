// Libraries
import { Router } from "express";

// Controllers
import { requestServiceProvider } from "./controllers/request-service-provider";

export const router = Router();

router.post("/request-service-provider", requestServiceProvider);
