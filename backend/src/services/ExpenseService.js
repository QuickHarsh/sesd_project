import { Expense } from "../domain/entities/Expense.js";
import { AppError } from "../errors/AppError.js";

export class ExpenseService {
  constructor(expenseRepository) {
    this.expenseRepository = expenseRepository;
  }

  async getAllExpenses(userId, filters = {}) {
    return this.expenseRepository.findAll(userId, filters);
  }

  async getExpenseById(id, userId) {
    const expense = await this.expenseRepository.findById(id, userId);
    if (!expense) {
      throw new AppError("Expense not found.", 404);
    }
    return expense;
  }

  async addExpense(userId, payload) {
    const expense = new Expense(payload);
    return this.expenseRepository.create({ ...expense.toPlain(), userId });
  }

  async updateExpense(id, userId, payload) {
    const existing = await this.getExpenseById(id, userId);
    const updated = new Expense({
      title: payload.title ?? existing.title,
      amount: payload.amount ?? existing.amount,
      date: payload.date ?? existing.date,
      category: payload.category ?? existing.category,
    });
    return this.expenseRepository.update(id, userId, updated.toPlain());
  }

  async deleteExpense(id, userId) {
    return this.expenseRepository.delete(id, userId);
  }
}
