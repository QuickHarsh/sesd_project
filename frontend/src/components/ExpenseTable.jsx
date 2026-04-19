function currency(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(amount);
}

function formatDate(isoDate) {
  return new Date(isoDate).toLocaleDateString();
}

export function ExpenseTable({ items, onEdit, onDelete }) {
  if (!items.length) {
    return (
      <p className="empty-state">No expenses found. Add your first one.</p>
    );
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
              <td>{expense.title}</td>
              <td>{currency(expense.amount)}</td>
              <td>{formatDate(expense.date)}</td>
              <td>
                <span className="pill">{expense.category}</span>
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
