import {getMe, login, logout, signUp} from "@/controllers/auth.controller";
import {authenticateToken, AuthenticatedRequest} from "@/middlewares/auth.middleware";
import express, {Response, NextFunction} from "express";
import {Request} from "express";

const router = express.Router();

// public routes
router.post("/signup", signUp);
router.post("/login", login);
router.post("/logout", logout);

// protected route example

router.use((req: Request, res: Response, next: NextFunction) => {
    authenticateToken(req as AuthenticatedRequest, res, next);
});

router.get("/me", (req: Request, res: Response) => {
    getMe(req as AuthenticatedRequest, res);
});

export default router;
