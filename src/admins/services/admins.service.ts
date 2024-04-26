import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AdminsRepository } from '@/admins/repositories/admins.repository';
import { UsersService } from '@/shared/users/services/users.services';
import { CreateAdminRequestDTO } from '../dtos/create_admin_request.dto';

@Injectable()
export class AdminsService {
  constructor(
    private adminsRepository: AdminsRepository,
    private usersService: UsersService,
  ) {}

  async create(dto: CreateAdminRequestDTO) {
    const user = await this.usersService.register({ ...dto });

    const admin = await this.adminsRepository.register({
      userId: user.id,
    });

    return admin;
  }

  async getById(id: string) {
    const admin = await this.adminsRepository.getById(id);

    if (!admin) {
      throw new NotFoundException('Admin not found');
    }

    return admin;
  }

  async listAdmins() {
    const admins = await this.adminsRepository.listAdmins();
    return admins;
  }

  async delete(userId: string): Promise<void> {
    const admin = await this.adminsRepository.getByUserId(userId);

    if (!admin) {
      throw new BadRequestException('Could not delete this account');
    }

    await this.adminsRepository.delete(admin.id);

    return;
  }
}
