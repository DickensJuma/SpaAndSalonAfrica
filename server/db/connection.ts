import mongoose from "mongoose";

/**
 * Connect to MongoDB database
 */
export async function connectDatabase(): Promise<void> {
  try {
    const mongoUri = process.env.MONGODB_URI;
    
    if (!mongoUri) {
      if (process.env.NODE_ENV === "production") {
        throw new Error("MONGODB_URI environment variable is not set");
      }
      console.warn("⚠️  MONGODB_URI not set - database features will be disabled");
      console.warn("   Set MONGODB_URI in your .env file to enable database features");
      return;
    }

    // Validate URI format
    if (!mongoUri.startsWith("mongodb://") && !mongoUri.startsWith("mongodb+srv://")) {
      if (process.env.NODE_ENV === "production") {
        throw new Error("Invalid MONGODB_URI format. Must start with 'mongodb://' or 'mongodb+srv://'");
      }
      console.warn("⚠️  Invalid MONGODB_URI format - database features will be disabled");
      console.warn("   MONGODB_URI must start with 'mongodb://' or 'mongodb+srv://'");
      return;
    }

    await mongoose.connect(mongoUri);
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    if (process.env.NODE_ENV === "production") {
      throw error;
    }
    // In development, allow the app to continue without database
    console.warn("⚠️  Continuing without database connection (development mode)");
  }
}

/**
 * Disconnect from MongoDB database
 */
export async function disconnectDatabase(): Promise<void> {
  try {
    await mongoose.disconnect();
    console.log("✅ Disconnected from MongoDB");
  } catch (error) {
    console.error("❌ MongoDB disconnection error:", error);
  }
}
