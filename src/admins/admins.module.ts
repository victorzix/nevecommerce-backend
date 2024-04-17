import { Module } from '@nestjs/common';
import { AdminsController } from '@/admins/controllers/admins.controller';
import { AdminsRepository } from '@/admins/repositories/admins.repository';
import { PrismaService } from '@/config/db/prisma.service';
import { AdminsService } from '@/admins/services/admins.service';

@Module({
  imports: [],
  controllers: [AdminsController],
  providers: [AdminsRepository, PrismaService, AdminsService],
})
export class AdminsModule {}
