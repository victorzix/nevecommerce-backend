import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
} from '@nestjs/common';
import { Request } from 'express';

export class RegisterGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = this.checkToken(request);

    if (token) {
      throw new BadRequestException(
        'You cannot register if you are already logged in',
      );
    }
    return true;
  }

  private checkToken(req: Request) {
    return req.headers.authorization || req.cookies.access_token;
  }
}
