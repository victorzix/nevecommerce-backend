import { UsersService } from '@/shared/users/services/users.services';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Admin } from '@/admins/dtos';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private readonly userService: UsersService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId: string = request.user.id;

    const user = await this.userService.getById(userId);

    if (!user || !(user instanceof Admin)) {
      throw new UnauthorizedException('You do not have permission');
    }

    return true;
  }
}
