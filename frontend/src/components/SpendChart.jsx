import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const COLORS = [
  "#0b7a75",
  "#f4a259",
  "#7e6b8f",
  "#3b6ea5",
  "#d55d92",
  "#5f8f29",
  "#202c39",
];

function currency(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(amount);
}

export function SpendChart({ data }) {
  if (!data?.length) {
    return (
      <p className="empty-state">
        No chart data yet. Add expenses to see category trends.
      </p>
    );
  }

  return (
    <div className="panel chart-panel">
      <h3>Spending By Category</h3>
      <div className="chart-box">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="total"
              nameKey="category"
              innerRadius={60}
              outerRadius={100}
            >
              {data.map((entry, index) => (
                <Cell
                  key={entry.category}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip formatter={(value) => currency(value)} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
