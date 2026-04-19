function currency(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(amount);
}

function normalizeAmount(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

export function KpiCard({ title, value }) {
  return (
    <article className="panel kpi-card">
      <p>{title}</p>
      <h2>{currency(normalizeAmount(value))}</h2>
    </article>
  );
}
