const zodiac = require("zodiac-signs")("fr");

import { StatusCodes } from "http-status-codes";
import { QueryParams } from "./type";

export const zodiacSignService = {
    getSign(params: QueryParams) {
        const { day, month } = params;
        const sign = zodiac.getSignByDate({ day, month }, "fr");

        const errors: any = {
            "-1": "Day or Month must be a valid value\n.[Valid Day]: [1;31].\n[Valid month]: [1;12].",
            "-2": "Name or Symbol is invalid.\nGive a zodiac signs' names or zodiac signs' symbols.",
        };

        const error = errors[sign];
        if (!error) {
            return {
                error: null,
                code: StatusCodes.OK,
                data: errors[sign] || sign,
            };
        }

        return {
            error,
            data: null as any,
            code: StatusCodes.BAD_GATEWAY,
        };
    },
};
