function currency(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(amount);
}

export function KpiCard({ title, value }) {
  return (
    <article className="panel kpi-card">
      <p>{title}</p>
      <h2>{currency(value)}</h2>
    </article>
  );
}
