import mongoose, {Schema, Document} from "mongoose";
import bcrypt from "bcrypt"
import { env } from "../utils/env";

interface IUser extends Document {
    email: string;
    password: string
    role: "Admin" | "User"
}

const userSchema = new Schema<IUser>({
    email: {type: String, required: true},
    password: {type: String, required: true, select: false},
    role: {type: String, required: true}
})

userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
    const saltRounds = Number(env.SALT_WORK_FACTOR) || 10;
    this.password = await bcrypt.hash(this.password, saltRounds)
})


export const User = mongoose.model<IUser>("users", userSchema)