const dashboardService = require("../services/dashboardService");
const asyncHandler = require("../middlewares/asyncHandler");

const getDashboardMetrics = asyncHandler(async (req, res) => {
  const { from, to, period } = req.query;

  const metrics = await dashboardService.getDashboardMetrics({
    from,
    to,
    period,
  });

  return res.status(200).json(metrics);
});

module.exports = {
  getDashboardMetrics,
};
