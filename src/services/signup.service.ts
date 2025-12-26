import { User } from "../models/userSchema.models";
import { ApiError } from "../utils/ApiError";
import * as UserI  from "../types/auth.types";
import bcrypt from "bcrypt"
import { RefreshToken } from "../models/sessionSchema.model";
import { accessToken, refreshToken } from "../utils/token";
import { env } from "../utils/env";
import { HttpStatus } from "../configs/status";

export const createUser = async (userDetails: UserI.UserSignupDetails) => {
  const isUserExist = await User.findOne({ email: userDetails.email });
  if (isUserExist) {
    throw new ApiError(HttpStatus.CONFLICT, "User already exists!");
  }
  const user = new User(userDetails);
  await user.save();
  const access_token = accessToken({id: user._id.toString(), role: user.role})
  const refresh_token = refreshToken()
  const refresh_token_hashed = await bcrypt.hash(refresh_token, Number(env.SALT_WORK_FACTOR))
  await RefreshToken.create({
    userId: user._id,
    tokenHash: refresh_token_hashed,
    expiresAt: new Date(Date.now() + 7 *24*60*60*1000)
  })
  return {user, token: {access_token, refresh_token}};
};
