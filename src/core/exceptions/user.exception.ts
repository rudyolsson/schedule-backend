import { HttpException, HttpStatus } from '@nestjs/common';
import { HttpExceptionMessage } from './http.exception';

export class UserFoundException extends HttpException {
  constructor(message: HttpExceptionMessage = { message: 'User Found' }) {
    super(message, HttpStatus.FORBIDDEN);
  }
}
