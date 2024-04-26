import { PrismaService } from '@/config/db/prisma.service';
import { CreateUserDTO } from '@/shared/users/dtos/create_user.dto';
import { User } from '@/shared/users/dtos/user.dto';
import { UpdateUserDTO } from '@/shared/users/dtos/update_user.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersRepository {
  constructor(private prisma: PrismaService) {}

  async register(dto: CreateUserDTO): Promise<User> {
    const user = await this.prisma.user.create({
      data: dto,
    });
    return user;
  }

  async getById(id: string): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: { id },
    });
    return user;
  }

  async getByEmail(email: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    return user;
  }

  async update(id: string, dto: UpdateUserDTO): Promise<User> {
    const user = await this.prisma.user.update({
      where: { id },
      data: dto,
    });
    return user;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: { id },
    });
    return;
  }
}
