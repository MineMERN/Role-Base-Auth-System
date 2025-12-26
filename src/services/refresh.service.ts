import { RefreshToken } from "../models/sessionSchema.model";
import { User } from "../models/userSchema.models";
import bcrypt from "bcrypt"
import { ApiError } from "../utils/ApiError";
import { HttpStatus } from "../configs/status";
import { accessToken, refreshToken } from "../utils/token";
import { env } from "../utils/env";

export const rotateRefreshToken = async(oldRefreshToken: string) => {
    const tokens = await RefreshToken.find({revoked: false})
    let matchData = null;
    for(const token of tokens) {
        if(await bcrypt.compare(oldRefreshToken, token.tokenHash)){
            matchData = token;
            break
        }   
    }
    if(!matchData || new Date(matchData.expiresAt).getTime() < Date.now()){
        console.log("hello")
        throw new ApiError(HttpStatus.NOT_FOUND)
    }
    const user = await User.findById(matchData.userId)
    if(!user) throw new ApiError(HttpStatus.NOT_FOUND)
    const access_token = accessToken({id: user._id.toString(), role: user.role})
    const refresh_token = refreshToken();
    const refresh_token_hashed = await bcrypt.hash(refresh_token, Number(env.SALT_WORK_FACTOR))
    await RefreshToken.updateOne({userId: matchData.userId}, {tokenHash: refresh_token_hashed, expiresAt: new Date(Date.now() + 7*24*60*60*1000)})
    return {access_token, refresh_token}
}