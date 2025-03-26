class APIError extends Error {
  constructor(status, message, success, stack) {
    super(message);
    this.stack = stack;
    this.status = status;
    this.message = message;
    this.success = success;
  }
}

export { APIError };
