export class CustomError extends Error {
  type: string;
  statusCode: number;

  constructor(error: string, statusCode: number) {
    super(error);
    this.statusCode = statusCode;
  }
}

export class ValidateError extends CustomError {
  constructor(error: string, statusCode: number) {
    super(error, statusCode);
    this.type = 'Validate Error';
  }
}
