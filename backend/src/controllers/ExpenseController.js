export class ExpenseController {
  constructor(expenseService) {
    this.expenseService = expenseService;
  }

  getAll = async (req, res, next) => {
    try {
      const expenses = await this.expenseService.getAllExpenses(req.user.id, {
        category: req.query.category,
      });
      res.status(200).json(expenses);
    } catch (error) {
      next(error);
    }
  };

  getById = async (req, res, next) => {
    try {
      const expense = await this.expenseService.getExpenseById(
        req.params.id,
        req.user.id,
      );
      res.status(200).json(expense);
    } catch (error) {
      next(error);
    }
  };

  create = async (req, res, next) => {
    try {
      const created = await this.expenseService.addExpense(
        req.user.id,
        req.body,
      );
      res.status(201).json(created);
    } catch (error) {
      next(error);
    }
  };

  update = async (req, res, next) => {
    try {
      const updated = await this.expenseService.updateExpense(
        req.params.id,
        req.user.id,
        req.body,
      );
      res.status(200).json(updated);
    } catch (error) {
      next(error);
    }
  };

  delete = async (req, res, next) => {
    try {
      const deleted = await this.expenseService.deleteExpense(
        req.params.id,
        req.user.id,
      );
      res.status(200).json(deleted);
    } catch (error) {
      next(error);
    }
  };
}
