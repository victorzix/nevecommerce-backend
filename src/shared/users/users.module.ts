import { Module } from '@nestjs/common';
import { UsersRepository } from '@/shared/users/repositories/users.repository';
import { PrismaService } from '@/config/db/prisma.service';
import { UsersService } from './services/users.services';

@Module({
  imports: [],
  controllers: [],
  providers: [PrismaService, UsersRepository, UsersService],
})
export class UsersModule {}
