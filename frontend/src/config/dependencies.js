import { ExpenseApiService } from "../domain/services/ExpenseApiService";
import { ExpenseUseCase } from "../application/use-cases/ExpenseUseCase";
import { DashboardUseCase } from "../application/use-cases/DashboardUseCase";
import { AuthUseCase } from "../application/use-cases/AuthUseCase";

const apiBaseURL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5001/api";

const expenseApiService = new ExpenseApiService(apiBaseURL);

export const container = {
  expenseUseCase: new ExpenseUseCase(expenseApiService),
  dashboardUseCase: new DashboardUseCase(expenseApiService),
  authUseCase: new AuthUseCase(expenseApiService),
};
