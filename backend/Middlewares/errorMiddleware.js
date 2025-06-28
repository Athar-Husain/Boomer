const errorHandler = (err, req, res, next) => {
  // Set status code from the error or default to 500
  const statusCode = res.statusCode ? res.statusCode : 500;

  // Log the error (make sure to log it in production as well, just not exposing it to the client)
  if (process.env.NODE_ENV === "development") {
    console.error(err.stack); // Log the error stack trace for debugging
  }

  // Respond with error message and stack trace in development environment
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === "development" ? err.stack : null, // Only expose stack trace in development
  });
};

export default errorHandler;
