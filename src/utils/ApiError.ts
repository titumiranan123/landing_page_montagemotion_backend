class ApiError extends Error {
  statusCode: number;
  status: boolean;
  isOperational: boolean;
  errorMessage: string;

  constructor(statusCode: number, status: boolean, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.status = status;
    this.isOperational = true; // Operational errors are those which we can predict and manage
    this.errorMessage = message;

    // This is for preserving the stack trace, so it points to the place where the error is thrown
    Error.captureStackTrace(this, this.constructor);
  }

  // Custom toJSON method to format the error response
  toJSON() {
    return {
      statusCode: this.statusCode,
      status: this.status,
      errorMessage: this.errorMessage,
      stack: this.stack, // Optionally include stack trace if necessary
    };
  }
}

export default ApiError;
