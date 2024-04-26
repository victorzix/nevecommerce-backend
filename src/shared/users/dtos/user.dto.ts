import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
import { IsDate, IsEmail, IsString, IsUUID, MinLength } from 'class-validator';

export class User {
  @ApiResponseProperty()
  @IsUUID()
  id: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  @MinLength(8)
  password: string;

  @ApiResponseProperty()
  @IsDate()
  createdAt: Date;

  @ApiResponseProperty()
  @IsDate()
  updatedAt: Date;
}
