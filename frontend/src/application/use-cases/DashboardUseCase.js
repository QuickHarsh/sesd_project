import { DashboardSummary } from "../../domain/models/DashboardSummary";

export class DashboardUseCase {
  constructor(expenseApiService) {
    this.expenseApiService = expenseApiService;
  }

  async getSummary() {
    const summary = await this.expenseApiService.getDashboardSummary();
    return new DashboardSummary(summary);
  }
}
