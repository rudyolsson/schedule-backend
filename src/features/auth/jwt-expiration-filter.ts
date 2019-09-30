import { Catch, ArgumentsHost } from '@nestjs/common';
import { UnauthorizedError } from 'express-jwt';
import { BaseExceptionFilter } from '@nestjs/core';
import { TokenExpiredError } from 'jsonwebtoken';

@Catch(UnauthorizedError)
export class JwtExpirationFilter extends BaseExceptionFilter {
  catch(exception: UnauthorizedError, host: ArgumentsHost) {
    if (exception.inner instanceof TokenExpiredError) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse();
      response
        .status(403)
        .json({
          statusCode: 403,
          cause: exception.inner.message,
        });
    }
    super.catch(exception, host);
  }
}
