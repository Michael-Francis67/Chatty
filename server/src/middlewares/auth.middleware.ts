import jwt, {JwtPayload} from "jsonwebtoken";
import {Request, Response, NextFunction} from "express";
import User, { IUser } from "../models/user.model";

export interface AuthenticatedRequest extends Request {
    user: IUser | null;
}

export const authenticateToken = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        return res.status(401).json({message: "Access Denied. No token provided."});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as jwt.JwtPayload;

        if (!decoded) {
            return res.status(401).json({message: "Access Denied. Invalid token."});
        }

        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            return res.status(401).json({message: "Access Denied. User not found."});
        }

        req.user = user;

        next();
    } catch (error) {
        return res.status(401).json({message: "Access Denied. Invalid token."});
    }
};
