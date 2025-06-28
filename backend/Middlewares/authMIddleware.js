import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import Admin from "../Models/Admin.model.js";
import winston from "winston"; // Assuming you've added winston for logging

// Initialize the logger
const logger = winston.createLogger({
  level: "info",
  transports: [
    new winston.transports.Console({ format: winston.format.simple() }),
    new winston.transports.File({ filename: "error.log", level: "error" }),
  ],
});

const AdminProtect = asyncHandler(async (req, res, next) => {
  try {
    // Check for the Authorization header and validate its format
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401);
      throw new Error("Authorization token is missing or malformed.");
    }

    const token = authHeader.split(" ")[1]; // Extract the token

    if (!token) {
      res.status(401);
      throw new Error("Not authorized, please login.");
    }

    // Verify the JWT token
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    // Retrieve the user based on the ID from the verified token
    const user = await Admin.findById(verified.id).select("-password");

    if (!user) {
      res.status(404);
      throw new Error("User not found.");
    }

    if (user.status === "suspended") {
      res.status(403); // Forbidden - User is authenticated but not allowed to access
      throw new Error("User suspended, please contact support.");
    }

    req.user = user; // Attach the user to the request object for downstream usage
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    // Log the error details for server-side tracking
    logger.error(error.message, { stack: error.stack });

    // Send a generic error message to the client
    res.status(401).json({ message: "Authentication failed. Please try again." });
  }
});

export { AdminProtect };
