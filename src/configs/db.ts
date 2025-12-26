import mongoose from "mongoose";
import { env } from "../utils/env";

export const ConnectDB = mongoose.connect(`${env.MONGODB_CONNECTION_STRING}`)