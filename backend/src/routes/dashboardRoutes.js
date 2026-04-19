import { Router } from "express";

export function createDashboardRoutes(dashboardController) {
  const router = Router();
  router.get("/summary", dashboardController.getSummary);
  return router;
}
