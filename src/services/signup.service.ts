import { User } from "../models/userSchema.models";
import { ApiError } from "../utils/ApiError";
import * as UserI  from "../types/auth.types";
import bcrypt from "bcrypt"
import { RefreshToken } from "../models/sessionSchema.model";
import { createAccessToken, createRefreshToken } from "../utils/token";
import { env } from "../utils/env";
import { HttpStatus } from "../configs/status";

export const createUser = async (userDetails: UserI.UserSignupDetails) => {
  // Find User
  const isUserExist = await User.findOne({ email: userDetails.email });
  // Check if Exits
  if (isUserExist) {
    throw new ApiError(HttpStatus.CONFLICT, "User already exists!");
  }
  // Create new user
  const user = new User(userDetails);
  // Store user in DB
  await user.save();

  // Create access token
  const accessToken = createAccessToken({id: user._id.toString(), role: user.role})
  // Create refresh token and token Id
  const {tokenId, refreshToken} = createRefreshToken()
  // Create hash refresh token
  const refreshTokenHashed = await bcrypt.hash(refreshToken, Number(env.SALT_WORK_FACTOR))
  // 
  await RefreshToken.create({
    userId: user._id,
    tokenId,
    tokenHash: refreshTokenHashed,
    expiresAt: new Date(Date.now() + 7 *24*60*60*1000)
  })
  return {user, token: {accessToken, refreshToken}};
};
