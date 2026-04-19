import dotenv from "dotenv";

dotenv.config();

export class AppConfig {
  static PORT = process.env.PORT || 5001;
  static MONGODB_URI = process.env.MONGODB_URI || "";
  static JWT_SECRET = process.env.JWT_SECRET || "change-me-in-env";
  static JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";
  static CLIENT_ORIGINS = (process.env.CLIENT_ORIGINS || process.env.CLIENT_ORIGIN || "http://localhost:5173,http://localhost:5174")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

  static ALLOWED_CATEGORIES = [
    "Food",
    "Rent",
    "Transport",
    "Entertainment",
    "Health",
    "Shopping",
    "Other",
  ];
}
