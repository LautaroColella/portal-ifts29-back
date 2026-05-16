const dashboardService = require("../services/dashboardService");

const getDashboardMetrics = async (req, res) => {
  try {
    const { from, to, period } = req.query;

    const metrics = await dashboardService.getDashboardMetrics({
      from,
      to,
      period,
    });

    return res.status(200).json(metrics);
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
};

module.exports = {
  getDashboardMetrics,
};