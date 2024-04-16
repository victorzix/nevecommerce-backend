import { Module } from '@nestjs/common';
import { PrismaService } from '@/db/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from '@/db/redis.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './.env',
    }),
    RedisModule,
  ],
  controllers: [],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
