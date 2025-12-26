import { Request, Response } from "express";
import * as service from "../services/signup.service";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponce } from "../utils/ApiResponce";
import { setRefreshTokenCookie } from "../configs/cookie";

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { email, password, role } = req.body;
  const {user, token} = await service.createUser({ email, password, role });
  const cookie = setRefreshTokenCookie(token.refresh_token, res)
  res.status(201).json(
    new ApiResponce(true, "User registered successfully", {user, token, cookie})
  );
});
