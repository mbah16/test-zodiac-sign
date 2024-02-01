import cors from "cors";
import express from "express";
import { routes } from "../routes";

export const app: express.Application = express();

app.use(cors({ origin: "*", optionsSuccessStatus: 200 }));

// Mapping Routes
routes(app);
