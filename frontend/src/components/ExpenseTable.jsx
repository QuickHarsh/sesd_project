import { CATEGORY_LABELS } from "../constants/categories";

function currency(amount) {
  const parsed = Number(amount);
  const safeAmount = Number.isFinite(parsed) ? parsed : 0;

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(safeAmount);
}

function formatDate(isoDate) {
  const date = new Date(isoDate);
  return Number.isNaN(date.getTime())
    ? "Invalid date"
    : date.toLocaleDateString("en-IN");
}

function categoryLabel(category) {
  return CATEGORY_LABELS[category] || category || "Uncategorized";
}

export function ExpenseTable({ items, onEdit, onDelete }) {
  if (!items.length) {
    return <p className="empty-state">No expenses found. Add your first one.</p>;
  }

  return (
    <div className="table-wrapper panel">
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((expense) => (
            <tr key={expense.id}>
              <td title={expense.title}>{expense.title}</td>
              <td>{currency(expense.amount)}</td>
              <td>{formatDate(expense.date)}</td>
              <td>
                <span className="pill">{categoryLabel(expense.category)}</span>
              </td>
              <td className="action-cell">
                <button className="ghost-btn" onClick={() => onEdit(expense)}>
                  Edit
                </button>
                <button
                  className="danger-btn"
                  onClick={() => onDelete(expense.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
