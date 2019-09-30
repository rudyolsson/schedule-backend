import { HttpException, HttpStatus } from '@nestjs/common';
import { HttpExceptionMessage } from './http.exception';

export class TokenNotFoundException extends HttpException {
  constructor(message: HttpExceptionMessage = { message: 'token not found' }) {
    super(message, HttpStatus.UNAUTHORIZED);
  }
}
