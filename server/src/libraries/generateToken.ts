import jwt, {JwtPayload} from "jsonwebtoken";
import type {Response} from "express";

export const generateToken = async (userId: JwtPayload["userId"], res: Response) => {
    try {
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined in environment variables");
        }

        const token = jwt.sign({userId}, process.env.JWT_SECRET, {
            expiresIn: "7d", // Token valid for 7 days
        });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        return token;
    } catch (error: Error | unknown) {
        console.log("Error generating token:", (error as Error).message);
        throw error;
    }
};
