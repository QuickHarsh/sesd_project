import mongoose from "mongoose";

let cachedConnectionPromise;

export async function connectDatabase(mongoUri) {
  if (!mongoUri) {
    throw new Error("MONGODB_URI is not configured.");
  }

  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (cachedConnectionPromise) {
    return cachedConnectionPromise;
  }

  mongoose.set("strictQuery", true);
  cachedConnectionPromise = mongoose.connect(mongoUri, {
    serverSelectionTimeoutMS: 5000,
  });

  try {
    await cachedConnectionPromise;
    return mongoose.connection;
  } catch (error) {
    cachedConnectionPromise = undefined;
    throw error;
  }
}
