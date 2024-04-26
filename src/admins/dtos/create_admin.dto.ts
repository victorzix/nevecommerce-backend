import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class CreateAdminDTO {
  @ApiProperty()
  @IsUUID()
  userId;
}
