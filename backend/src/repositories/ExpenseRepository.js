import { BaseRepository } from "./BaseRepository.js";
import { AppError } from "../errors/AppError.js";

export class ExpenseRepository extends BaseRepository {
  constructor(expenseModel) {
    super();
    this.expenseModel = expenseModel;
  }

  #toPlain(doc) {
    if (!doc) {
      return null;
    }

    const { _id, ...rest } = doc;
    return {
      id: String(_id),
      ...rest,
    };
  }

  async findAll(userId, filters = {}) {
    const query = { userId };
    if (filters.category) {
      query.category = filters.category;
    }

    const docs = await this.expenseModel.find(query).sort({ date: -1 }).lean();
    return docs.map((doc) => this.#toPlain(doc));
  }

  async findById(id, userId) {
    try {
      const doc = await this.expenseModel.findOne({ _id: id, userId }).lean();
      return this.#toPlain(doc);
    } catch {
      return null;
    }
  }

  async create(expenseData) {
    const created = await this.expenseModel.create(expenseData);
    return this.#toPlain(created.toObject());
  }

  async update(id, userId, payload) {
    let updated;
    try {
      updated = await this.expenseModel
        .findOneAndUpdate({ _id: id, userId }, payload, {
          new: true,
          runValidators: true,
        })
        .lean();
    } catch {
      updated = null;
    }

    if (!updated) {
      throw new AppError("Expense not found.", 404);
    }

    return this.#toPlain(updated);
  }

  async delete(id, userId) {
    let deleted;
    try {
      deleted = await this.expenseModel
        .findOneAndDelete({ _id: id, userId })
        .lean();
    } catch {
      deleted = null;
    }

    if (!deleted) {
      throw new AppError("Expense not found.", 404);
    }

    return this.#toPlain(deleted);
  }
}
