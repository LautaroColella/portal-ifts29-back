const dashboardService = require("../services/dashboardService");

const getDashboardMetrics = async (req, res, next) => {
  try {
    const { from, to, period } = req.query;

    const metrics = await dashboardService.getDashboardMetrics({
      from,
      to,
      period,
    });

    return res.status(200).json(metrics);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getDashboardMetrics,
};
