import mongoose from "mongoose";

let isConnected = false;

export const connectDB = async () => {
  if (isConnected) return;

  const uri = process.env.MONGODB_URI;

  if (!uri) {
    // Avoid crashing at build-time. Fail fast only when actually trying to connect.
    console.warn("⚠️ MONGODB_URI is not set. Skipping DB connection.");
    return;
  }

  try {
    await mongoose.connect(uri);
    isConnected = true;
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw new Error("Failed to connect to MongoDB");
  }
};
