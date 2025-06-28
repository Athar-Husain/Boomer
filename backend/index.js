import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import ConnectDB from "./db.js";
import errorHandler from "./Middlewares/errorMiddleware.js";
import AdminRoutes from "./Routes/AdminRoutes.js";
import CustomerRoutes from "./Routes/CustomerRoutes.js";
import CouponRoutes from "./Routes/CouponRoutes.js";
import compression from "compression";
import morgan from "morgan";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

// Global error handlers
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  process.exit(1);
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});

// Connect DB
ConnectDB()
  .then(() => console.log("Database connected successfully"))
  .catch((err) => {
    console.error("Database connection failed:", err);
    process.exit(1);
  });

const app = express();
const PORT = process.env.MY_PORT || 8000;

// Security & Middleware
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
} else {
  app.use(morgan("combined"));
}

// CORS
app.use(
  cors({
    origin: [process.env.FRONTEND_URL, process.env.ADMIN_FRONTEND_URL],
    credentials: true,
  })
);

// Rate Limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 500,
  message: "Too many requests from this IP, please try again later.",
});
app.use("/api/", apiLimiter);

// API Routes
app.use("/api/admin", AdminRoutes);
app.use("/api/customers", CustomerRoutes);
app.use("/api/coupons", CouponRoutes);

// Error Handler
app.use(errorHandler);

// Server Listen
const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Graceful shutdown
process.on("SIGINT", () => {
  console.log("\nGracefully shutting down...");
  server.close(() => {
    console.log("Closed all open connections.");
    process.exit(0);
  });
});
