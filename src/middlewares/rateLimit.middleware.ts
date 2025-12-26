import rateLimit from "express-rate-limit";
import { ApiError } from "../utils/ApiError";
import { HttpStatus } from "../configs/status";

export const loginRateLimit = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res, next, option) => {
        next(new ApiError(HttpStatus.TOO_MANY_REQUESTS))
    }
})

export const apiRateLimit = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res, next, option) => {
        next(new ApiError(HttpStatus.TOO_MANY_REQUESTS))
    }
})