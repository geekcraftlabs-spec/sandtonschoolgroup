import mongoose from "mongoose";

interface CachedConnection {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

const globalWithMongo = global as typeof globalThis & {
  mongoose: CachedConnection;
};

const cached: CachedConnection = globalWithMongo.mongoose || {
  conn: null,
  promise: null,
};

if (!globalWithMongo.mongoose) {
  globalWithMongo.mongoose = cached;
}

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/sandton-school";

async function dbConnect(): Promise<typeof mongoose> {
  if (cached.conn) {
    console.log("✅ Using existing MongoDB connection");
    return cached.conn;
  }

  if (!cached.promise) {
    console.log("🔄 Connecting to MongoDB at:", MONGODB_URI);
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
    };

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongooseInstance) => {
        console.log("✅ MongoDB connected successfully");
        return mongooseInstance;
      })
      .catch((err) => {
        console.error("❌ MongoDB connection error:", err);
        throw err;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.error("❌ MongoDB connection failed:", e);
    throw e;
  }

  return cached.conn;
}

export default dbConnect;