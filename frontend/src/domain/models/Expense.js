import { CATEGORIES } from "../../constants/categories";

export class Expense {
  constructor({ id, title, amount, date, category }) {
    this.id = id;
    this.title = title?.trim();
    this.amount = Number(amount);
    this.date = date;
    this.category = category;
  }

  validate() {
    if (!this.title || this.title.length < 2) {
      throw new Error("Title must be at least 2 characters long.");
    }

    if (Number.isNaN(this.amount) || this.amount <= 0) {
      throw new Error("Amount should be a number greater than 0.");
    }

    if (!this.date || Number.isNaN(new Date(this.date).getTime())) {
      throw new Error("Please provide a valid date.");
    }

    if (!CATEGORIES.includes(this.category)) {
      throw new Error("Please select a valid category.");
    }

    return true;
  }

  toRequestPayload() {
    this.validate();
    return {
      title: this.title,
      amount: this.amount,
      date: this.date,
      category: this.category,
    };
  }
}
