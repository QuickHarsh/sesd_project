import { AppError } from "../../errors/AppError.js";
import { Category } from "../value-objects/Category.js";

export class Expense {
  constructor({ title, amount, date, category }) {
    this.title = this.#validateTitle(title);
    this.amount = this.#validateAmount(amount);
    this.date = this.#validateDate(date);
    this.category = new Category(category).toString();
  }

  #validateTitle(value) {
    if (!value || typeof value !== "string" || value.trim().length < 2) {
      throw new AppError(
        "Title is required and should be at least 2 characters.",
        400,
      );
    }
    return value.trim();
  }

  #validateAmount(value) {
    const parsedAmount = Number(value);
    if (Number.isNaN(parsedAmount) || parsedAmount <= 0) {
      throw new AppError("Amount must be a valid number greater than 0.", 400);
    }
    return parsedAmount;
  }

  #validateDate(value) {
    const parsedDate = new Date(value);
    if (Number.isNaN(parsedDate.getTime())) {
      throw new AppError("Date is invalid.", 400);
    }
    return parsedDate.toISOString();
  }

  update(patch) {
    return new Expense({
      title: patch.title ?? this.title,
      amount: patch.amount ?? this.amount,
      date: patch.date ?? this.date,
      category: patch.category ?? this.category,
    });
  }

  toPlain() {
    return {
      title: this.title,
      amount: this.amount,
      date: this.date,
      category: this.category,
    };
  }

  static fromPlain(raw) {
    return new Expense(raw);
  }
}
