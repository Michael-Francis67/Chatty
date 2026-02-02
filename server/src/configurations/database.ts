import mongoose from "mongoose";

const connectDB = async (MONGO_URI: string): Promise<void> => {
    try {
        if (!MONGO_URI) {
            throw new Error("MONGO_URI is not defined in environment variables");
        }

        await mongoose.connect(MONGO_URI, {
            dbName: "chatty",
        });
        console.log("Connected to the database successfully.");
    } catch (error) {
        console.error("Error connecting to the database:", error);
        process.exit(1);
    }
};

export default connectDB;
