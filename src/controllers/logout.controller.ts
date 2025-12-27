import { Request, Response } from "express"
import { clearRefreshTokenCookie } from "../configs/cookie"
import { revokeRefreshToken } from "../services/logout.service"
import { ApiResponce } from "../utils/ApiResponce"

export const logout = async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken;
    if(refreshToken) {
        await revokeRefreshToken(refreshToken)
    }
    
    clearRefreshTokenCookie(res)

    res.status(200).json(new ApiResponce(true, "Logged out successfully"))
}