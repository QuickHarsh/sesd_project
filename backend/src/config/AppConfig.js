import dotenv from "dotenv";

dotenv.config();

export class AppConfig {
  static NODE_ENV = process.env.NODE_ENV || "development";
  static PORT = process.env.PORT || 5001;
  static MONGODB_URI = process.env.MONGODB_URI || "";
  static JWT_SECRET = process.env.JWT_SECRET || "change-me-in-env";
  static JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";
  static CLIENT_ORIGINS = (
    process.env.CLIENT_ORIGINS ||
    process.env.CLIENT_ORIGIN ||
    "http://localhost:5173,http://localhost:5174"
  )
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

  static isCategoryAllowed(category) {
    return this.ALLOWED_CATEGORIES.includes(category);
  }

  static isAllowedOrigin(origin) {
    if (!origin) {
      return true;
    }

    return this.CLIENT_ORIGINS.some((allowedOrigin) => {
      if (allowedOrigin === "*") {
        return true;
      }

      if (allowedOrigin.startsWith("*.")) {
        return origin.endsWith(allowedOrigin.slice(1));
      }

      return allowedOrigin === origin;
    });
  }
}
