import mongoose from "mongoose";

const connectionString = process.env.ATLAS_URI || "";

export async function conn() {
    try {
        await mongoose.connect(connectionString);
        console.log('Connected to MongoDB with Mongoose.');
    } catch (error) {
        console.log(error);
    }
}