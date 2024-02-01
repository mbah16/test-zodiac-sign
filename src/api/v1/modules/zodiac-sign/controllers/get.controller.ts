import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { zodiacSignService } from "../services";

export const getZodiacSignController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let { day = 1, month = 1 } = req.query as any;

    try {
        const response = zodiacSignService.getSign({ day, month });
        return res.status(response.code).json(response);
    } catch (error) {
        next({
            data: null as any,
            error: error.stack,
            message: error.message,
            code: StatusCodes.INTERNAL_SERVER_ERROR,
        });
    }
};
