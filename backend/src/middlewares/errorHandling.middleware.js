const ErrorHandling = async (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  if (process.env.NODE_ENV === "development") {
    console.error(err.stack);
  }

  res.status(statusCode).json({
    success: false,
    status: statusCode,
    message: message,
    // Optionally include stack trace in development mode
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};

export default ErrorHandling;
