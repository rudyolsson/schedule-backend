import { ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Injectable()
export class RolesGuard extends AuthGuard('jwt') {
  private readonly logger = new Logger(RolesGuard.name);

  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest(); // as Request;
    const user = request.user;
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const canActivatePromise = super.canActivate(context) as Promise<boolean>;
    return canActivatePromise
      .then(() => {
        const hasRole = () => user.roles.some(role => roles.includes(role));
        return user && user.roles && hasRole();
      })
      .catch(err => {
        return false;
      });
  }
}
