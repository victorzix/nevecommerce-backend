import { Module } from '@nestjs/common';
import { PrismaService } from '@/config/db/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '@/shared/users/services/users.services';
import { UsersRepository } from '@/shared/users/repositories/users.repository';

@Module({
  imports: [],
  controllers: [],
  providers: [PrismaService, JwtService, UsersService, UsersRepository],
})
export class ClientsModule {}
