import { Application, Request, Response } from "express";
import { routeV1 } from "../api/v1";

export const routes = (app: Application) => {
    const baseUrl = process.env.BASE_URL || "/api/v1";

    // Base url request handler
    app.get("/", (_: Request, res: Response) => {
        return res.status(200).json({
            message: `Zogac app running on ${process.env.NODE_ENV} environment...`,
        });
    });

    // URLs of application
    app.use(baseUrl, routeV1);
};
