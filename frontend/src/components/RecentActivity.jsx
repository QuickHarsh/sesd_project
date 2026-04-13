function currency(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(amount);
}

export function RecentActivity({ items }) {
  return (
    <section className="panel activity-panel">
      <h3>Recent Activity</h3>
      {!items.length ? (
        <p className="empty-state">No recent transactions available.</p>
      ) : (
        <ul className="activity-list">
          {items.map((item) => (
            <li key={item.id}>
              <div>
                <strong>{item.title}</strong>
                <p>
                  {item.category} • {new Date(item.date).toLocaleDateString()}
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
