const express = require("express");
const { getDashboardMetrics } = require("../controllers/dashboardController");
const authMiddleware = require("../middlewares/auth");
const router = express.Router();
router.get("/metrics", authMiddleware, getDashboardMetrics);
module.exports = router;
