import { Request, Response, NextFunction } from "express";
import { ApiResponce } from "../utils/ApiResponce";
import { ApiError } from "../utils/ApiError";

export const errorHandler = (err: unknown, req: Request, res: Response, next : NextFunction, ) => {
    if (err instanceof ApiError){
        return res.status(err.statusCode).json(new ApiResponce(false, err.message))
    }
    return res.status(500).json(new ApiResponce(false, "Internal Server Error!"))
}