import { RefreshToken } from "../models/sessionSchema.model";
import { User } from "../models/userSchema.models";
import bcrypt from "bcrypt"
import { ApiError } from "../utils/ApiError";
import { HttpStatus } from "../configs/status";
import { createAccessToken, createRefreshToken } from "../utils/token";
import { env } from "../utils/env";

export const rotateRefreshToken = async(oldRefreshToken: string) => {
    const [tokenId] = oldRefreshToken.split(".");

    const session = await RefreshToken.findOne({
        tokenId,
        revoked: false
    })

    if(!session) throw new ApiError(HttpStatus.UNAUTHORIZED)

    if(session.expiresAt.getTime() < Date.now()) throw new ApiError(HttpStatus.UNAUTHORIZED, "Refresh token expired")

    const isValid = await bcrypt.compare(oldRefreshToken, session.tokenHash)
    if(!isValid) throw new ApiError(HttpStatus.UNAUTHORIZED)
    
    const user = await User.findById(session.userId)
    if(!user){throw new ApiError(HttpStatus.NOT_FOUND)}

    const accessToken = createAccessToken({
        id: user._id.toString(),
        role: user.role
    })
        
    const { tokenId: newTokenId, refreshToken: newRefreshToken} = createRefreshToken()

    const newHash = await bcrypt.hash(
        newRefreshToken,
        Number(env.SALT_WORK_FACTOR)
    )

    await RefreshToken.findOneAndUpdate(
        {_id: session._id, revoked: false},
        {
            tokenId: newTokenId,
            tokenHash: newHash,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        }
    )
    return {accessToken, refreshToken: newRefreshToken}
}