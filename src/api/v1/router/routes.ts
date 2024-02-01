import { Router } from "express";
import { getZodiacSignController } from "../modules";

export const router: Router = Router();

// Zodiac sign controller
router.get("/get-zodiac-sign", getZodiacSignController);

export const routeV1 = router;
