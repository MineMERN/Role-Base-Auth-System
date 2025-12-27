import { Request, Response } from "express";
import { loginService } from "../services/login.service";
import { ApiResponce } from "../utils/ApiResponce";
import { setRefreshTokenCookie } from "../configs/cookie";
import { asyncHandler } from "../utils/asyncHandler";

export const login = asyncHandler(async(req: Request, res: Response) => {
  const {user, token} = await loginService(req.user);
  const cookie = setRefreshTokenCookie(token.refreshToken, res)
  res.status(200).json(
    new ApiResponce(true, `Login successfull! Welcome ${user.email}, ${user.role}`, {token: token.accessToken, cookie})
  )
})