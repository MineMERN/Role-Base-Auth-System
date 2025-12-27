import { Response } from "express";

export const clearRefreshTokenCookie = (res: Response) => {
  res.clearCookie("refreshToken", {
    path: "/auth/refresh"
  })
}

export const setRefreshTokenCookie = (refreshToken: string, res: Response) => {
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
    // path: "/auth/refresh",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  })
  return "Cookie created successfully"
}
  // export const createCookie = (token: string, res: Response): string => {
  //   res.cookie("access_token", `Bearer ${token}`, {
  //     httpOnly: true,
  //     secure: false,
  //     // secure: process.env.NODE_ENV === "production",
  //     sameSite: "strict",
  //     maxAge: 60 * 60 * 1000, // 1 hour
  //   });
  //   return "Cookie created successfully"
  // };