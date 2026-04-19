import { useEffect, useState } from "react";
import { CATEGORIES } from "../constants/categories";

const initialFormState = {
  title: "",
  amount: "",
  date: new Date().toISOString().slice(0, 10),
  category: "Food",
};

export function ExpenseForm({ currentExpense, onCancel, onSave, isSaving }) {
  const [formData, setFormData] = useState(initialFormState);
  const [error, setError] = useState("");

  useEffect(() => {
    if (currentExpense) {
      setFormData({
        title: currentExpense.title,
        amount: currentExpense.amount,
        date: new Date(currentExpense.date).toISOString().slice(0, 10),
        category: currentExpense.category,
      });
      return;
    }
    setFormData(initialFormState);
  }, [currentExpense]);

  const handleChange = (event) => {
    setError("");
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const normalizedPayload = {
      ...formData,
      title: formData.title.trim(),
      amount: Number(formData.amount),
    };

    try {
      await onSave(normalizedPayload);
      if (!currentExpense) {
        setFormData(initialFormState);
      }
    } catch (saveError) {
      setError(
        saveError.message || "Something went wrong while saving expense.",
      );
    }
  };

  return (
    <form className="panel form-panel" onSubmit={handleSubmit}>
      <div className="form-heading-row">
        <h3>{currentExpense ? "Edit Expense" : "Add Expense"}</h3>
        {currentExpense ? (
          <button type="button" className="ghost-btn" onClick={onCancel}>
            Cancel
          </button>
        ) : null}
      </div>

      <div className="form-grid">
        <label>
          Title
          <input
            name="title"
            type="text"
            placeholder="Lunch at Joe's"
            value={formData.title}
            onChange={handleChange}
            required
            minLength={2}
          />
        </label>

        <label>
          Amount
          <input
            name="amount"
            type="number"
            min="0.01"
            step="0.01"
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Date
          <input
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Category
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            {CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>
      </div>

      {error ? <p className="error-text">{error}</p> : null}

      <button className="primary-btn" type="submit" disabled={isSaving}>
        {isSaving
          ? "Saving..."
          : currentExpense
            ? "Update Expense"
            : "Add Expense"}
      </button>
    </form>
  );
}
