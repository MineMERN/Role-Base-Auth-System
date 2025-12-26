import dotenv from "dotenv"
dotenv.config();
export const env = {
    PORT: process.env.PORT,
    MONGODB_CONNECTION_STRING: process.env.MONGODB_CONNECTION_STRING,
    SALT_WORK_FACTOR: process.env.SALT_WORK_FACTOR,
    JWT_SECREATE_KYE : process.env.JWT_SECREATE_KYE
}