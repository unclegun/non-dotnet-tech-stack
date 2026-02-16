/**
 * Application Error
 * 
 * Base class for custom application errors.
 * Maps to Problem Details format in error handler.
 * 
 * Pattern: Similar to exception handling in .NET/Java
 * - Throw specific errors with context
 * - Error handler maps to HTTP response
 * - Keeps business logic clean
 */
export class AppError extends Error {
  constructor(
    public readonly statusCode: number,
    public readonly code: string,
    public readonly title: string,
    message: string,
    public readonly type?: string,
  ) {
    super(message);
    this.name = 'AppError';
    Object.setPrototypeOf(this, AppError.prototype);
  }

  static badRequest(message: string, code = 'BAD_REQUEST'): AppError {
    return new AppError(400, code, 'Bad Request', message);
  }

  static notFound(message: string, code = 'NOT_FOUND'): AppError {
    return new AppError(404, code, 'Not Found', message);
  }

  static conflict(message: string, code = 'CONFLICT'): AppError {
    return new AppError(409, code, 'Conflict', message);
  }

  static internal(message: string, code = 'INTERNAL_ERROR'): AppError {
    return new AppError(500, code, 'Internal Server Error', message);
  }
}
