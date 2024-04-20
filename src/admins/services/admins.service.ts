import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { AdminsRepository } from '@/admins/repositories/admins.repository';
import { Admin, CreateAdminDTO } from '@/admins/dtos';
import { PasswordUtils } from '@/shared/auth/utils/password.utils';

@Injectable()
export class AdminsService {
  constructor(private adminsRepository: AdminsRepository) {}

  async register(dto: CreateAdminDTO) {
    const checkUser = await this.adminsRepository.getByEmail(dto.email);

    if (checkUser) {
      throw new BadRequestException('User already registered');
    }

    const hashedPass = await PasswordUtils.hashPassword(dto.password);

    const admin = await this.adminsRepository.register({
      ...dto,
      password: hashedPass,
    });

    return admin;
  }

  async getByEmail(email: string): Promise<Admin> {
    const admin = await this.adminsRepository.getByEmail(email);

    if (!admin) {
      throw new NotFoundException('Admin not found');
    }

    return admin;
  }

  async getById(id: string) {
    const admin = await this.adminsRepository.getById(id);

    if (!admin) {
      throw new NotFoundException('Admin not found');
    }

    return admin;
  }

  async delete(adminId: string): Promise<void> {
    const admin = await this.adminsRepository.getById(adminId);

    if (!admin) {
      throw new InternalServerErrorException('Could not delete this account');
    }

    await this.adminsRepository.delete(adminId);
    return;
  }
}
