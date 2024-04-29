import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
import { IsDate, IsString, IsUUID, MaxLength } from 'class-validator';

export class Client {
  @ApiResponseProperty()
  @IsUUID()
  id: string;

  @ApiProperty()
  @IsString()
  @MaxLength(11)
  cpf: string;

  @ApiProperty()
  @IsString()
  @MaxLength(10)
  userId: string;

  @ApiResponseProperty()
  @IsDate()
  createdAt: Date;

  @ApiResponseProperty()
  @IsDate()
  updatedAt: Date;
}
