import { HttpException, HttpStatus } from '@nestjs/common';
import { HttpExceptionMessage } from './http.exception';

export class CompanyNotFoundException extends HttpException {
  constructor(message: HttpExceptionMessage = { message: 'Company Not Found' }) {
    super(message, HttpStatus.NOT_FOUND);
  }
}
