import {login, logout, signUp} from "@/controllers/auth.controller";
import {authenticateToken, AuthenticatedRequest} from "@/middlewares/auth.middleware";
import express, {Response, NextFunction} from "express";
import {Request} from "express";

const router = express.Router();

// public routes
router.post("/signup", signUp);
router.post("/login", login);
router.post("/logout", logout);

// protected routes
router.use((req, res, next) => {
    Promise.resolve(authenticateToken(req as AuthenticatedRequest, res as Response, next as NextFunction)).catch(next);
});

router.get("/check-auth", (req: Request, res: Response) => {
    res.status(200).json({message: "Authenticated", user: (req as any).user});
});

export default router;
