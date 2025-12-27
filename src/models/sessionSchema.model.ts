import mongoose from "mongoose";

const refreshTokenSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  tokenId: {type: String, require: true},
  tokenHash: { type: String, required: true },
  expiresAt: { type: Date, required: true },
  revoked: { type: Boolean, default: false },
});


export const RefreshToken = mongoose.model(
  "RefreshToken",
  refreshTokenSchema
);
