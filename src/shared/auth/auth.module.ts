import { AdminsService } from '@/admins/services/admins.service';
import { Module } from '@nestjs/common';
import { PrismaService } from '@/config/db/prisma.service';
import { AuthService } from '@/shared/auth/services/auth.services';
import { JwtModule } from '@nestjs/jwt';
import { AdminsRepository } from '@/admins/repositories/admins.repository';
import { AuthController } from '@/shared/auth/controllers/auth.controller';
import { UsersService } from '../users/services/users.services';
import { UsersRepository } from '../users/repositories/users.repository';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_ACCESS_TOKEN_SECRET,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AdminsRepository,
    AdminsService,
    AuthService,
    PrismaService,
    UsersService,
    UsersRepository,
  ],
})
export class AuthModule {}
