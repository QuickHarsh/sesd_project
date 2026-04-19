import mongoose from "mongoose";
import { AppConfig } from "../config/AppConfig.js";

const expenseSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
    },
    amount: {
      type: Number,
      required: true,
      min: 0.01,
    },
    date: {
      type: Date,
      required: true,
      index: true,
    },
    category: {
      type: String,
      enum: AppConfig.ALLOWED_CATEGORIES,
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

expenseSchema.index({ userId: 1, date: -1 });

export const ExpenseModel = mongoose.model("Expense", expenseSchema);
