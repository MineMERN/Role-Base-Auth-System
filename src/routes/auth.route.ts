import { signupMiddlewareAuth, loginMiddlewareAuth } from "../middlewares/auth.middleware";
import e from "express";
import { register } from "../controllers/signup.controller";
import { loginRateLimit } from "../middlewares/rateLimit.middleware";
import { logout } from "../controllers/logout.controller";
import { login } from "../controllers/login.controller";
import { refresh } from "../controllers/refresh.controller";

export const auth = e()

auth.post("/signup", signupMiddlewareAuth, register)
auth.post("/login", loginRateLimit, loginMiddlewareAuth, login)
auth.post("/refresh", refresh)
auth.post("/logout", logout)