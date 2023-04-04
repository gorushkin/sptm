export class CustomError extends Error {
  type: string;
  statusCode: number;

  constructor(error: string, statusCode: number) {
    super(error);
    this.statusCode = statusCode;
  }
}

export class ValidateError extends CustomError {
  errors: string[];

  constructor(error: string, statusCode: number, errors?: string[]) {
    super(error, statusCode);
    this.type = 'Validate Error';
    this.errors = errors || [];
  }
}
