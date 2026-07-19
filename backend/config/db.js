import mongoose from "mongoose";

export const connectDB = async () => {
    const mongoUri = process.env.MONGO_URI;

    if (!mongoUri) {
        console.warn("DB not configured. Skipping MongoDB connection.");
        return;
    }

    try {
        await mongoose.connect(mongoUri);
        console.log("DB CONNECTED");
    } catch (error) {
        console.error("MongoDB Error:", error);
    }
};