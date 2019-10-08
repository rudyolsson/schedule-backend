import { HttpException, HttpStatus } from '@nestjs/common';
import { HttpExceptionMessage } from './http.exception';

export class UserFoundException extends HttpException {
  constructor(message: HttpExceptionMessage = { message: 'User Found' }) {
    super(message, HttpStatus.FORBIDDEN);
  }
}

export class UserUnauthorizedException extends HttpException {
  constructor(
    message: HttpExceptionMessage = { message: 'User Unauthorized' },
  ) {
    super(message, HttpStatus.FORBIDDEN);
  }
}
