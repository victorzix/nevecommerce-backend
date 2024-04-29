import { JwtService } from '@nestjs/jwt';
import { UsersService } from '@/shared/users/services/users.services';
import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AdminsRepository } from '@/admins/repositories/admins.repository';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private readonly userService: UsersService,
    private readonly adminsRepository: AdminsRepository,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const accessToken = request.cookies.access_token;

    if (!accessToken) {
      throw new BadRequestException(
        'You must be logged in to perform this action',
      );
    }

    const payload = await this.jwtService.verifyAsync(accessToken, {
      secret: process.env.JWT_ACCESS_TOKEN_SECRET,
    });

    const user = await this.userService.getById(payload.id);

    const isUserAdmin = await this.adminsRepository.getByUserId(user.id);

    if (!isUserAdmin || !user) {
      throw new UnauthorizedException('You do not have permission');
    }

    return true;
  }
}
