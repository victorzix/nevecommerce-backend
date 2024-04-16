import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsEmail,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class Admin {
  @ApiResponseProperty()
  @IsUUID()
  id: string;

  @ApiProperty()
  @IsString()
  @MaxLength(10)
  username: string;

  @ApiProperty()
  @IsString()
  @MinLength(4)
  password: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiResponseProperty()
  @IsDate()
  createdAt: Date;

  @ApiResponseProperty()
  @IsDate()
  updatedAt: Date;
}
