import { Admin } from '@/admins/dtos';
import { AdminsService } from '@/admins/services/admins.service';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private readonly adminsService: AdminsService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId: string = request.user.id;

    const user = await this.adminsService.getById(userId);

    if (!user || !(user instanceof Admin)) {
      throw new UnauthorizedException('You do not have permission');
    }

    return true;
  }
}
