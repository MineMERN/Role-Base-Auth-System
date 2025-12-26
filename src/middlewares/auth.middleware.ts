import { Request, Response, NextFunction } from "express";
import * as schema from "../validators/auth.validators";
import { ApiError } from "../utils/ApiError";
import { HttpStatus } from "../configs/status";

export const signupMiddlewareAuth = (req: Request, res: Response, next: NextFunction
) => {
  const result = schema.signupSchema.safeParse(req.body);
  if (!result.success) {
    throw new ApiError(
      HttpStatus.BAD_REQUEST,
      result.error.issues.map(e => e.message).join(", ")
    );
  }
  req.user = result.data;
  next();
};

export const loginMiddlewareAuth = (req: Request, res: Response, next: NextFunction) => {
  const result = schema.loginSchema.safeParse(req.body);
  if(!result.success){
    throw new ApiError(HttpStatus.BAD_REQUEST, result.error.issues.map(e => e.message).join(", "))
  }
  req.user = result.data;
  next();
}