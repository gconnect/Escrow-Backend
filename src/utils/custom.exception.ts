import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomException extends HttpException {
  constructor(message: string, error: string) {
    super(
      {
        status: HttpStatus.BAD_REQUEST,
        error,
        message,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
