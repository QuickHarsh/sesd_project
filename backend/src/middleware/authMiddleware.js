import { AppError } from "../errors/AppError.js";
import { verifyToken } from "../utils/token.js";

export function createAuthMiddleware(appConfig) {
  return function authMiddleware(req, _res, next) {
    try {
      const authHeader = req.headers.authorization || "";
      const [scheme, token] = authHeader.split(" ");

      if (scheme !== "Bearer" || !token) {
        throw new AppError("Unauthorized: missing or invalid token.", 401);
      }

      const payload = verifyToken(token, appConfig.JWT_SECRET);
      req.user = {
        id: payload.sub,
        email: payload.email,
      };

      next();
    } catch {
      next(new AppError("Unauthorized: token verification failed.", 401));
    }
  };
}
