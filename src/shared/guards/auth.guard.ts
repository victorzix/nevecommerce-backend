import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { AdminsRepository } from '@/admins/repositories/admins.repository';
import { AuthenticatedUserDataBuilder } from '../auth/builders/authenticated_user_data.builder';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private adminsRepository: AdminsRepository,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const accessToken =
      this.extractTokenFromHeader(request) ||
      this.extractTokenFromCookie(request);

    if (!accessToken) {
      throw new UnauthorizedException('Unauthorized access');
    }

    try {
      const payload = await this.jwtService.verifyAsync(accessToken, {
        secret: process.env.JWT_ACCESS_TOKEN_SECRET,
      });

      const user = await this.adminsRepository.getById(payload.id);

      if (!user) {
        throw new UnauthorizedException("Access don't authorized");
      }
      const userData =
        AuthenticatedUserDataBuilder.createAuthenticateUserData(user);

      request['user'] = userData;
    } catch (err) {
      throw new UnauthorizedException("Access don't authorized");
    }
    return true;
  }

  private extractTokenFromHeader(req: Request) {
    const [type, token] = req.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private extractTokenFromCookie(req: Request) {
    const cookie = req.cookies.access_token;
    return cookie;
  }
}
