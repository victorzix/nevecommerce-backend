import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { AdminsRepository } from '@/admins/repositories/admins.repository';
import { Admin, CreateAdminDTO } from '@/admins/dtos';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { PasswordUtils } from '@/shared/auth/utils/password.utils';

@Injectable()
export class AdminsService {
  constructor(
    private adminsRepository: AdminsRepository,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

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
    const cachedUser: Admin = await this.cacheManager.get('authenticated_user');

    if (cachedUser) {
      return cachedUser;
    }

    const admin = await this.adminsRepository.getByEmail(email);

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
