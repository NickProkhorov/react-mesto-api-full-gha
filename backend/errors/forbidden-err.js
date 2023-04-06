class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ForbiddenError;
