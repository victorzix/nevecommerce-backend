import { AdminsModule } from '@/admins/admins.module';
import { Module } from '@nestjs/common';
import { PrismaService } from '@/config/db/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from '@/config/db/redis.module';

@Module({
  imports: [
    AdminsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './.env',
    }),
    RedisModule,
    AdminsModule,
  ],
  controllers: [],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
