import { Injectable } from '@nestjs/common';
import { Admin, CreateAdminDTO, UpdateAdminDTO } from '@/admins/dtos';
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

  async update(id: string, dto: UpdateAdminDTO): Promise<Admin> {
    const updatedAdmin = await this.prisma.admin.update({
      where: { id },
      data: dto,
    });
    return updatedAdmin;
  }

  async getById(id: string): Promise<Admin> {
    const admin = await this.prisma.admin.findFirst({
      where: { id },
    });
    return admin;
  }

  async getByEmail(email: string): Promise<Admin> {
    const admin = await this.prisma.admin.findUnique({
      where: { email },
    });
    return admin;
  }

  async getByUsername(username: string): Promise<Admin> {
    const admin = await this.prisma.admin.findUnique({
      where: { username },
    });
    return admin;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.admin.delete({
      where: { id },
    });
    return;
  }
}
