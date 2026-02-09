import type {Request, Response} from "express";
import {prisma} from "@/configurations/prisma";
import bcrypt from "bcryptjs";
import {upsertStreamUser} from "@/libraries/stream";
import {generateToken} from "@/libraries/generateToken";

export const signUp = async (req: Request, res: Response) => {
    try {
        const {firstName, lastName, email, password} = req.body;

        if (!firstName || !lastName || !email || !password) {
            res.status(400).json({message: "All fields are required."});
        }

        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (user) {
            res.status(400).json({message: "User already exists, please login instead"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await prisma.user.create({
            data: {
                firstName,
                lastName,
                email,
                username: email.split("@")[0],
                password: hashedPassword,
            },
        });

        // create stream user here
        await upsertStreamUser({
            id: newUser.id.toString(),
            name: `${newUser.firstName} ${newUser.lastName}`,
            image: newUser.profilePic || "",
        });

        // generate token
        await generateToken(newUser.id.toString(), res);

        // @ts-ignore
        res.status(201).json({message: "User registered successfully", user: {...newUser, password: undefined}});
    } catch (error: any) {
        console.log("Error in signup controller", error);
        res.status(500).json({message: error.message});
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const {email, password} = req.body;

        if (!email || !password) {
            res.status(400).json({message: "All fields are required."});
        }

        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (!user) {
            res.status(400).json({message: "Invalid credentials."});
            return;
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            res.status(400).json({message: "Invalid credentials."});
            return;
        }

        // generate token
        await generateToken(user.id.toString(), res);

        res.status(200).json({
            message: "User logged in successfully",
            user: {
                // @ts-ignore
                ...user._doc,
                password: undefined,
            },
        });
    } catch (error: any) {
        console.log("Error in signin controller", error);
        res.status(500).json({message: error.message});
    }
};

export const logout = async (req: Request, res: Response) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 0,
        });

        res.status(200).json({message: "User logged out successfully"});
    } catch (error: any) {
        console.log("Error in logout controller", error);
        res.status(500).json({message: error.message});
    }
};

export const getMe = async (req: Request, res: Response) => {
    try {
        // Assuming authenticateToken attaches user to req
        // @ts-expect-error: user is attached by authenticateToken middleware
        res.status(200).json(req.user);
    } catch (error: any) {
        console.log("Error in getMe controller", error);
        res.status(500).json({message: error.message});
    }
};
