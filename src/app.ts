import e from "express";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import { auth } from "./routes/auth.route";
import cookieParser from "cookie-parser";
import { apiRateLimit } from "./middlewares/rateLimit.middleware";

export const app = e();

app.use(e.json())
app.use(cookieParser())
app.use(apiRateLimit)
app.use("/auth", auth)
app.use(errorHandler) // This should always be on the last
