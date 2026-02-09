import dotenv from "dotenv";

dotenv.config({path: "./.env.local", quiet: true});

export const ENV = {
    PORT: process.env.PORT || 5000,
    DATABASE_URL: process.env.DATABASE_URL || "",
    NODE_ENV: process.env.NODE_ENV || "development",
    JWT_SECRET: process.env.JWT_SECRET || "",
    CLIENT_URL: process.env.CLIENT_URL || "",
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || "",
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || "",
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET || "",
    ARCJET_KEY: process.env.ARCJET_KEY || "",
    ARCJET_ENV: process.env.ARCJET_ENV || "production",
    STREAM_API_KEY: process.env.STREAM_API_KEY || "",
    STREAM_API_SECRET: process.env.STREAM_API_SECRET || "",
}