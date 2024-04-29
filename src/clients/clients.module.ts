import { Module } from '@nestjs/common';
import { PrismaService } from '@/config/db/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '@/shared/users/services/users.services';
import { UsersRepository } from '@/shared/users/repositories/users.repository';
import { ClientsRepository } from './repositories/clients.repository';
import { ClientsService } from './services/clients.service';
import { ClientsController } from './controllers/clients.controller';
import { AdminsRepository } from '@/admins/repositories/admins.repository';

@Module({
  imports: [],
  controllers: [ClientsController],
  providers: [
    PrismaService,
    JwtService,
    UsersService,
    UsersRepository,
    ClientsRepository,
    ClientsService,
    AdminsRepository,
  ],
})
export class ClientsModule {}
