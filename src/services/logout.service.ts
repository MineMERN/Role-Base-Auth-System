import { RefreshToken } from "../models/sessionSchema.model";

export const revokeRefreshToken = async (oldRefreshToken: string) => {
    const [tokenId] = oldRefreshToken.split(".");

    await RefreshToken.findOneAndUpdate(
        {tokenId, revoked: false},
        {revoked: true}
    )

    return;
}