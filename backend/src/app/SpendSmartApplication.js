import express from "express";
import cors from "cors";
import { ExpenseRepository } from "../repositories/ExpenseRepository.js";
import { UserRepository } from "../repositories/UserRepository.js";
import { ExpenseService } from "../services/ExpenseService.js";
import { DashboardService } from "../services/DashboardService.js";
import { AuthService } from "../services/AuthService.js";
import { ExpenseController } from "../controllers/ExpenseController.js";
import { DashboardController } from "../controllers/DashboardController.js";
import { AuthController } from "../controllers/AuthController.js";
import { createExpenseRoutes } from "../routes/expenseRoutes.js";
import { createDashboardRoutes } from "../routes/dashboardRoutes.js";
import { createAuthRoutes } from "../routes/authRoutes.js";
import { errorHandler, notFoundHandler } from "../middleware/errorHandler.js";
import { createAuthMiddleware } from "../middleware/authMiddleware.js";
import { AppConfig } from "../config/AppConfig.js";
import { ExpenseModel } from "../models/ExpenseModel.js";
import { UserModel } from "../models/UserModel.js";

export class SpendSmartApplication {
  constructor() {
    this.expenseRepository = new ExpenseRepository(ExpenseModel);
    this.userRepository = new UserRepository(UserModel);

    this.expenseService = new ExpenseService(this.expenseRepository);
    this.dashboardService = new DashboardService(this.expenseRepository);
    this.authService = new AuthService(this.userRepository, AppConfig);

    this.expenseController = new ExpenseController(this.expenseService);
    this.dashboardController = new DashboardController(this.dashboardService);
    this.authController = new AuthController(this.authService);
    this.authMiddleware = createAuthMiddleware(AppConfig);

    this.app = express();
    this.#configureMiddleware();
    this.#configureRoutes();
  }

  #configureMiddleware() {
    this.app.set("trust proxy", 1);

    this.app.use((req, res, next) => {
      res.setHeader("X-Content-Type-Options", "nosniff");
      res.setHeader("X-Frame-Options", "DENY");
      res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
      next();
    });

    this.app.use(
      cors({
        origin: (origin, callback) => {
          // Allow non-browser and same-origin requests with no Origin header.
          if (!origin) {
            callback(null, true);
            return;
          }

          if (AppConfig.isAllowedOrigin(origin)) {
            callback(null, true);
            return;
          }

          callback(new Error(`CORS blocked for origin: ${origin}`));
        },
        credentials: true,
      }),
    );
    this.app.use(express.json());
  }

  #configureRoutes() {
    this.app.get("/api/health", (_req, res) => {
      res.status(200).json({ status: "ok" });
    });

    this.app.use(
      "/api/auth",
      createAuthRoutes(this.authController, this.authMiddleware),
    );

    this.app.use(
      "/api/expenses",
      this.authMiddleware,
      createExpenseRoutes(this.expenseController),
    );
    this.app.use(
      "/api/dashboard",
      this.authMiddleware,
      createDashboardRoutes(this.dashboardController),
    );

    this.app.use(notFoundHandler);
    this.app.use(errorHandler);
  }

  getExpressApp() {
    return this.app;
  }
}
