export class DashboardService {
  constructor(expenseRepository) {
    this.expenseRepository = expenseRepository;
  }

  #isCurrentMonth(isoDate) {
    const d = new Date(isoDate);
    const now = new Date();
    return (
      d.getUTCFullYear() === now.getUTCFullYear() &&
      d.getUTCMonth() === now.getUTCMonth()
    );
  }

  async getSummary(userId) {
    const expenses = await this.expenseRepository.findAll(userId);
    const monthlyTotal = expenses
      .filter((expense) => this.#isCurrentMonth(expense.date))
      .reduce((total, expense) => total + expense.amount, 0);

    const recentActivity = expenses
      .slice(0, 5)
      .map(({ id, title, amount, date, category }) => ({
        id,
        title,
        amount,
        date,
        category,
      }));

    const byCategory = expenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {});

    const chartData = Object.entries(byCategory).map(([category, total]) => ({
      category,
      total: Number(total.toFixed(2)),
    }));

    return {
      monthlyTotal: Number(monthlyTotal.toFixed(2)),
      recentActivity,
      chartData,
    };
  }
}
