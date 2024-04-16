import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateAdminDTO {
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
}
