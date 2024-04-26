import { Injectable } from '@nestjs/common';
import { Admin, CreateAdminDTO } from '@/admins/dtos';
import { PrismaService } from '@/config/db/prisma.service';

@Injectable()
export class AdminsRepository {
  constructor(private prisma: PrismaService) {}

  async register(dto: CreateAdminDTO): Promise<Admin> {
    const admin = await this.prisma.admin.create({
      data: dto,
    });
    return admin;
  }

  async getById(id: string): Promise<Admin> {
    const admin = await this.prisma.admin.findFirst({
      where: { id },
    });
    return admin;
  }

  async getByUserId(userId: string): Promise<Admin> {
    const admin = await this.prisma.admin.findFirst({
      where: { userId: userId },
    });
    return admin;
  }

  async listAdmins() {
    const admins = await this.prisma.admin.findMany();
    return admins;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.admin.delete({
      where: { id },
    });
    return;
  }
}
