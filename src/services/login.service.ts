import { accessToken, refreshToken } from "../utils/token";
import { User } from "../models/userSchema.models";
import { RefreshToken } from "../models/sessionSchema.model";
import { UserLoginDetails } from "../types/auth.types";
import { ensure } from "../utils/ensure";
import { HttpStatus } from "../configs/status";
import bcrypt from "bcrypt"
import { env } from "../utils/env";
import { ApiError } from "../utils/ApiError";

export const loginService = async (userDetails:UserLoginDetails) => {
    const user = await User.findOne({email: userDetails.email}).select("+password")
    ensure(user, HttpStatus.UNAUTHORIZED)
    // if(!user) {
    //     throw new ApiError(HttpStatus.UNAUTHORIZED)
    // }
    const isPasswordValid = await bcrypt.compare(userDetails.password, user.password)
    if(!isPasswordValid){
        throw new ApiError(HttpStatus.UNAUTHORIZED, "Invalid email or password")
    }
    const access_token = accessToken({id: user._id.toString(), role: user.role});
    const refresh_token = refreshToken();
    const refresh_token_hashed = await bcrypt.hash(refresh_token, Number(env.SALT_WORK_FACTOR))
    await RefreshToken.create({
        userId: user._id,
        tokenHash: refresh_token_hashed,
        expiresAt: new Date(Date.now() + 7*24*60*60*1000)
    })
    return {user, token: {access_token, refresh_token}}
}