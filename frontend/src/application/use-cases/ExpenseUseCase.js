import { Expense } from "../../domain/models/Expense";

export class ExpenseUseCase {
  constructor(expenseApiService) {
    this.expenseApiService = expenseApiService;
  }

  async getAll(category) {
    return this.expenseApiService.getExpenses(category);
  }

  async create(expenseFormData) {
    const expense = new Expense(expenseFormData);
    return this.expenseApiService.addExpense(expense.toRequestPayload());
  }

  async update(id, expenseFormData) {
    const expense = new Expense(expenseFormData);
    return this.expenseApiService.updateExpense(id, expense.toRequestPayload());
  }

  async remove(id) {
    return this.expenseApiService.deleteExpense(id);
  }
}
