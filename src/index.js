require("dotenv").config();

const express = require("express");
const cors = require("cors");

const errorHandler = require("./middlewares/errorHandler");
const notFound = require("./middlewares/notFound");

const AppDataSource = require("./config/data-source");
const ticketRoutes = require("./routes/ticketRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const notificationRoutes = require("./routes/notificationRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/tickets", ticketRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/notifications", notificationRoutes);

// * The route not found middleware MUST be after ALL routes
app.use(notFound);

// * The error handling middleware MUST be the LAST middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected");

    if (process.env.DEBUG === "true") console.log("---DEBUG MODE---");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database initialization failed");
    console.error(err);
  });
