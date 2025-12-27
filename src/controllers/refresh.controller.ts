import { rotateRefreshToken } from "../services/refresh.service";
import { Request, Response } from "express";
import { setRefreshTokenCookie } from "../configs/cookie";
import { ApiResponce } from "../utils/ApiResponce";

export const refresh = async (req: Request, res: Response) => {
    const oldRefreshToken = req.cookies.refreshToken;

    const {accessToken, refreshToken} = await rotateRefreshToken(oldRefreshToken)
    setRefreshTokenCookie(refreshToken, res)

    res.status(200).json(new ApiResponce(true, "Token refresh Successfully", {AccessToken: accessToken}))
}