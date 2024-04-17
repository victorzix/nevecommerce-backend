import { BadRequestException, Injectable } from '@nestjs/common';
import { AdminsRepository } from '@/admins/repositories/admins.repository';
import { CreateAdminDTO } from '@/admins/dtos';

@Injectable()
export class AdminsService {
  constructor(private adminsRepository: AdminsRepository) {}

  async register(dto: CreateAdminDTO) {
    const checkUser =
      (await this.adminsRepository.getByEmail(dto.email)) ||
      (await this.adminsRepository.getByUserName(dto.username));

    if (checkUser) {
      throw new BadRequestException('User already registered');
    }

    const admin = await this.adminsRepository.register(dto);

    return admin;
  }
}
