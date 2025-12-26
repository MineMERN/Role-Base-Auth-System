import { rotateRefreshToken } from "../services/refresh.service";
import { Request, Response } from "express";
import { setRefreshTokenCookie } from "../configs/cookie";
import { ApiResponce } from "../utils/ApiResponce";

export const refresh = async (req: Request, res: Response) => {
    const oldRefreshToken = req.cookies.refreshToken;
    const {access_token, refresh_token} = await rotateRefreshToken(oldRefreshToken)
    setRefreshTokenCookie(refresh_token, res)
    res.status(200).json(new ApiResponce(true, "Token refresh Successfully", access_token))
}