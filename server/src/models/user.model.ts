import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import type {NextFunction} from "express";

export interface IUser extends mongoose.Document {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    profilePic: string;
    secure_url: string;
    public_id: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new mongoose.Schema<IUser>(
    {
        firstName: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 50,
            trim: true,
        },
        lastName: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 50,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            match: [/^\S+@\S+\.\S+$/, "Please use a valid email address."],
        },
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        profilePic: {
            type: String,
            default: "",
        },
        secure_url: {
            type: String,
            default: "",
        },
        public_id: {
            type: String,
            default: "",
        },
        password: {
            type: String,
            required: true,
        },
    },
    {timestamps: true}
);

const User = mongoose.model<IUser>("User", userSchema);

export default User;
