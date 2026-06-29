import mongoose, { Mongoose } from 'mongoose';

/**
 * Global type for cached MongoDB connection
 * Prevents TypeScript errors when accessing global.mongoose
 */
interface MongooseCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

/**
 * Extend the global namespace to include mongoose cache
 * This allows us to store the connection in the global scope
 */
declare global {
  var mongoose: MongooseCache | undefined;
}

/**
 * Initialize or retrieve the cached connection
 * This prevents creating multiple connections during development (hot reload)
 */
let cached: MongooseCache = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

/**
 * Connect to MongoDB using Mongoose
 * @returns Promise that resolves to the Mongoose instance
 * @throws Error if MONGODB_URI is not defined
 */
export async function connectDB(): Promise<Mongoose> {
  // Return cached connection if available
  if (cached.conn) {
    return cached.conn;
  }

  // Return pending promise if connection is in progress
  if (cached.promise) {
    return cached.promise;
  }

  // Validate MongoDB URI is configured
  const mongodbUri = process.env.MONGODB_URI;
  if (!mongodbUri) {
    throw new Error(
      'Please define the MONGODB_URI environment variable inside .env.local'
    );
  }

  // Create new connection promise
  cached.promise = mongoose
    .connect(mongodbUri, {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
    })
    .then((mongooseInstance) => {
      cached.conn = mongooseInstance;
      return mongooseInstance;
    })
    .catch((error) => {
      // Log error and clean up promise cache on connection failure
      console.error('MongoDB connection failed:', error);
      cached.promise = null;
      throw error;
    });

  return cached.promise;
}

/**
 * Disconnect from MongoDB
 * Useful for cleanup in tests or graceful shutdown
 */
export async function disconnectDB(): Promise<void> {
  if (cached.conn) {
    await cached.conn.disconnect();
    cached.conn = null;
    cached.promise = null;
  }
}

export default connectDB;