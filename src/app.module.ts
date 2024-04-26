import { AdminsModule } from '@/admins/admins.module';
import { Module } from '@nestjs/common';
import { PrismaService } from '@/config/db/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from '@/config/db/redis.module';
import { AuthModule } from '@/shared/auth/auth.module';
import { UsersModule } from '@/shared/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './.env',
    }),
    RedisModule,
    AdminsModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
