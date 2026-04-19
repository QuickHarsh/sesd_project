export class DashboardSummary {
  constructor(raw) {
    this.monthlyTotal = Number(raw?.monthlyTotal || 0);
    this.recentActivity = raw?.recentActivity || [];
    this.chartData = raw?.chartData || [];
  }
}
