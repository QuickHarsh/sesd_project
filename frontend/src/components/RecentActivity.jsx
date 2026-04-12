function currency(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(amount);
}

function formatDate(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "Invalid date" : date.toLocaleDateString();
}

export function RecentActivity({ items }) {
  const safeItems = Array.isArray(items) ? items : [];

  return (
    <section className="panel activity-panel">
      <h3>Recent Activity</h3>
      {!safeItems.length ? (
        <p className="empty-state">No recent transactions available.</p>
      ) : (
        <ul className="activity-list">
          {safeItems.map((item) => (
            <li key={item.id}>
              <div>
                <strong>{item.title}</strong>
                <p>
                  {item.category} • {formatDate(item.date)}
                </p>
              </div>
              <span>{currency(item.amount)}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
