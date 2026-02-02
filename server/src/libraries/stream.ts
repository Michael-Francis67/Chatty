import {StreamChat} from "stream-chat";
import dotenv from "dotenv";

dotenv.config({path: "./.env.local"});

const apiKey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET;

if (!apiKey || !apiSecret) {
    throw new Error("Stream API key or secret is not defined in environment variables");
}

const client = StreamChat.getInstance(apiKey, apiSecret);

export interface StreamUserData {
    id: string;
    name: string;
    image: string;
}

export const upsertStreamUser = async (userData: StreamUserData) => {
    try {
        const streamUser = await client.upsertUser(userData);

        return streamUser;
    } catch (error) {
        throw new Error("Failed to upsert Stream user: " + (error as Error).message);
    }
};
