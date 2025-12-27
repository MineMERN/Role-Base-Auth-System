import jwt, {JwtPayload} from "jsonwebtoken"
import crypto from "crypto"
import { env } from "./env"

export const createToken = (payload: object) => {
    return jwt.sign(payload, `${env.JWT_SECREATE_KYE}`, {expiresIn: "10m"})
}

export const createAccessToken = (user: {id: string, role: "Admin" | "User"}) => {
    return jwt.sign({sub: user.id, role: user.role}, `${env.JWT_SECREATE_KYE}`, {expiresIn: "1m"})
}

export const createRefreshToken = () => {
    const tokenId = crypto.randomUUID()
    const rawToken= crypto.randomBytes(64).toString("hex")
    return {
        tokenId,
        refreshToken: `${tokenId}.${rawToken}`
    }
}

export const verifyToken = <T extends JwtPayload = JwtPayload>(token: string): T => {
    return jwt.verify(token, `${env.JWT_SECREATE_KYE}`) as T;
}