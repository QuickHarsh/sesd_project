import { AppConfig } from "../../config/AppConfig.js";
import { AppError } from "../../errors/AppError.js";

export class Category {
  constructor(value) {
    if (!AppConfig.ALLOWED_CATEGORIES.includes(value)) {
      throw new AppError(
        `Invalid category: ${value}. Allowed values are: ${AppConfig.ALLOWED_CATEGORIES.join(", ")}`,
        400,
      );
    }
    this.value = value;
  }

  toString() {
    return this.value;
  }
}
