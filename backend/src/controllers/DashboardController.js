export class DashboardController {
  constructor(dashboardService) {
    this.dashboardService = dashboardService;
  }

  getSummary = async (req, res, next) => {
    try {
      const summary = await this.dashboardService.getSummary(req.user.id);
      res.status(200).json(summary);
    } catch (error) {
      next(error);
    }
  };
}
