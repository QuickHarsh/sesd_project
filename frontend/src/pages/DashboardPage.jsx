import { useEffect, useState } from "react";
import { KpiCard } from "../components/KpiCard";
import { RecentActivity } from "../components/RecentActivity";
import { SpendChart } from "../components/SpendChart";

export function DashboardPage({ dashboardUseCase, onAuthError }) {
  const [summary, setSummary] = useState({
    monthlyTotal: 0,
    recentActivity: [],
    chartData: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadSummary() {
      try {
        setLoading(true);
        const data = await dashboardUseCase.getSummary();
        if (mounted) {
          setSummary(data);
        }
      } catch (error) {
        if (error?.response?.status === 401) {
          onAuthError();
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadSummary();
    return () => {
      mounted = false;
    };
  }, [dashboardUseCase, onAuthError]);

  return (
    <section className="page-grid">
      <div className="hero-card panel">
        <h1>Your Money Story, Clear & Simple</h1>
        <p>
          Track each expense, understand where money goes, and use data to build
          better spending habits.
        </p>
      </div>

      <KpiCard title="Total Spent This Month" value={summary.monthlyTotal} />

      <RecentActivity items={summary.recentActivity} />

      {loading ? (
        <p className="panel loading">Loading chart...</p>
      ) : (
        <SpendChart data={summary.chartData} />
      )}
    </section>
  );
}
