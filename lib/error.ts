export class BadRequestError extends Error {
  errorCode: ErrorCode;
  details?: any;

  constructor(errorCode: ErrorCode, details?: any) {
    super(ERROR_CODE[errorCode]);
    this.errorCode = errorCode;
    if (details) {
      this.details = details;
    }
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}

export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

const ERROR_CODE = {
  EMAIL_ALREADY_EXISTS: 'This email is already in use',
  VALIDATION_ERROR: 'Request validation failed',
} as const;

export type ErrorCode = keyof typeof ERROR_CODE;
