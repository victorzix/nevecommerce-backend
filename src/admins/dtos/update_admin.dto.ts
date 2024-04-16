import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateAdminDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(10)
  username?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MinLength(4)
  password?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEmail()
  email?: string;
}
