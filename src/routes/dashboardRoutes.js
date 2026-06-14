const express = require("express");
const { getDashboardMetrics } = require("../controllers/dashboardController");
const authMiddleware = require("../middlewares/auth");
const authorizeRoles = require("../middlewares/role");
const router = express.Router();
router.get(
  "/metrics",
  authMiddleware,
  authorizeRoles("MANAGEMENT", "ADMIN"),
  getDashboardMetrics,
);
module.exports = router;
