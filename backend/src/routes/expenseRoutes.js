import { Router } from "express";

export function createExpenseRoutes(expenseController) {
  const router = Router();

  router.get("/", expenseController.getAll);
  router.get("/:id", expenseController.getById);
  router.post("/", expenseController.create);
  router.put("/:id", expenseController.update);
  router.delete("/:id", expenseController.delete);

  return router;
}
