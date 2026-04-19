import { useEffect, useState } from "react";
import { ExpenseForm } from "../components/ExpenseForm";
import { ExpenseTable } from "../components/ExpenseTable";
import { CATEGORIES } from "../constants/categories";

export function HistoryPage({ expenseUseCase, onAuthError }) {
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [editingExpense, setEditingExpense] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const loadExpenses = async (category = "") => {
    try {
      setError("");
      const expenses = await expenseUseCase.getAll(category);
      setItems(expenses);
    } catch (loadError) {
      if (loadError?.response?.status === 401) {
        onAuthError();
        return;
      }
      setError(
        loadError?.response?.data?.message ||
          loadError.message ||
          "Failed to load expenses.",
      );
    }
  };

  useEffect(() => {
    loadExpenses(selectedCategory);
  }, [selectedCategory, expenseUseCase, onAuthError]);

  const handleSave = async (formData) => {
    setIsSaving(true);
    try {
      if (editingExpense) {
        await expenseUseCase.update(editingExpense.id, formData);
      } else {
        await expenseUseCase.create(formData);
      }
      setEditingExpense(null);
      await loadExpenses(selectedCategory);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id) => {
    const shouldDelete = window.confirm("Delete this expense entry?");
    if (!shouldDelete) {
      return;
    }

    try {
      await expenseUseCase.remove(id);
      await loadExpenses(selectedCategory);
    } catch (deleteError) {
      if (deleteError?.response?.status === 401) {
        onAuthError();
        return;
      }
      setError(
        deleteError?.response?.data?.message ||
          deleteError.message ||
          "Delete failed.",
      );
    }
  };

  return (
    <section className="history-layout">
      <ExpenseForm
        currentExpense={editingExpense}
        onCancel={() => setEditingExpense(null)}
        onSave={handleSave}
        isSaving={isSaving}
      />

      <div className="history-list-column">
        <div className="panel filter-row">
          <h3>Transaction History</h3>
          <label>
            Filter by category
            <select
              value={selectedCategory}
              onChange={(event) => setSelectedCategory(event.target.value)}
            >
              <option value="">All</option>
              {CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>

          {selectedCategory ? (
            <button
              type="button"
              className="ghost-btn"
              onClick={() => setSelectedCategory("")}
            >
              Clear filter
            </button>
          ) : null}
        </div>

        {error ? <p className="error-text">{error}</p> : null}

        <ExpenseTable
          items={items}
          onEdit={setEditingExpense}
          onDelete={handleDelete}
        />
      </div>
    </section>
  );
}
